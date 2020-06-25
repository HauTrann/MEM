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

    @Column(name = "organizationunitid")
    private Long organizationUnitID;

    @Column(name = "refid")
    private Long refID;

    @Column(name = "detailid")
    private Long detailID;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "posteddate")
    private LocalDate postedDate;

    @Column(name = "no")
    private String no;

    @Column(name = "deliver")
    private String deliver;

    @Column(name = "phonecontact")
    private String phoneContact;

    @Column(name = "inquantity", precision = 21, scale = 2)
    private BigDecimal inquantity;

    @Column(name = "outquantity", precision = 21, scale = 2)
    private BigDecimal outquantity;

    @Column(name = "unit")
    private String unit;

    @Column(name = "unitprice", precision = 21, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "amount", precision = 21, scale = 2)
    private BigDecimal amount;

    @Column(name = "outofstock")
    private Boolean outOfStock;

    @Column(name = "lotno")
    private String lotNo;

    @Column(name = "expirydate")
    private LocalDate expiryDate;

    @Column(name = "repositoryid")
    private Long repositoryID;

    @Column(name = "prodid")
    private Long prodID;

    @Column(name = "prodname")
    private String prodName;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "phonecontactreceiver")
    private String phoneContactReceiver;

    @Column(name = "reason")
    private String reason;

    @Column(name = "userid")
    private Long userID;

    @Column(name = "departmentid")
    private Long departmentID;

    @Column(name = "serial ")
    private String serial;

    @Column(name = "type")
    private Integer type;

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

    public BigDecimal getInquantity() {
        return inquantity;
    }

    public void setInquantity(BigDecimal inquantity) {
        this.inquantity = inquantity;
    }

    public BigDecimal getOutquantity() {
        return outquantity;
    }

    public void setOutquantity(BigDecimal outquantity) {
        this.outquantity = outquantity;
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

    public Boolean getOutOfStock() {
        return outOfStock;
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

    public Long getRepositoryID() {
        return repositoryID;
    }

    public void setRepositoryID(Long repositoryID) {
        this.repositoryID = repositoryID;
    }

    public Long getProdID() {
        return prodID;
    }

    public void setProdID(Long prodID) {
        this.prodID = prodID;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getPhoneContactReceiver() {
        return phoneContactReceiver;
    }

    public void setPhoneContactReceiver(String phoneContactReceiver) {
        this.phoneContactReceiver = phoneContactReceiver;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public Long getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(Long departmentID) {
        this.departmentID = departmentID;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
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
            ", unit='" + getUnit() + "'" +
            ", unitPrice=" + getUnitPrice() +
            ", amount=" + getAmount() +
            ", outOfStock='" + isOutOfStock() + "'" +
            "}";
    }
}
