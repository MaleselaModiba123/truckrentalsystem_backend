package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.ContactUs;

/**
 * ContactUsRepository.java
 * This is the repository interface
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 28 August 2024
 */
@Repository
public interface ContactUsRepository extends JpaRepository<ContactUs,Integer> {
    ContactUs findByContactUsId(int findByContactUsId);
}