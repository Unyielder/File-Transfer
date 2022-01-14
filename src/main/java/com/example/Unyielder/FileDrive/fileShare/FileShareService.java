package com.example.Unyielder.FileDrive.fileShare;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.example.Unyielder.FileDrive.bucket.Bucket;

@Service
public class FileShareService {

    private final AmazonS3 s3;

    @Autowired
    public FileShareService(AmazonS3 s3) {
        this.s3 = s3;
    }

    public void upload(MultipartFile file) {
        if(file.isEmpty()) {
            throw new IllegalStateException("No file has been uploaded");
        }
        Optional<Map<String, String>> optionalMetadata = extractMetadata(file);
        ObjectMetadata metadata = new ObjectMetadata();

        optionalMetadata.ifPresent(map -> {
            if(!map.isEmpty()) {
                map.forEach(metadata::addUserMetadata);
            }
        });

        String path = String.format(
                "%s/file-sharing/%s",
                Bucket.PROFILE_IMAGE.getBucketName(), file.getOriginalFilename()
        );

        try {
            s3.putObject(
                    path,
                    file.getOriginalFilename(),
                    file.getInputStream(),
                    metadata
            );
        } catch(IOException e) {
            throw new IllegalStateException("Unable to store file to s3");
        }

    }

    private Optional<Map<String, String>> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return Optional.of(metadata);
    }
}
