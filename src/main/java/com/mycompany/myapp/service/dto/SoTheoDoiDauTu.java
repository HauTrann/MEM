package com.mycompany.myapp.service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SoTheoDoiDauTu {
    private LocalDateTime date;
    private LocalDateTime postedDate;
    private String no;
    private String reason;
    private String deliver;
    private String phoneContact;
    private BigDecimal amount;
    private BigDecimal unitPrice;
    private BigDecimal quantity;
    private String unit;
    private String prodName;

    private String dateString;
    private String postedDateString;
    private String amountString;
    private String unitPriceString;
    private String quantityString;

    private String repositoryName;
    private BigDecimal nhapKho;
    private BigDecimal xuatKho;
    private BigDecimal tonKho;
    private String nhapKhoString;
    private String xuatKhoString;
    private String tonKhoString;
    private String serial;

    public SoTheoDoiDauTu(LocalDateTime date, LocalDateTime postedDate, String no, String reason, String deliver, String phoneContact, BigDecimal amount, BigDecimal unitPrice, BigDecimal quantity, String prodName) {
        this.date = date;
        this.postedDate = postedDate;
        this.no = no;
        this.reason = reason;
        this.deliver = deliver;
        this.phoneContact = phoneContact;
        this.amount = amount;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.prodName = prodName;
    }

    public SoTheoDoiDauTu(String prodName, String repositoryName, BigDecimal nhapKho, BigDecimal xuatKho, BigDecimal tonKho) {
        this.prodName = prodName;
        this.repositoryName = repositoryName;
        this.nhapKho = nhapKho;
        this.xuatKho = xuatKho;
        this.tonKho = tonKho;
    }

    public SoTheoDoiDauTu(String prodName, String repositoryName, BigDecimal nhapKho, BigDecimal xuatKho, BigDecimal tonKho, String serial) {
        this.prodName = prodName;
        this.repositoryName = repositoryName;
        this.nhapKho = nhapKho;
        this.xuatKho = xuatKho;
        this.tonKho = tonKho;
        this.serial = serial;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public LocalDateTime getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDateTime postedDate) {
        this.postedDate = postedDate;
    }

    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getDeliver() {
        return deliver;
    }

    public void setDeliver(String deliver) {
        this.deliver = deliver;
    }

    public String getPhoneContact() {
        return phoneContact;
    }

    public void setPhoneContact(String phoneContact) {
        this.phoneContact = phoneContact;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getDateString() {
        return dateString;
    }

    public void setDateString(String dateString) {
        this.dateString = dateString;
    }

    public String getPostedDateString() {
        return postedDateString;
    }

    public void setPostedDateString(String postedDateString) {
        this.postedDateString = postedDateString;
    }

    public String getAmountString() {
        return amountString;
    }

    public void setAmountString(String amountString) {
        this.amountString = amountString;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getUnitPriceString() {
        return unitPriceString;
    }

    public void setUnitPriceString(String unitPriceString) {
        this.unitPriceString = unitPriceString;
    }

    public String getQuantityString() {
        return quantityString;
    }

    public void setQuantityString(String quantityString) {
        this.quantityString = quantityString;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public String getRepositoryName() {
        return repositoryName;
    }

    public void setRepositoryName(String repositoryName) {
        this.repositoryName = repositoryName;
    }

    public BigDecimal getNhapKho() {
        return nhapKho;
    }

    public void setNhapKho(BigDecimal nhapKho) {
        this.nhapKho = nhapKho;
    }

    public BigDecimal getXuatKho() {
        return xuatKho;
    }

    public void setXuatKho(BigDecimal xuatKho) {
        this.xuatKho = xuatKho;
    }

    public String getNhapKhoString() {
        return nhapKhoString;
    }

    public void setNhapKhoString(String nhapKhoString) {
        this.nhapKhoString = nhapKhoString;
    }

    public String getXuatKhoString() {
        return xuatKhoString;
    }

    public void setXuatKhoString(String xuatKhoString) {
        this.xuatKhoString = xuatKhoString;
    }

    public BigDecimal getTonKho() {
        return tonKho;
    }

    public void setTonKho(BigDecimal tonKho) {
        this.tonKho = tonKho;
    }

    public String getTonKhoString() {
        return tonKhoString;
    }

    public void setTonKhoString(String tonKhoString) {
        this.tonKhoString = tonKhoString;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }
}
