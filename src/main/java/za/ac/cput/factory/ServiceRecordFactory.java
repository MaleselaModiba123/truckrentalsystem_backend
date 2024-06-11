package za.ac.cput.factory;

import za.ac.cput.domain.Mechanic;
import za.ac.cput.domain.ServiceRecord;
import za.ac.cput.domain.Truck;
import za.ac.cput.util.Helper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
/*  Completed By Malesela Modiba
    23 May 2024
 */
public class ServiceRecordFactory {
    public static ServiceRecord buildServiceRecord(int serviceID, String serviceType
            , double cost, LocalDate serviceDate, LocalDate nextServiceDate, Mechanic mechanic, Truck truck) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Helper.DateValidatorUsingLocalDate dateValidator = new Helper.DateValidatorUsingLocalDate(dateFormatter);

        if (Helper.isIntNotValid(serviceID)
                || Helper.isNullOrEmpty(serviceType)
                || Helper.isDoubleNotValid(cost)
                || serviceDate == null || !dateValidator.isValid(serviceDate.toString())
                || nextServiceDate == null
                || !dateValidator.isValid(nextServiceDate.toString())
                || mechanic == null
                || truck == null)
        {
            return null;
        }

        return new ServiceRecord.Builder().setServiceID(serviceID)
                .setServiceType(serviceType)
                .setCost(cost)
                .setServiceDate(serviceDate)
                .setNextServiceDate(nextServiceDate)
                .setMechanic(mechanic)
                .setTruck(truck)
                .build();
    }
}
