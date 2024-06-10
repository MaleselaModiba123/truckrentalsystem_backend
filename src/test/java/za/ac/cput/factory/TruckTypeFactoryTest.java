package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Truck;
import za.ac.cput.domain.TruckType;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

/**
 * TruckTypeFactoryTest.java
 * This is the factory test class
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
class TruckTypeFactoryTest {
//    Truck truck1 = TruckFactory.buildTruck("1FUJGBDV7PLCW1234", " Volvo VNL 760", true, "CA 652-589", 478920.50);
//    Truck truck2 = TruckFactory.buildTruck("2NPNAL0X9PC123456", "Peterbilt 579", true, "CA 652-589", 478920.50);
    @Test
    void buildTruckType() {

        TruckType truckType = TruckTypeFactory.buildTruckType("Enclosed", "Large box truck suitable for moving large items.With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more", "7.4m * 2.48m*2.7m",
                6.3, "Manual", 5.89, "Diesel");

        assertNotNull(truckType);
        System.out.println(truckType.toString());

    }

    @Test
    void buildTruckTypeFail() {
        TruckType truckType = TruckTypeFactory.buildTruckType("Enclosed", "Large box truck suitable for moving large items.With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more.", "7.4m * 2.48m*2.7m",
                6, "Manual", -5.89, "Diesel");
        assertNull(truckType);
        System.out.println(truckType.toString());
    }
}