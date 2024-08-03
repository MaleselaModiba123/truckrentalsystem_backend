package za.ac.cput.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Manager;
import za.ac.cput.factory.ManagerFactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
/**
 *Truck.java
 * This is Truck Domain program
 * Ayanda Phumzile Khoza (218057172)
 * Date: 18 May 2024
 * */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest
class ManagerServiceTest {
    @Autowired
    private ManagerService ManagerService;
    private Manager manager = ManagerFactory.buildManager("13142412", "Ayanda",
            "Phumzile",
            "ayanda@gmail.com",
            "12345",
            "Manager"
            ,4200,
            6);


    @Test
    void a_create(){
        Manager createdManager = ManagerService.create(manager);
        assertEquals(createdManager.getEmployeeNumber(), createdManager.getEmployeeNumber());
        System.out.println("Created Manager " + createdManager);
    }
    @Test
    void b_read(){
        Manager read = ManagerService.read(manager.getEmployeeNumber());
        assertNotNull(read);
        System.out.println("Read: " + read);
    }
    @Test
    void b_update(){
        Manager newManager = new Manager.Builder().copy(manager).setHours(6).build();
        Manager updated = ManagerService.update(newManager);
        assertNotNull(updated);
        System.out.println(updated);
    }
    @Test
    @Disabled
    void e_delete(){
        ManagerService.delete(manager.getEmployeeNumber());
        System.out.println("Successfully deleted");
    }
    @Test
    void d_getAll(){
        System.out.println(ManagerService.getAll());
    }
}