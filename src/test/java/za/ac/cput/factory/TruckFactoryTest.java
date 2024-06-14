
package za.ac.cput.factory;
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Insurance;
import za.ac.cput.domain.Truck;
import za.ac.cput.domain.TruckType;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

/**
 *Truck.java
 * This is Truck Domain program
 * @aurthor Ayanda Phumzile Khoza (218057172)
 * Date: 07 May 2024
 * */


class TruckFactoryTest {

    @Test
    void createTruck() {
        TruckType truckType= TruckTypeFactory.buildTruckType("Enclosed", "Large box truck suitable for moving large items.With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more", "7.4m * 2.48m*2.7m",
                6.3, "Manual", 5.89, "Diesel");
        Insurance insurance=InsuranceFactory.buildInsurance("Truck Insurance", "Out Surance"
                , "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft,Natural disasters", 1500);
        byte[] photo = new byte[0];
        Truck createTruck = TruckFactory.buildTruck("1FUJGBDV7PLCW1234", " Volvo VNL 760",photo, true, "CA 652-589", 478920.50,truckType,insurance);
        assertNotNull(createTruck);
        System.out.println("Created: " + createTruck);
    }
}


