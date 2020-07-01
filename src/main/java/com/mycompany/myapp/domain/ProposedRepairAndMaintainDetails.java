package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;

/**
 * A ProposedRepairAndMaintainDetails.
 */
@Entity
@Table(name = "proposedrepairandmaintaindetails")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProposedRepairAndMaintainDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "proposedrepairandmaintainid")
    private Long proposedRepairAndMaintainID;

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

    @Column(name = "repositoryid")
    private Long repositoryID;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProposedRepairAndMaintainID() {
        return proposedRepairAndMaintainID;
    }

    public ProposedRepairAndMaintainDetails proposedRepairAndMaintainID(Long proposedRepairAndMaintainID) {
        this.proposedRepairAndMaintainID = proposedRepairAndMaintainID;
        return this;
    }

    public void setProposedRepairAndMaintainID(Long proposedRepairAndMaintainID) {
        this.proposedRepairAndMaintainID = proposedRepairAndMaintainID;
    }

    public String getSerial() {
        return serial;
    }

    public ProposedRepairAndMaintainDetails serial(String serial) {
        this.serial = serial;
        return this;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public Long getProdID() {
        return prodID;
    }

    public ProposedRepairAndMaintainDetails prodID(Long prodID) {
        this.prodID = prodID;
        return this;
    }

    public void setProdID(Long prodID) {
        this.prodID = prodID;
    }

    public String getProdName() {
        return prodName;
    }

    public ProposedRepairAndMaintainDetails prodName(String prodName) {
        this.prodName = prodName;
        return this;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public ProposedRepairAndMaintainDetails quantity(BigDecimal quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public ProposedRepairAndMaintainDetails unit(String unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Long getRepositoryID() {
        return repositoryID;
    }

    public ProposedRepairAndMaintainDetails repositoryID(Long repositoryID) {
        this.repositoryID = repositoryID;
        return this;
    }

    public void setRepositoryID(Long repositoryID) {
        this.repositoryID = repositoryID;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProposedRepairAndMaintainDetails)) {
            return false;
        }
        return id != null && id.equals(((ProposedRepairAndMaintainDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProposedRepairAndMaintainDetails{" +
            "id=" + getId() +
            ", proposedRepairAndMaintainID=" + getProposedRepairAndMaintainID() +
            ", serial='" + getSerial() + "'" +
            ", prodID=" + getProdID() +
            ", prodName='" + getProdName() + "'" +
            ", quantity=" + getQuantity() +
            ", unit='" + getUnit() + "'" +
            ", repositoryID=" + getRepositoryID() +
            "}";
    }
}
