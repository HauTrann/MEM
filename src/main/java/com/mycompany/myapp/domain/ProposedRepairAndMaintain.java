package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A ProposedRepairAndMaintain.
 */
@Entity
@Table(name = "proposedrepairandmaintain")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProposedRepairAndMaintain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "organizationunitid")
    private Long organizationUnitID;

    @Column(name = "userid")
    private Long userID;

    @Column(name = "description")
    private String description;

    @Column(name = "proposeddate")
    private LocalDate proposedDate;

    @Column(name = "validationdate")
    private LocalDate validationDate;

    @Column(name = "finishdate")
    private LocalDate finishDate;

    @Column(name = "status")
    private Integer status;

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

    public ProposedRepairAndMaintain organizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
        return this;
    }

    public void setOrganizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
    }

    public Long getUserID() {
        return userID;
    }

    public ProposedRepairAndMaintain userID(Long userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getDescription() {
        return description;
    }

    public ProposedRepairAndMaintain description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getProposedDate() {
        return proposedDate;
    }

    public ProposedRepairAndMaintain proposedDate(LocalDate proposedDate) {
        this.proposedDate = proposedDate;
        return this;
    }

    public void setProposedDate(LocalDate proposedDate) {
        this.proposedDate = proposedDate;
    }

    public LocalDate getValidationDate() {
        return validationDate;
    }

    public ProposedRepairAndMaintain validationDate(LocalDate validationDate) {
        this.validationDate = validationDate;
        return this;
    }

    public void setValidationDate(LocalDate validationDate) {
        this.validationDate = validationDate;
    }

    public LocalDate getFinishDate() {
        return finishDate;
    }

    public ProposedRepairAndMaintain finishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }

    public Integer getStatus() {
        return status;
    }

    public ProposedRepairAndMaintain status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProposedRepairAndMaintain)) {
            return false;
        }
        return id != null && id.equals(((ProposedRepairAndMaintain) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProposedRepairAndMaintain{" +
            "id=" + getId() +
            ", organizationUnitID=" + getOrganizationUnitID() +
            ", userID=" + getUserID() +
            ", description='" + getDescription() + "'" +
            ", proposedDate='" + getProposedDate() + "'" +
            ", validationDate='" + getValidationDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
