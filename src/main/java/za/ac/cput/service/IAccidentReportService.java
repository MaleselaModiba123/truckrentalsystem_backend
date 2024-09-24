package za.ac.cput.service;

import za.ac.cput.domain.AccidentReport;

import java.util.List;

public interface IAccidentReportService extends IService<AccidentReport, Integer>{
    AccidentReport create(AccidentReport accidentReport);
    AccidentReport update(Integer reportId, AccidentReport accidentReport);
    List<AccidentReport> getAll();
}
