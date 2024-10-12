package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import za.ac.cput.domain.AccidentReport;
import za.ac.cput.domain.Customer;
import za.ac.cput.repository.AccidentReportRepository;
import za.ac.cput.repository.CustomerRepository;

import java.util.List;

@Service
public class AccidentReportService implements IAccidentReportService {
    private final AccidentReportRepository accidentReportRepository;
    private final CustomerRepository customerRepository;


    @Autowired
    AccidentReportService(AccidentReportRepository accidentReportRepository, CustomerRepository customerRepository){
        this.accidentReportRepository = accidentReportRepository;
        this.customerRepository = customerRepository;
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
                    .build();
            return accidentReportRepository.save(updatedReport);
        }
        return null;
    }

    @Override
    public List<AccidentReport> getAll() {
        return accidentReportRepository.findAll();
    }

    public List<AccidentReport> getReportsByCustomerId(int customerID) {
        return accidentReportRepository.findByCustomer_CustomerID(customerID);
    }


//    public List<AccidentReport> findReportsByCustomerId(int customerId) {
//        Customer customer = customerRepository.findById(customerId)
//                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
//
//        // Fetching reports associated with the customer
//        return accidentReportRepository.findReportsByCustomerID(customer);
//    }
}
