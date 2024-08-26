package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Customer;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * CustomerFactoryTest.java
 * This is the factory test class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 03 May 2024
 */
class CustomerFactoryTest {
//   RentalAgent rentalAgent = RentalAgentFactory.buildRentalAgent("10", "Malesela", "Modiba", "Modiba@gmail.com", "Rental Agent",750.50, 8);
    @Test
    void buildCustomer() {
        Customer customer = CustomerFactory.buildCustomer( "Zukhanye", "Mene",
                "bennie@gmail.com", "12345","Code 10" , "0847466836");
        assertNotNull(customer);
        System.out.println(customer.toString());
    }

    @Test
    void buildCustomerWithFail() {
        Customer customer = CustomerFactory.buildCustomer( "", "Mennne",
                "bennie@gmail.om", "12345","" , "084746686" );
        assertNotNull(customer);
        System.out.println(customer.toString());
    }
}


