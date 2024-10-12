package za.ac.cput.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.*;
import za.ac.cput.factory.EmployeeFactory;
import za.ac.cput.repository.EmployeeRepository;
import za.ac.cput.service.jwt.JwtService;

import java.util.List;

@Service
public class EmployeeService implements IEmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeFactory employeeFactory;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, EmployeeFactory employeeFactory, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.employeeRepository = employeeRepository;
        this.employeeFactory = employeeFactory;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Employee createEmployee(Name name, Contact contact, Address address, String password, Role role) {
        String encodedPassword = passwordEncoder.encode(password);
        Employee employee = employeeFactory.createEmployee(name, contact, address, encodedPassword, role);
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
        // If a new password is provided, encrypt it; otherwise, retain the existing password
        String encodedPassword = (password != null && !password.isEmpty()) ? passwordEncoder.encode(password) : employee.getPassword();

        employee = new Employee.Builder()
                .copy(employee)
                .setName(name)
                .setContact(contact)
                .setAddress(address)
                .setPassword(encodedPassword)
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
        Employee employee = employeeRepository.findByContactEmail(email);
        if (employee == null) {
            throw new EntityNotFoundException("Employee not found for email: " + email);
        }
        return employee;
    }


    public String authenticateEmpUser(Employee employee) {
        System.out.println("Attempting to authenticate user: " + employee.getContact().getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(employee.getContact().getEmail(), employee.getPassword())
        );

        if (authentication.isAuthenticated()) {
            System.out.println("Attempting to authenticate user again: " + employee.getContact().getEmail() + "Password: " + employee.getPassword());

            return jwtService.generateToken(employee.getContact().getEmail());
    }

        return "Failed to log in";
    }

}
