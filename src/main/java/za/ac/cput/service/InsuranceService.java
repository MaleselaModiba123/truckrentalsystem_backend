package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Branch;
import za.ac.cput.domain.Insurance;
import za.ac.cput.repository.InsuranceRepository;

import java.util.List;

@Service
public class InsuranceService implements IInsuranceService {
    private final InsuranceRepository insuranceRepository;

    @Autowired
   public InsuranceService(InsuranceRepository insuranceRepository) {
        this.insuranceRepository = insuranceRepository;
    }

    @Override
    public Insurance create(Insurance insurance) {
        return insuranceRepository.save(insurance);
    }

    @Override
    public Insurance read(Integer insuranceID) {
        return this.insuranceRepository.findById(insuranceID).orElse(null);
    }

    @Override
    public Insurance update(Integer insuranceID, Insurance insurance) {
        Insurance existingInsurance = read(insuranceID);
        if (existingInsurance != null) {
            Insurance updatedInsurance = new Insurance.Builder()
                    .copy(existingInsurance)
                    .setInsuranceType(insurance.getInsuranceType())
                    .setProvider(insurance.getProvider())
                    .setPolicyNumber(insurance.getPolicyNumber())
                    .setEffectiveDate(insurance.getEffectiveDate())
                    .setCoverage(insurance.getCoverage())
                    .setPremium(insurance.getPremium())
                    .build();
            return insuranceRepository.save(updatedInsurance);
        }
        return null;
    }

    @Override
    public void delete(Integer insuranceID) {
        insuranceRepository.deleteById(insuranceID);
    }

    @Override
    public List<Insurance> getAll() {
        return insuranceRepository.findAll();
    }
}
