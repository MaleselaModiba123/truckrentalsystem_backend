package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
/*  Completed By Malesela Modiba
    23 May 2024
 */
@Entity
public class ServiceRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serviceID;
    private LocalDate serviceDate;
    private String serviceType;
    private double cost;

    private LocalDate nextServiceDate;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Truck_Vin")
    private List<Truck> trucks;

    @OneToOne
    @JoinColumn(name = "Mechanic_Employee_Num")
    private Machanic machanic;
    private String mechanicEmpNo;




    protected ServiceRecord(){

    }
    public ServiceRecord (Builder builder) {
        this.serviceID = builder.serviceID;
        this.serviceDate = builder.serviceDate;
        this.cost = builder.cost;
        this.nextServiceDate = builder.nextServiceDate;
        this.serviceType = builder.serviceType;
        this.mechanicEmpNo = builder.mechanicEmpNo;
        this.trucks = builder.trucks;

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

    public LocalDate getNextServiceDate() {
        return nextServiceDate;
    }


    public String getMechanicEmpNo() {
        return mechanicEmpNo;
    }

    public List<Truck> getTrucks() {
        return trucks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ServiceRecord that = (ServiceRecord) o;
        return serviceID == that.serviceID && Double.compare(cost, that.cost) == 0 && Objects.equals(serviceDate, that.serviceDate) && Objects.equals(serviceType, that.serviceType) && Objects.equals(nextServiceDate, that.nextServiceDate)  && Objects.equals(mechanicEmpNo, that.mechanicEmpNo) && Objects.equals(trucks, that.trucks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(serviceID, serviceDate, serviceType, cost, nextServiceDate, mechanicEmpNo, trucks);
    }

    @Override
    public String toString() {
        return "ServiceRecord{" +
                "serviceID=" + serviceID +
                ", serviceDate=" + serviceDate +
                ", serviceType='" + serviceType + '\'' +
                ", cost=" + cost +
                ", nextServiceDate=" + nextServiceDate +
                ", mechanicEmpNo='" + mechanicEmpNo + '\'' +
                ", trucks=" + trucks +
                '}';
    }

    public static class Builder{
        private int serviceID;
        private LocalDate serviceDate;
        private String serviceType;
        private double cost;
        private LocalDate nextServiceDate;
        private String mechanicEmpNo;
        private List<Truck> trucks;


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

    public Builder setNextServiceDate(LocalDate nextServiceDate) {
        this.nextServiceDate = nextServiceDate;
        return this;
    }

    public  Builder setMechanicEmpNo(String mechanicEmpNo) {
        this.mechanicEmpNo = mechanicEmpNo;
        return this;
    }
        public TruckType.Builder setTrucks(List<Truck> trucks) {
            this.trucks = trucks;
            return this;
        }



        public Builder copy(ServiceRecord serviceRecord) {
        this.serviceID = serviceRecord.serviceID;
        this.serviceDate = serviceRecord.serviceDate;
        this.serviceType = serviceRecord.serviceType;
        this.cost = serviceRecord.cost;
        this.mechanicEmpNo = serviceRecord.mechanicEmpNo;

        this.nextServiceDate = serviceRecord.nextServiceDate;
        this.trucks = serviceRecord.trucks;
        return this;
    }
    public ServiceRecord build() {
        return new ServiceRecord(this);
    }
    }
}
