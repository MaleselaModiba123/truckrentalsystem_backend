package za.ac.cput.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.Objects;

@Entity
public class ServiceRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serviceID;
    private LocalDate serviceDate;
    private String serviceType;
    private double cost;
    private String mechinceName;
    private LocalDate nextServiceDate;
    private String vin;
    private String mechanicEmpNo;

    protected ServiceRecord(){

    }
    public ServiceRecord (Builder builder){
        this.serviceID = builder.serviceID;
        this.serviceDate = builder.serviceDate;
        this.cost = builder.cost;
        this.mechinceName = builder.mechinceName;
        this.nextServiceDate = builder.nextServiceDate;
        this.serviceType = builder.serviceType;
        this.vin = builder.vin;
        this.mechanicEmpNo = builder.mechanicEmpNo;
    }

    public int getServiceID() {
        return serviceID;
    }

    public LocalDate getServiceDate() {
        return serviceDate;
    }

    public String getServiceType() {
        return serviceType;
    }

    public double getCost() {
        return cost;
    }

    public String getMechinceName() {
        return mechinceName;
    }

    public LocalDate getNextServiceDate() {
        return nextServiceDate;
    }

    public String getVin() {
        return vin;
    }

    public String getMechanicEmpNo() {
        return mechanicEmpNo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ServiceRecord that = (ServiceRecord) o;
        return serviceID == that.serviceID && Double.compare(cost, that.cost) == 0 && Objects.equals(serviceDate, that.serviceDate) && Objects.equals(serviceType, that.serviceType) && Objects.equals(mechinceName, that.mechinceName) && Objects.equals(nextServiceDate, that.nextServiceDate) && Objects.equals(vin, that.vin) && Objects.equals(mechanicEmpNo, that.mechanicEmpNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(serviceID, serviceDate, serviceType, cost, mechinceName, nextServiceDate, vin, mechanicEmpNo);
    }

    @Override
    public String toString() {
        return "ServiceRecord{" +
                "serviceID=" + serviceID +
                ", serviceDate=" + serviceDate +
                ", serviceType='" + serviceType + '\'' +
                ", cost=" + cost +
                ", mechinceName='" + mechinceName + '\'' +
                ", nextServiceDate=" + nextServiceDate +
                ", vin='" + vin + '\'' +
                ", mechanicEmpNo='" + mechanicEmpNo + '\'' +
                '}';
    }
    public static class Builder{
        private int serviceID;
        private LocalDate serviceDate;
        private String serviceType;
        private double cost;
        private String mechinceName;
        private LocalDate nextServiceDate;
        private String vin;
        private String mechanicEmpNo;


    public Builder setServiceID(int serviceID) {
        this.serviceID = serviceID;
        return this;
    }

    public Builder setServiceDate(LocalDate serviceDate) {
        this.serviceDate = serviceDate;
        return this;
    }

    public Builder setServiceType(String serviceType) {
        this.serviceType = serviceType;
        return this;
    }

    public Builder setCost(double cost) {
        this.cost = cost;
        return this;
    }

    public Builder setMechinceName(String mechinceName) {
        this.mechinceName = mechinceName;
        return this;
    }

    public Builder setNextServiceDate(LocalDate nextServiceDate) {
        this.nextServiceDate = nextServiceDate;
        return this;
    }

    public Builder setVin(String vin) {
        this.vin = vin;
        return this;
    }

    public  Builder setMechanicEmpNo(String mechanicEmpNo) {
        this.mechanicEmpNo = mechanicEmpNo;
        return this;
    }
    public Builder copy(ServiceRecord serviceRecord) {
        this.serviceID = serviceRecord.serviceID;
        this.serviceDate = serviceRecord.serviceDate;
        this.serviceType = serviceRecord.serviceType;
        this.cost = serviceRecord.cost;
        this.mechinceName = serviceRecord.mechinceName;
        this.mechanicEmpNo = serviceRecord.mechanicEmpNo;
        this.vin = serviceRecord.vin;
        this.nextServiceDate = serviceRecord.nextServiceDate;
        return this;
    }
    public ServiceRecord build() {
        return new ServiceRecord(null);
    }
    }
}
