package za.ac.cput.domain;
import jakarta.persistence.*;

import java.util.Objects;

/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 23 May 2024
 * */


@Entity
public class Truck {
    @Id
    private String vin;
    private String model;
    private boolean availability;
    private String licensePate;
    private double currentMileage;
    @ManyToOne
    @JoinColumn(name = "truckTypeId")
    private TruckType truckype;
    @ManyToOne
    @JoinColumn(name = "insuranceID")
    private Insurance insurance;

    protected Truck(Truck truck) {

    }

    private Truck(Builder builder) {
        this.vin = builder.vin;
        this.model = builder.model;
        this.availability = builder.availability;
        this.licensePate =builder.licensePate;
        this.currentMileage = builder.currentMileage;
        this.truckype = builder.truckype;
        this.insurance = builder.insurance;

    }

    protected Truck() {

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

    public TruckType getTruckype() {
        return truckype;
    }

    public Insurance getInsurance() {
        return insurance;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Truck truck = (Truck) o;
        return availability == truck.availability && Double.compare(currentMileage, truck.currentMileage) == 0 && Objects.equals(vin, truck.vin) && Objects.equals(model, truck.model) && Objects.equals(licensePate, truck.licensePate) && Objects.equals(truckype, truck.truckype) && Objects.equals(insurance, truck.insurance);
    }

    @Override
    public int hashCode() {
        return Objects.hash(vin, model, availability, licensePate, currentMileage, truckype, insurance);
    }

    @Override
    public String toString() {
        return "Truck{" +
                "vin='" + vin + '\'' +
                ", model='" + model + '\'' +
                ", availability=" + availability +
                ", licensePate='" + licensePate + '\'' +
                ", currentMileage=" + currentMileage +
                ", truckTypeId=" + truckype.getTruckTypeId() +
                ", insuranceId=" + insurance.getInsuranceID() +
                '}';
    }



    public static class Builder {
        private String vin;
        private String model;
        private boolean availability;
        private String licensePate;
        private double currentMileage;
        private TruckType truckype;
        private Insurance insurance;
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

        public Builder setLicensePate(String licensePate) {
            this.licensePate = licensePate;
            return this;
        }


        public Builder setCurrentMileage(double currentMileage) {
            this.currentMileage = currentMileage;
            return this;
        }

        public Builder setTruckype(TruckType truckype) {
            this.truckype = truckype;
            return this;
        }

        public Builder setInsurance(Insurance insurance) {
            this.insurance = insurance;
            return this;
        }

        public Builder copy(Truck truck) {
            this.vin = truck.vin;
            this.model = truck.model;
            this.availability = truck.availability;
            this.licensePate = truck.licensePate;
            this.truckype = truck.truckype;
            this.insurance = truck.insurance;
            return this;
        }

        public Truck build() {
            return new Truck(this);
        }
    }
}


