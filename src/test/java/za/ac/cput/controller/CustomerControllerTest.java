package za.ac.cput.controller;



import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.Customer;
import za.ac.cput.domain.RentalAgent;
import za.ac.cput.factory.CustomerFactory;
import za.ac.cput.factory.RentalAgentFactory;


import static org.junit.jupiter.api.Assertions.*;

/**
 * CustomerControllerTest.java
 * This is the Mechanic Controller Test program
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 25 May 2024
 */
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CustomerControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private final String BASE_URL = "http://localhost:8080/truckrentalsystem/customer";
    private static Customer customer;

    @BeforeAll
    public static void setUp(){
        RentalAgent rentalAgent = RentalAgentFactory.buildRentalAgent("10", "Asi", "Mbende", "asi@gmail.com", "Rental Agent", 750.50, 8);
        customer = CustomerFactory.buildCustomer(2, "Zilungile", "Mbende", "zishe@gmail.com", "Code 10", "0846775027", rentalAgent);
    }

    @Test
    void a_create() {
        String url = BASE_URL + "/create";
        ResponseEntity<Customer> response = restTemplate.postForEntity(url, customer, Customer.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        Customer customerCreated = response.getBody();
        System.out.println("Created customer: " + customerCreated);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/read/" + customer.getCustomerID();
        System.out.println("URL: " + url);
        ResponseEntity<Customer> response = restTemplate.getForEntity(url, Customer.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        assertEquals(customer.getCustomerID(), response.getBody().getCustomerID());
        System.out.println("Read: " + response.getBody());
    }

    @Test
    void c_update() {
        String url = BASE_URL + "/update";
        Customer newCustomer = new Customer.Builder().copy(customer).setFirstName("Bennie").build();
        ResponseEntity<Customer> updateResponse = restTemplate.postForEntity(url, newCustomer, Customer.class);
        assertNotNull(updateResponse);
        assertNotNull(updateResponse.getBody());
        Customer updatedCustomer = updateResponse.getBody();
        assertEquals("Bennie", updatedCustomer.getFirstName());
        System.out.println("Updated customer: " + updatedCustomer);
    }

    @Test
    @Disabled
    void e_delete() {
        String url = BASE_URL + "/delete/" + customer.getCustomerID();
        System.out.println("URL: " + url);
        restTemplate.delete(url);
        System.out.println("Success: Deleted customer");
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