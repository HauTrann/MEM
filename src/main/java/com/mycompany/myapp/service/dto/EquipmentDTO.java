package com.mycompany.myapp.service.dto;

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

    private String groupOfEquipment;

    public EquipmentDTO(Long id, Long organizationUnitID, String code, String name, Long equipmentTypeID, String equipmentTypeName, Integer status, String description, String groupOfEquipment) {
        this.id = id;
        this.organizationUnitID = organizationUnitID;
        this.code = code;
        this.name = name;
        this.equipmentTypeID = equipmentTypeID;
        this.equipmentTypeName = equipmentTypeName;
        this.status = status;
        this.description = description;
        this.groupOfEquipment = groupOfEquipment;
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
}
