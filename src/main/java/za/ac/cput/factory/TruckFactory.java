package za.ac.cput.factory;

import za.ac.cput.domain.Insurance;
import za.ac.cput.domain.Truck;
import za.ac.cput.domain.TruckType;
import za.ac.cput.util.Helper;

/**
 * Factory class for creating Truck instances.
 *
 * @author Ayanda Phumzile Khoza (218057172)
 * Date: 07 May 2024
 */
public class TruckFactory {

    public static Truck buildTruck(String vin, String model, byte[] photo, boolean availability, String licensePlate,
                                   double currentMileage, TruckType truckType, Insurance insurance) {
        // Default empty photo if not provided
        if (photo == null || photo.length == 0) {
            photo = new byte[0];
        }

        // Validate required fields
        if (Helper.isNullOrEmpty(vin) ||
                Helper.isNullOrEmpty(model) ||
                Helper.isNullOrEmpty(licensePlate) || Helper.isDoubleNotValid(currentMileage)
                || truckType == null || insurance == null) {
            return null;
        }

        // Create and return a new Truck object
        return new Truck.Builder()
                .setVin(vin)
                .setModel(model)
                .setPhoto(photo)
                .setAvailability(availability)
                .setLicensePlate(licensePlate)
                .setCurrentMileage(currentMileage)
                .setTruckType(truckType)
                .setInsurance(insurance)
                .build();
    }
}
