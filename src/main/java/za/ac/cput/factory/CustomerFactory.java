package za.ac.cput.factory;

import za.ac.cput.domain.Customer;
import za.ac.cput.domain.Role;
import za.ac.cput.util.Helper;


public class CustomerFactory {
    public static Customer buildCustomer(String firstName, String lastName, String email, String password, String license, String cellNo) {
        if (
                Helper.isNullOrEmpty(firstName) ||
                Helper.isNullOrEmpty(lastName) ||
                        Helper.isNullOrEmpty(password) ||
                        Helper.isNullOrEmpty(license) ||
                        !Helper.isValidEmail(email) ||
                        Helper.isNullOrEmpty(cellNo)
                        ) {


            return null;
        }
        return new Customer.Builder()
                .setFirstName(firstName)
                .setLastName(lastName)
                .setEmail(email)
                .setPassword(password)
                .setLicense(license)
                .setCellNo(cellNo)
                .build();
    }

}

