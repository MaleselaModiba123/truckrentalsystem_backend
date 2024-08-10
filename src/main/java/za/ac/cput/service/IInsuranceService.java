package za.ac.cput.service;

import za.ac.cput.domain.Insurance;

import java.util.List;

/**
 * IInsuranceService.java
 * This is the service interface
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
public interface IInsuranceService extends IService<Insurance, Integer> {
    Insurance update(Integer insuranceID, Insurance insurance);

    List<Insurance> getAll();
}
