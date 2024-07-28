package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class AccidentReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportId;
    private LocalDate accidentDate;
    private String description;
    private String location;
    private double damageCost;

    @ManyToOne
    @JoinColumn(name = "Vin")
    private Truck truck;

    @ManyToOne
    @JoinColumn(name = "customerID")
    private Customer customer;
}

