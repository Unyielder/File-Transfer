package com.example.Unyielder.FileDrive.fileTransfers;

import com.example.Unyielder.FileDrive.fileTransfers.FileTransfers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface FileTransfersRepository extends JpaRepository<FileTransfers, Long> {
    //FileTransfers getByUuid();
    //SELECT download_link, link_creation_date, message, title

    @Query("FROM file_transfers WHERE uuid = ?1")
    FileTransfers findByUuid(UUID uuid);
}
