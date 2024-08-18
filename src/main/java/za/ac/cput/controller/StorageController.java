// package za.ac.cput.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;
// import za.ac.cput.service.StorageService;

// import java.io.IOException;
// import java.util.List;

// @CrossOrigin(origins = "*")
// @RestController
// @RequestMapping("/imageData")
// public class StorageController {

//     @Autowired
//     private StorageService service;

//     @PostMapping
//     public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
//         String uploadImage = service.uploadImage(file);
//         return ResponseEntity.status(HttpStatus.OK)
//                 .body(uploadImage);
//     }

//     @GetMapping("/{fileName}")
//     public ResponseEntity<?> downloadImage(@PathVariable String fileName){
//         byte[] imageData=service.downloadImage(fileName);
//         return ResponseEntity.status(HttpStatus.OK)
//                 .contentType(MediaType.valueOf("image/jpeg"))
//                 .body(imageData);

//     }
//     @GetMapping
//     public ResponseEntity<List<String>> getAllImages() {
//         List<String> imageNames = service.getAllImageNames();
//         return ResponseEntity.status(HttpStatus.OK).body(imageNames);
//     }
//     @DeleteMapping("/{fileName}")
//     public ResponseEntity<?> deleteImage(@PathVariable String fileName) {
//         boolean isDeleted = service.deleteImage(fileName);
//         return isDeleted ? ResponseEntity.status(HttpStatus.OK).body("Image deleted successfully") :
//                 ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
//     }


// }
