package za.ac.cput.factory;
import za.ac.cput.domain.Manager;
import za.ac.cput.util.Helper;
/**
 *Truck.java
 * @aurthor Ayanda Phumzile Khoza (218057172)
 * */

public class ManagerFactory {
    public static Manager buildManager(String employeeNumber, String firstName, String lastName,
                                       String email,String employeeType,
                                       double wages, int hours){
        if (Helper.isNullOrEmpty(employeeNumber)
                || Helper.isNullOrEmpty(firstName)
                || Helper.isNullOrEmpty(lastName)
                || Helper.isValidAddress(email)
                || Helper.isNullOrEmpty(employeeType)
                || Helper.isDoubleNotValid(wages)
                || Helper.isIntNotValid(hours)){
            return null;
        }
        return new Manager.Builder()
                .setEmployeeNumber(employeeNumber)
                .setFirstName(firstName)
                .setLastName(lastName)
                .setEmail(email)
                .setEmployeeType(employeeType)
                .setWages(wages)
                .setHours(hours)
                .build();
    }
}
