package com.example.Unyielder.FileDrive.fileShare;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
            path= "upload",
            consumes= MediaType.MULTIPART_FORM_DATA_VALUE,
            produces= MediaType.APPLICATION_JSON_VALUE
    )
    public void fileUpload(@RequestParam("file") MultipartFile file) {
        fileShareService.upload(file);
    }

}
