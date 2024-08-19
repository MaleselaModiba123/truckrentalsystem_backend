//package za.ac.cput.service;
//
//import org.junit.jupiter.api.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.web.multipart.MultipartFile;
//import za.ac.cput.domain.*;
//import za.ac.cput.factory.*;
//
//import java.time.LocalDate;
//
//import static org.junit.jupiter.api.Assertions.assertNotNull;
///*  Completed By Malesela Modiba
//    23 May 2024
// */
//
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//@SpringBootTest
//class ServiceRecordServiceTest {
//    @Autowired
//    private ServiceRecordService serviceRecordService;
//
//    @Autowired
//    private TruckTypeService truckTypeService;
//
//    @Autowired
//    private InsuranceService insuranceService;
//
//    @Autowired
//    private TruckService truckService;
//
//    @Autowired
//    private MechanicService mechanicService;
//
//    private TruckType truckType;
//    private Insurance insurance;
//    private Truck truck;
//    private Mechanic mechanic;
//    private ServiceRecord serviceRecord;
//    @BeforeEach
//    void setUp() {
//        // Initialize and save TruckType entity
//        truckType = TruckTypeFactory.buildTruckType("Enclosed",
//                "Large box truck suitable for moving large items. With its higher payload capacity, you can transport a wide range of items, including large packages, bulky equipment, furniture, appliances, and more",
//                "7.4m * 2.48m * 2.7m", 6.3, "Manual", 5.89, "Diesel");
//        TruckType savedTruckType = truckTypeService.create(truckType);
//        assertNotNull(savedTruckType);
//
//        // Initialize and save Insurance entity
//        insurance = InsuranceFactory.buildInsurance("Truck Insurance", "Out Surance",
//                "POL-12345", LocalDate.of(2024, 4, 24), "Truck damage or theft, Natural disasters", 1500);
//        Insurance savedInsurance = insuranceService.create(insurance);
//        assertNotNull(savedInsurance);
//
//        // Initialize and save Truck entity
//        byte[] photo = new byte[0];
//        MultipartFile multipartFile = new MockMultipartFile("photo.jpg", photo);
//        truck = TruckFactory.buildTruck("1FUJGBDV7PLCW12", "Volvo VNL 760", photo,true, "CA 652-589", 478920.50, savedTruckType, savedInsurance);
//        Truck savedTruck = truckService.create(truck);
//        assertNotNull(savedTruck);
//
//        // Initialize and save Mechanic entity
//        mechanic = MechanicFactory.buildMechanic("001", "Zukhanye", "Mene", "bennie@gmail.com", "Mechanic", "Engen", true);
//        Mechanic savedMechanic = mechanicService.create(mechanic);
//        assertNotNull(savedMechanic);
//
//        // Initialize ServiceRecord entity
//        serviceRecord = ServiceRecordFactory.buildServiceRecord(1,
//                "Normal Service",
//                3500.99,
//                LocalDate.of(2024, 3, 25),
//                LocalDate.of(2024, 6, 25),
//                savedMechanic, savedTruck);
//    }
//
//
//    @Test
//    @Order(1)
//    void create() {
//        ServiceRecord createdServiceRecord = serviceRecordService.create(serviceRecord);
//        assertNotNull(createdServiceRecord, "ServiceRecord should be created and not null");
//        System.out.println("Created Service Record: " + createdServiceRecord);
//    }
//
//    @Test
//    @Order(2)
//    void read() {
//        ServiceRecord read = serviceRecordService.read(serviceRecord.getServiceID());
//        assertNotNull(read,"ServiceRecord should be read and not null");
//        System.out.println("Read: " + read);
//    }
//
//
//    @Test
//    @Order(3)
//    void update(){
//        ServiceRecord newServiceRecord = new ServiceRecord.Builder().copy(serviceRecord).setCost(6530.50).build();
//        ServiceRecord updated = serviceRecordService.update(newServiceRecord);
//        assertNotNull(updated,"ServiceRecord should be updated and not null");
//        System.out.println(updated);
//    }
//
//    @Test
//    @Order(5)
//    @Disabled
//    void delete(){
//        serviceRecordService.delete(serviceRecord.getServiceID());
//        System.out.println("Successfully deleted");
//    }
//
//    @Test
//    @Order(4)
//    void getAll(){
//        System.out.println(serviceRecordService.getAll());
//    }
//
//}