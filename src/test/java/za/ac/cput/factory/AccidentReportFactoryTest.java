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
        Customer customer = CustomerFactory.buildCustomer( "John", "Doe", "john.doe@example.com", "12345","Code10", "123456789");


        AccidentReport accidentReport = AccidentReportFactory.buildAccidentReport(reportId, accidentDate,
                         description, location, customer);

        Assertions.assertNotNull(accidentReport);
    }
}