package za.ac.cput.controller;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.Mechanic;
import za.ac.cput.factory.MechanicFactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.*;

/**
 * MechanicControllerTest.java
 * This is the Mechanic Controller Test program
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 25 May 2024
 */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MechanicControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private final String BASE_URL = "http://localhost:8080/truckrentalsystem/mechanic";
    private static Mechanic mechanic;

    @BeforeAll
    public static void setUp(){
        mechanic = MechanicFactory.buildMechanic("001", "Sane", "Leroy", "leroysane@gmail.com", "Mechanic", "Engine", true);
    }

    @Test
    void a_create() {
        String url = BASE_URL + "/create";
        ResponseEntity<Mechanic> response = restTemplate.postForEntity(url, mechanic, Mechanic.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        Mechanic mechanicCreated = response.getBody();
        System.out.println("Created mechanic: " + mechanicCreated);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/read/" + mechanic.getEmployeeNumber();
        System.out.println("URL: " + url);
        ResponseEntity<Mechanic> response = restTemplate.getForEntity(url, Mechanic.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        assertEquals(mechanic.getEmployeeNumber(), response.getBody().getEmployeeNumber());
        System.out.println("Read: " + response.getBody());
    }

    @Test
    void c_update() {
        String url = BASE_URL + "/update";
        Mechanic newMechanic = new Mechanic.Builder().copy(mechanic).setAvailability(false).build();

        ResponseEntity<Mechanic> updateResponse = restTemplate.postForEntity(url, newMechanic, Mechanic.class);
        assertNotNull(updateResponse);
        assertNotNull(updateResponse.getBody());

        Mechanic updatedMechanic = updateResponse.getBody();
        assertEquals(newMechanic.getEmployeeNumber(), updatedMechanic.getEmployeeNumber());
        System.out.println("Updated mechanic: " + updatedMechanic);
    }

    @Test
    void d_delete() {
        String url = BASE_URL + "/delete/" + mechanic.getEmployeeNumber();
        System.out.println("URL: " + url);
        restTemplate.delete(url);
        System.out.println("Success: Deleted mechanic");
    }

    @Test
    void e_getAll() {
        String url = BASE_URL + "/getAll";
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, httpHeaders);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println("Show All: ");
        System.out.println(responseEntity);
        System.out.println(responseEntity.getBody());
    }
}