package za.ac.cput.factory;
import za.ac.cput.domain.Manager;
import za.ac.cput.util.Helper;
/**
 *Truck.java
 * @aurthor Ayanda Phumzile Khoza (218057172)
 * */

public class ManagerFactory {
    public static Manager buildManager(String employeeNumber, double wages, int hours){
        if (Helper.isNullOrEmpty(employeeNumber)
                || Helper.isIntNotValid(wages)
                || Helper.isIntNotValid(hours)){
            return null;}
        return new Manager.Builder().setEmployeeNumber(employeeNumber)
                .setWages(wages)
                .setHours(hours)
                .build();
    }
}
