package za.ac.cput.factory;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.*;

import java.time.LocalDate;


/**
 * RentTruckFactoryTest.java
 * This is the FactoryTest class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 03 May 2024 & 16 May 2024
 */

class RentTruckFactoryTest {
    @Test
    void testBuildRentTruck() {
        int rentId = 123;
        LocalDate rentDate = LocalDate.of(2023, 5, 1);
        LocalDate returnDate = LocalDate.of(2023, 5, 7);
        double totalCost = 500.0;
        String pickUpLocation = "WiggleCPT";
        String dropOffLocation = "WiggleKZN";
        boolean isPaymentMade = true;

        Customer customer = CustomerFactory.buildCustomer(1, "John", "Doe", "john.doe@example.com", 'A', "123456789", 1);
        Truck truck = TruckFactory.buildTruck("VIN123", "Model X", "2022", "Pickup", "Available", 5.0, 2000.0, 2.5, 10000.0);
        SalesPerson salesPerson = SalesPersonFactory.buildSalesPerson("EMP001", "Jane", "Doe", "jane.doe@example.com", 50.0, 40, "Assisted with rental");
        Branch branch = BranchFactory.buildBranch(1, "WiggleCPT", "123 Main Street, Woodstock, South Africa, 7980");

        RentTruck rentTruck = RentTruckFactory.buildRentTruck(
                rentId, rentDate, returnDate, totalCost, pickUpLocation, dropOffLocation, isPaymentMade,
                customer, truck, salesPerson, branch
        );

        Assertions.assertNotNull(rentTruck);
        Assertions.assertEquals(rentId, rentTruck.getRentId());
        Assertions.assertEquals(rentDate, rentTruck.getRentDate());
        Assertions.assertEquals(returnDate, rentTruck.getReturnDate());
        Assertions.assertEquals(totalCost, rentTruck.getTotalCost());
        Assertions.assertEquals(pickUpLocation, rentTruck.getPickUpLocation());
        Assertions.assertEquals(dropOffLocation, rentTruck.getDropOffLocation());
        Assertions.assertTrue(rentTruck.isPaymentMade());
        Assertions.assertEquals(customer, rentTruck.getCustomerID());
        Assertions.assertEquals(truck, rentTruck.getVin());
        Assertions.assertEquals(salesPerson, rentTruck.getSalesAgent());
        Assertions.assertEquals(branch, rentTruck.getBranchId());
    }
}