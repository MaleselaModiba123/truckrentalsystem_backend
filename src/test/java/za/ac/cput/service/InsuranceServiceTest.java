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
    private Insurance insurance = InsuranceFactory.buildInsurance("Truck Insurance", "Autogeneral"
            , "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft,Natural disasters", 1500);
    private static int generatedInsuranceId;
    @Test
    void a_create() {
        Insurance createdInsurance = insuranceService.create(insurance);
        assertNotNull(createdInsurance);
        //assertEquals(insurance.getInsuranceID(), createdInsurance.getInsuranceID());
        System.out.println("Created Insurance: " + createdInsurance);
        generatedInsuranceId = createdInsurance.getInsuranceID();
    }

    @Test
    void b_read() {
        Insurance read = insuranceService.read(generatedInsuranceId);
        assertNotNull(read);
        System.out.println("Read: " + read);
    }

    @Test
    void c_update() {
        // Fetch the insurance record to be updated
        Insurance insuranceToUpdate = insuranceService.read(generatedInsuranceId);
        assertNotNull(insuranceToUpdate);

        // Update the provider
        Insurance updatedInsurance = new Insurance.Builder()
                .copy(insuranceToUpdate)
                .setProvider("Budget")
                .build();

        // Save the updated insurance record
        Insurance updated = insuranceService.update(generatedInsuranceId,updatedInsurance);
        assertNotNull(updated);
        assertEquals("Budget", updated.getProvider());
        System.out.println("Updated Insurance: " + updated);
    }

    @Test
    @Disabled
    void e_delete() {
        insuranceService.delete(insurance.getInsuranceID());
        System.out.println("Successfully deleted insurance");
    }

    @Test
    void d_getAll() {
        System.out.println(insuranceService.getAll());
    }
}