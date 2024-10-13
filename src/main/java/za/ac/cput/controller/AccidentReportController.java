package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.AccidentReport;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.repository.AccidentReportRepository;
import za.ac.cput.service.AccidentReportService;


import java.util.List;

@CrossOrigin(origins = "*",exposedHeaders = "token")
@RestController
@RequestMapping("/accidentReport")
public class AccidentReportController {
    @Autowired
    private AccidentReportService accidentReportService;

//    @Autowired
//    private AccidentReportRepository accidentReportRepository;

    @PostMapping("/create")
    public AccidentReport create(@RequestBody AccidentReport accidentReport) {
        return accidentReportService.create(accidentReport);
    }

    @GetMapping("/read/{reportId}")
    public AccidentReport read(@PathVariable int reportId) {
        return accidentReportService.read(reportId);
    }

    @DeleteMapping("/delete/{reportId}")
    public void delete(@PathVariable int reportId) {
        accidentReportService.delete(reportId);
    }

    @PutMapping("/update/{reportId}")
    public AccidentReport update(@PathVariable int reportId, @RequestBody AccidentReport accidentReport) {
        return accidentReportService.update(reportId, accidentReport);

    }

    @GetMapping("/getAll")
    public List<AccidentReport> getAll() {
        return accidentReportService.getAll();
    }

//    @GetMapping("/getReportsByCustomerId/{customerID}")
//    public ResponseEntity<List<AccidentReport>> findReportsByCustomerId(@PathVariable int customerID) {
//        try {
//            List<AccidentReport> reports = accidentReportService.findReportsByCustomerId(customerID);
//            return ResponseEntity.ok(reports);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(null);
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body(null);
//        }
//    }
    
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<AccidentReport>> getReportsByCustomerId(@PathVariable int customerId) {
        List<AccidentReport> reports = accidentReportService.getReportsByCustomerId(customerId);
        if (reports.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reports);
    }
}
