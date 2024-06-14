package za.ac.cput.controller;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import za.ac.cput.domain.Branch;
import za.ac.cput.factory.BranchFactory;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * BranchControllerTest.java
 * This is the ControllerTest class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 27 May 2024
 */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BranchControllerTest {
        @Autowired
        private TestRestTemplate restTemplate;
        private final String BASE_URL = "http://localhost:8080/truckrentalsystem/branch";
        private static Branch branch;

        @BeforeAll
        public static void setUp(){
            branch= BranchFactory.buildBranch(245, "WiggleCPT",
                    "10 Dorset Street, Woodstock, South Africa , 7925");
        }
        @Test
        void a_create() {
            String url=BASE_URL+ "/create";
            ResponseEntity<Branch> response = restTemplate.postForEntity(url, branch, Branch.class);
            assertNotNull(response);
            assertNotNull(response.getBody());
            Branch branchCreated = response.getBody();
            System.out.println("Created branch: " + branchCreated);
        }

        @Test
        void b_read() {
            String url = BASE_URL + "/read/" + branch.getBranchId();
            System.out.println("URL: " + url);
            ResponseEntity<Branch> response = restTemplate.getForEntity(url, Branch.class);
            System.out.println("Read: " + response.getBody());
        }

        @Test
        @Disabled
        void d_delete() {
            String url = BASE_URL + "/delete/" + branch.getBranchId();
            System.out.println("URL:" + url);
            restTemplate.delete(url);
            System.out.println("Success: Deleted branch");
        }

//        @Test
//        void update() {
//            String url = BASE_URL + "/update";
//            Branch newBranch = new Branch.Builder().copy(branch).setBranchName("WiggleKZN").build();
//            ResponseEntity<Branch> createResponse = restTemplate.postForEntity(url, newBranch, Branch.class);
//            assertNotNull(createResponse);
//            assertNotNull(createResponse.getBody());
//            Branch retrievedBranch = createResponse.getBody();
//            assertEquals(newBranch.getBranchId(), retrievedBranch.getBranchId());
//            System.out.println("Updated branch: " + retrievedBranch);
//        }

        @Test
        void c_getAll() {
            String url = BASE_URL + "/getAll";
            HttpHeaders httpHeaders = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(null, httpHeaders);
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            System.out.println("Show All: ");
            System.out.println(responseEntity);
            System.out.println(responseEntity.getBody());
        }
    }
