package za.ac.cput.factory;

import za.ac.cput.domain.Insurance;
import za.ac.cput.domain.Truck;
import za.ac.cput.domain.TruckType;
import za.ac.cput.util.Helper;
/**
 *Truck.java
 * This is Truck Domain program
 * @aurthor Ayanda Phumzile Khoza (218057172)
 * Date: 07 May 2024
 * */
public class TruckFactory {
    public static Truck buildTruck(String vin, String model, boolean availability, String licensePate,
                                   double currentMileage, TruckType truckType, Insurance insurance) {
        if (Helper.isNullOrEmpty(vin) ||
                Helper.isNullOrEmpty(model) ||
                Helper.isNullOrEmpty(licensePate) || Helper.isDoubleNotValid(currentMileage)
                || truckType == null || insurance == null) {
            return null;

        }
        return new Truck.Builder()
                .setVin(vin)
                .setModel(model)
                .setAvailability(availability)
                .setLicensePate(licensePate)
                .setCurrentMileage(currentMileage)
                .setTruckype(truckType)
                .setInsurance(insurance)
                .build();
    }

}



