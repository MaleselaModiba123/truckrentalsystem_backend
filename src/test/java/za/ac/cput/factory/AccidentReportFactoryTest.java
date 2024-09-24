package za.ac.cput.factory;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.*;

import java.time.LocalDate;


class AccidentReportFactoryTest {

    @Test
    void buildAccidentReport() {
        int reportId = 123;
        LocalDate accidentDate = LocalDate.of(2024, 9, 18);
        String description = ("A truck bumped into a pothole");
        String location = ("Umlazi, Durban");
        double damageCost = 500.0;
        byte[] photo = new byte[0];
        Customer customer = CustomerFactory.buildCustomer( "John", "Doe", "john.doe@example.com", "12345","Code10", "123456789");
        TruckType truckType= TruckTypeFactory.buildTruckType("Enclosed", "Large box truck suitable for moving large items.With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more", "7.4m * 2.48m*2.7m",
                6.3, "Manual", 5.89, "Diesel");
        Insurance insurance=InsuranceFactory.buildInsurance("Truck Insurance", "Out Surance"
                , "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft,Natural disasters", 1500);
        Truck truck = TruckFactory.buildTruck("VIN123", "Model X", photo,true, "NVM11263", 70.50,truckType,insurance);

        AccidentReport accidentReport = AccidentReportFactory.buildAccidentReport(reportId, accidentDate,
                         description, location, damageCost, truck, customer);

        Assertions.assertNotNull(accidentReport);
    }
}