package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.ContactUs;
import za.ac.cput.service.ContactUsService;

import java.util.List;

/**
 * ContactUsController.java
 * This is the Controller program
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 28 August 2024
 */

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/contactUs")
public class ContactUsController {
    @Autowired
    private ContactUsService  contactUsService ;

    @PostMapping("/create")
    public ContactUs create(@RequestBody ContactUs contactUs){
        return contactUsService.create(contactUs);
    }
    @GetMapping("/read/{contactUsId}")
    public ContactUs read(@PathVariable int contactUsId){
        return contactUsService.read(contactUsId);
    }
    @DeleteMapping("/delete/{contactUsId}")
    public void delete(@PathVariable int contactUsId){
        contactUsService.delete(contactUsId);
    }

    @PutMapping("/update/{contactUsId}")
    public ContactUs update(@PathVariable int contactUsId, @RequestBody ContactUs contactUs) {
        return contactUsService.update(contactUsId, contactUs);

    }

    @GetMapping("/getAll")
    public List<ContactUs> getAll(){
        return contactUsService.getAll();
    }



}

