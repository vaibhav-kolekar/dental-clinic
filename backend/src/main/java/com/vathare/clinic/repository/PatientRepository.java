package com.vathare.clinic.repository;

import com.vathare.clinic.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByName(String name);
    List<Patient> findAllByOrderByNameAsc();
}
