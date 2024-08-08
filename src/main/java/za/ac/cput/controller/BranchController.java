package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Branch;
import za.ac.cput.service.BranchService;

import java.util.List;

/**
 * BranchController.java
 * This is the Controller class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 27 May 2024
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/branch")
public class BranchController {
        @Autowired
        private BranchService branchService;
        @PostMapping("/create")
        public Branch create(@RequestBody Branch branch){
            return branchService.create(branch);
        }

    @GetMapping("/read/{branchID}")
        public Branch read(@PathVariable int branchID){
            return branchService.read(branchID);
        }

    @PutMapping("/update/{branchID}")
    public Branch update(@PathVariable int branchID, @RequestBody Branch branch) {
        return branchService.update(branchID, branch);
    }


    @DeleteMapping("/delete/{branchID}")
        public void delete(@PathVariable int branchID){
            branchService.delete(branchID);
        }
        @GetMapping("/getAll")
        public List<Branch> getAll(){
            return branchService.getAll();
        }
    }

