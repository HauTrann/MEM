package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * A RequestReceiveDeviceDetails.
 */
@Entity
@Table(name = "request_receive_device_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RequestReceiveDeviceDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "requestreceivedeviceid")
    private Long requestReceiveDeviceID;

    @Column(name = "serial")
    private String serial;

    @Column(name = "prodid")
    private Long prodID;

    @Column(name = "prodname")
    private String prodName;

    @Column(name = "quantity", precision = 21, scale = 2)
    private BigDecimal quantity;

    @Column(name = "unit")
    private String unit;

    @Column(name = "unitprice", precision = 21, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "amount", precision = 21, scale = 2)
    private BigDecimal amount;

    @Column(name = "repositoryid")
    private Long repositoryID;

    @Column(name = "lotno")
    private String lotNo;

    @Column(name = "expirydate")
    private LocalDate expiryDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRequestReceiveDeviceID() {
        return requestReceiveDeviceID;
    }

    public RequestReceiveDeviceDetails requestReceiveDeviceID(Long requestReceiveDeviceID) {
        this.requestReceiveDeviceID = requestReceiveDeviceID;
        return this;
    }

    public void setRequestReceiveDeviceID(Long requestReceiveDeviceID) {
        this.requestReceiveDeviceID = requestReceiveDeviceID;
    }

    public String getSerial() {
        return serial;
    }

    public RequestReceiveDeviceDetails serial(String serial) {
        this.serial = serial;
        return this;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public Long getProdID() {
        return prodID;
    }

    public RequestReceiveDeviceDetails prodID(Long prodID) {
        this.prodID = prodID;
        return this;
    }

    public void setProdID(Long prodID) {
        this.prodID = prodID;
    }

    public String getProdName() {
        return prodName;
    }

    public RequestReceiveDeviceDetails prodName(String prodName) {
        this.prodName = prodName;
        return this;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public RequestReceiveDeviceDetails quantity(BigDecimal quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public RequestReceiveDeviceDetails unit(String unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public RequestReceiveDeviceDetails unitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public RequestReceiveDeviceDetails amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Long getRepositoryID() {
        return repositoryID;
    }

    public RequestReceiveDeviceDetails repositoryID(Long repositoryID) {
        this.repositoryID = repositoryID;
        return this;
    }

    public void setRepositoryID(Long repositoryID) {
        this.repositoryID = repositoryID;
    }

    public String getLotNo() {
        return lotNo;
    }

    public RequestReceiveDeviceDetails lotNo(String lotNo) {
        this.lotNo = lotNo;
        return this;
    }

    public void setLotNo(String lotNo) {
        this.lotNo = lotNo;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public RequestReceiveDeviceDetails expiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
        return this;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RequestReceiveDeviceDetails)) {
            return false;
        }
        return id != null && id.equals(((RequestReceiveDeviceDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RequestReceiveDeviceDetails{" +
            "id=" + getId() +
            ", requestReceiveDeviceID=" + getRequestReceiveDeviceID() +
            ", serial='" + getSerial() + "'" +
            ", prodID=" + getProdID() +
            ", prodName='" + getProdName() + "'" +
            ", quantity=" + getQuantity() +
            ", unit='" + getUnit() + "'" +
            ", unitPrice=" + getUnitPrice() +
            ", amount=" + getAmount() +
            ", repositoryID=" + getRepositoryID() +
            ", lotNo='" + getLotNo() + "'" +
            ", expiryDate='" + getExpiryDate() + "'" +
            "}";
    }
}
