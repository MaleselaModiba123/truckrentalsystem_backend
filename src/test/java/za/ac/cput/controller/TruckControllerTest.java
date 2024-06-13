package za.ac.cput.controller;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.Insurance;
import za.ac.cput.domain.Truck;
import za.ac.cput.domain.TruckType;
import za.ac.cput.factory.InsuranceFactory;
import za.ac.cput.factory.TruckFactory;
import za.ac.cput.factory.TruckTypeFactory;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotNull;
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TruckControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;
    private final String BASE_URL = "http://localhost:8080/truckrentalsystem";

    private static Truck truck;


    @BeforeEach
    public void setUp() {
        TruckType truckType = TruckTypeFactory.buildTruckType("Enclosed", "Large box truck suitable for moving large items.With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more", "7.4m * 2.48m*2.7m",
                6.3, "Manual", 5.89, "Diesel");
        ResponseEntity<TruckType> truckTypeResponse = restTemplate.postForEntity(BASE_URL + "/truckType/create", truckType, TruckType.class);
        TruckType savedTruckType = truckTypeResponse.getBody();
        assertNotNull(savedTruckType);
        Insurance insurance = InsuranceFactory.buildInsurance("Truck Insurance", "Out Surance"
                , "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft,Natural disasters", 1500);
        ResponseEntity<Insurance> insuranceResponse = restTemplate.postForEntity(BASE_URL + "/insurance/create", insurance, Insurance.class);
        Insurance savedInsurance = insuranceResponse.getBody();
        assertNotNull(savedInsurance);

        truck = TruckFactory.buildTruck("7774444", "Scania", true, "Diecast", 44, savedTruckType,
                savedInsurance);

    }
    @Test
    void a_create() {
        String url=BASE_URL+ "/truck/create";
        ResponseEntity<Truck> response = restTemplate.postForEntity(url, truck, Truck.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        Truck TruckCreated = response.getBody();
        System.out.println("Created Truck: " + TruckCreated);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/truck/read/" + truck.getVin();
        System.out.println("URL: " + url);
        ResponseEntity<Truck> response = restTemplate.getForEntity(url, Truck.class);
        System.out.println("Read: " + response.getBody());
    }

    @Test
    @Disabled
    void e_delete() {
        String url = BASE_URL + "/truck/delete/" + truck.getVin();
        System.out.println("URL:" + url);
        restTemplate.delete(url);
        System.out.println("Success: Deleted Truck");
    }

    @Test
    void c_update() {
        String url = BASE_URL + "/truck/update";
        Truck newTruck = new Truck.Builder().copy(truck).setVin("Auto general").build();
        // Create the updated Truck in the system
        ResponseEntity<Truck> createResponse = restTemplate.postForEntity(url, newTruck, Truck.class);
        assertNotNull(createResponse);
        assertNotNull(createResponse.getBody());

        // Check if the retrieved Truck matches the updated information
        Truck retrievedTruck = createResponse.getBody();
        System.out.println("Updated Truck: " + retrievedTruck);
    }

    @Test
    void d_getAll() {
        String url = BASE_URL + "/truck/getAll";
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, httpHeaders);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println("Show All: ");
        System.out.println(responseEntity);
        System.out.println(responseEntity.getBody());
    }
}