package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

/**
 * RentTruck.java
 * This is the domain class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 03 May 2024
 */

@Entity
public class RentTruck {
    @Id
    private int rentId;
    private LocalDate rentDate;
    private LocalDate returnDate;
    private double totalCost;
    private boolean isPaymentMade;

    @ManyToOne
    @JoinColumn(name ="customer_Id", nullable = false)
    private Customer customerID;

    @ManyToOne
    @JoinColumn(name = "Vin")
    private Truck vin;

    @OneToOne
    @JoinColumn(name ="customer_Id", nullable = false)
    private RentalAgent salesAgent;

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
        this.salesAgent = builder.salesAgent;
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

    public RentalAgent getSalesAgent() {
        return salesAgent;
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
        return rentId == rentTruck.rentId && Double.compare(totalCost, rentTruck.totalCost) == 0 && isPaymentMade == rentTruck.isPaymentMade && Objects.equals(rentDate, rentTruck.rentDate) && Objects.equals(returnDate, rentTruck.returnDate) && Objects.equals(customerID, rentTruck.customerID) && Objects.equals(vin, rentTruck.vin) && Objects.equals(salesAgent, rentTruck.salesAgent) && Objects.equals(pickUp, rentTruck.pickUp) && Objects.equals(dropOff, rentTruck.dropOff);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rentId, rentDate, returnDate, totalCost, isPaymentMade, customerID, vin, salesAgent, pickUp, dropOff);
    }

    @Override
    public String toString() {
        return "RentTruck{" +
                "rentId=" + rentId +
                ", rentDate=" + rentDate +
                ", returnDate=" + returnDate +
                ", totalCost=" + totalCost +
                ", isPaymentMade=" + isPaymentMade +
                ", customerID=" + customerID +
                ", vin=" + vin +
                ", salesAgent=" + salesAgent +
                ", pickUp=" + pickUp +
                ", dropOff=" + dropOff +
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
        private RentalAgent salesAgent;
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

        public Builder setSalesAgent(RentalAgent salesAgent) {
            this.salesAgent = salesAgent;
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
            this.salesAgent = builder.salesAgent;
            this.pickUp = builder.pickUp;
            this.dropOff = builder.dropOff;
            return this;
        }

        public RentTruck build(){return new RentTruck(this);}
    }
}


