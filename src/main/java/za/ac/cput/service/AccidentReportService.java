package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.AccidentReport;
import za.ac.cput.repository.AccidentReportRepository;

import java.util.List;

@Service
public class AccidentReportService implements IAccidentReportService {
    private AccidentReportRepository accidentReportRepository;

    @Autowired
    AccidentReportService(AccidentReportRepository accidentReportRepository){
        this.accidentReportRepository = accidentReportRepository;
    }

    @Override
    public AccidentReport create(AccidentReport accidentReport) {
        return accidentReportRepository.save(accidentReport);
    }

    @Override
    public AccidentReport read(Integer reportId) {
        return this.accidentReportRepository.findById(reportId).orElse(null);
    }

    @Override
    public void delete(Integer reportId) {
        accidentReportRepository.deleteById(reportId);

    }

    @Override
    public AccidentReport update(Integer reportId, AccidentReport reportDetails) {
        AccidentReport existingReport = read(reportId);
        if (existingReport != null) {
            AccidentReport updatedReport = new AccidentReport.Builder()
                    .copy(existingReport)
                    .setDescription(reportDetails.getDescription())
                    .setDamageCost(reportDetails.getDamageCost())
                    .build();
            return accidentReportRepository.save(updatedReport);
        }
        return null;
    }

    @Override
    public List<AccidentReport> getAll() {
        return accidentReportRepository.findAll();
    }

    public List<AccidentReport> getReportsByCustomerId(int customerId) {
        return accidentReportRepository.findByCustomerId(customerId);
    }
}
