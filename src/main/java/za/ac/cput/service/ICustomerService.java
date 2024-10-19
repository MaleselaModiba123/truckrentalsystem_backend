package za.ac.cput.service;

import za.ac.cput.domain.Customer;

import java.util.List;
import java.util.Set;


public interface ICustomerService extends IService<Customer,Integer>{

    Customer create(Customer customer);

    Customer update(Integer customerID, Customer customer);
    List<Customer> getAll();
}