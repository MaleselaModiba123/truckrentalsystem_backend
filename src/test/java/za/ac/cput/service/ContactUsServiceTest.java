package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.ContactUs;
import za.ac.cput.factory.ContactUsFactory;

import static org.junit.jupiter.api.Assertions.assertNotNull;


/**
 * ContactUsServiceTest.java
 * This is the service class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 28 August 2024
 */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest
class ContactUsServiceTest {

    @Autowired
    private ContactUsService  contactUsService ;

    private ContactUs contactUs;
    @BeforeEach
    void setUp(){


        contactUs = ContactUsFactory.buildContactUs(1,"trucksystem@gmail.com", "0738372833", "Fri: 07:00 - 18:00", "8 Mandalay");
        contactUs = contactUsService.create(contactUs);
        assertNotNull(contactUs, "ContactUs should be created and not null");
    }
    @Test
    void a_create() {
        assertNotNull(contactUs);
        System.out.println("Created ContactUs: " + contactUs);
    }

    @Test
    void b_read() {
        ContactUs read = contactUsService.read(contactUs.getContactUsId());
        assertNotNull(read);
        System.out.println("Read: " + read);
    }

    @Test
    void c_update() {
        Integer contactUsId = contactUs.getContactUsId();
        ContactUs newContactUs = new ContactUs.Builder().copy(contactUs).setEmail("zakes@gmail.com").build();
        ContactUs updated = contactUsService.update(contactUsId,newContactUs);
        assertNotNull(updated);
        System.out.println(updated);
    }

    @Test
    @Disabled
    void e_delete() {
        contactUsService.delete(contactUs.getContactUsId());
        System.out.println("Successfully deleted contactUs");
    }

    @Test
    void d_getAll() {
        System.out.println(contactUsService.getAll());
    }
}
