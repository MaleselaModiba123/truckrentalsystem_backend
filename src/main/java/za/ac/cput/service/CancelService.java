package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Cancellation;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.domain.RentalStatus;
import za.ac.cput.factory.CancellationFactory;
import za.ac.cput.repository.CancelRepository;
import za.ac.cput.repository.RentTruckRepository;

@Service
public class CancelService implements ICancelService {

    private final CancellationFactory cancellationFactory;
    private final CancelRepository cancelRepository;
    private final RentTruckRepository rentTruckRepository;

    @Autowired
    public CancelService(CancellationFactory cancellationFactory, CancelRepository cancelRepository, RentTruckRepository rentTruckRepository) {
        this.cancellationFactory = cancellationFactory;
        this.cancelRepository = cancelRepository;
        this.rentTruckRepository = rentTruckRepository;
    }

    public Cancellation createCancellation(Cancellation cancellation) {
        // Retrieve the RentTruck object from the cancellation
        RentTruck rentTruck = cancellation.getRentTruck();

        if (rentTruck == null) {
            throw new IllegalArgumentException("RentTruck object is missing in the cancellation");
        }

        // Update the RentTruck status to CANCELLED and set other necessary details
        RentTruck cancelledRentTruck = new RentTruck.Builder()
                .copy(rentTruck)  // Assuming you have a copy method to keep other details intact
                .setStatus(RentalStatus.CANCELLED)
                .build();

        // Save the updated RentTruck object
        rentTruckRepository.save(cancelledRentTruck);

        // Validate cancelReason (if necessary)
        if (cancellation.getCancelReason() == null || cancellation.getCancelReason().isEmpty()) {
            throw new IllegalArgumentException("Cancel reason cannot be null or empty");
        }

        // Create a Cancellation object using the factory
        Cancellation updatedCancellation = cancellationFactory.buildCancel(cancellation.getCancelReason(), cancelledRentTruck);

        // Save and return the Cancellation object
        return cancelRepository.save(updatedCancellation);
    }

    @Override
    public Cancellation create(Cancellation cancel) {
        return cancelRepository.save(cancel);
    }

    @Override
    public Cancellation read(Integer cancelId) {
        return this.cancelRepository.findById(cancelId).orElse(null);
    }
}
