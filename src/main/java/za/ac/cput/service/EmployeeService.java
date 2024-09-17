package za.ac.cput.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.*;
import za.ac.cput.factory.EmployeeFactory;
import za.ac.cput.repository.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService implements IEmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeFactory employeeFactory;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, EmployeeFactory employeeFactory) {
        this.employeeRepository = employeeRepository;
        this.employeeFactory = employeeFactory;
    }

    @Override
    public Employee createEmployee(Name name, Contact contact, Address address, String password, Role role) {
        Employee employee = employeeFactory.createEmployee(name, contact, address, password, role);
        return employeeRepository.save(employee);
    }

    @Override
    public Employee read(String employeeNumber) {
        return employeeRepository.findById(employeeNumber)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found"));
    }

    @Override
    public Employee updateEmployee(String employeeNumber, Name name, Contact contact, Address address, String password, Role role) {
        Employee employee = read(employeeNumber);
        employee = new Employee.Builder()
                .setEmployeeNumber(employeeNumber)
                .setName(name)
                .setContact(contact)
                .setAddress(address)
                .setPassword(password)
                .setRole(role)
                .build();
        return employeeRepository.save(employee);
    }

    @Override
    public void delete(String employeeNumber) {
        Employee employee = read(employeeNumber);
        employeeRepository.delete(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }


    public Employee getEmployeeByEmail(String email) {
        return employeeRepository.findByContactEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found"));
    }
}
