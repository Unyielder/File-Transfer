package com.example.Unyielder.FileDrive.fileShare ;

import com.amazonaws.services.iotevents.model.Input;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.*;
import java.net.URL;
import java.time.Instant;
import java.util.*;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import com.example.Unyielder.FileDrive.bucket.Bucket;
import org.springframework.web.multipart.MultipartRequest;

@Service
public class FileShareService {

    private final AmazonS3 s3;
    private final String bucketPath;
    private String fileName;

    @Autowired
    public FileShareService(AmazonS3 s3) {
        this.s3 = s3;
        this.bucketPath = String.format(
                "%s/file-sharing",
                Bucket.PROFILE_IMAGE.getBucketName()
        );
    }

    public void upload(List<MultipartFile> fileArray) throws IOException {
        fileArray.forEach(file -> System.out.println(file.getOriginalFilename()));

        if(fileArray.size() == 0) {
            throw new IllegalStateException("No file has been uploaded");

        } else if(fileArray.size() == 1) {
            MultipartFile file = fileArray.get(0);
            ObjectMetadata metadata = getMetadata(file);
            this.fileName = file.getOriginalFilename() + "-" + UUID.randomUUID();
            storeFile(this.bucketPath, fileName, file.getInputStream(), metadata);

            System.out.println("Generating download link...");
            String link = getDownloadLink();
            System.out.println("Finished!");
            System.out.println(link);

        } else {
            this.fileName = "zip-" + UUID.randomUUID();
            File zipFile = new File(this.fileName);

            ZipOutputStream zos = new ZipOutputStream(new BufferedOutputStream(new FileOutputStream(zipFile)));
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
            BufferedInputStream zipFileInputStream = new BufferedInputStream(new FileInputStream(zipFile));
            zos.close();
            storeFile(this.bucketPath, this.fileName, zipFileInputStream, new ObjectMetadata());
            System.out.println("Generating download link...");
            String link = getDownloadLink();
            System.out.println("Finished!");
            System.out.println(link);
        }
    }

    public String getDownloadLink() {
        Date expiration = new Date();
        long expirationTime = Instant.now().toEpochMilli();
        expirationTime += 1000 * 60 * 5; // 5 minutes
        expiration.setTime(expirationTime);

        URL url = s3.generatePresignedUrl(this.bucketPath, this.fileName, expiration);
        return url.toString();
    }

    private void storeFile(String path, String fileName, InputStream inputStream, ObjectMetadata metadata) {
        s3.putObject(
                path,
                fileName,
                inputStream,
                metadata
        );
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
