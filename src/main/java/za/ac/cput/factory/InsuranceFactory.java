package za.ac.cput.factory;

import za.ac.cput.domain.Insurance;
import za.ac.cput.util.Helper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * InsuranceFactory.java
 * This is the factory class
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 17 May 2024
 */
public class InsuranceFactory {
    public static Insurance buildInsurance(String insuranceType, String provider, String policyNumber,
                                           LocalDate effectiveDate, String coverage, double premium) {
        if (
                Helper.isNullOrEmpty(insuranceType) ||
                Helper.isNullOrEmpty(provider) ||
                Helper.isNullOrEmpty(policyNumber) ||
                effectiveDate == null ||
                Helper.isNullOrEmpty(coverage) ||
                Helper.isDoubleNotValid(premium)) {
            return null;
        }
        return new Insurance.Builder()
                .setInsuranceType(insuranceType)
                .setProvider(provider)
                .setPolicyNumber(policyNumber)
                .setEffectiveDate(effectiveDate)
                .setCoverage(coverage)
                .setPremium(premium).build();

    }
}
