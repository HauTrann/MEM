package com.mycompany.myapp.service.dto;

public class DeviceModelDTO {
    private Long id;

    private Long organizationUnitID;

    private String code;

    private String name;

    private Long equipmentTypeID;

    private Long medicalSuppliesTypeID;

    private Integer status;
    private Boolean isMedicalSupplies;

    private String description;

    private String serial;

    public DeviceModelDTO(Long id, Long organizationUnitID, String code, String name, Long equipmentTypeID, Long medicalSuppliesTypeID, Integer status, String description, Boolean isMedicalSupplies) {
        this.id = id;
        this.organizationUnitID = organizationUnitID;
        this.code = code;
        this.name = name;
        this.equipmentTypeID = equipmentTypeID;
        this.medicalSuppliesTypeID = medicalSuppliesTypeID;
        this.status = status;
        this.description = description;
        this.isMedicalSupplies = isMedicalSupplies;
    }

    public DeviceModelDTO(Long id, Long organizationUnitID, String code, String name, Long equipmentTypeID, Long medicalSuppliesTypeID, Integer status, String description, Boolean isMedicalSupplies, String serial) {
        this.id = id;
        this.organizationUnitID = organizationUnitID;
        this.code = code;
        this.name = name;
        this.equipmentTypeID = equipmentTypeID;
        this.medicalSuppliesTypeID = medicalSuppliesTypeID;
        this.status = status;
        this.description = description;
        this.isMedicalSupplies = isMedicalSupplies;
        this.serial = serial;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrganizationUnitID() {
        return organizationUnitID;
    }

    public void setOrganizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getEquipmentTypeID() {
        return equipmentTypeID;
    }

    public void setEquipmentTypeID(Long equipmentTypeID) {
        this.equipmentTypeID = equipmentTypeID;
    }

    public Long getMedicalSuppliesTypeID() {
        return medicalSuppliesTypeID;
    }

    public void setMedicalSuppliesTypeID(Long medicalSuppliesTypeID) {
        this.medicalSuppliesTypeID = medicalSuppliesTypeID;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsMedicalSupplies() {
        return isMedicalSupplies;
    }

    public void setIsMedicalSupplies(Boolean medicalSupplies) {
        isMedicalSupplies = medicalSupplies;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }
}
