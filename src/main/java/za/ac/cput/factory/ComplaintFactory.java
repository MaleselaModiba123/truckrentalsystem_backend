package za.ac.cput.factory;

import za.ac.cput.domain.Complaint;
import za.ac.cput.domain.Customer;
import za.ac.cput.util.Helper;

import java.time.LocalDate;

public class ComplaintFactory {
    public static Complaint buildComplaint(int complaintId, String description, LocalDate complaintDate, String status,Customer customer) {
        if (Helper.isIntNotValid(complaintId)
                || description == null
                || complaintDate == null
                || status == null
                || customer == null) {
            return null;
        }

        return new Complaint.Builder()
                .setComplaintId(complaintId)
                .setDescription(description)
                .setComplaintDate(complaintDate)
                .setStatus(status)
                .setCustomer(customer)
                .build();
    }
}
