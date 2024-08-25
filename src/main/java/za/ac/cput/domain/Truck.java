package za.ac.cput.domain;
import jakarta.persistence.*;
import za.ac.cput.util.Helper;

import java.util.Arrays;
import java.util.Objects;
import java.util.UUID;

/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 23 May 2024
 * */


@Entity
public class Truck {
    @Id
    private String  vin;
    private String model;
    @Lob
    @Column(length = 10485760)
    private byte[] truckImage;
    private boolean availability;
    private String licensePlate;
    private double currentMileage;


    @ManyToOne
    @JoinColumn(name = "truckTypeId")
    private TruckType truckType;
    @ManyToOne
    @JoinColumn(name = "insuranceID")
    private Insurance insurance;


    protected Truck() {

    }

    private Truck(Builder builder) {
        this.vin = builder.vin;
        this.model = builder.model;
        this.truckImage=builder.truckImage;
        this.availability = builder.availability;
        this.licensePlate =builder.licensePlate;
        this.currentMileage = builder.currentMileage;
        this.truckType = builder.truckType;
        this.insurance = builder.insurance;

    }
    // Auto-generate VIN before saving
    @PrePersist
    protected void onCreate() {
        if (this.vin == null) {
            this.vin = Helper.generateVin();
        }
    }
    public String getVin() {
        return vin;
    }

    public String getModel() {
        return model;
    }
    public byte[] getTruckImage() {
        return truckImage;
    }

    public boolean isAvailability() {
        return availability;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public double getCurrentMileage() {
        return currentMileage;
    }



    public TruckType getTruckType() {
        return truckType;
    }

    public Insurance getInsurance() {
        return insurance;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Truck truck = (Truck) o;
        return availability == truck.availability && Double.compare(currentMileage, truck.currentMileage) == 0 && Objects.equals(vin, truck.vin) && Objects.equals(model, truck.model) && Arrays.equals(truckImage, truck.truckImage) && Objects.equals(licensePlate, truck.licensePlate) && Objects.equals(truckType, truck.truckType) && Objects.equals(insurance, truck.insurance);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(vin, model, availability, licensePlate, currentMileage, truckType, insurance);
        result = 31 * result + Arrays.hashCode(truckImage);
        return result;
    }

    @Override
    public String toString() {
        return "Truck{" +
                "vin='" + vin + '\'' +
                ", model='" + model + '\'' +
                ", truckImage=" + Arrays.toString(truckImage) +
                ", availability=" + availability +
                ", licensePlate='" + licensePlate + '\'' +
                ", currentMileage=" + currentMileage +
                ", truckType=" + truckType +
                ", insurance=" + insurance +
                '}';
    }


    public static class Builder {
        private String vin;
        private String model;
        private byte[] truckImage;
        private boolean availability;
        private String licensePlate;
        private double currentMileage;
        private TruckType truckType;
        private Insurance insurance;
        public Builder setVin(String vin) {
            this.vin = vin;
            return this;
        }

        public Builder setModel(String model) {
            this.model = model;
            return this;
        }
        public Builder setTruckImage(byte[] truckImage) {
            this.truckImage = truckImage;
            return this;
        }
        public Builder setAvailability(boolean availability) {
            this.availability = availability;
            return this;
        }

        public Builder setLicensePlate(String licensePlate) {
            this.licensePlate = licensePlate;
            return this;
        }


        public Builder setCurrentMileage(double currentMileage) {
            this.currentMileage = currentMileage;
            return this;
        }


        public Builder setTruckType(TruckType truckType) {
            this.truckType = truckType;
            return this;
        }

        public Builder setInsurance(Insurance insurance) {
            this.insurance = insurance;
            return this;
        }

        public Builder copy(Truck truck) {
            this.vin = truck.vin;
            this.model = truck.model;
            this.truckImage=truck.truckImage;
            this.availability = truck.availability;
            this.licensePlate = truck.licensePlate;
            this.truckType = truck.truckType;
            this.insurance = truck.insurance;
            return this;
        }

        public Truck build() {
            return new Truck(this);
        }
    }
}


