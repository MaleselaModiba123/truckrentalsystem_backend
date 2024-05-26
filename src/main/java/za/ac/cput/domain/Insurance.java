package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

/**
 * Insurance.java
 * This is the Domain program
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
@Entity
public class Insurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int insuranceID;
    private String insuranceType;
    private String provider;
    private String policyNumber;
    private LocalDate effectiveDate;
    private String coverage;
    private double premium;
    @OneToMany(mappedBy = "insurance", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Truck> trucks;

    protected Insurance() {
    }

    private Insurance(Builder builder) {
        this.insuranceID = builder.insuranceID;
        this.insuranceType = builder.insuranceType;
        this.provider = builder.provider;
        this.policyNumber = builder.policyNumber;
        this.effectiveDate = builder.effectiveDate;
        this.coverage = builder.coverage;
        this.premium = builder.premium;
        this.trucks=builder.trucks;
    }

    public int getInsuranceID() {
        return insuranceID;
    }

    public String getInsuranceType() {
        return insuranceType;
    }

    public String getProvider() {
        return provider;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public LocalDate getEffectiveDate() {
        return effectiveDate;
    }

    public String getCoverage() {
        return coverage;
    }

    public double getPremium() {
        return premium;
    }

    public List<Truck> getTrucks() {
        return trucks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Insurance insurance = (Insurance) o;
        return insuranceID == insurance.insuranceID && Double.compare(premium, insurance.premium) == 0 && Objects.equals(insuranceType, insurance.insuranceType) && Objects.equals(provider, insurance.provider) && Objects.equals(policyNumber, insurance.policyNumber) && Objects.equals(effectiveDate, insurance.effectiveDate) && Objects.equals(coverage, insurance.coverage) && Objects.equals(trucks, insurance.trucks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(insuranceID, insuranceType, provider, policyNumber, effectiveDate, coverage, premium, trucks);
    }

    @Override
    public String toString() {
        return String.format(
                "Insurance Details:\n" +
                        "Insurance ID: %s\n" +
                        "Insurance Type: %s\n" +
                        "Provider: %s\n" +
                        "Policy Number: %s\n" +
                        "Effective Date: %s\n" +
                        "Coverage: %s\n" +
                        "Premium: %s\n"+
                        "Truck: %s\n",
                insuranceID, insuranceType, provider, policyNumber, effectiveDate, coverage, premium,trucks
        );
    }

    public static class Builder {
        private int insuranceID;
        private String insuranceType;
        private String provider;
        private String policyNumber;
        private LocalDate effectiveDate;
        private String coverage;
        private double premium;
        private List<Truck> trucks;

        public Builder setInsuranceID(int insuranceID) {
            this.insuranceID = insuranceID;
            return this;
        }

        public Builder setInsuranceType(String insuranceType) {
            this.insuranceType = insuranceType;
            return this;
        }

        public Builder setProvider(String provider) {
            this.provider = provider;
            return this;
        }

        public Builder setPolicyNumber(String policyNumber) {
            this.policyNumber = policyNumber;
            return this;
        }

        public Builder setEffectiveDate(LocalDate effectiveDate) {
            this.effectiveDate = effectiveDate;
            return this;
        }

        public Builder setCoverage(String coverage) {
            this.coverage = coverage;
            return this;
        }

        public Builder setPremium(double premium) {
            this.premium = premium;
            return this;
        }

        public Builder setTrucks(List<Truck> trucks) {
            this.trucks = trucks;
            return this;
        }

        public Builder copy(Insurance insurance) {
            this.insuranceID = insurance.insuranceID;
            this.insuranceType = insurance.insuranceType;
            this.provider = insurance.provider;
            this.policyNumber = insurance.policyNumber;
            this.effectiveDate = insurance.effectiveDate;
            this.coverage = insurance.coverage;
            this.premium = insurance.premium;
            this.trucks=insurance.trucks;
            return this;
        }

        public Insurance build() {
            return new Insurance(this);
        }
    }
}
