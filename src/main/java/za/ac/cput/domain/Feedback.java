package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedbackId;
    private String comments;
    private int rating; // e.g., 1 to 5 stars
    private LocalDate feedbackDate;

    @ManyToOne
    @JoinColumn(name = "customerId")
    private Customer customer;
}

