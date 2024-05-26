package za.ac.cput.service;

import org.junit.gen5.api.Test;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.ServiceRecord;
import za.ac.cput.factory.ServiceRecordFactory;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
/*  Completed By Malesela Modiba
    23 May 2024
 */
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest
class ServiceRecordServiceTest {
    @Autowired
    private ServiceRecordService serviceRecordService;
    private ServiceRecord serviceRecord = ServiceRecordFactory.buildServiceRecord(001,
            LocalDate.of(2024,3,25),
            "Normal Service",
            3500.99,
            "03",
            LocalDate.of(2024,6,25));

    @Test
    void a_create() {
        ServiceRecord createdServiceRecord = serviceRecordService.create(serviceRecord);
        assertEquals(serviceRecord.getServiceID(),createdServiceRecord.getServiceID());
        System.out.println("Created Service Record: " + createdServiceRecord);
    }
    @Test
    void b_read() {
        ServiceRecord read = serviceRecordService.read(serviceRecord.getServiceID());
        assertNotNull(read);
        System.out.println("Read: " + read);
    }
    @Test
    void c_update(){
        ServiceRecord newServiceRecord = new ServiceRecord.Builder().copy(serviceRecord).setCost(6530.50).build();
        ServiceRecord updated = serviceRecordService.update(newServiceRecord);
        assertNotNull(updated);
        System.out.println(updated);
    }
    @Test
    @Disabled
    void e_delete(){
        serviceRecordService.delete(serviceRecord.getServiceID());
        System.out.println("Successfully deleted");
    }
    @Test
    void d_getAll(){
        System.out.println(serviceRecordService.getAll());
    }
}
