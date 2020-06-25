package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A TechnicalDataTimeLine.
 */
@Entity
@Table(name = "technicaldatatimeline")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TechnicalDataTimeLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "value")
    private String value;

    @Column(name = "equipmentid")
    private Long equipmentID;

    @Column(name = "time")
    private LocalDateTime time;

    @Column(name = "serial")
    private String serial;

    @Column(name = "userid")
    private Long userID;

    @Column(name = "departmentID")
    private Long departmentID;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TechnicalDataTimeLine name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public TechnicalDataTimeLine value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getEquipmentID() {
        return equipmentID;
    }

    public TechnicalDataTimeLine equipmentID(Long equipmentID) {
        this.equipmentID = equipmentID;
        return this;
    }

    public void setEquipmentID(Long equipmentID) {
        this.equipmentID = equipmentID;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public TechnicalDataTimeLine time(LocalDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getSerial() {
        return serial;
    }

    public TechnicalDataTimeLine serial(String serial) {
        this.serial = serial;
        return this;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public Long getUserID() {
        return userID;
    }

    public TechnicalDataTimeLine userID(Long userID) {
        this.userID = userID;
        return this;
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

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TechnicalDataTimeLine)) {
            return false;
        }
        return id != null && id.equals(((TechnicalDataTimeLine) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TechnicalDataTimeLine{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", value='" + getValue() + "'" +
            ", equipmentID=" + getEquipmentID() +
            ", time='" + getTime() + "'" +
            ", serial='" + getSerial() + "'" +
            ", userID=" + getUserID() +
            "}";
    }
}
