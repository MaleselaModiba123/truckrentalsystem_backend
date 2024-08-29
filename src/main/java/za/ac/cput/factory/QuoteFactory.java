package za.ac.cput.factory;

import za.ac.cput.domain.*;
import za.ac.cput.util.Helper;

import java.time.LocalDate;



public class QuoteFactory {
    public static Quote buildQuote(int quoteId, LocalDate quoteDate, double estimatedCost, boolean isConfirmed,
                                   Customer customer, Truck truck, Branch pickUp, Branch dropOff) {

        if (Helper.isIntNotValid(quoteId) || customer == null || truck == null || pickUp == null || dropOff == null) {
            return null;
        }

        return new Quote.Builder()
                .setQuoteId(quoteId)
                .setQuoteDate(quoteDate)
                .setEstimatedCost(estimatedCost)
                .setConfirmed(isConfirmed)
                .setCustomerID(customer)
                .setVin(truck)
                .setPickUp(pickUp)
                .setDropOff(dropOff)
                .build();
    }
}
