package com.tms.controller;

import com.tms.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
public class FileController {
    @Autowired
    FileService fileService;

    @PostMapping({"/api/uploadFile"})
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        return new ResponseEntity<>(fileService.uploadFile(multipartFile), HttpStatus.OK);
    }
    @GetMapping("/api/downloadFile/{fileCode}")
    public ResponseEntity<?> downloadFile(@PathVariable("fileCode") String fileCode) throws IOException {
        return fileService.downloadFile(fileCode);
    }
}
