package com.vathare.clinic.controller;

import com.vathare.clinic.entity.Patient;
import com.vathare.clinic.repository.PatientRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAllByOrderByNameAsc();
    }

    @GetMapping("/{id}")
    public Patient getPatient(@PathVariable Long id) {
        return patientRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);

    }

    @GetMapping("/search")
    public List<Patient> getPatients(@RequestParam String name) {
        if (name != null && !name.trim().isEmpty()) {
            return patientRepository.findByName(name);
        }
        return patientRepository.findAll();
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id, @RequestBody Patient updated) {
        Patient existing = patientRepository.findById(id).orElseThrow();
        existing.setName(updated.getName());
        existing.setGender(updated.getGender());
        existing.setAge(updated.getAge());
        existing.setContact(updated.getContact());
        existing.setAddress(updated.getAddress());
        return patientRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientRepository.deleteById(id);
    }
}