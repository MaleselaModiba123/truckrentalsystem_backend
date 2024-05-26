package za.ac.cput.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.RentalAgent;
import za.ac.cput.factory.RentalAgentFactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
/*  Completed By Malesela Modiba
    23 May 2024
 */
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest
class RentalAgentServiceTest {
    @Autowired
    private RentalAgentService rentalAgentService;
    private RentalAgent rentalAgent = RentalAgentFactory.buildRentalAgent("10",
            "Malesela",
            "Modiba",
            "Modiba@gmail.com",
            750.50,
            8);

    @Test
    void a_create(){
        RentalAgent createdRentalAgent = rentalAgentService.create(rentalAgent);
        assertEquals(createdRentalAgent.getEmployeeNumber(), createdRentalAgent.getEmployeeNumber());
        System.out.println("Created RentalAgent " + createdRentalAgent);
    }
    @Test
    void b_read(){
        RentalAgent read = rentalAgentService.read(rentalAgent.getEmployeeNumber());
        assertNotNull(read);
        System.out.println("Read: " + read);
    }
    @Test
    void b_update(){
        RentalAgent newRentalAgent = new RentalAgent.Builder().copy(rentalAgent).setHours(6).build();
        RentalAgent updated = rentalAgentService.update(newRentalAgent);
        assertNotNull(updated);
        System.out.println(updated);
    }
    @Test
    @Disabled
    void e_delete(){
        rentalAgentService.delete(rentalAgent.getEmployeeNumber());
        System.out.println("Successfully deleted");
    }
    @Test
    void d_getAll(){
        System.out.println(rentalAgentService.getAll());
    }

}
