package za.ac.cput.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Mechanic;
import za.ac.cput.factory.MechanicFactory;

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
    private Mechanic mechanic =  MechanicFactory.buildMechanic("001","Zukhanye", "Mene", "bennie@gmail.com", "Mechanic", "Engen" , true);


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
