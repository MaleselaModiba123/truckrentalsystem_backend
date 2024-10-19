package za.ac.cput.factory;

import za.ac.cput.domain.Branch;
import za.ac.cput.util.Helper;

public class BranchFactory {
    public static Branch buildBranch(int branchId,String branchName, String address) {
                if (Helper.isIntNotValid(branchId) ||
                 Helper.isNullOrEmpty(branchName)||
                 Helper.isValidAddress(address)) {
            return null;
        }

        return new Branch.Builder().setBranchId(branchId)
                .setBranchName(branchName)
                .setAddress(address)
                .build();

    }
}
