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
                                           double totalCost, boolean isPaymentMade,
                                           Customer customer,
                                           Truck truck,
                                           RentalAgent salesPerson,
                                           Branch pickUp, Branch dropOff) {

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Helper.DateValidatorUsingLocalDate dateValidator = new Helper.DateValidatorUsingLocalDate(dateFormatter);

        if (Helper.isIntNotValid(rentId) || !dateValidator.isValid(rentDate.toString()) ||
                returnDate == null || !dateValidator.isValid(returnDate.toString()) || Helper.isDoubleNotValid(totalCost)||
                customer == null || truck == null || salesPerson == null || pickUp == null || dropOff == null) {
            return null;
        }

        return new RentTruck.Builder()
                .setRentId(rentId)
                .setRentDate(rentDate)
                .setReturnDate(returnDate)
                .setTotalCost(totalCost)
                .setPaymentMade(isPaymentMade)
                .setCustomerID(customer)
                .setVin(truck)
                .setSalesAgent(salesPerson)
                .setPickUp(pickUp)
                .setDropOff(dropOff)
                .build();
    }
}
