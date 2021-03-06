package com.Unyielder.FileTransfer.fileShare;


import com.Unyielder.FileTransfer.fileTransfers.FileTransfers;
import com.Unyielder.FileTransfer.fileTransfers.FileTransfersRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.net.URL;
import java.time.Instant;
import java.util.*;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import java.time.*;

import com.Unyielder.FileTransfer.bucket.Bucket;


@Service
public class FileShareService {

    private final AmazonS3 s3;
    private final FileTransfersRepository fileTransfersRepository;
    private final String bucketPath;
    private String fileName;

    @Autowired
    public FileShareService(AmazonS3 s3, FileTransfersRepository fileTransfersRepository) {
        this.s3 = s3;
        this.fileTransfersRepository = fileTransfersRepository;
        this.bucketPath = String.format(
                "%s/file-sharing",
                Bucket.PROFILE_IMAGE.getBucketName()
        );
    }

    public void upload(List<MultipartFile> fileArray, UUID uuid, String title, String message) throws IOException {
        if(message.equals("null")) message = null;
        InputStream fileStream;
        ObjectMetadata metadata;

        if(fileArray.size() == 0) {
            throw new IllegalStateException("No file has been uploaded");

        } else if(fileArray.size() == 1) {
            MultipartFile file = fileArray.get(0);
            fileStream = file.getInputStream();
            metadata = getMetadata(file);
            String[] fileNameParts = file.getOriginalFilename().split("\\.(?=[^\\.]+$)");
            this.fileName = fileNameParts[0] + "-" + UUID.randomUUID() + "." + fileNameParts[1];
        } else {
            this.fileName = "zip-" + UUID.randomUUID();
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ZipOutputStream zos = new ZipOutputStream(bos);

            for(MultipartFile file : fileArray) {
                InputStream inputStream = file.getInputStream();
                ZipEntry zipEntry = new ZipEntry(Objects.requireNonNull(file.getOriginalFilename()));
                zos.putNextEntry(zipEntry);

                byte[] bytes = new byte[2048];
                int length;
                while((length = inputStream.read(bytes)) > -1) {
                    zos.write(bytes, 0, length);
                }
            }
            zos.close();
            fileStream = new ByteArrayInputStream(bos.toByteArray());
            metadata = new ObjectMetadata();
        }
        s3.putObject(this.bucketPath, this.fileName, fileStream, metadata);
        storeTransferData(uuid, title, message, fileArray);
    }

    public FileTransfers getTransferData(UUID uuid) {
        return fileTransfersRepository.findByUuid(uuid);
    }

    private void storeTransferData(UUID uuid, String title, String message, List<MultipartFile> fileArray) {
        // Fetching download link from s3 bucket
        String link = getDownloadLink();

        // Prepping metadata into JSON format
        List<Map<String, String>> metadataArray = new ArrayList<>();
        fileArray.forEach(file -> {
            Map<String, String> map = new HashMap<>();
            map.put("name", file.getOriginalFilename());
            map.put("type", file.getContentType());
            map.put("size", String.valueOf(file.getSize()));
            metadataArray.add(map);
        });
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String nestedJsonArray = gson.toJson(metadataArray);

        // Store in database
        FileTransfers fileTransferRecord = new FileTransfers(uuid, title, message, nestedJsonArray, link, LocalDate.now());
        fileTransfersRepository.save(fileTransferRecord);
    }

    private String getDownloadLink() {
        Date expiration = new Date();
        long expirationTime = Instant.now().toEpochMilli();
        expirationTime += 1000 * 60 * 60 * 24 * 7; // 7 days
        expiration.setTime(expirationTime);

        URL url = s3.generatePresignedUrl(this.bucketPath, this.fileName, expiration);
        return url.toString();
    }

    private ObjectMetadata getMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));

        Optional<Map<String, String>> optionalMetadata = Optional.of(metadata);
        ObjectMetadata objMetadata = new ObjectMetadata();

        optionalMetadata.ifPresent(map -> {
            if(!map.isEmpty()) {
                map.forEach(objMetadata::addUserMetadata);
            }
        });
        return objMetadata;
    }

}
