package za.ac.cput.controller;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.domain.TruckType;
import za.ac.cput.factory.TruckTypeFactory;

import static org.junit.jupiter.api.Assertions.*;
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TruckTypeControllerTest {
@Autowired
private static TestRestTemplate restTemplate;
    private static final String BASE_URL = "http://localhost:8080/truckrentalsystem/truckType";
    private static TruckType truckType;
    private static int generatedTruckTypeId;
    @BeforeAll
   public static void setUp() {
        truckType= TruckTypeFactory.buildTruckType("Enclosed", "Large box truck suitable for moving large items.With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more", "7.4m * 2.48m*2.7m",
                6.3, "Manual", 5.89, "Diesel");
    }

    @Test
    void a_create() {
        String url = BASE_URL + "/create";
        ResponseEntity<TruckType> response = restTemplate.postForEntity(url, truckType, TruckType.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        TruckType truckTypeCreated = response.getBody();
        generatedTruckTypeId=truckTypeCreated.getTruckTypeId();
        assertEquals(generatedTruckTypeId,response.getBody().getTruckTypeId());
        System.out.println("Created truck type: " + truckTypeCreated);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/read/" + generatedTruckTypeId;
        System.out.println("URL: " + url);
        ResponseEntity<TruckType> response = restTemplate.getForEntity(url, TruckType.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        assertEquals(generatedTruckTypeId,response.getBody().getTruckTypeId());
        System.out.println("Read: " + response.getBody());
    }

    @Test
    @Disabled
    void d_delete() {
        String url = BASE_URL + "/delete/" + truckType.getTruckTypeId();
        System.out.println("URL:" + url);
        restTemplate.delete(url);
        System.out.println("Success: Deleted truck type");
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