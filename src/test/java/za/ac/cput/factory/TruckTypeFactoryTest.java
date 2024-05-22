package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.TruckType;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * TruckTypeFactoryTest.java
 * This is the factory test class
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
class TruckTypeFactoryTest {

    @Test
    void buildTruckType() {
        TruckType truckType = TruckTypeFactory.buildTruckType(1, "Enclosed", "Large box truck suitable for moving large items.With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more", "7.4m * 2.48m*2.7m",
                6, "Manual", 5.89, "Diesel");
        assertNotNull(truckType);
        System.out.println(truckType);
    }

    @Test
    void buildTruckTypeFail() {
        TruckType truckType = TruckTypeFactory.buildTruckType(-1, "Enclosed", "Large box truck suitable for moving large items.With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more.", "7.4m * 2.48m*2.7m",
                6, "Manual", 5.89, "Diesel");
        assertNotNull(truckType);
        System.out.println(truckType);
    }
}