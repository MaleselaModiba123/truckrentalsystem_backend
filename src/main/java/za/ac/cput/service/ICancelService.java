package za.ac.cput.service;

import za.ac.cput.domain.Cancellation;

public interface ICancelService {
    Cancellation create(Cancellation cancellation);

    Cancellation read(Integer cancelId);
}
