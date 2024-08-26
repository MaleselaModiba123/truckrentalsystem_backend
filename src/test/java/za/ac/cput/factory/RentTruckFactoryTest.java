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
        boolean isPaymentMade = true;
        TruckType truckType= TruckTypeFactory.buildTruckType("Enclosed", "Large box truck suitable for moving large items.With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more", "7.4m * 2.48m*2.7m",
                6.3, "Manual", 5.89, "Diesel");
        Insurance insurance=InsuranceFactory.buildInsurance("Truck Insurance", "Out Surance"
                , "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft,Natural disasters", 1500);
//        RentalAgent rentalAgent = RentalAgentFactory.buildRentalAgent("10", "Malesela", "Modiba", "Modiba@gmail.com", "Rental Agent",750.50, 8);
        Customer customer = CustomerFactory.buildCustomer( "John", "Doe", "john.doe@example.com", "12345","Code10", "123456789");
        byte[] photo = new byte[0];
        Truck truck = TruckFactory.buildTruck("VIN123", "Model X", photo,true, "NVM11263", 70.50,truckType,insurance);
        Branch pickUp = BranchFactory.buildBranch(1, "WiggleCPT", "123 Main Street, Woodstock, South Africa, 7980");
        Branch dropOff = BranchFactory.buildBranch(3, "WiggleKZN", "10 Main Street, Durban, South Africa, 7000");


        RentTruck rentTruck = RentTruckFactory.buildRentTruck(
                rentId, rentDate, returnDate, totalCost, isPaymentMade,
                customer, truck, pickUp, dropOff);

        Assertions.assertNotNull(rentTruck);
        Assertions.assertEquals(rentId, rentTruck.getRentId());
        Assertions.assertEquals(rentDate, rentTruck.getRentDate());
        Assertions.assertEquals(returnDate, rentTruck.getReturnDate());
        Assertions.assertEquals(totalCost, rentTruck.getTotalCost());
        Assertions.assertTrue(rentTruck.isPaymentMade());
        Assertions.assertEquals(customer, rentTruck.getCustomerID());
        Assertions.assertEquals(truck, rentTruck.getVin());
        Assertions.assertEquals(pickUp, rentTruck.getPickUp());
        Assertions.assertEquals(dropOff, rentTruck.getDropOff());
        System.out.println(rentTruck.toString());
    }
}