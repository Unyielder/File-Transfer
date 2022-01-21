package com.example.Unyielder.FileDrive.fileTransfers;

import com.example.Unyielder.FileDrive.fileTransfers.FileTransfers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FileTransfersRepository extends JpaRepository<FileTransfers, Integer> {

    Optional<FileTransfers> findById(Integer id);
    List<FileTransfers> findAll();
}
