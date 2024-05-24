package za.ac.cput.service;
import za.ac.cput.domain.Truck;
import java.util.Set;
/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 18 May 2024
 * */

public interface ITruckService extends IService<Truck,Integer>{

    Truck update(Truck truck);

    Set<Truck> getAll();
}
