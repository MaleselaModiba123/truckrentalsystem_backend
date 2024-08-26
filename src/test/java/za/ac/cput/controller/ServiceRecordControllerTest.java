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
import za.ac.cput.factory.*;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
 class ServiceRecordControllerTest {
    @Autowired
    private TestRestTemplate restTemplate;
    private final String BASE_URL = "http://localhost:8080/truckrentalsystem";

    private static ServiceRecord serviceRecord;


    @BeforeEach
    public void setUp() {
        // Create and save TruckType
        TruckType truckType = TruckTypeFactory.buildTruckType(
                "Enclosed",
                "Large box truck suitable for moving large items. With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more",
                "7.4m * 2.48m*2.7m",
                6.3,
                "Manual",
                5.89,
                "Diesel"
        );
        ResponseEntity<TruckType> truckTypeResponse = restTemplate.postForEntity(BASE_URL + "/truckType/create", truckType, TruckType.class);
        TruckType savedTruckType = truckTypeResponse.getBody();
        assertNotNull(savedTruckType);

        // Create and save Insurance
        Insurance insurance = InsuranceFactory.buildInsurance(
                "Truck Insurance",
                "Out Surance",
                "POL-12345",
                LocalDate.of(2024, 4, 24),
                "Truck damage or theft, Natural disasters",
                1500
        );
        ResponseEntity<Insurance> insuranceResponse = restTemplate.postForEntity(BASE_URL + "/insurance/create", insurance, Insurance.class);
        Insurance savedInsurance = insuranceResponse.getBody();
        assertNotNull(savedInsurance);


        // Create Truck using saved TruckType and Insurance
        byte[] photo = new byte[0];
        Truck truck = TruckFactory.buildTruck(
                "1FUJGBDV7PLCW12",
                "Volvo VNL 760",
                photo,
                true,
                "CA 652-589",
                478920.50,
                savedTruckType,
                savedInsurance
        );
        ResponseEntity<Truck> truckResponse = restTemplate.postForEntity(BASE_URL + "/truck/create", truck, Truck.class);
        Truck savedTruck = truckResponse.getBody();
        assertNotNull(savedTruck);
        assertNotNull(savedTruck.getVin()); // Ensure the ID is generated

        // Create ServiceRecord using the saved entities
        serviceRecord = ServiceRecordFactory.buildServiceRecord(
                1,
                "Normal Service",
                3500.99,
                LocalDate.of(2024, 3, 25),
                LocalDate.of(2024, 6, 25),
                savedTruck
        );



    }
    @Test
    void a_create(){
        String url=BASE_URL+ "/service_record/create";
        ResponseEntity<ServiceRecord> response = restTemplate.postForEntity(url, serviceRecord, ServiceRecord.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        ServiceRecord serviceRecordCreated = response.getBody();
        System.out.println("Created insurance: " + serviceRecordCreated);
    }
    @Test
    void b_read(){
        String url = BASE_URL + "/service_record/read/" + serviceRecord.getServiceID();
        System.out.println("URL: " + url);
        ResponseEntity<ServiceRecord> response = restTemplate.getForEntity(url, ServiceRecord.class);
        System.out.println("Read: " + response.getBody());
    }
    @Test
    void c_update() {
        String url = BASE_URL + "/update";
        ServiceRecord newServiceRecord = new ServiceRecord.Builder().copy(serviceRecord).setCost(7530.99).build();
        ResponseEntity<ServiceRecord> createResponse = restTemplate.postForEntity(url, newServiceRecord, ServiceRecord.class);
        assertNotNull(createResponse);
        assertNotNull(createResponse.getBody());
        ServiceRecord retrievedServiceRecord = createResponse.getBody();
        System.out.println("Updated insurance: " + retrievedServiceRecord);
    }
    @Test
    @Disabled
    void e_delete() {
        String url = BASE_URL + "/service_record/delete/" + serviceRecord.getServiceID();
        System.out.println("URL:" + url);
        restTemplate.delete(url);
        System.out.println("Successfully Deleted ServiceRecord");
    }
    @Test
    void d_getAll() {
        String url = BASE_URL + "/service_record/getAll";
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, httpHeaders);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println("Show All: ");
        System.out.println(responseEntity);
        System.out.println(responseEntity.getBody());
    }

}
