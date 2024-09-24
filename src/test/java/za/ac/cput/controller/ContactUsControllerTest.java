package za.ac.cput.controller;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.ContactUs;
import za.ac.cput.domain.Customer;
import za.ac.cput.factory.ContactUsFactory;
import za.ac.cput.factory.CustomerFactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * ContactUsControllerTest.java
 * This is the Controller Test program
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 28 August 2024
 */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

public class ContactUsControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private final String BASE_URL = "http://localhost:8080/swiftwheelzdb/contactUs";
    private static ContactUs contactUs;

    @BeforeAll
    public static void setUp(){
      contactUs = ContactUsFactory.buildContactUs(1, "trucksystem@gmail.com", "0738372833", "Fri: 07:00 - 18:00", "8 Mandalay");
    }

    @Test
    void a_create() {
        String url = BASE_URL + "/create";
        ResponseEntity<ContactUs> response = restTemplate.postForEntity(url, contactUs, ContactUs.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        ContactUs contactUsCreated = response.getBody();
        System.out.println("Created contactUs: " + contactUsCreated);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/read/" + contactUs.getContactUsId();
        System.out.println("URL: " + url);
        ResponseEntity<ContactUs> response = restTemplate.getForEntity(url, ContactUs.class);
        assertNotNull(response);
        assertNotNull(response.getBody());
        assertEquals(contactUs.getContactUsId(), response.getBody().getContactUsId());
        System.out.println("Read: " + response.getBody());
    }

    @Test
    void c_update() {
        String url = BASE_URL + "/update";
        ContactUs newContactUs = new ContactUs.Builder().copy(contactUs).setEmail("Bennie@gmail.com").build();
        ResponseEntity<ContactUs> updateResponse = restTemplate.postForEntity(url, newContactUs, ContactUs.class);
        assertNotNull(updateResponse);
        assertNotNull(updateResponse.getBody());
        ContactUs updatedContactUs = updateResponse.getBody();
        assertEquals("Bennie@gmail.com", updatedContactUs.getEmail());
        System.out.println("Updated contactUs: " + updatedContactUs);
    }

    @Test
    @Disabled
    void e_delete() {
        String url = BASE_URL + "/delete/" + contactUs.getContactUsId();
        System.out.println("URL: " + url);
        restTemplate.delete(url);
        System.out.println("Success: Deleted contactUs");
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

