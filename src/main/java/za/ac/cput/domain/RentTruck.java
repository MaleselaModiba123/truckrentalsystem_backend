package za.ac.cput.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

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
    private String pickUpLocation;
    private String dropOffLocation;
    private double totalCost;
    private boolean isPaymentMade;

    @ManyToOne
    @JoinColumn(name ="customer_Id", nullable = false)
    private Customer customerID;

    @ManyToOne
    @JoinColumn(name = "Vin")
    private Truck vin;

    @ManyToOne
    @JoinColumn(name ="customer_Id", nullable = false)
    private SalesPerson salesAgent;

    @ManyToOne
    @JoinColumn(name = "branch_Id")
    private Branch branchId;

    protected RentTruck() {
    }
    private RentTruck(Builder builder) {
        this.rentId = builder.rentId;
        this.rentDate = builder.rentDate;
        this.returnDate = builder.returnDate;
        this.pickUpLocation = builder.pickUpLocation;
        this.dropOffLocation = builder.dropOffLocation;
        this.totalCost = builder.totalCost;
        this.isPaymentMade = builder.isPaymentMade;
        this.customerID = builder.customerID;
        this.vin = builder.vin;
        this.salesAgent = builder.salesAgent;
        this.branchId = builder.branchId;
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

    public String getPickUpLocation() {
        return pickUpLocation;
    }

    public String getDropOffLocation() {
        return dropOffLocation;
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

    public SalesPerson getSalesAgent() {
        return salesAgent;
    }

    public Branch getBranchId() {
        return branchId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RentTruck rentTruck = (RentTruck) o;
        return rentId == rentTruck.rentId && Double.compare(totalCost, rentTruck.totalCost)
                == 0 && isPaymentMade == rentTruck.isPaymentMade && Objects.equals(rentDate,
                rentTruck.rentDate) && Objects.equals(returnDate, rentTruck.returnDate) &&
                Objects.equals(pickUpLocation, rentTruck.pickUpLocation) &&
                Objects.equals(dropOffLocation, rentTruck.dropOffLocation) &&
                Objects.equals(customerID, rentTruck.customerID) && Objects.equals(vin, rentTruck.vin) &&
                Objects.equals(salesAgent, rentTruck.salesAgent) && Objects.equals(branchId, rentTruck.branchId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rentId, rentDate, returnDate, pickUpLocation, dropOffLocation, totalCost, isPaymentMade, customerID, vin, salesAgent, branchId);
    }

    @Override
    public String toString() {
        return "RentTruck{" +
                "rentId=" + rentId +
                ", rentDate=" + rentDate +
                ", returnDate=" + returnDate +
                ", pickUpLocation='" + pickUpLocation + '\'' +
                ", dropOffLocation='" + dropOffLocation + '\'' +
                ", totalCost=" + totalCost +
                ", isPaymentMade=" + isPaymentMade +
                ", customerID=" + customerID +
                ", vin=" + vin +
                ", salesAgent=" + salesAgent +
                ", branchId=" + branchId +
                '}';
    }

    public static class Builder{
        private int rentId;
        private LocalDate rentDate;
        private LocalDate returnDate;
        private String pickUpLocation;
        private String dropOffLocation;
        private double totalCost;
        private boolean isPaymentMade;
        private Customer customerID;
        private Truck vin;
        private SalesPerson salesAgent;
        private Branch branchId;

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

        public Builder setPickUpLocation(String pickUpLocation) {
            this.pickUpLocation = pickUpLocation;
            return this;
        }

        public Builder setDropOffLocation(String dropOffLocation) {
            this.dropOffLocation = dropOffLocation;
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

        public Builder setSalesAgent(SalesPerson salesAgent) {
            this.salesAgent = salesAgent;
            return this;
        }

        public Builder setBranch(Branch branchId){
            this.branchId = branchId;
            return this;
        }

        public Builder copy(Builder builder) {
            this.rentId = builder.rentId;
            this.rentDate = builder.rentDate;
            this.returnDate = builder.returnDate;
            this.pickUpLocation = builder.pickUpLocation;
            this.dropOffLocation = builder.dropOffLocation;
            this.totalCost = builder.totalCost;
            this.isPaymentMade = builder.isPaymentMade;
            this.customerID = builder.customerID;
            this.vin = builder.vin;
            this.salesAgent = builder.salesAgent;
            this.branchId = builder.branchId;
            return this;
        }

        public RentTruck build(){return new RentTruck(this);}
    }
}


