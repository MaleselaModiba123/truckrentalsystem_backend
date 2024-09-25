package za.ac.cput.domain;


import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity

public class Cancellation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cancel_seq")
    @SequenceGenerator(name = "cancel_seq", sequenceName = "cancel_seq", allocationSize = 1, initialValue = 10)
    private int cancelId;

    private LocalDate cancelDate;

    private String cancelReason;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rental_id", nullable = false) // Defines the foreign key relationship
    private RentTruck rentTruck;

    public Cancellation() {
    }

    // Updated constructor to include RentTruck
    public Cancellation(Builder builder) {
        this.cancelId = builder.cancelId;
        this.cancelDate = builder.cancelDate;
        this.cancelReason = builder.cancelReason;
        this.rentTruck = builder.rentTruck;
    }

    public int getCancelId() {
        return cancelId;
    }

    public LocalDate getCancelDate() {
        return cancelDate;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public RentTruck getRentTruck() {
        return rentTruck;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cancellation cancel = (Cancellation) o;
        return cancelId == cancel.cancelId &&
                Objects.equals(cancelDate, cancel.cancelDate) &&
                Objects.equals(cancelReason, cancel.cancelReason) &&
                Objects.equals(rentTruck, cancel.rentTruck);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cancelId, cancelDate, cancelReason, rentTruck);
    }

    @Override
    public String toString() {
        return "Cancellation{" +
                "cancelId=" + cancelId +
                ", cancelDate=" + cancelDate +
                ", cancelReason='" + cancelReason + '\'' +
                ", rentTruck=" + rentTruck +
                '}';
    }

    public static class Builder{
        private int cancelId;
        private LocalDate cancelDate;
        private String cancelReason;
        private RentTruck rentTruck; // Added RentTruck to builder

        public Builder setCancelId(int cancelId) {
            this.cancelId = cancelId;
            return this;
        }

        public Builder setCancelDate(LocalDate cancelDate) {
            this.cancelDate = cancelDate;
            return this;
        }

        public Builder setCancelReason(String cancelReason) {
            this.cancelReason = cancelReason;
            return this;
        }

        public Builder setRentTruck(RentTruck rentTruck) {
            this.rentTruck = rentTruck;
            return this;
        }

        public Builder copy(Cancellation cancel){
            this.cancelId = cancel.cancelId;
            this.cancelReason = cancel.cancelReason;
            this.cancelDate = cancel.cancelDate;
            this.rentTruck = cancel.rentTruck;
            return this;
        }

        public Cancellation build() {
            return new Cancellation(this);
        }
    }
}
