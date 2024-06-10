package za.ac.cput.controller;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.*;
import za.ac.cput.factory.RentTruckFactory;
import za.ac.cput.repository.BranchRepository;
import za.ac.cput.repository.CustomerRepository;
import za.ac.cput.repository.RentalAgentRepository;
import za.ac.cput.repository.TruckRepository;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * RentTruckControllerTest.java
 * This is the ControllerTest class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 27 May 2024
 */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RentTruckControllerTest {
    @Autowired
    private static TestRestTemplate restTemplate;
    private static final String BASE_URL = "http://localhost:8080/truckrentalsystem/rentTruck";
    private static RentTruck rentTruck;
    @Autowired
    private static BranchRepository branchRepository;
    @Autowired
    private static CustomerRepository customerRepository;
    @Autowired
    private static TruckRepository truckRepository;
    @Autowired
    private static RentalAgentRepository rentalAgentRepository;
    private static Customer customer1;
    private static Truck truck1;
    private static RentalAgent rentalAgent1;
    private static Branch branch1;

    @BeforeAll
    public static void setUp() {
        customer1 = customerRepository.findById(3245).orElseThrow();
        truck1 = truckRepository.findById("1245").orElseThrow();
        rentalAgent1 = rentalAgentRepository.findById("1234").orElseThrow();
        branch1 = branchRepository.findById(3701).orElseThrow();

        rentTruck = RentTruckFactory.buildRentTruck(1432,
                LocalDate.of(2024, 5, 14),
                LocalDate.of(2024, 5, 19),
                8006.0, true, customer1,
                truck1, rentalAgent1,
                branch1, branch1);
    }
        @Test
        void a_create () {
            String url = BASE_URL + "/create";
            ResponseEntity<RentTruck> response = restTemplate.postForEntity(url, rentTruck, RentTruck.class);
            assertNotNull(response);
            assertNotNull(response.getBody());
            RentTruck rentTruckCreated = response.getBody();
            System.out.println("Created rentTruck: " + rentTruckCreated);
        }

        @Test
        void b_read () {
            String url = BASE_URL + "/read/" + rentTruck.getRentId();
            System.out.println("URL: " + url);
            ResponseEntity<RentTruck> response = restTemplate.getForEntity(url, RentTruck.class);
            System.out.println("Read: " + response.getBody());
        }

        @Test
        @Disabled
        void e_delete () {
            String url = BASE_URL + "/delete/" + rentTruck.getRentId();
            System.out.println("URL:" + url);
            restTemplate.delete(url);
            System.out.println("Success: Deleted rentTruck");
        }

        @Test
        void c_update () {
            String url = BASE_URL + "/update";
            RentTruck newRentTruck = new RentTruck.Builder().copy(rentTruck).setRentId(243).build();
            ResponseEntity<RentTruck> createResponse = restTemplate.postForEntity(url, newRentTruck, RentTruck.class);
            assertNotNull(createResponse);
            assertNotNull(createResponse.getBody());

            RentTruck retrievedRentTruck = createResponse.getBody();
            assertEquals(newRentTruck.getRentId(), retrievedRentTruck.getRentId());
            System.out.println("Updated rentTruck: " + retrievedRentTruck);
        }

        @Test
        void d_getAll () {
            String url = BASE_URL + "/getAll";
            HttpHeaders httpHeaders = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(null, httpHeaders);
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            System.out.println("Show All: ");
            System.out.println(responseEntity);
            System.out.println(responseEntity.getBody());
        }
    }