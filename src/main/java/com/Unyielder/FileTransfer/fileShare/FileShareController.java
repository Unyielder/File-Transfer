package com.Unyielder.FileTransfer.fileShare;

import com.Unyielder.FileTransfer.fileTransfers.FileTransfers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/file-sharing")
@CrossOrigin("*")
public class FileShareController {

    private final FileShareService fileShareService;

    @Autowired
    public FileShareController(FileShareService fileShareService) {
        this.fileShareService = fileShareService;
    }

    @PostMapping(
            path= "upload/{uuid}/{title}/{message}",
            consumes= MediaType.MULTIPART_FORM_DATA_VALUE,
            produces= MediaType.APPLICATION_JSON_VALUE
    )
    public void fileUpload(
            @RequestParam("file") List<MultipartFile> fileArray,
            @PathVariable("uuid") UUID uuid,
            @PathVariable("title") String title,
            @PathVariable(required=false) String message) throws IOException {
        fileShareService.upload(fileArray, uuid, title, message);
    }

    @GetMapping("download/{uuid}")
    public FileTransfers getDownloadLink(@PathVariable("uuid") UUID uuid) {
        return fileShareService.getTransferData(uuid);
    }



}
