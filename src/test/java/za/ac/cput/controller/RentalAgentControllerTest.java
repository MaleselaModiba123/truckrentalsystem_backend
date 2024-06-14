package za.ac.cput.controller;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.RentalAgent;
import za.ac.cput.factory.RentalAgentFactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RentalAgentControllerTest {
     @Autowired
     private TestRestTemplate restTemplate;
    private final String BASE_URL = "http://localhost:8080/truckrentalsystem/rentalAgent";

    private static RentalAgent rentalAgent;

    @BeforeAll
    public static void setUp() {
        rentalAgent = RentalAgentFactory.buildRentalAgent("10",
                "Malesela",
                "Modiba",
                "Modiba@gmail.com",
                "Rental Agent",750.50,
                8);
    }
    @Test
    void a_create(){
        String url = BASE_URL + "/create";
        ResponseEntity<RentalAgent> response = restTemplate.postForEntity(url,rentalAgent,RentalAgent.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        RentalAgent rentalAgentCreated = response.getBody();
        System.out.println("Create Rental Agent: " + rentalAgentCreated);
    }
    @Test
    void b_read(){
        String url = BASE_URL + "/read/" + rentalAgent.getEmployeeNumber();
        System.out.print("URL: " + url);
        ResponseEntity<RentalAgent> response = restTemplate.getForEntity(url,RentalAgent.class);
        System.out.println("Read: " + response.getBody());
    }
    @Test
    void c_update(){
        String url = BASE_URL + "/update";
        RentalAgent newRentalAgent = new RentalAgent.Builder().copy(rentalAgent).setFirstName("Skhumbuzo").build();
        ResponseEntity<RentalAgent> createResponse = restTemplate.postForEntity(url,newRentalAgent,RentalAgent.class);
        assertNotNull(createResponse);
        assertNotNull(createResponse.getBody());
        RentalAgent retrievedRentalAgent = createResponse.getBody();
        assertEquals(newRentalAgent.getEmployeeNumber(),retrievedRentalAgent.getEmployeeNumber());
        System.out.println("Updated rental Agent: "+ retrievedRentalAgent);
    }
    @Test
    @Disabled
    void e_delete(){
        String url = BASE_URL + "/delete/" + rentalAgent.getEmployeeNumber();
        System.out.println("URL: "+ url);
        restTemplate.delete(url);
        System.out.println("Successfully deleted Rental Agent");
    }
    @Test
    void d_getAll(){
        String url = BASE_URL + "/getAll";
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, httpHeaders);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println("Show All: ");
        System.out.println(responseEntity);
        System.out.println(responseEntity.getBody());
    }

}
