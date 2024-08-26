package za.ac.cput.factory;

import org.springframework.stereotype.Component;
import za.ac.cput.domain.*;
import za.ac.cput.util.Helper;
@Component
public class EmployeeFactory {

    public Employee createEmployee(Name name, Contact contact, Address address, String password, Role role) {
        String employeeNumber = Helper.generateEmployeeNumber();
        return new Employee.Builder()
                .setEmployeeNumber(employeeNumber)
                .setName(name)
                .setContact(contact)
                .setAddress(address)
                .setPassword(password)
                .setRole(role)
                .build();
    }
}
