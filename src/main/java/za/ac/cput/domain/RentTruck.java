package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;
@Entity
public class RentTruck {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rentTruck_seq")
    @SequenceGenerator(name = "rentTruck_seq", sequenceName = "rentTruck_seq", allocationSize = 1,initialValue = 100)
    private int rentId;
    private LocalDate rentDate = LocalDate.now();
    private LocalDate returnDate;
    private double totalCost;
    @Column(name = "isPaymentMade", columnDefinition = "BOOLEAN")
    private boolean isPaymentMade;

    @ManyToOne
    @JoinColumn(name ="customerID", nullable = false)
    private Customer customerID;

    @ManyToOne
    @JoinColumn(name = "Vin")
    private Truck vin;


    @ManyToOne
    @JoinColumn(name = "branch_IdP")
    private Branch pickUp;

    @ManyToOne
    @JoinColumn(name = "branch_IdD")
    private Branch dropOff;

    protected RentTruck() {
    }
    private RentTruck(Builder builder) {
        this.rentId = builder.rentId;
        this.rentDate = builder.rentDate;
        this.returnDate = builder.returnDate;
        this.totalCost = builder.totalCost;
        this.isPaymentMade = builder.isPaymentMade;
        this.customerID = builder.customerID;
        this.vin = builder.vin;
        this.pickUp = builder.pickUp;
        this.dropOff = builder.dropOff;
    }

    public int getRentId() {
        return rentId;
    }

    public LocalDate getRentDate() {
        return rentDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public boolean isPaymentMade() {
        return isPaymentMade;
    }

    public Customer getCustomerID() {
        return customerID;
    }

    public Truck getVin() {
        return vin;
    }

    public Branch getPickUp() {
        return pickUp;
    }

    public Branch getDropOff() {
        return dropOff;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RentTruck rentTruck = (RentTruck) o;
        return rentId == rentTruck.rentId && Double.compare(totalCost, rentTruck.totalCost) == 0 && isPaymentMade == rentTruck.isPaymentMade && Objects.equals(rentDate, rentTruck.rentDate) && Objects.equals(returnDate, rentTruck.returnDate) && Objects.equals(customerID, rentTruck.customerID) && Objects.equals(vin, rentTruck.vin)  && Objects.equals(pickUp, rentTruck.pickUp) && Objects.equals(dropOff, rentTruck.dropOff);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rentId, rentDate, returnDate, totalCost, isPaymentMade, customerID, vin, pickUp, dropOff);
    }

    @Override
    public String toString() {
        return "RentTruck{" +
                "rentId=" + rentId +
                ", rentDate=" + rentDate +
                ", returnDate=" + returnDate +
                ", totalCost=" + totalCost +
                ", isPaymentMade=" + isPaymentMade +
                ", customerID=" + customerID.getCustomerID() +
                ", vin=" + vin.getVin() +
                ", pickUp=" + pickUp.getBranchId() +
                ", dropOff=" + dropOff.getBranchId() +
                '}';
    }

    public static class Builder{
        private int rentId;
        private LocalDate rentDate;
        private LocalDate returnDate;
        private double totalCost;
        private boolean isPaymentMade;
        private Customer customerID;
        private Truck vin;
        private Branch pickUp;
        private Branch dropOff;

        public Builder() {
        }

        public Builder setRentId(int rentId) {
            this.rentId = rentId;
            return this;
        }

        public Builder setRentDate(LocalDate rentDate) {
            this.rentDate = rentDate;
            return this;
        }

        public Builder setReturnDate(LocalDate returnDate) {
            this.returnDate = returnDate;
            return this;
        }


        public Builder setTotalCost(double totalCost) {
            this.totalCost = totalCost;
            return this;
        }

        public Builder setPaymentMade(boolean paymentMade) {
            isPaymentMade = paymentMade;
            return this;
        }

        public Builder setCustomerID(Customer customerID) {
            this.customerID = customerID;
            return this;
        }

        public Builder setVin(Truck vin) {
            this.vin = vin;
            return this;
        }

        public Builder setPickUp(Branch pickUp) {
            this.pickUp = pickUp;
            return this;
        }

        public Builder setDropOff(Branch dropOff) {
            this.dropOff = dropOff;
            return this;
        }

        public Builder copy(RentTruck builder) {
            this.rentId = builder.rentId;
            this.rentDate = builder.rentDate;
            this.returnDate = builder.returnDate;
            this.totalCost = builder.totalCost;
            this.isPaymentMade = builder.isPaymentMade;
            this.customerID = builder.customerID;
            this.vin = builder.vin;
            this.pickUp = builder.pickUp;
            this.dropOff = builder.dropOff;
            return this;
        }

        public RentTruck build(){return new RentTruck(this);}
    }
}


