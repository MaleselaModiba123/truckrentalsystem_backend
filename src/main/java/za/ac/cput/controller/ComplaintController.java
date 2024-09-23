package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Complaint;
import za.ac.cput.service.ComplaintService;

import java.util.List;

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
    public Complaint create(@RequestBody Complaint complaint) {
        return complaintService.create(complaint);
    }

    // Get a complaint by ID
    @GetMapping("/read/{complaintId}")
    public Complaint read(@PathVariable int complaintId) {
        return complaintService.read(complaintId);
    }

    // Delete a complaint by ID
    @DeleteMapping("/delete/{complaintId}")
    public void delete(@PathVariable int complaintId) {
        complaintService.delete(complaintId);
    }

    // Update a complaint by ID
    @PutMapping("/update/{complaintId}")
    public Complaint update(@PathVariable int complaintId, @RequestBody Complaint complaint) {
        return complaintService.update(complaintId, complaint);
    }

    // Get all complaints
    @GetMapping("/getAll")
    public List<Complaint> getAll() {
        return complaintService.getAll();
    }
}
