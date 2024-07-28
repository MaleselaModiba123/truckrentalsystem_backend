package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int discountId;
    private String discountCode;
    private double percentage;
    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToMany
    @JoinTable(
            name = "discount_customer",
            joinColumns = @JoinColumn(name = "discountId"),
            inverseJoinColumns = @JoinColumn(name = "customerID")
    )
    private List<Customer> customers;
}

