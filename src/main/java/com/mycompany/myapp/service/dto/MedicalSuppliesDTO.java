package com.mycompany.myapp.service.dto;

import java.math.BigDecimal;

/**
 * A MedicalSupplies.
 */
public class MedicalSuppliesDTO {

    private Long id;
    private Long organizationUnitID;
    private String code;
    private String name;
    private Long medicalSuppliesTypeID;
    private String medicalSuppliesTypeName;
    private String description;
    private Integer status;
    private BigDecimal quantity;
    private BigDecimal totalIW;
    private BigDecimal totalOW;
    private Long repositoryID;
    private Long userID;
    private String repositoryName;

    public MedicalSuppliesDTO(Long id, Long organizationUnitID, String code, String name, Long medicalSuppliesTypeID, String medicalSuppliesTypeName, String description, Integer status, BigDecimal totalIW, BigDecimal totalOW, Long repositoryID, String repositoryName, Long userID) {
        this.id = id;
        this.organizationUnitID = organizationUnitID;
        this.code = code;
        this.name = name;
        this.medicalSuppliesTypeID = medicalSuppliesTypeID;
        this.medicalSuppliesTypeName = medicalSuppliesTypeName;
        this.description = description;
        this.status = status;
        this.totalIW = totalIW;
        this.totalOW = totalOW;
        this.repositoryID = repositoryID;
        this.repositoryName = repositoryName;
        this.userID = userID;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrganizationUnitID() {
        return organizationUnitID;
    }

    public MedicalSuppliesDTO organizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
        return this;
    }

    public void setOrganizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
    }

    public String getCode() {
        return code;
    }

    public MedicalSuppliesDTO code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public MedicalSuppliesDTO name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getMedicalSuppliesTypeID() {
        return medicalSuppliesTypeID;
    }

    public MedicalSuppliesDTO medicalSuppliesTypeID(Long medicalSuppliesTypeID) {
        this.medicalSuppliesTypeID = medicalSuppliesTypeID;
        return this;
    }

    public void setMedicalSuppliesTypeID(Long medicalSuppliesTypeID) {
        this.medicalSuppliesTypeID = medicalSuppliesTypeID;
    }

    public String getDescription() {
        return description;
    }

    public MedicalSuppliesDTO description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public MedicalSuppliesDTO status(Integer status) {
        this.status = status;
        return this;
    }


    public void setStatus(Integer status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public Long getRepositoryID() {
        return repositoryID;
    }

    public void setRepositoryID(Long repositoryID) {
        this.repositoryID = repositoryID;
    }

    public String getMedicalSuppliesTypeName() {
        return medicalSuppliesTypeName;
    }

    public void setMedicalSuppliesTypeName(String medicalSuppliesTypeName) {
        this.medicalSuppliesTypeName = medicalSuppliesTypeName;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public BigDecimal getTotalIW() {
        return totalIW;
    }

    public void setTotalIW(BigDecimal totalIW) {
        this.totalIW = totalIW;
    }

    public BigDecimal getTotalOW() {
        return totalOW;
    }

    public void setTotalOW(BigDecimal totalOW) {
        this.totalOW = totalOW;
    }

    public String getRepositoryName() {
        return repositoryName;
    }

    public void setRepositoryName(String repositoryName) {
        this.repositoryName = repositoryName;
    }
}
