package za.ac.cput.dto;

import za.ac.cput.domain.RentalStatus;

import java.time.LocalDate;

public class RentTruckRequest {
    private LocalDate rentDate;
    private LocalDate returnDate;
    private double totalCost;
    private boolean isPaymentMade;
    private boolean isReturned;
    private int customerID;
    private String vin;
    private int pickUpBranchId;
    private int dropOffBranchId;
    private RentalStatus status;

    // Getters and setters
    public LocalDate getRentDate() {
        return rentDate;
    }

    public void setRentDate(LocalDate rentDate) {
        this.rentDate = rentDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public boolean isPaymentMade() {
        return isPaymentMade;
    }

    public void setPaymentMade(boolean paymentMade) {
        isPaymentMade = paymentMade;
    }

    public boolean isReturned() {
        return isReturned;
    }

    public void setReturned(boolean returned) {
        this.isReturned = returned;
    }


    public int getCustomerID() {
        return customerID;
    }

    public void setCustomerID(int customerID) {
        this.customerID = customerID;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public int getPickUpBranchId() {
        return pickUpBranchId;
    }

    public void setPickUpBranchId(int pickUpBranchId) {
        this.pickUpBranchId = pickUpBranchId;
    }

    public int getDropOffBranchId() {
        return dropOffBranchId;
    }

    public void setDropOffBranchId(int dropOffBranchId) {
        this.dropOffBranchId = dropOffBranchId;
    }

    public RentalStatus getStatus() {
        return status;
    }
    public void setStatus(RentalStatus status) {
        this.status = status;
    }


}
