package za.ac.cput.service;

import za.ac.cput.domain.ContactUs;

import java.util.List;

public interface IContactUsService {
    ContactUs create(ContactUs contactUs);

    ContactUs read(Integer contactUsId);

    void delete(Integer contactUsId);

    List<ContactUs> getAll();
}
