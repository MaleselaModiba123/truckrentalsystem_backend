package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.ContactUs;
import za.ac.cput.repository.ContactUsRepository;

import java.util.List;

@Service
public class ContactUsService implements IContactUsService {
    private ContactUsRepository  contactUsRepository;

    @Autowired
    ContactUsService(ContactUsRepository  contactUsRepository ) {
        this.contactUsRepository = contactUsRepository;
    }

    @Override
    public ContactUs create(ContactUs contactUs) {
        return contactUsRepository.save(contactUs);
    }

    @Override
    public ContactUs read(Integer contactUsId) {
        return this.contactUsRepository.findById(contactUsId).orElse(null);
    }

    public ContactUs update(int  contactUsId, ContactUs contactUs) {
        ContactUs existingContactUs = read(contactUsId);
        if (existingContactUs != null) {
            ContactUs updatedContactUs = new ContactUs.Builder()
                    .copy(existingContactUs)
                    .setPhone(contactUs.getPhone())
                    .setBusinessHours(contactUs.getBusinessHours())
                    .setEmail(contactUs.getEmail())
                    .setAddress(contactUs.getAddress())
                    .build();
            return contactUsRepository.save(updatedContactUs);
        }
        return null;
    }
    @Override
    public void delete(Integer contactUsId) {
        contactUsRepository.deleteById(contactUsId);
    }

    @Override
    public List<ContactUs> getAll() {
        return contactUsRepository.findAll();
    }


}