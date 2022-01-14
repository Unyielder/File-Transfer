package com.example.Unyielder.FileDrive.bucket;

public enum Bucket {

    PROFILE_IMAGE("file-drive-001");
    private final String bucketName;

    Bucket(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return this.bucketName;
    }
}
