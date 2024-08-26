package za.ac.cput.service;

import za.ac.cput.domain.*;

import java.util.List;

public interface IEmployeeService extends IService<Employee,String>{
    Employee createEmployee(Name name, Contact contact, Address address, String password, Role role);
    Employee updateEmployee(String employeeNumber, Name name, Contact contact, Address address, String password, Role role);
    List<Employee> getAllEmployees();


}
