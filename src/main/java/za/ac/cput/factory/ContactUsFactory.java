package za.ac.cput.factory;

import za.ac.cput.domain.ContactUs;
import za.ac.cput.util.Helper;


/**
 * ContactUsFactory.java
 * This is the Factory class
 * @author Zukhanye Anele Mene (219404275)
 * Date: 28 August 2024
 */
public class ContactUsFactory {
    public static ContactUs buildContactUs( int contactUsId, String email, String phone, String businessHours, String address) {
        if (    Helper.isIntNotValid(contactUsId) ||
                !Helper.isValidEmail(email) ||
                Helper.isNullOrEmpty(phone)||
                Helper.isNullOrEmpty(businessHours)||
                Helper.isValidAddress(address)) {
            return null;
        }

        return new ContactUs.Builder()
                .setContactUsId(contactUsId)
                .setEmail(email)
                .setPhone(phone)
                .setBusinessHours(businessHours)
                .setAddress(address)
                .build();

    }
}