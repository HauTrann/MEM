package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * A RepositoryLedger.
 */
@Entity
@Table(name = "repository_ledger")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RepositoryLedger implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "organization_unit_id")
    private Long organizationUnitID;

    @Column(name = "ref_id")
    private Long refID;

    @Column(name = "detail_id")
    private Long detailID;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "posted_date")
    private LocalDate postedDate;

    @Column(name = "no")
    private String no;

    @Column(name = "deliver")
    private String deliver;

    @Column(name = "phone_contact")
    private String phoneContact;

    @Column(name = "quantity", precision = 21, scale = 2)
    private BigDecimal quantity;

    @Column(name = "unit")
    private String unit;

    @Column(name = "unit_price", precision = 21, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "amount", precision = 21, scale = 2)
    private BigDecimal amount;

    @Column(name = "out_of_stock")
    private Boolean outOfStock;

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

    public RepositoryLedger organizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
        return this;
    }

    public void setOrganizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
    }

    public Long getRefID() {
        return refID;
    }

    public RepositoryLedger refID(Long refID) {
        this.refID = refID;
        return this;
    }

    public void setRefID(Long refID) {
        this.refID = refID;
    }

    public Long getDetailID() {
        return detailID;
    }

    public RepositoryLedger detailID(Long detailID) {
        this.detailID = detailID;
        return this;
    }

    public void setDetailID(Long detailID) {
        this.detailID = detailID;
    }

    public LocalDate getDate() {
        return date;
    }

    public RepositoryLedger date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getPostedDate() {
        return postedDate;
    }

    public RepositoryLedger postedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
        return this;
    }

    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }

    public String getNo() {
        return no;
    }

    public RepositoryLedger no(String no) {
        this.no = no;
        return this;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public String getDeliver() {
        return deliver;
    }

    public RepositoryLedger deliver(String deliver) {
        this.deliver = deliver;
        return this;
    }

    public void setDeliver(String deliver) {
        this.deliver = deliver;
    }

    public String getPhoneContact() {
        return phoneContact;
    }

    public RepositoryLedger phoneContact(String phoneContact) {
        this.phoneContact = phoneContact;
        return this;
    }

    public void setPhoneContact(String phoneContact) {
        this.phoneContact = phoneContact;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public RepositoryLedger quantity(BigDecimal quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public RepositoryLedger unit(String unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public RepositoryLedger unitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public RepositoryLedger amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Boolean isOutOfStock() {
        return outOfStock;
    }

    public RepositoryLedger outOfStock(Boolean outOfStock) {
        this.outOfStock = outOfStock;
        return this;
    }

    public void setOutOfStock(Boolean outOfStock) {
        this.outOfStock = outOfStock;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RepositoryLedger)) {
            return false;
        }
        return id != null && id.equals(((RepositoryLedger) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RepositoryLedger{" +
            "id=" + getId() +
            ", organizationUnitID=" + getOrganizationUnitID() +
            ", refID=" + getRefID() +
            ", detailID=" + getDetailID() +
            ", date='" + getDate() + "'" +
            ", postedDate='" + getPostedDate() + "'" +
            ", no='" + getNo() + "'" +
            ", deliver='" + getDeliver() + "'" +
            ", phoneContact='" + getPhoneContact() + "'" +
            ", quantity=" + getQuantity() +
            ", unit='" + getUnit() + "'" +
            ", unitPrice=" + getUnitPrice() +
            ", amount=" + getAmount() +
            ", outOfStock='" + isOutOfStock() + "'" +
            "}";
    }
}
