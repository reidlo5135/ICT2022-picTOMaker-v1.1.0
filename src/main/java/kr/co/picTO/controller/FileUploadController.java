package kr.co.picTO.controller;

import kr.co.picTO.service.s3.FileUploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/img")
@Log4j2
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping(value = "/upload")
    public String uploadFile(@RequestPart MultipartFile multipartFile) {
        log.info("Upload Controller uploadFile file : " + multipartFile);
        return fileUploadService.uploadImage(multipartFile);
    }
}
