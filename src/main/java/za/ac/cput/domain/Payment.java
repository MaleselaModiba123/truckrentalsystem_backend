package za.ac.cput.domain;


import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String model;
    private String pickUpLocation;
    private String dropOffLocation;
    private String rentDate;
    private String returnDate;
    private Double totalCost;
    private Double paymentAmount;

    // Private constructor for the builder
    private Payment(Builder builder) {
        this.id = builder.id;
        this.model = builder.model;
        this.pickUpLocation = builder.pickUpLocation;
        this.dropOffLocation = builder.dropOffLocation;
        this.rentDate = builder.rentDate;
        this.returnDate = builder.returnDate;
        this.totalCost = builder.totalCost;
        this.paymentAmount = builder.paymentAmount;
    }

    public Payment() {

    }

    // Getters and setters

    public static class Builder {
        private Long id;
        private String model;
        private String pickUpLocation;
        private String dropOffLocation;
        private String rentDate;
        private String returnDate;
        private Double totalCost;
        private Double paymentAmount;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setModel(String model) {
            this.model = model;
            return this;
        }

        public Builder setPickUpLocation(String pickUpLocation) {
            this.pickUpLocation = pickUpLocation;
            return this;
        }

        public Builder setDropOffLocation(String dropOffLocation) {
            this.dropOffLocation = dropOffLocation;
            return this;
        }

        public Builder setRentDate(String rentDate) {
            this.rentDate = rentDate;
            return this;
        }

        public Builder setReturnDate(String returnDate) {
            this.returnDate = returnDate;
            return this;
        }

        public Builder setTotalCost(Double totalCost) {
            this.totalCost = totalCost;
            return this;
        }

        public Builder setPaymentAmount(Double paymentAmount) {
            this.paymentAmount = paymentAmount;
            return this;
        }

        public Payment build() {
            return new Payment(this);
        }
    }
}
