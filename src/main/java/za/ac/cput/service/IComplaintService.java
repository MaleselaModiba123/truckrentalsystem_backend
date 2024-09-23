package za.ac.cput.service;

import za.ac.cput.domain.Complaint;
import za.ac.cput.domain.RentTruck;

import java.util.List;


public interface IComplaintService extends IService<Complaint, Integer>{
    Complaint create(Complaint complaint);

    Complaint update(Complaint complaint);
    List<Complaint> getAll();
}
