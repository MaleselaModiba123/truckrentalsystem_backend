package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Customer;

/**
 * CustomerRepository.java
 * This is the repository interface
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 03 May 2024
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {
    Customer findByEmailAndPassword(String email, String password);
}


