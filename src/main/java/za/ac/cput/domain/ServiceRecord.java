package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;
@Entity
public class ServiceRecord {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serviceID;
    private LocalDate serviceDate;
    private String serviceType;
    private double cost;

    private LocalDate nextServiceDate;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Truck_Vin",referencedColumnName = "vin")
    private Truck truck;

    protected ServiceRecord(){

    }
    public ServiceRecord (Builder builder) {
        this.serviceID = builder.serviceID;
        this.serviceType = builder.serviceType;
        this.cost = builder.cost;
        this.serviceDate = builder.serviceDate;
        this.nextServiceDate = builder.nextServiceDate;
        this.truck = builder.truck;


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


    public Truck getTruck() {
        return truck;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ServiceRecord that = (ServiceRecord) o;
        return serviceID == that.serviceID && Double.compare(cost, that.cost) == 0 && Objects.equals(serviceDate, that.serviceDate) && Objects.equals(serviceType, that.serviceType) && Objects.equals(nextServiceDate, that.nextServiceDate) && Objects.equals(truck, that.truck);
    }

    @Override
    public int hashCode() {
        return Objects.hash(serviceID, serviceDate, serviceType, cost, nextServiceDate, truck);
    }

    @Override
    public String toString() {
        return "ServiceRecord{" +
                "serviceID=" + serviceID +
                ", serviceDate=" + serviceDate +
                ", serviceType='" + serviceType + '\'' +
                ", cost=" + cost +
                ", nextServiceDate=" + nextServiceDate +
                ", truck=" + truck+
                '}';
    }

    public static class Builder{
        private int serviceID;
        private LocalDate serviceDate;
        private String serviceType;
        private double cost;
        private LocalDate nextServiceDate;
        private Truck truck;


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


        public Builder setTruck(Truck truck) {
            this.truck = truck;
            return this;
        }

        public Builder copy(ServiceRecord serviceRecord) {
            this.serviceID = serviceRecord.serviceID;
            this.cost = serviceRecord.cost;
            this.serviceDate = serviceRecord.serviceDate;
            this.serviceType = serviceRecord.serviceType;
            this.nextServiceDate = serviceRecord.nextServiceDate;
            this.truck = serviceRecord.truck;
            return this;
    }
    public ServiceRecord build() {
        return new ServiceRecord(this);
    }
    }
}
