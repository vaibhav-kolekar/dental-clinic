package com.vathare.clinic.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class MedicalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonBackReference
    private Patient patient;


    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    @Override
    public String toString() {
        return "MedicalHistory{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", patient=" + patient +
                '}';
    }
}

//import jakarta.persistence.*;
//
//@Entity
//public class MedicalHistory {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String visitDate;
//    private String treatment;
//    private String medication;
//    private String notes;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "patient_id")
//    private Patient patient;
//
//    // Getters and Setters
//    public Long getId() { return id; }
//    public void setId(Long id) { this.id = id; }
//
//    public String getVisitDate() { return visitDate; }
//    public void setVisitDate(String visitDate) { this.visitDate = visitDate; }
//
//    public String getTreatment() { return treatment; }
//    public void setTreatment(String treatment) { this.treatment = treatment; }
//
//    public String getMedication() { return medication; }
//    public void setMedication(String medication) { this.medication = medication; }
//
//    public String getNotes() { return notes; }
//    public void setNotes(String notes) { this.notes = notes; }
//
//    public Patient getPatient() { return patient; }
//    public void setPatient(Patient patient) { this.patient = patient; }
//}