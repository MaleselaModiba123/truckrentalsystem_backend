package za.ac.cput.controller;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.Manager;
import za.ac.cput.factory.ManagerFactory;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 25 May 2024
 * */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ManagerControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;
    private final String BASE_URL = "http://localhost:8080/truckrentalsystem/Manager";

    private static Manager Manager;

    @BeforeAll
    public static void setUp(){
        Manager= ManagerFactory.buildManager("", 4200, 44);

    }
    @Test
    void a_create() {
        String url=BASE_URL+ "/create";
        ResponseEntity<Manager> response = restTemplate.postForEntity(url, Manager, Manager.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        Manager ManagerCreated = response.getBody();
        System.out.println("Created Manager: " + ManagerCreated);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/read/" + Manager.getEmployeeNumber();
        System.out.println("URL: " + url);
        ResponseEntity<Manager> response = restTemplate.getForEntity(url, Manager.class);
        System.out.println("Read: " + response.getBody());
    }

    @Test
    void delete() {
        String url = BASE_URL + "/delete/" + Manager.getEmployeeNumber();
        System.out.println("URL:" + url);
        restTemplate.delete(url);
        System.out.println("Success: Deleted Manager");
    }

    @Test
    void update() {
        String url = BASE_URL + "/update";
        Manager newManager = new Manager.Builder().copy(Manager).setEmployeeNumber("Auto general").build();
        ResponseEntity<Manager> createResponse = restTemplate.postForEntity(url, newManager, Manager.class);
        assertNotNull(createResponse);
        assertNotNull(createResponse.getBody());


        Manager retrievedManager = createResponse.getBody();
        assertEquals(newManager.getEmployeeNumber(), retrievedManager.getEmployeeNumber());
        System.out.println("Updated Manager: " + retrievedManager);
    }

    @Test
    void getAll() {
        String url = BASE_URL + "/getAll";
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, httpHeaders);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println("Show All: ");
        System.out.println(responseEntity);
        System.out.println(responseEntity.getBody());
    }
}