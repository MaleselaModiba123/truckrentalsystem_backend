package za.ac.cput.domain;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.util.Objects;

/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 23 May 2024
 * */


@MappedSuperclass
public class Truck {
    @Id
    private String vin;
    private String model;
    private boolean availability;
    private String licensePate;
    private double currentMileage;
    private int branchId;
    private int truckTypeId;


    protected Truck(Truck truck) {

    }

    private Truck(Builder builder) {
        this.vin = builder.vin;
        this.model = builder.model;
        this.availability = builder.availability;
        this.licensePate = String.valueOf(builder.licensePate);
        this.currentMileage = builder.currentMileage;
        this.branchId = builder.branchId;
        this.truckTypeId = builder.truckTypeId;


    }

    public String getVin() {
        return vin;
    }

    public String getModel() {
        return model;
    }

    public boolean isAvailability() {
        return availability;
    }

    public String getLicensePate() {
        return licensePate;
    }

    public double getCurrentMileage() {
        return currentMileage;
    }

    public int getBranchId() {
        return branchId;
    }

    public int getTruckTypeId() {
        return truckTypeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Truck truck = (Truck) o;
        return availability == truck.availability && Double.compare(currentMileage, truck.currentMileage) == 0 && branchId == truck.branchId && truckTypeId == truck.truckTypeId && Objects.equals(vin, truck.vin) && Objects.equals(model, truck.model) && Objects.equals(licensePate, truck.licensePate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(vin, model, availability, licensePate, currentMileage, branchId, truckTypeId);
    }

    public static class Builder {
        private String vin;
        private String model;
        private boolean availability;
        private double licensePate;
        private double currentMileage;
        private int branchId;
        private int truckTypeId;

        public Builder setVin(String vin) {
            this.vin = vin;
            return this;
        }

        public Builder setModel(String model) {
            this.model = model;
            return this;
        }

        public Builder setAvailability(boolean availability) {
            this.availability = availability;
            return this;
        }

        public Builder setLicensePate(double licensePate) {
            this.licensePate = licensePate;
            return this;
        }

        public Builder setBranchId(int branchId) {
            this.branchId = branchId;
            return this;
        }

        public Builder setCurrentMileage(double currentMileage) {
            this.currentMileage = currentMileage;
            return this;
        }

        public Builder setTruckTypeId(int truckTypeId) {
            this.truckTypeId = truckTypeId;
            return this;
        }

        public Builder copy(Truck truck) {
            this.vin = truck.vin;
            this.model = truck.model;
            this.availability = truck.availability;
            this.licensePate = Double.parseDouble(truck.licensePate);
            this.branchId = truck.branchId;
            this.currentMileage = truck.currentMileage;
            this.truckTypeId = truck.truckTypeId;
            return this;
        }

        public Truck build() {
            return new Truck(this);
        }
    }
}


