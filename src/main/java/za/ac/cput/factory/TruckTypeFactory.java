package za.ac.cput.factory;

import za.ac.cput.domain.TruckType;
import za.ac.cput.util.Helper;

public class TruckTypeFactory {
    public static TruckType buildTruckType(String typeName, String description, String dimensions,
                                           double capacity, String transmission, double fuelConsumption, String fuelType) {
        if (Helper.isNullOrEmpty(typeName)
                || Helper.isNullOrEmpty(description)
                || Helper.isNullOrEmpty(dimensions)
                || Helper.isDoubleNotValid(capacity)
                || Helper.isNullOrEmpty(transmission)
                || Helper.isDoubleNotValid(fuelConsumption)
                || Helper.isNullOrEmpty(fuelType)
                ) {
            return null;
        }
        return new TruckType.Builder()
                .setTypeName(typeName)
                .setDescription(description)
                .setDimensions(dimensions)
                .setCapacity(capacity)
                .setTransmission(transmission)
                .setFuelConsumption(fuelConsumption)
                .setFuelType(fuelType)
                .build();

    }
}
