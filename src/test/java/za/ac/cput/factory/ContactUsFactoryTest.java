package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.ContactUs;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * ContactUsFactoryTest.java
 * This is the factory test class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 28 August 2024
 */
class ContactUsFactoryTest {
     @Test
    void buildContactUs() {
        ContactUs contactUs = ContactUsFactory.buildContactUs(1, "bennie@gmail.com", "0738372833",
                "Fri: 07:00 - 18:00", "8 Mandalay");
        assertNotNull(contactUs);
        System.out.println(contactUs.toString());
    }

    @Test
    void buildContactUsWithFail() {
        ContactUs contactUs = ContactUsFactory.buildContactUs( 1,"benniegmail.om", "084746686",
                "Fri: 07:00 - 18:00", "8 Mandalay");
        assertNotNull(contactUs);
        System.out.println(contactUs.toString());
    }
}
