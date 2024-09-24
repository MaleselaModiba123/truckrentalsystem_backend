package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int complaintId;
    private String description;
    private LocalDate complaintDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "customerID")
    private Customer customer;

    protected Complaint() {
    }

    public Complaint(Builder builder) {
        this.complaintId = builder.complaintId;
        this.description = builder.description;
        this.complaintDate = builder.complaintDate;
        this.status = builder.status;
        this.customer = builder.customer;
    }

    public int getComplaintId() {
        return complaintId;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getComplaintDate() {
        return complaintDate;
    }

    public String getStatus() {
        return status;
    }

    public Customer getCustomer() {
        return customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Complaint complaint)) return false;
        return complaintId == complaint.complaintId && Objects.equals(description, complaint.description) && Objects.equals(complaintDate, complaint.complaintDate) && Objects.equals(status, complaint.status) && Objects.equals(customer, complaint.customer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(complaintId, description, complaintDate, status, customer);
    }

    @Override
    public String toString() {
        return "Complaint{" +
                "complaintId=" + complaintId +
                ", description='" + description + '\'' +
                ", complaintDate=" + complaintDate +
                ", status='" + status + '\'' +
                ", customer=" + customer +
                '}';
    }

    public static class Builder {
        private int complaintId;
        private String description;
        private LocalDate complaintDate;
        private String status;
        private Customer customer;


        public Builder setComplaintId(int complaintId) {
            this.complaintId = complaintId;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setComplaintDate(LocalDate complaintDate) {
            this.complaintDate = complaintDate;
            return this;
        }

        public Builder setStatus(String status) {
            this.status = status;
            return this;
        }

        public Builder setCustomer(Customer customer) {
            this.customer = customer;
            return this;
        }

        public Builder copy(Complaint complaint) {
            this.complaintId = complaint.complaintId;
            this.description = complaint.description;
            this.complaintDate = complaint.complaintDate;
            this.status = complaint.status;
            this.customer = complaint.customer;
            return this;
        }

        public Complaint build() {
            return new Complaint(this);
        }
    }
}