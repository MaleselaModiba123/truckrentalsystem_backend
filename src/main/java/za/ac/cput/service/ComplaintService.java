package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Complaint;
import za.ac.cput.domain.Customer;
import za.ac.cput.repository.ComplaintRepository;
import za.ac.cput.repository.CustomerRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * ComplaintService.java
 * This is the service class for handling complaints.
 */

@Service
public class ComplaintService  {

    private final ComplaintRepository complaintRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public ComplaintService(ComplaintRepository complaintRepository, CustomerRepository customerRepository) {
        this.complaintRepository = complaintRepository;
        this.customerRepository = customerRepository;
    }


    public Complaint create(Complaint complaint) {
        return complaintRepository.save(complaint);
    }


    public Complaint read(Integer complaintId) {
        return complaintRepository.findById(complaintId).orElse(null);
    }


    public Complaint update(int complaintId, Complaint complaint) {
        Complaint existingComplaint = read(complaintId);
        if (existingComplaint != null) {
            Complaint updatedComplaint = new Complaint.Builder()
                    .copy(existingComplaint)
                    .setDescription(complaint.getDescription())
                    .setStatus(complaint.getStatus())
                    .setComplaintDate(complaint.getComplaintDate())
                    .setCustomer(complaint.getCustomer())
                    .build();
            return complaintRepository.save(updatedComplaint);
        }
        return null;
    }


    public void delete(Integer complaintId) {
        complaintRepository.deleteById(complaintId);
    }


    public List<Complaint> getAll() {
        return complaintRepository.findAll();
    }

    public List<Complaint> getComplaintsByCustomerId(int customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        return complaintRepository.findByCustomer(customer);
    }
}
