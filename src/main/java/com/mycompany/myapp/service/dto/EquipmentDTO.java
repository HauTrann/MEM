package com.mycompany.myapp.service.dto;

import java.math.BigDecimal;

public class EquipmentDTO {
    private Long id;

    private Long organizationUnitID;

    private String code;

    private String name;

    private Long equipmentTypeID;

    private String equipmentTypeName;

    private Integer status;

    private String description;

    private String qrcode;

    private String serial;

    private String groupOfEquipment;

    private Long repositoryID;

    private String repositoryCode;

    private String repositoryName;

    private BigDecimal tonKho;

    public EquipmentDTO(Long id, Long organizationUnitID, String code, String name, Long equipmentTypeID, String equipmentTypeName, Integer status, String description, String groupOfEquipment, String serial) {
        this.id = id;
        this.organizationUnitID = organizationUnitID;
        this.code = code;
        this.name = name;
        this.equipmentTypeID = equipmentTypeID;
        this.equipmentTypeName = equipmentTypeName;
        this.status = status;
        this.description = description;
        this.groupOfEquipment = groupOfEquipment;
        this.serial = serial;
    }

    public EquipmentDTO(Long id, String code, String name, String equipmentTypeName, String serial, String repositoryCode, String repositoryName, BigDecimal tonKho) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.equipmentTypeName = equipmentTypeName;
        this.serial = serial;
        this.repositoryCode = repositoryCode;
        this.repositoryName = repositoryName;
        this.tonKho = tonKho;
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

    public String getEquipmentTypeName() {
        return equipmentTypeName;
    }

    public void setEquipmentTypeName(String equipmentTypeName) {
        this.equipmentTypeName = equipmentTypeName;
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

    public String getQrcode() {
        return qrcode;
    }

    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }

    public String getGroupOfEquipment() {
        return groupOfEquipment;
    }

    public void setGroupOfEquipment(String groupOfEquipment) {
        this.groupOfEquipment = groupOfEquipment;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public Long getRepositoryID() {
        return repositoryID;
    }

    public void setRepositoryID(Long repositoryID) {
        this.repositoryID = repositoryID;
    }

    public String getRepositoryCode() {
        return repositoryCode;
    }

    public void setRepositoryCode(String repositoryCode) {
        this.repositoryCode = repositoryCode;
    }

    public String getRepositoryName() {
        return repositoryName;
    }

    public void setRepositoryName(String repositoryName) {
        this.repositoryName = repositoryName;
    }

    public BigDecimal getTonKho() {
        return tonKho;
    }

    public void setTonKho(BigDecimal tonKho) {
        this.tonKho = tonKho;
    }
}
