package za.ac.cput.factory;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.*;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * CustomerFactoryTest.java
 * This is the factory test class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 16 May 2024
 **/
  class MechanicFactoryTest {
    private static Mechanic mechanic;
    private static TruckType truckType;
    private static Insurance insurance;
    private static Truck truck;
    private static ServiceRecord serviceRecord;
    @BeforeAll
    public static void setUp() {
//        truckType = TruckTypeFactory.buildTruckType("Enclosed", "Large box truck suitable for moving large items.With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more", "7.4m * 2.48m*2.7m",
//                6.3, "Manual", 5.89, "Diesel");
//        insurance = InsuranceFactory.buildInsurance("Truck Insurance", "Out Surance",
//                "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft,Natural disasters", 1500);
//        truck = TruckFactory.buildTruck("1FUJGBDV7PLCW1234", "Volvo VNL 760", true, "CA 652-589", 478920.50, truckType, insurance);
//
//      Mechanic tempMechanic = MechanicFactory.buildMechanic("001", "Zukhanye", "Mene", "bennie@gmail.com", "Mechanic", "Engine", true);
//
//        serviceRecord = ServiceRecordFactory.buildServiceRecord(001,
//                "Normal Service",
//                3500.99,
//                LocalDate.of(2024,3,25),
//                LocalDate.of(2024,6,25)
//                ,tempMechanic,truck);
//        // Final mechanic with updated serviceRecord
//        mechanic = tempMechanic;
////        mechanic = MechanicFactory.buildMechanic("001", "Zukhanye", "Mene", "bennie@gmail.com", "Mechanic", "Engine", true, serviceRecord);
    }
     @Test
      void buildMechanic() {
          mechanic = MechanicFactory.buildMechanic("001","Zukhanye", "Mene", "bennie@gmail.com", "Mechanic", "Engine" , true);
          assertNotNull(mechanic, "Mechanic should not be null");
          System.out.println(mechanic.toString());
      }

     @Test
     void buildMechanicWithFail() {
         mechanic = MechanicFactory.buildMechanic("001","Zukhanye", "Mene", "bennie8gmail.om", "Mechanic", "" , true);
         assertNotNull(mechanic);
         System.out.println(mechanic.toString());
    }
}



