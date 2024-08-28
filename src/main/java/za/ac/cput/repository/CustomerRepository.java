package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    @Query("SELECT c FROM Customer c WHERE c.email = :email AND c.password = :password")
    Customer findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}


