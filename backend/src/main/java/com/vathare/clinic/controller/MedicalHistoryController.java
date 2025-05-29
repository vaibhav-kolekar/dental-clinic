package com.vathare.clinic.controller;

import com.vathare.clinic.entity.MedicalHistory;
import com.vathare.clinic.entity.Patient;
import com.vathare.clinic.repository.MedicalHistoryRepository;
import com.vathare.clinic.repository.PatientRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicalHistoryController {

    private final MedicalHistoryRepository historyRepo;
    private final PatientRepository patientRepo;

    public MedicalHistoryController(MedicalHistoryRepository historyRepo, PatientRepository patientRepo) {
        this.historyRepo = historyRepo;
        this.patientRepo = patientRepo;
    }

    @PostMapping("/{patientId}")
    public MedicalHistory addHistory(@PathVariable Long patientId, @RequestBody MedicalHistory history) {
        Patient patient = patientRepo.findById(patientId).orElseThrow();
        history.setPatient(patient);
        return historyRepo.save(history);
    }

    @DeleteMapping("/{id}")
    public void deleteHistory(@PathVariable Long id) {
        historyRepo.deleteById(id);
    }
}