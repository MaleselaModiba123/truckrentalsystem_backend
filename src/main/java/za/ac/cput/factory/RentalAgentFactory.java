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
                                               String employeeType,
                                               double wages,
                                               int hours){
        if (Helper.isNullOrEmpty(employeeNumber)
                || Helper.isNullOrEmpty(firstName)
                || Helper.isNullOrEmpty(lastName)
                || !Helper.isValidEmail(email)
                || Helper.isNullOrEmpty(employeeType)
                || Helper.isDoubleNotValid(wages)
                || Helper.isIntNotValid(hours)){
            return null;
        }


        return new RentalAgent.Builder().setEmployeeNumber(employeeNumber)
                .setFirstName(firstName)
                .setLastName(lastName)
                .setEmail(email)
                .setEmployeeType(employeeType)
                .setWages(wages)
                .setHours(hours)
                .build();
    }
}

