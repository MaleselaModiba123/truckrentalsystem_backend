package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Employee;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    @Query("SELECT e FROM Employee e WHERE e.contact.email = :email AND e.password = :password")
    Optional<Employee> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    Optional<Employee> findByContactEmail(String email);
}