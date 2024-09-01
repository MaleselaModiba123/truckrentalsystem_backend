//package za.ac.cput.service;
//
//import org.junit.jupiter.api.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import za.ac.cput.domain.*;
//import za.ac.cput.factory.RentTruckFactory;
//import za.ac.cput.repository.BranchRepository;
//import za.ac.cput.repository.CustomerRepository;
//import za.ac.cput.repository.TruckRepository;
//
//import java.time.LocalDate;
//import static org.junit.jupiter.api.Assertions.*;
//
///**
// * RentTruckServiceTest.java
// * This is the ServiceTest class
// * @author Thandolwethu Zamasiba Khoza (221797289)
// * Date: 18 May 2024
// */
//
//@SpringBootTest
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//class RentTruckServiceTest {
//    @Autowired
//    private RentTruckService rentTruckService;
//    @Autowired
//    private BranchRepository branchRepository;
//    @Autowired
//    private CustomerRepository customerRepository;
//    @Autowired
//    private TruckRepository truckRepository;
//    private Customer customer1;
//    private Customer customer2;
//    private Truck truck1;
//    private Truck truck2;
//    private Branch branch1;
//    private Branch branch2;
//    private RentTruck rentTruck1;
//    private RentTruck rentTruck2;
//
//    @BeforeEach
//    void setUp() {
//        customer1 = customerRepository.findById(1).orElseThrow();
//     //   customer2 = customerRepository.findById(1).orElseThrow();
//        truck1 = truckRepository.findById("1FUJGBDV7PLCW12").orElseThrow();
//        truck2 = truckRepository.findById("7774444").orElseThrow();
//     //   rentalAgent2 = rentalAgentRepository.findById("10").orElseThrow();
//        branch1 = branchRepository.findById(371).orElseThrow();
//        branch2 = branchRepository.findById(372).orElseThrow();
//
//        rentTruck1 = RentTruckFactory.buildRentTruck(1432,
//                LocalDate.of(2024, 5, 14),
//                LocalDate.of(2024, 5, 19),
//                8006.0, true, customer1,
//                truck1,
//                branch1, branch2);
//
////        rentTruck2 = RentTruckFactory.buildRentTruck(1452,
////                LocalDate.of(2024, 4, 14),
////                LocalDate.of(2024, 5, 19),
////                17687.0, true, customer2,
////                truck2, rentalAgent2,
////                branch2, branch1);
//    }
//
//    @Order(1)
//    @Test
//    void create() {
//        RentTruck created1 = rentTruckService.create(rentTruck1);
//        assertNotNull(created1);
//        System.out.println(created1);
////
////        RentTruck created2 = rentTruckService.create(rentTruck2);
////        assertNotNull(created2);
////        System.out.println(created2);
//    }
//
//    @Order(2)
//    @Test
//    void read() {
//        RentTruck read = rentTruckService.read(rentTruck1.getRentId());
//        assertNotNull(read);
//        System.out.println(read);
//    }
//
//    @Order(3)
//    @Test
//    void update() {
//        RentTruck newRent =new RentTruck.Builder().copy(rentTruck1)
//                .setTotalCost(16790.89).build();
//        RentTruck updatedRent = rentTruckService.update(newRent);
//        assertNotNull(updatedRent);
//        System.out.println(updatedRent);
//    }
//
//    @Order(4)
//    @Test
//    @Disabled
//    void delete() {
//    }
//
//    @Order(5)
//    @Test
//    void getAll(){
//        rentTruckService.getAll();
//    }
//}