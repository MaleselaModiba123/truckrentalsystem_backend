package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

/**
 * TruckType.java
 * This is the Domain program
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
@Entity
public class TruckType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int truckTypeId;
    private String typeName;
    private  String description;
    private String dimensions; //Length*Width*Height in meters
    private double capacity; // tons
    private String transmission;
    private double fuelConsumption; // km per liter
    private String fuelType;

    @OneToMany(mappedBy = "truckType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Truck> trucks;

    protected TruckType() {
    }

    private TruckType(Builder builder) {
        this.truckTypeId=builder.truckTypeId;
        this.typeName=builder.typeName;
        this.description=builder.description;
        this.dimensions=builder.dimensions;
        this.capacity=builder.capacity;
        this.transmission=builder.transmission;
        this.fuelConsumption=builder.fuelConsumption;
        this.fuelType=builder.fuelType;
        this.trucks=builder.trucks;
    }

    public int getTruckTypeId() {
        return truckTypeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public String getDescription() {
        return description;
    }

    public String getDimensions() {
        return dimensions;
    }

    public double getCapacity() {
        return capacity;
    }

    public String getTransmission() {
        return transmission;
    }

    public double getFuelConsumption() {
        return fuelConsumption;
    }

    public String getFuelType() {
        return fuelType;
    }

    public List<Truck> getTrucks() {
        return trucks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TruckType truckType = (TruckType) o;
        return truckTypeId == truckType.truckTypeId && Double.compare(capacity, truckType.capacity) == 0 && Double.compare(fuelConsumption, truckType.fuelConsumption) == 0 && Objects.equals(typeName, truckType.typeName) && Objects.equals(description, truckType.description) && Objects.equals(dimensions, truckType.dimensions) && Objects.equals(transmission, truckType.transmission) && Objects.equals(fuelType, truckType.fuelType) && Objects.equals(trucks, truckType.trucks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(truckTypeId, typeName, description, dimensions, capacity, transmission, fuelConsumption, fuelType, trucks);
    }

    @Override
    public String toString() {
        return String.format("Truck Type:\n" +
                        "Truck Type ID: %s\n" +
                        "Type Name: %s\n" +
                        "Description: %s\n" +
                        "Dimensions: %s\n" +
                        "Capacity: %s\n" +
                        "Transmission: %s\n" +
                        "Fuel Consumption: %s\n" +
                        "Fuel Type: %s\n" +
                        "Trucks: %s\n",
                truckTypeId, typeName, description, dimensions, capacity, transmission, fuelConsumption, fuelType, trucks
        );
    }

    public static class Builder{
        private int truckTypeId;
        private String typeName;
        private  String description;
        private String dimensions;
        private double capacity;
        private String transmission;
        private double fuelConsumption;
        private String fuelType;
        private List<Truck> trucks;

        public Builder setTruckTypeId(int truckTypeId) {
            this.truckTypeId = truckTypeId;
            return this;
        }

        public Builder setTypeName(String typeName) {
            this.typeName = typeName;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setDimensions(String dimensions) {
            this.dimensions = dimensions;
            return this;
        }

        public Builder setCapacity(double capacity) {
            this.capacity = capacity;
            return this;
        }

        public Builder setTransmission(String transmission) {
            this.transmission = transmission;
            return this;
        }

        public Builder setFuelConsumption(double fuelConsumption) {
            this.fuelConsumption = fuelConsumption;
            return this;
        }

        public Builder setFuelType(String fuelType) {
            this.fuelType = fuelType;
            return this;
        }

        public Builder setTrucks(List<Truck> trucks) {
            this.trucks = trucks;
            return this;
        }

        public Builder copy(TruckType truckType){
            this.truckTypeId=truckType.truckTypeId;
            this.typeName=truckType.typeName;
            this.description=truckType.description;
            this.dimensions=truckType.dimensions;
            this.capacity=truckType.capacity;
            this.transmission=truckType.transmission;
            this.fuelConsumption=truckType.fuelConsumption;
            this.fuelType=truckType.fuelType;
            this.trucks=truckType.trucks;
            return this;

        }
        public TruckType build(){return new TruckType(this);}
    }
}
