//package za.ac.cput.service;
//
//import org.junit.jupiter.api.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.web.multipart.MultipartFile;
//import za.ac.cput.domain.Insurance;
//import za.ac.cput.domain.Truck;
//import za.ac.cput.domain.TruckType;
//import za.ac.cput.factory.InsuranceFactory;
//import za.ac.cput.factory.TruckFactory;
//import za.ac.cput.factory.TruckTypeFactory;
//
//import java.time.LocalDate;
//
//import static org.junit.jupiter.api.Assertions.assertNotNull;
///**
// *Truck.java
// * Ayanda Phumzile Khoza (218057172)
// * Date: 07 May 2024
// * */
//
//@TestMethodOrder(MethodOrderer.MethodName.class)
//@SpringBootTest
//class TruckServiceTest {
//
//    @Autowired
//    private TruckService truckService;
//    @Autowired
//    private TruckTypeService truckTypeService;
//
//    @Autowired
//    private InsuranceService insuranceService;
//    private Truck truck;
//    private TruckType truckType;
//    private Insurance insurance;
//    byte[] photo = new byte[0];
//    MultipartFile multipartFile = new MockMultipartFile("photo.jpg", photo);
//    @BeforeEach
//    void setUp() {
//        // Initialize and save the TruckType entity
//        truckType = TruckTypeFactory.buildTruckType("Enclosed", "Large box truck suitable for moving large items. With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more",
//                "7.4m * 2.48m * 2.7m", 6.3, "Manual", 5.89, "Diesel");
//        TruckType savedTruckType = truckTypeService.create(truckType);
//        assertNotNull(savedTruckType);
//
//        // Initialize and save the Insurance entity
//        insurance = InsuranceFactory.buildInsurance("Truck Insurance", "Out Surance",
//                "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft, Natural disasters", 1500);
//        Insurance savedInsurance = insuranceService.create(insurance);
//        assertNotNull(savedInsurance);
//
//        // Initialize the Truck entity using the saved TruckType and Insurance entities
//        truck = TruckFactory.buildTruck("7774444", "Scania", photo,true, "123455", 44, savedTruckType, savedInsurance);
//        Truck createdTruck = truckService.create(truck);
//        assertNotNull(createdTruck);
//        truck = createdTruck;  // Update the instance variable to the created truck
//    }
//
//    @Test
//    void a_create() {
//        assertNotNull(truck);
//        System.out.println("Created Truck: " + truck);
//    }
//
//    @Test
//    void b_read() {
//        Truck read = truckService.read(truck.getVin());
//        assertNotNull(read);
//        System.out.println("Read: " + read);
//    }
//
//    @Test
//    void c_update() {
//        Truck newTruck = new Truck.Builder().copy(truck).setModel("Scania").build();
//        Truck updated = truckService.update(newTruck);
//        assertNotNull(updated);
//        System.out.println(updated);
//    }
//
//    @Test
//    @Disabled
//    void e_delete() {
//        truckService.delete(truck.getVin());
//        System.out.println("Successfully deleted insurance");
//    }
//
//    @Test
//    void d_getAll() {
//        System.out.println(truckService.getAll());
//    }
//}