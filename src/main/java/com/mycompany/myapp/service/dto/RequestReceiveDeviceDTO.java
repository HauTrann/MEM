package com.mycompany.myapp.service.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class RequestReceiveDeviceDTO {
    private Long id;

    private Long organizationUnitID;

    private Long userID;

    private String userName;

    private LocalDateTime requestDate;

    private LocalDateTime dateOfDelivery;

    private String description;

    private Integer status;

    private String departmentName;

    private Boolean isPay;

    public RequestReceiveDeviceDTO(Long id, Long organizationUnitID, Long userID, String userName, LocalDateTime requestDate, LocalDateTime dateOfDelivery, String description, Integer status, String departmentName, Boolean isPay) {
        this.id = id;
        this.organizationUnitID = organizationUnitID;
        this.userID = userID;
        this.userName = userName;
        this.requestDate = requestDate;
        this.dateOfDelivery = dateOfDelivery;
        this.description = description;
        this.status = status;
        this.departmentName = departmentName;
        this.isPay = isPay;
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

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public LocalDateTime getDateOfDelivery() {
        return dateOfDelivery;
    }

    public void setDateOfDelivery(LocalDateTime dateOfDelivery) {
        this.dateOfDelivery = dateOfDelivery;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Boolean getPay() {
        return isPay;
    }

    public void setPay(Boolean pay) {
        isPay = pay;
    }
}
