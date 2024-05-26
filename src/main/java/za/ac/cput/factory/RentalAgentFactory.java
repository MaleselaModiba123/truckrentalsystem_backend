package za.ac.cput.factory;

import za.ac.cput.domain.RentalAgent;
import za.ac.cput.util.Helper;
/*  Completed By Malesela Modiba
    23 May 2024
 */
public class RentalAgentFactory {
    public static RentalAgent buildRentalAgent(String employeeNumber,
                                               String firstName,
                                               String lastName,
                                               String email,
                                               double wages,
                                               int hours,
                                               int customerID){
        if (Helper.isNullOrEmpty(employeeNumber)
                || Helper.isNullOrEmpty(firstName)
                || Helper.isNullOrEmpty(lastName)
                || Helper.isNullOrEmpty(email)
                || !Helper.isValidEmail(email)
                || Helper.isDoubleNotValid(wages)
                || Helper.isIntNotValid(hours)
                ||Helper.isIntNotValid(customerID)){
            return null;
        }


        return new RentalAgent.Builder().setEmployeeNumber(employeeNumber)
                .setFirstName(firstName)
                .setLastName(lastName)
                .setEmail(email)
                .setWages(wages)
                .setHours(hours)
                .setCustomerID(customerID)
                .build();
    }
}

