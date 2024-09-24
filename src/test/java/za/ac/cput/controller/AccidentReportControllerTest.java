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
import za.ac.cput.domain.AccidentReport;
import za.ac.cput.domain.Customer;
import za.ac.cput.domain.Truck;
import za.ac.cput.factory.AccidentReportFactory;
import za.ac.cput.repository.CustomerRepository;
import za.ac.cput.repository.TruckRepository;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AccidentReportControllerTest {
    @Autowired
    private static TestRestTemplate restTemplate;
    private static final String BASE_URL = "http://localhost:8080/truckrentalsystem/accidentReport";
    private static AccidentReport accidentReport;
    @Autowired
    private static CustomerRepository customerRepository;
    @Autowired
    private static TruckRepository truckRepository;
    private static Customer customer1;
    private static Truck truck1;

    @BeforeAll
    public static void setUp() {
        customer1 = customerRepository.findById(3245).orElseThrow();
        truck1 = truckRepository.findById("1245").orElseThrow();

        accidentReport = AccidentReportFactory.buildAccidentReport(123, LocalDate.of(2024,3,21),
                "Truck bumped into the pothole", "Durban ICC", 500.0,truck1 , customer1);
    }

    @Test
    void create() {
        String url = BASE_URL + "/create";
        ResponseEntity<AccidentReport> response = restTemplate.postForEntity(url, accidentReport, AccidentReport.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        AccidentReport accidentReportCreated = response.getBody();
        System.out.println("Created Accident Report: " + accidentReportCreated);
    }

    @Test
    void read() {
        String url = BASE_URL + "/read/" + accidentReport.getReportId();
        System.out.println("URL: " + url);
        ResponseEntity<AccidentReport> response = restTemplate.getForEntity(url, AccidentReport.class);
        System.out.println("Read Report: " + response.getBody());
    }

    @Test
    void delete() {
        String url = BASE_URL + "/delete/" + accidentReport.getReportId();
        System.out.println("URL:" + url);
        restTemplate.delete(url);
        System.out.println("Success: Report Deleted");
    }

    @Test
    void update() {
        String url = BASE_URL + "/update";
        AccidentReport newAccidentReport = new AccidentReport.Builder().copy(accidentReport).setReportId(243).build();
        ResponseEntity<AccidentReport> createResponse = restTemplate.postForEntity(url, newAccidentReport, AccidentReport.class);
        assertNotNull(createResponse);
        assertNotNull(createResponse.getBody());

        AccidentReport retrievedAccidentReport = createResponse.getBody();
        assertEquals(newAccidentReport.getReportId(), retrievedAccidentReport.getReportId());
        System.out.println("Updated AccidentReport: " + retrievedAccidentReport);
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