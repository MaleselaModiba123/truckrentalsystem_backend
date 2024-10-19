package za.ac.cput.service;

import za.ac.cput.domain.Insurance;

import java.util.List;

public interface IInsuranceService extends IService<Insurance, Integer> {
    Insurance update(Integer insuranceID, Insurance insurance);

    Insurance create(Insurance insurance);

    List<Insurance> getAll();
}
