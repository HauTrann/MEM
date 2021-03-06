package com.mycompany.myapp.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.math.BigDecimal;

/**
 * A InOutRepositoryDetails.
 */
@Entity
@Table(name = "in_out_repository_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class InOutRepositoryDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "prod_id")
    private Long prodID;

    @Column(name = "in_out_repository_id")
    private Long inOutRepositoryID;

    @Column(name = "repository_id")
    private Long repositoryID;

    @Column(name = "prod_name")
    private String prodName;

    @Column(name = "quantity", precision = 21, scale = 2)
    private BigDecimal quantity;

    @Column(name = "unit")
    private String unit;

    @Column(name = "unit_price", precision = 21, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "amount", precision = 21, scale = 2)
    private BigDecimal amount;

    @Column(name = "lot_no")
    private String lotNo;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "serial")
    private String serial;

    @Transient
    @JsonDeserialize
    @JsonSerialize
    private List<TechnicalDataTimeLine> technicalDataModel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProdID() {
        return prodID;
    }

    public InOutRepositoryDetails prodID(Long prodID) {
        this.prodID = prodID;
        return this;
    }

    public void setProdID(Long prodID) {
        this.prodID = prodID;
    }

    public Long getInOutRepositoryID() {
        return inOutRepositoryID;
    }

    public void setInOutRepositoryID(Long inOutRepositoryID) {
        this.inOutRepositoryID = inOutRepositoryID;
    }

    public String getProdName() {
        return prodName;
    }

    public InOutRepositoryDetails prodName(String prodName) {
        this.prodName = prodName;
        return this;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public InOutRepositoryDetails quantity(BigDecimal quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public InOutRepositoryDetails unit(String unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public InOutRepositoryDetails unitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public InOutRepositoryDetails amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Long getRepositoryID() {
        return repositoryID;
    }

    public void setRepositoryID(Long repositoryID) {
        this.repositoryID = repositoryID;
    }

    public String getLotNo() {
        return lotNo;
    }

    public void setLotNo(String lotNo) {
        this.lotNo = lotNo;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public List<TechnicalDataTimeLine> getTechnicalDataModel() {
        return technicalDataModel;
    }

    public void setTechnicalDataModel(List<TechnicalDataTimeLine> technicalDataModel) {
        this.technicalDataModel = technicalDataModel;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InOutRepositoryDetails)) {
            return false;
        }
        return id != null && id.equals(((InOutRepositoryDetails) o).id);
    }


    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "InOutRepositoryDetails{" +
            "id=" + getId() +
            ", prodID=" + getProdID() +
            ", prodName='" + getProdName() + "'" +
            ", quantity=" + getQuantity() +
            ", unit='" + getUnit() + "'" +
            ", unitPrice=" + getUnitPrice() +
            ", amount=" + getAmount() +
            "}";
    }
}
