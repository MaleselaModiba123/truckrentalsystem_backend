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
import za.ac.cput.domain.ServiceRecord;
import za.ac.cput.factory.ServiceRecordFactory;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
 class ServiceRecordControllerTest {
    @Autowired
    private TestRestTemplate restTemplate;
    private final String BASE_URL = "http://localhost:8080/truckrentalsystem/insurance";

    private static ServiceRecord serviceRecord;

    @BeforeAll
    public static void setUp(){
        serviceRecord = ServiceRecordFactory.buildServiceRecord(001,
                LocalDate.of(2024,3,25),
                "Normal Service",
                3500.99,
                "03",
                LocalDate.of(2024,6,25));
    }
    @Test
    void a_create(){
        String url=BASE_URL+ "/create";
        ResponseEntity<ServiceRecord> response = restTemplate.postForEntity(url, serviceRecord, ServiceRecord.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        ServiceRecord serviceRecordCreated = response.getBody();
        System.out.println("Created insurance: " + serviceRecordCreated);
    }
    @Test
    void b_read(){
        String url = BASE_URL + "/read/" + serviceRecord.getServiceID();
        System.out.println("URL: " + url);
        ResponseEntity<ServiceRecord> response = restTemplate.getForEntity(url, ServiceRecord.class);
        System.out.println("Read: " + response.getBody());
    }
    @Test
    void update() {
        String url = BASE_URL + "/update";
        ServiceRecord newServiceRecord = new ServiceRecord.Builder().copy(serviceRecord).setCost(7530.99).build();
        ResponseEntity<ServiceRecord> createResponse = restTemplate.postForEntity(url, newServiceRecord, ServiceRecord.class);
        assertNotNull(createResponse);
        assertNotNull(createResponse.getBody());
        ServiceRecord retrievedServiceRecord = createResponse.getBody();
        assertEquals(newServiceRecord.getServiceID(), retrievedServiceRecord.getServiceID());
        System.out.println("Updated insurance: " + retrievedServiceRecord);
    }
    @Test
    void delete() {
        String url = BASE_URL + "/delete/" + serviceRecord.getServiceID();
        System.out.println("URL:" + url);
        restTemplate.delete(url);
        System.out.println("Successfully Deleted ServiceRecord");
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
