package com.example.FileDrive.fileShare;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file-sharing")
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
        fileShareService.upload();
    }

}
