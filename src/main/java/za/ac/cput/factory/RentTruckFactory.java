package za.ac.cput.factory;

import za.ac.cput.domain.*;
import za.ac.cput.util.Helper;

import java.time.LocalDate;

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
                                           Branch pickUp, Branch dropOff) {


        if (Helper.isIntNotValid(rentId)
                || returnDate == null
                || customer == null
                || truck == null
                || pickUp == null
                || dropOff == null) {
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
                .setPickUp(pickUp)
                .setDropOff(dropOff)
                .build();
    }
}
