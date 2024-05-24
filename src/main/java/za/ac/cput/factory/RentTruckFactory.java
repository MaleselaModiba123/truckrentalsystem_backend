package za.ac.cput.factory;

import za.ac.cput.domain.*;
import za.ac.cput.util.Helper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * RentTruckFactory.java
 * This is the Factory class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 03 May 2024
 */

public class RentTruckFactory {
    public static RentTruck buildRentTruck(int rentId, LocalDate rentDate, LocalDate returnDate,
                                           double totalCost, String pickUpLocation,
                                           String dropOffLocation, boolean isPaymentMade,
                                           Customer customer,
                                           Truck truck,
                                           SalesPerson salesPerson,
                                           Branch branch) {
        if (Helper.isIntNotValid(rentId) ||
                rentDate == null || returnDate == null || Helper.isDoubleNotNull(totalCost) ||
                Helper.isNullOrEmpty(pickUpLocation) || Helper.isNullOrEmpty(dropOffLocation) ||
                customer == null || truck == null || salesPerson == null || branch == null) {
            return null;
        }

        return new RentTruck.Builder()
                .setRentId(rentId)
                .setRentDate(rentDate)
                .setReturnDate(returnDate)
                .setTotalCost(totalCost)
                .setPickUpLocation(pickUpLocation)
                .setDropOffLocation(dropOffLocation)
                .setPaymentMade(isPaymentMade)
                .setCustomerID(customer)
                .setVin(truck)
                .setSalesAgent(salesPerson)
                .setBranch(branch)
                .build();
    }
}
