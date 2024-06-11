package za.ac.cput.service;

import za.ac.cput.domain.Customer;

import java.util.List;
import java.util.Set;

/**
 * ICustomerservice.java
 * This is the service interface
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 18 May 2024
 */

public interface ICustomerService extends IService<Customer,Integer>{

    Customer update(Customer customer);
    List<Customer> getAll();
}