package com.tms.service;

import com.tms.response.FileUploadResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    public FileUploadResponse uploadFile(MultipartFile multipartFile) throws IOException;

    public ResponseEntity<?> downloadFile(String fileCode) throws IOException;

}
