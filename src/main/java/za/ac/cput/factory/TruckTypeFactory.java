package za.ac.cput.factory;

import za.ac.cput.domain.TruckType;
import za.ac.cput.util.Helper;

/**
 * TruckTypeFactory.java
 * This is the factory class
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
public class TruckTypeFactory {
    public static TruckType buildTruckType(int truckTypeId, String typeName, String description, String dimensions,
                                           double capacity, String transmission, double fuelConsumption, String fuelType) {
        if (Helper.isIntNotValid(truckTypeId) || Helper.isNullOrEmpty(typeName) || Helper.isNullOrEmpty(description)
                || Helper.isNullOrEmpty(dimensions) || Helper.isDoubleNotNull(capacity) || Helper.isNullOrEmpty(transmission) ||
                Helper.isDoubleNotNull(fuelConsumption) || Helper.isNullOrEmpty(fuelType)) {
            return null;
        }
        return new TruckType.Builder().setTruckTypeId(truckTypeId)
                .setTypeName(typeName)
                .setDescription(description)
                .setDimensions(dimensions)
                .setCapacity(capacity)
                .setTransmission(transmission)
                .setFuelConsumption(fuelConsumption)
                .setFuelType(fuelType).build();
    }
}
