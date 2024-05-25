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

    protected Truck() {

    }

    private Truck(Builder builder) {
        this.vin = builder.vin;
        this.model = builder.model;
        this.availability = builder.availability;
        this.licensePate = String.valueOf(builder.licensePate);
        this.currentMileage = builder.currentMileage;

    }

    public Integer getVin() {
        return Integer.valueOf(vin);
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Truck truck = (Truck) o;
        return availability == truck.availability && Double.compare(currentMileage, truck.currentMileage) == 0 && Objects.equals(vin, truck.vin) && Objects.equals(model, truck.model) && Objects.equals(licensePate, truck.licensePate) && Objects.equals(truckype, truck.truckype);
    }

    @Override
    public int hashCode() {
        return Objects.hash(vin, model, availability, licensePate, currentMileage);
    }

    @Override
    public String toString() {
        return "Truck{" +
                "vin='" + vin + '\'' +
                ", model='" + model + '\'' +
                ", availability=" + availability +
                ", licensePate='" + licensePate + '\'' +
                ", currentMileage=" + currentMileage +
                '}';
    }


    public static class Builder {
        private String vin;
        private String model;
        private boolean availability;
        private double licensePate;
        private double currentMileage;

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


        public Builder setCurrentMileage(double currentMileage) {
            this.currentMileage = currentMileage;
            return this;
        }


        public Builder copy(Truck truck) {
            this.vin = truck.vin;
            this.model = truck.model;
            this.availability = truck.availability;
            this.licensePate = Double.parseDouble(truck.licensePate);
            return this;
        }

        public Truck build() {
            return new Truck(this);
        }
    }
}


