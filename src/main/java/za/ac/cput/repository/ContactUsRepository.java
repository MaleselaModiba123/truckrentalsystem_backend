package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.ContactUs;

@Repository
public interface ContactUsRepository extends JpaRepository<ContactUs,Integer> {
}