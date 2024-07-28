package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int complaintId;
    private String description;
    private LocalDate complaintDate;
    private String status; // e.g., Open, In Progress, Resolved

    @ManyToOne
    @JoinColumn(name = "customerID")
    private Customer customer;
}

