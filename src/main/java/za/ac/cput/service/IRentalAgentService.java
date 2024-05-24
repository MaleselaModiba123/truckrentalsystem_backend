package za.ac.cput.service;

import za.ac.cput.domain.Insurance;
import za.ac.cput.domain.RentalAgent;

import java.util.List;
/*  Completed By Malesela Modiba
    23 May 2024
 */
public interface IRentalAgentService extends IService<RentalAgent,String> {
    RentalAgent update(RentalAgent rentalAgent);
    List<RentalAgent> getAll();
}
