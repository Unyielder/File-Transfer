package com.example.Unyielder.FileDrive.fileTransfers;

import com.example.Unyielder.FileDrive.fileTransfers.FileTransfers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FileTransfersRepository extends JpaRepository<FileTransfers, Long> {
}
