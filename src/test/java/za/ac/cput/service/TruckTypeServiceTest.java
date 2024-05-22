package za.ac.cput.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.TruckType;
import za.ac.cput.factory.TruckTypeFactory;

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
    private TruckType truckType = TruckTypeFactory.buildTruckType(2, "Enclosed", "With its ample cargo capacity, you can transport a wide range of goods, including large packages, furniture, appliances, industrial equipment, and more.", "9.43m×2.48m×3m",
            9.55, "Automatic", 5.89, "Petrol");

    @Test
    void a_create() {
        TruckType created = truckTypeService.create(truckType);
        assertNotNull(created);
        System.out.println("Created truck type: " + created);
    }

    @Test
    void b_read() {
        TruckType read = truckTypeService.read(truckType.getTruckTypeId());
        assertNotNull(read);
        System.out.println("Read :" + read);

    }

    @Test
    @Disabled
    void d_delete() {
        truckTypeService.delete(truckType.getTruckTypeId());
        System.out.println("Successfully deleted truck type");
    }

    @Test
    void c_getAll() {
        truckTypeService.getAll();
    }
}