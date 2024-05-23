package za.ac.cput.factory;

import za.ac.cput.domain.ServiceRecord;
import za.ac.cput.util.Helper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
/*  Completed By Malesela Modiba
    23 May 2024
 */
public class ServiceRecordFactory {
    public static ServiceRecord buildServiceRecord (int serviceID, LocalDate serviceDate, String serviceType
                                                    , double cost,
                                                    String mechanicEmpNo, LocalDate nextServiceDate, String vin) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Helper.DateValidatorUsingLocalDate dateValidator = new Helper.DateValidatorUsingLocalDate(dateFormatter);

        if (Helper.isIntNotValid(serviceID) ||
                serviceDate == null || !dateValidator.isValid(serviceDate.toString())
                || Helper.isNullOrEmpty(serviceType)
                || Helper.isNullOrEmpty((mechanicEmpNo))
                || nextServiceDate == null
                || !dateValidator.isValid(nextServiceDate.toString())
                || Helper.isDoubleNotNull(cost )
                || Helper.isNullOrEmpty(vin))
        {

            return null;
        }

        return new ServiceRecord.Builder().setServiceID(serviceID)
                .setServiceDate(serviceDate)
                .setServiceType(serviceType)
                .setCost(cost)
                .setMechanicEmpNo(mechanicEmpNo)
                .setNextServiceDate(nextServiceDate)
                .setVin(vin)
                .build();
    }
}
