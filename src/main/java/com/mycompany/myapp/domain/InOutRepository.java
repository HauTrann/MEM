package com.mycompany.myapp.domain;

import liquibase.pro.packaged.S;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.time.LocalDate;
import java.util.Set;

/**
 * A InOutRepository.
 */
@Entity
@Table(name = "in_out_repository")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class InOutRepository implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "organization_unit_id")
    private Long organizationUnitID;

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

    @Column(name = "outofstock")
    private Boolean outOfStock;

    @Column(name = "recorded")
    private Boolean recorded;

    @Column(name = "reason")
    private String reason;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "phonecontactreceiver")
    private String phoneContactReceiver;

    @Column(name = "userid")
    private Long userID;

    @Column(name = "departmentid")
    private Long departmentID;

    @Column(name = "type")
    private Integer type;

    @OneToMany(cascade = {CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "in_out_repository_id")
    private Set<InOutRepositoryDetails> inOutRepositoryDetails = new HashSet<>();

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

    public InOutRepository organizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
        return this;
    }

    public void setOrganizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
    }

    public LocalDate getDate() {
        return date;
    }

    public InOutRepository date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getPostedDate() {
        return postedDate;
    }

    public InOutRepository postedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
        return this;
    }

    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }

    public String getNo() {
        return no;
    }

    public InOutRepository no(String no) {
        this.no = no;
        return this;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public String getDeliver() {
        return deliver;
    }

    public InOutRepository deliver(String deliver) {
        this.deliver = deliver;
        return this;
    }

    public void setDeliver(String deliver) {
        this.deliver = deliver;
    }

    public String getPhoneContact() {
        return phoneContact;
    }

    public InOutRepository phoneContact(String phoneContact) {
        this.phoneContact = phoneContact;
        return this;
    }

    public void setPhoneContact(String phoneContact) {
        this.phoneContact = phoneContact;
    }

    public Boolean isOutOfStock() {
        return outOfStock;
    }

    public InOutRepository outOfStock(Boolean outOfStock) {
        this.outOfStock = outOfStock;
        return this;
    }

    public void setOutOfStock(Boolean outOfStock) {
        this.outOfStock = outOfStock;
    }

    public Boolean isRecorded() {
        return recorded;
    }

    public InOutRepository recorded(Boolean recorded) {
        this.recorded = recorded;
        return this;
    }

    public void setRecorded(Boolean recorded) {
        this.recorded = recorded;
    }

    public Set<InOutRepositoryDetails> getInOutRepositoryDetails() {
        return inOutRepositoryDetails;
    }

    public void setInOutRepositoryDetails(Set<InOutRepositoryDetails> inOutRepositoryDetails) {
        this.inOutRepositoryDetails = inOutRepositoryDetails;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean getOutOfStock() {
        return outOfStock;
    }

    public Boolean getRecorded() {
        return recorded;
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

    public static long getSerialVersionUID() {
        return serialVersionUID;
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
        if (!(o instanceof InOutRepository)) {
            return false;
        }
        return id != null && id.equals(((InOutRepository) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "InOutRepository{" +
            "id=" + getId() +
            ", organizationUnitID=" + getOrganizationUnitID() +
            ", date='" + getDate() + "'" +
            ", postedDate='" + getPostedDate() + "'" +
            ", no='" + getNo() + "'" +
            ", deliver='" + getDeliver() + "'" +
            ", phoneContact='" + getPhoneContact() + "'" +
            ", outOfStock='" + isOutOfStock() + "'" +
            ", recorded='" + isRecorded() + "'" +
            "}";
    }
}
