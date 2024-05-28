package za.ac.cput.service;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Truck;
import za.ac.cput.factory.TruckFactory;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
/**
 *Truck.java
 * Ayanda Phumzile Khoza (218057172)
 * Date: 07 May 2024
 * */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest
class TruckServiceTest {

    @Autowired
    private TruckService truckService;
    private Truck truck = TruckFactory.buildTruck("7774444", "Scania", true
            , "123455",44);

    @Test
    void a_create() {
        Truck createdTruck = truckService.create(truck);
        assertEquals(truck.getModel(), createdTruck.getModel());
        System.out.println("Created Truck: " + createdTruck);
    }

    @Test
    void b_read() {
        Truck read = truckService.read(truck.getVin());
        assertNotNull(read);
        System.out.println("Read: " + read);
    }

    @Test
    void c_update() {
        Truck newTruck = new Truck.Builder().copy(truck).setModel("Scania").build();
        Truck updated = truckService.update(newTruck);
        assertNotNull(updated);
        System.out.println(updated);
    }

    @Test
    @Disabled
    void e_delete() {
        truckService.delete(truck.getVin());
        System.out.println("Successfully deleted insurance");
    }

    @Test
    void d_getAll() {
        System.out.println(truckService.getAll());
    }
}