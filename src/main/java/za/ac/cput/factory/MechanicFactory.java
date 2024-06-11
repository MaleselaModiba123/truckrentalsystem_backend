package za.ac.cput.factory;

import za.ac.cput.domain.Mechanic;
import za.ac.cput.domain.ServiceRecord;
import za.ac.cput.util.Helper;

/**
 * EmployeeFactory.java
 * This is the factory class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 16 May 2024
 */
public class MechanicFactory {
    public static Mechanic buildMechanic(String employeeNumber, String firstName, String lastName,
                                         String email, String employeeType, String specialization, boolean availability) {

        System.out.println("employeeNumber: " + employeeNumber);
        System.out.println("firstName: " + firstName);
        System.out.println("lastName: " + lastName);
        System.out.println("email: " + email);
        System.out.println("employeeType: " + employeeType);
        System.out.println("specialization: " + specialization);
        System.out.println("availability: " + availability);
        if (
                Helper.isNullOrEmpty(specialization) ||
                        Helper.isNullOrEmpty(String.valueOf(availability)) ||
                        Helper.isNullOrEmpty(employeeNumber) ||
                        Helper.isNullOrEmpty(firstName) || Helper.isNullOrEmpty(lastName) ||
                        Helper.isNullOrEmpty(email) || !Helper.isValidEmail(email) ||
                        Helper.isNullOrEmpty(employeeType)
                        ) {
            System.out.println("One or more conditions failed, returning null");
            return null;
        }

        return new Mechanic.Builder().setEmployeeNumber(employeeNumber)
                .setFirstName(firstName)
                .setLastName(lastName)
                .setEmail(email)
                .setEmployeeType(employeeType)
                .setSpecialization(specialization)
                .setAvailability(availability)
                .build();

    }

}