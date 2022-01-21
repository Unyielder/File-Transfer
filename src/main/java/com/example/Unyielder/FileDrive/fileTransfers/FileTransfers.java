package com.example.Unyielder.FileDrive.fileTransfers;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table
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

    private Integer id;
    private String title;
    private String message;
    private String downloadLink;
    private Date linkCreationDate;

    public FileTransfers() {
    }

    public FileTransfers(Integer id, String title, String message, String downloadLink, Date linkCreationDate) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.downloadLink = downloadLink;
        this.linkCreationDate = linkCreationDate;
    }

    public FileTransfers(String title, String message, String downloadLink, Date linkCreationDate) {
        this.title = title;
        this.message = message;
        this.downloadLink = downloadLink;
        this.linkCreationDate = linkCreationDate;
    }

    public Integer getId() {
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

    public Date getLinkCreationDate() {
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

    public void setLinkCreationDate(Date linkCreationDate) {
        this.linkCreationDate = linkCreationDate;
    }
}
