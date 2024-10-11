package za.ac.cput.factory;

import org.springframework.stereotype.Component;
import za.ac.cput.domain.Cancellation;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.util.Helper;

import java.time.LocalDate;

@Component
public class CancellationFactory {


    public static Cancellation buildCancel( String cancelReason, RentTruck rentTruck) {


        return new Cancellation.Builder()
                .setCancelDate(LocalDate.now())
                .setCancelReason(cancelReason)
                .setRentTruck(rentTruck)
                .build();
    }
}
