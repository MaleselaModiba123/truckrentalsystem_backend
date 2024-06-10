package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Truck;
import za.ac.cput.domain.TruckType;
import za.ac.cput.factory.TruckFactory;
import za.ac.cput.factory.TruckTypeFactory;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * TruckTypeServiceTest.java
 * This is the test service class
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest
class TruckTypeServiceTest {
    @Autowired
    private TruckTypeService truckTypeService;
    private TruckType truckType = TruckTypeFactory.buildTruckType( "Enclosed", "With its ample cargo capacity, you can transport a wide range of goods, including large packages, furniture, appliances, industrial equipment, and more.", "9.43m×2.48m×3m",
            9.55, "Automatic", 5.89, "Petrol");;
    private static int generatedTruckTypeId;
//    Truck truck1 = TruckFactory.buildTruck("1FUJGBDV7PLCW1234", " Volvo VNL 760", true, "CA 652-589", 478920.50);
//    Truck truck2 = TruckFactory.buildTruck("2NPNAL0X9PC123456", "Peterbilt 579", true, "CA 652-589", 478920.50);


    @Test
    void a_create() {
        TruckType created = truckTypeService.create(truckType);
        assertNotNull(created);
        System.out.println("Created truck type: " + created);
        generatedTruckTypeId= created.getTruckTypeId();

    }

    @Test
    void b_read() {
        TruckType read = truckTypeService.read(generatedTruckTypeId);
        assertNotNull(read);
        System.out.println("Read truck type: " + read);

    }

    @Test
    @Disabled
    void d_delete() {
        truckTypeService.delete(generatedTruckTypeId);
        System.out.println("Successfully deleted truck type");
    }

    @Test
    void c_getAll() {
        System.out.println(truckTypeService.getAll());
    }
}