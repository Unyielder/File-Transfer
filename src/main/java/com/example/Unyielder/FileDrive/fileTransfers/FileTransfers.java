package com.example.Unyielder.FileDrive.fileTransfers;
import javax.persistence.*;
import java.time.LocalDate;

@Entity(name = "FileTransfers")
@Table()
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

    @Column(name="title", columnDefinition="TEXT", nullable = false)
    private String title;

    @Column(name="message", columnDefinition="TEXT")
    private String message;

    @Column(name="download_link", columnDefinition="TEXT", nullable = false, unique = true)
    private String downloadLink;

    @Column(name="link_creation_date", nullable = false)
    private LocalDate linkCreationDate;

    public FileTransfers() {
    }

    public FileTransfers(String title, String message, String downloadLink, LocalDate linkCreationDate) {
        this.title = title;
        this.message = message;
        this.downloadLink = downloadLink;
        this.linkCreationDate = linkCreationDate;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public String getDownloadLink() {
        return downloadLink;
    }

    public LocalDate getLinkCreationDate() {
        return linkCreationDate;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }

    public void setLinkCreationDate(LocalDate linkCreationDate) {
        this.linkCreationDate = linkCreationDate;
    }
}
