package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A ReportBrokenEquipment.
 */
@Entity
@Table(name = "reportbrokenequipment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReportBrokenEquipment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "prodid")
    private Long prodID;

    @Column(name = "serial")
    private String serial;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private Integer status;

    @Column(name = "userid")
    private Long userID;

    @Column(name = "time")
    private LocalDate time;

    @Column(name = "organizationunitid")
    private Long organizationUnitID;

    @Column(name = "prodname")
    private String prodName;

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

    public ReportBrokenEquipment prodID(Long prodID) {
        this.prodID = prodID;
        return this;
    }

    public void setProdID(Long prodID) {
        this.prodID = prodID;
    }

    public String getSerial() {
        return serial;
    }

    public ReportBrokenEquipment serial(String serial) {
        this.serial = serial;
        return this;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public String getDescription() {
        return description;
    }

    public ReportBrokenEquipment description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public ReportBrokenEquipment status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getUserID() {
        return userID;
    }

    public ReportBrokenEquipment userID(Long userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public LocalDate getTime() {
        return time;
    }

    public ReportBrokenEquipment time(LocalDate time) {
        this.time = time;
        return this;
    }

    public void setTime(LocalDate time) {
        this.time = time;
    }

    public Long getOrganizationUnitID() {
        return organizationUnitID;
    }

    public ReportBrokenEquipment organizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
        return this;
    }

    public void setOrganizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
    }

    public String getProdName() {
        return prodName;
    }

    public ReportBrokenEquipment prodName(String prodName) {
        this.prodName = prodName;
        return this;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReportBrokenEquipment)) {
            return false;
        }
        return id != null && id.equals(((ReportBrokenEquipment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ReportBrokenEquipment{" +
            "id=" + getId() +
            ", prodID=" + getProdID() +
            ", serial='" + getSerial() + "'" +
            ", description='" + getDescription() + "'" +
            ", status=" + getStatus() +
            ", userID=" + getUserID() +
            ", time='" + getTime() + "'" +
            ", organizationUnitID=" + getOrganizationUnitID() +
            ", prodName='" + getProdName() + "'" +
            "}";
    }
}
