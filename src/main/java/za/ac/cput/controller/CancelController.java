package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Cancellation;
import za.ac.cput.service.CancelService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rentTruck/cancel")
public class CancelController {

    @Autowired
    private CancelService cancelService;

    @PostMapping("/cancel")
    public ResponseEntity<Cancellation> createCancellation(@RequestBody Cancellation cancellation) {
        try {
            // The cancellation object contains the reason and the rental object
            Cancellation cancelled = cancelService.createCancellation(cancellation);
            return ResponseEntity.status(HttpStatus.CREATED).body(cancelled);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            // Log the exception (optional)
            System.err.println("Error creating cancellation: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/read/{cancelId}")
    public ResponseEntity<Cancellation> read(@PathVariable int cancelId) {
        Cancellation cancellation = cancelService.read(cancelId);
        if (cancellation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(cancellation);
    }
}
