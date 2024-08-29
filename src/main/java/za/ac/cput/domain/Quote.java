package za.ac.cput.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;


@Entity
public class Quote {
    @Id
    private int quoteId;
    private LocalDate quoteDate = LocalDate.now();
    private double estimatedCost;
    private boolean isConfirmed;

    @ManyToOne
    @JoinColumn(name ="customerID", nullable = false)
    private Customer customerID;

    @ManyToOne
    @JoinColumn(name = "Vin")
    private Truck vin;

    @ManyToOne
    @JoinColumn(name = "branch_IdP")
    private Branch pickUp;

    @ManyToOne
    @JoinColumn(name = "branch_IdD")
    private Branch dropOff;

    protected Quote() {
    }

    private Quote(Builder builder) {
        this.quoteId = builder.quoteId;
        this.quoteDate = builder.quoteDate;
        this.estimatedCost = builder.estimatedCost;
        this.isConfirmed = builder.isConfirmed;
        this.customerID = builder.customerID;
        this.vin = builder.vin;
        this.pickUp = builder.pickUp;
        this.dropOff = builder.dropOff;
    }

    public int getQuoteId() {
        return quoteId;
    }

    public LocalDate getQuoteDate() {
        return quoteDate;
    }

    public double getEstimatedCost() {
        return estimatedCost;
    }

    public boolean isConfirmed() {
        return isConfirmed;
    }

    public Customer getCustomerID() {
        return customerID;
    }

    public Truck getVin() {
        return vin;
    }

    public Branch getPickUp() {
        return pickUp;
    }

    public Branch getDropOff() {
        return dropOff;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Quote quote = (Quote) o;
        return quoteId == quote.quoteId && Double.compare(quote.estimatedCost, estimatedCost) == 0 && isConfirmed == quote.isConfirmed && Objects.equals(quoteDate, quote.quoteDate) && Objects.equals(customerID, quote.customerID) && Objects.equals(vin, quote.vin) && Objects.equals(pickUp, quote.pickUp) && Objects.equals(dropOff, quote.dropOff);
    }

    @Override
    public int hashCode() {
        return Objects.hash(quoteId, quoteDate, estimatedCost, isConfirmed, customerID, vin, pickUp, dropOff);
    }

    @Override
    public String toString() {
        return "Quote{" +
                "quoteId=" + quoteId +
                ", quoteDate=" + quoteDate +
                ", estimatedCost=" + estimatedCost +
                ", isConfirmed=" + isConfirmed +
                ", customerID=" + customerID.getCustomerID() +
                ", vin=" + vin.getVin() +
                ", pickUp=" + pickUp.getBranchId() +
                ", dropOff=" + dropOff.getBranchId() +
                '}';
    }

    public static class Builder {
        private int quoteId;
        private LocalDate quoteDate;
        private double estimatedCost;
        private boolean isConfirmed;
        private Customer customerID;
        private Truck vin;
        private Branch pickUp;
        private Branch dropOff;

        public Builder() {
        }

        public Builder setQuoteId(int quoteId) {
            this.quoteId = quoteId;
            return this;
        }

        public Builder setQuoteDate(LocalDate quoteDate) {
            this.quoteDate = quoteDate;
            return this;
        }

        public Builder setEstimatedCost(double estimatedCost) {
            this.estimatedCost = estimatedCost;
            return this;
        }

        public Builder setConfirmed(boolean confirmed) {
            isConfirmed = confirmed;
            return this;
        }

        public Builder setCustomerID(Customer customerID) {
            this.customerID = customerID;
            return this;
        }

        public Builder setVin(Truck vin) {
            this.vin = vin;
            return this;
        }

        public Builder setPickUp(Branch pickUp) {
            this.pickUp = pickUp;
            return this;
        }

        public Builder setDropOff(Branch dropOff) {
            this.dropOff = dropOff;
            return this;
        }

        public Builder copy(Quote quote) {
            this.quoteId = quote.quoteId;
            this.quoteDate = quote.quoteDate;
            this.estimatedCost = quote.estimatedCost;
            this.isConfirmed = quote.isConfirmed;
            this.customerID = quote.customerID;
            this.vin = quote.vin;
            this.pickUp = quote.pickUp;
            this.dropOff = quote.dropOff;
            return this;
        }

        public Quote build() {
            return new Quote(this);
        }
    }
}
