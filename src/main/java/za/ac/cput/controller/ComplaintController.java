package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Complaint;
import za.ac.cput.service.ComplaintService;

import java.util.List;
import java.util.Map;

/**
 * ComplaintController.java
 * This is the Controller class for handling complaints.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // Create a new complaint
    @PostMapping("/create")
    public ResponseEntity<Complaint> createComplaint(@RequestBody Map<String, Object> payload) {
        String description = (String) payload.get("description");
        Integer customerId = (Integer) payload.get("customerId");
        Complaint createdComplaint = complaintService.create(description, customerId);
        return new ResponseEntity<>(createdComplaint, HttpStatus.CREATED);
    }


    @GetMapping("/read/{complaintId}")
    public Complaint read(@PathVariable int complaintId) {
        return complaintService.read(complaintId);
    }


    @DeleteMapping("/delete/{complaintId}")
    public void delete(@PathVariable int complaintId) {
        complaintService.delete(complaintId);
    }


    @PutMapping("/update/{complaintId}")
    public Complaint update(@PathVariable int complaintId, @RequestBody Complaint complaint) {
        return complaintService.update(complaintId, complaint);
    }

    // Get all complaints
    @GetMapping("/getAll")
    public List<Complaint> getAll() {
        return complaintService.getAll();
    }

    @PutMapping("/respondToComplaint/{complaintId}")
    public ResponseEntity<Complaint> respondToComplaint(@PathVariable int complaintId, @RequestBody Map<String, String> payload) {
        String responseText = payload.get("response");

        try {
            Complaint updatedComplaint = complaintService.respondToComplaint(complaintId, responseText);
            return new ResponseEntity<>(updatedComplaint, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

