package com.Unyielder.FileTransfer.fileTransfers;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface FileTransfersRepository extends JpaRepository<FileTransfers, Long> {

    @Query("FROM file_transfers WHERE uuid = ?1")
    FileTransfers findByUuid(UUID uuid);
}
