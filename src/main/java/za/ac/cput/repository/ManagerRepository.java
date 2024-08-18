package za.ac.cput.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import za.ac.cput.domain.Manager;
import za.ac.cput.domain.Truck;

/**
 * @aurthor Ayanda Phumzile Khoza (218057172)
 * Date: 07 May 2024
 * */

public  interface ManagerRepository extends JpaRepository<Manager, String> {
    Manager findByEmailAndPassword(String email, String password);
}



