package za.ac.cput.controller;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.Complaint;
import za.ac.cput.domain.Customer;
import za.ac.cput.factory.ComplaintFactory;
import za.ac.cput.repository.CustomerRepository;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * ComplaintControllerTest.java
 * This is the ControllerTest class for Complaint
 * @Author: [Your Name]
 * Date: 27 May 2024
 */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ComplaintControllerTest {

    @Autowired
    private static TestRestTemplate restTemplate;
    private static final String BASE_URL = "http://localhost:8080/swiftWheelz/complaint";
    private static Complaint complaint;
    @Autowired
    private static CustomerRepository customerRepository;
    private static Customer customer1;

    @BeforeAll
    public static void setUp() {
        customer1 = customerRepository.findById(3245).orElseThrow();
        complaint = ComplaintFactory.buildComplaint(1234, "Damaged truck", LocalDate.of(2024, 9, 15), "Pending", "Insurance claim processing",customer1);
    }

    @Test
    void a_create() {
        String url = BASE_URL + "/create";
        ResponseEntity<Complaint> response = restTemplate.postForEntity(url, complaint, Complaint.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        Complaint createdComplaint = response.getBody();
        System.out.println("Created Complaint: " + createdComplaint);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/read/" + complaint.getComplaintId();
        System.out.println("URL: " + url);
        ResponseEntity<Complaint> response = restTemplate.getForEntity(url, Complaint.class);
        System.out.println("Read: " + response.getBody());
    }

    @Test
    @Disabled
    void e_delete() {
        String url = BASE_URL + "/delete/" + complaint.getComplaintId();
        System.out.println("URL:" + url);
        restTemplate.delete(url);
        System.out.println("Success: Deleted Complaint");
    }

    @Test
    void c_update() {
        String url = BASE_URL + "/update";
        Complaint updatedComplaint = new Complaint.Builder().copy(complaint).setDescription("Truck damage resolved").build();
        ResponseEntity<Complaint> response = restTemplate.postForEntity(url, updatedComplaint, Complaint.class);
        assertNotNull(response);
        assertNotNull(response.getBody());

        Complaint retrievedComplaint = response.getBody();
        assertEquals(updatedComplaint.getDescription(), retrievedComplaint.getDescription());
        System.out.println("Updated Complaint: " + retrievedComplaint);
    }

    @Test
    void d_getAll() {
        String url = BASE_URL + "/getAll";
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, httpHeaders);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println("Show All Complaints: ");
        System.out.println(responseEntity);
        System.out.println(responseEntity.getBody());
    }
}
