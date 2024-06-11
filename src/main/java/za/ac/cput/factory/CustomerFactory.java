package za.ac.cput.factory;

import za.ac.cput.domain.Customer;
import za.ac.cput.domain.RentalAgent;
import za.ac.cput.util.Helper;

/**
 * CustomerFactory.java
 * This is the customer class
 * @aurthor Zukhanye Anele Mene  (219404275)
 * Date: 03 May 2024
 */
public class CustomerFactory {
    public static Customer buildCustomer(int customerID, String firstName, String lastName, String email, String license, String cellNo, RentalAgent rentalAgent) {
        if (
                Helper.isIntNotValid(customerID) ||
                Helper.isNullOrEmpty(firstName) ||
                Helper.isNullOrEmpty(lastName) ||
               !Helper.isValidEmail(email) ||
                Helper.isNullOrEmpty(license) ||
                        Helper.isNullOrEmpty(cellNo)
                        || rentalAgent == null) {


            return null;
        }
        return new Customer.Builder().setCustomerID(customerID)
                .setFirstName(firstName)
                .setLastName(lastName)
                .setEmail(email)
                .setLicense(license)
                .setCellNo(cellNo)
                .setRentalAgent(rentalAgent)
                .build();
    }

}

