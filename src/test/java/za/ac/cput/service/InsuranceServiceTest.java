package za.ac.cput.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Insurance;
import za.ac.cput.factory.InsuranceFactory;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * InsuranceServiceTest.java
 * This is the test service class
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest
class InsuranceServiceTest {

    @Autowired
    private InsuranceService insuranceService;
    private Insurance insurance = InsuranceFactory.buildInsurance(1, "Truck Insurance", "Out Surance"
            , "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft,Natural disasters", 1500);

    @Test
    void a_create() {
        Insurance createdInsurance = insuranceService.create(insurance);
        assertEquals(insurance.getInsuranceID(), createdInsurance.getInsuranceID());
        System.out.println("Created Insurance: " + createdInsurance);
    }

    @Test
    void b_read() {
        Insurance read = insuranceService.read(insurance.getInsuranceID());
        assertNotNull(read);
        System.out.println("Read: " + read);
    }

    @Test
    void c_update() {
        Insurance newInsurance = new Insurance.Builder().copy(insurance).setProvider("MiWay").build();
        Insurance updated = insuranceService.update(newInsurance);
        assertNotNull(updated);
        System.out.println(updated);
    }

    @Test
    @Disabled
    void e_delete() {
        insuranceService.delete(insurance.getInsuranceID());
        System.out.println("Successfully deleted insurance");
    }

    @Test
    void d_getAll() {
        insuranceService.getAll();
    }
}