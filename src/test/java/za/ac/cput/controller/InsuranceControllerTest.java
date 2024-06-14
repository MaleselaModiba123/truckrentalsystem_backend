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
import za.ac.cput.factory.InsuranceFactory;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class InsuranceControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;
    private final String BASE_URL = "http://localhost:8080/truckrentalsystem/insurance";
    
    private static Insurance insurance;
    private static int generatedInsuranceId;
    
    @BeforeAll
    public static void setUp(){
        insurance= InsuranceFactory.buildInsurance( "Truck Insurance", "Out Surance"
                , "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft,Natural disasters", 1500);
    }
    @Test
    void a_create() {
        String url=BASE_URL+ "/create";
        ResponseEntity<Insurance> response = restTemplate.postForEntity(url, insurance, Insurance.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        Insurance insuranceCreated = response.getBody();
        generatedInsuranceId = insuranceCreated.getInsuranceID();
        assertEquals(generatedInsuranceId, response.getBody().getInsuranceID());
        System.out.println("Created insurance: " + insuranceCreated);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/read/" + generatedInsuranceId;
        System.out.println("URL: " + url);
        ResponseEntity<Insurance> response = restTemplate.getForEntity(url, Insurance.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        assertEquals(generatedInsuranceId, response.getBody().getInsuranceID());
        System.out.println("Read: " + response.getBody());
    }

    @Test
    @Disabled
    void e_delete() {
        String url = BASE_URL + "/delete/" + generatedInsuranceId;
        System.out.println("URL:" + url);
        restTemplate.delete(url);
        System.out.println("Success: Deleted insurance");
    }

    @Test
    void c_update() {
        String url = BASE_URL + "/update";
        Insurance newInsurance = new Insurance.Builder().copy(insurance).setInsuranceID(generatedInsuranceId).setProvider("Auto general").build();
        // Create the updated insurance in the system
        ResponseEntity<Insurance> createResponse = restTemplate.postForEntity(url, newInsurance, Insurance.class);
        assertNotNull(createResponse);
        assertNotNull(createResponse.getBody());

        // Check if the retrieved insurance matches the updated information
        Insurance retrievedInsurance = createResponse.getBody();
        assertEquals(generatedInsuranceId, retrievedInsurance.getInsuranceID());
        assertEquals("Auto general", retrievedInsurance.getProvider());
        System.out.println("Updated insurance: " + retrievedInsurance);
    }

    @Test
    void d_getAll() {
        String url = BASE_URL + "/getAll";
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, httpHeaders);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println("Show All: ");
        System.out.println(responseEntity);
        System.out.println(responseEntity.getBody());
    }
}