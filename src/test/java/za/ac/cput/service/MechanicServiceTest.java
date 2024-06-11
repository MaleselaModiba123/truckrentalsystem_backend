package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.*;
import za.ac.cput.factory.*;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * MechanicServiceTest.java
 * This is the service class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 18 May 2024
 */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest
class MechanicServiceTest {

    @Autowired
    private MechanicService   mechanicService ;
    @Autowired
    private TruckTypeService truckTypeService;

    @Autowired
    private InsuranceService insuranceService;

    @Autowired
    private TruckService truckService;
    @Autowired
    private ServiceRecordService serviceRecordService;

    private ServiceRecord serviceRecord;
    private TruckType truckType;
    private Insurance insurance;
    private Truck truck;
    private Mechanic mechanic;

    @BeforeEach
    void setUp() {
//        // Initialize and save TruckType entity
//        truckType = TruckTypeFactory.buildTruckType("Enclosed",
//                "Large box truck suitable for moving large items. With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more",
//                "7.4m * 2.48m * 2.7m", 6.3, "Manual", 5.89, "Diesel");
//        TruckType savedTruckType = truckTypeService.create(truckType);
//        assertNotNull(savedTruckType);
//
//        // Initialize and save Insurance entity
//        insurance = InsuranceFactory.buildInsurance("Truck Insurance", "Out Surance",
//                "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft, Natural disasters", 1500);
//        Insurance savedInsurance = insuranceService.create(insurance);
//        assertNotNull(savedInsurance);
//
//        // Initialize and save Truck entity
//        truck = TruckFactory.buildTruck("1FUJGBDV7PLCW1234", "Volvo VNL 760", true, "CA 652-589", 478920.50, savedTruckType, savedInsurance);
//        Truck savedTruck = truckService.create(truck);
//        assertNotNull(savedTruck);
//
//        // Initialize and save Mechanic entity
        mechanic = MechanicFactory.buildMechanic("001", "Zukhanye", "Mene", "bennie@gmail.com", "Mechanic", "Engen", true);
//        Mechanic savedMechanic = mechanicService.create(mechanic);
//        assertNotNull(savedMechanic);
//
//        // Initialize ServiceRecord entity using the saved Mechanic and Truck entities
//        serviceRecord = ServiceRecordFactory.buildServiceRecord(1,
//                "Normal Service",
//                3500.99,
//                LocalDate.of(2024, 3, 25),
//                LocalDate.of(2024, 6, 25),
//                savedMechanic, savedTruck);
//        ServiceRecord savedServiceRecord = serviceRecordService.create(serviceRecord);
//        assertNotNull(savedServiceRecord);
//
    }
    @Test
    void a_create() {
        Mechanic createdMechanic = mechanicService.create(mechanic);
        assertEquals(mechanic.getEmployeeNumber(), createdMechanic.getEmployeeNumber());
        System.out.println("Created Mechanic: " + createdMechanic);
    }

    @Test
    void b_read() {
        Mechanic read = mechanicService.read(mechanic.getEmployeeNumber());
        assertNotNull(read);
        System.out.println("Read: " + read);
    }

    @Test
    void c_update() {
        Mechanic newMechanic = new Mechanic.Builder().copy(mechanic).setAvailability(false).build();
        Mechanic updated = mechanicService.update(newMechanic);
        assertNotNull(updated);
        System.out.println(updated);
    }

    @Test
    @Disabled
    void e_delete() {
        mechanicService.delete(mechanic.getEmployeeNumber());
        System.out.println("Successfully deleted mechanic");
    }

    @Test
    void d_getAll() {
        System.out.println(mechanicService.getAll());
    }
}
