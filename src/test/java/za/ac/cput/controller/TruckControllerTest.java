package za.ac.cput.controller;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.Truck;
import za.ac.cput.factory.TruckFactory;
/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 25 May 2024
 * */

import static org.junit.jupiter.api.Assertions.*;
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TruckControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;
    private final String BASE_URL = "http://localhost:8080/truckrentalsystem/Truck";

    private static Truck Truck;

    @BeforeAll
    public static void setUp(){
        Truck= TruckFactory.buildTruck("7774444", "Scania",true,"Diecast",44);

    }
    @Test
    void a_create() {
        String url=BASE_URL+ "/create";
        ResponseEntity<Truck> response = restTemplate.postForEntity(url, Truck, Truck.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        Truck TruckCreated = response.getBody();
        System.out.println("Created Truck: " + TruckCreated);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/read/" + Truck.getVin();
        System.out.println("URL: " + url);
        ResponseEntity<Truck> response = restTemplate.getForEntity(url, Truck.class);
//        assertEquals(Truck.getTruckID(), response.getBody().getTruckID());
        System.out.println("Read: " + response.getBody());
    }

    @Test
    void delete() {
        String url = BASE_URL + "/delete/" + Truck.getVin();
        System.out.println("URL:" + url);
        restTemplate.delete(url);
        System.out.println("Success: Deleted Truck");
    }

    @Test
    void update() {
        String url = BASE_URL + "/update";
        Truck newTruck = new Truck.Builder().copy(Truck).setVin("Auto general").build();
        // Create the updated Truck in the system
        ResponseEntity<Truck> createResponse = restTemplate.postForEntity(url, newTruck, Truck.class);
        assertNotNull(createResponse);
        assertNotNull(createResponse.getBody());

        // Check if the retrieved Truck matches the updated information
        Truck retrievedTruck = createResponse.getBody();
        assertEquals(newTruck.getVin(), retrievedTruck.getVin());
        System.out.println("Updated Truck: " + retrievedTruck);
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