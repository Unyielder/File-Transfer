package com.Unyielder.FileTransfer.fileTransfers;
import com.vladmihalcea.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity(name = "file_transfers")
@Table()
@TypeDef(name = "jsonb", typeClass = JsonType.class)
public class FileTransfers {

    @Id
    @SequenceGenerator(
            name = "fileTransfers_sequence",
            sequenceName = "fileTransfers_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "fileTransfers_sequence"
    )
    @Column(name="id", updatable = false)
    private Long id;

    @Column(name="uuid", columnDefinition="UUID",updatable = false, unique = true)
    private UUID uuid;

    @Column(name="title", columnDefinition="TEXT", nullable = false)
    private String title;

    @Column(name="message", columnDefinition="TEXT")
    private String message;

    @Type(type = "jsonb")
    @Column(name="file_metadata", columnDefinition="JSON", nullable = false)
    private String fileMetadata;

    @Column(name="download_link", columnDefinition="TEXT", nullable = false, unique = true)
    private String downloadLink;

    @Column(name="link_creation_date", nullable = false)
    private LocalDate linkCreationDate;

    public FileTransfers() {
    }

    public FileTransfers(UUID uuid, String title, String message, String fileMetadata, String downloadLink, LocalDate linkCreationDate) {
        this.uuid = uuid;
        this.title = title;
        this.message = message;
        this.fileMetadata = fileMetadata;
        this.downloadLink = downloadLink;
        this.linkCreationDate = linkCreationDate;
    }

    public Long getId() {
        return id;
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public String getFileMetadata() {
        return fileMetadata;
    }

    public String getDownloadLink() {
        return downloadLink;
    }

    public LocalDate getLinkCreationDate() {
        return linkCreationDate;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setFileMetadata(String fileMetadata) {
        this.fileMetadata = fileMetadata;
    }

    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }

    public void setLinkCreationDate(LocalDate linkCreationDate) {
        this.linkCreationDate = linkCreationDate;
    }
}
