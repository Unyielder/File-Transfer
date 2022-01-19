package com.example.Unyielder.FileDrive.fileShare;

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
import java.util.*;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import com.example.Unyielder.FileDrive.bucket.Bucket;
import org.springframework.web.multipart.MultipartRequest;

@Service
public class FileShareService {

    private final AmazonS3 s3;

    @Autowired
    public FileShareService(AmazonS3 s3) {
        this.s3 = s3;
    }

    public void upload(List<MultipartFile> fileArray) throws IOException {
        fileArray.forEach(file -> System.out.println(file.getOriginalFilename()));
        String path = String.format(
                "%s/file-sharing",
                Bucket.PROFILE_IMAGE.getBucketName()
        );

        if(fileArray.size() == 0) {
            throw new IllegalStateException("No file has been uploaded");

        } else if(fileArray.size() == 1) {
            MultipartFile file = fileArray.get(0);
            ObjectMetadata metadata = getMetadata(file);
            storeFile(path, file.getOriginalFilename(), file.getInputStream(), metadata);

        } else {
            File zipFile = new File("zipFile.zip");
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
            storeFile(path, "zipFile.zip", zipFileInputStream, new ObjectMetadata());

        }

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
