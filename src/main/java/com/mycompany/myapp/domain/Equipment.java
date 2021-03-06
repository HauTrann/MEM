package com.mycompany.myapp.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mycompany.myapp.service.dto.DeviceModelDTO;
import com.mycompany.myapp.service.dto.EquipmentDTO;
import com.mycompany.myapp.service.dto.SoTheoDoiDauTu;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Equipment.
 */
@Entity
@Table(name = "equipment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@SqlResultSetMappings({
    @SqlResultSetMapping(
        name = "DeviceModelDTO",
        classes = {
            @ConstructorResult(
                targetClass = DeviceModelDTO.class,
                columns = {
                    @ColumnResult(name = "id", type = Long.class),
                    @ColumnResult(name = "organizationUnitID", type = Long.class),
                    @ColumnResult(name = "code", type = String.class),
                    @ColumnResult(name = "name", type = String.class),
                    @ColumnResult(name = "equipmentTypeID", type = Long.class),
                    @ColumnResult(name = "medicalSuppliesTypeID", type = Long.class),
                    @ColumnResult(name = "status", type = Integer.class),
                    @ColumnResult(name = "description", type = String.class),
                    @ColumnResult(name = "isMedicalSupplies", type = Boolean.class),
                }
            )
        }
    ),
    @SqlResultSetMapping(
        name = "DeviceModelDTO1",
        classes = {
            @ConstructorResult(
                targetClass = DeviceModelDTO.class,
                columns = {
                    @ColumnResult(name = "id", type = Long.class),
                    @ColumnResult(name = "organizationUnitID", type = Long.class),
                    @ColumnResult(name = "code", type = String.class),
                    @ColumnResult(name = "name", type = String.class),
                    @ColumnResult(name = "equipmentTypeID", type = Long.class),
                    @ColumnResult(name = "medicalSuppliesTypeID", type = Long.class),
                    @ColumnResult(name = "status", type = Integer.class),
                    @ColumnResult(name = "description", type = String.class),
                    @ColumnResult(name = "isMedicalSupplies", type = Boolean.class),
                    @ColumnResult(name = "serial", type = String.class),
                }
            )
        }
    ),
    @SqlResultSetMapping(
        name = "EquipmentDTO",
        classes = {
            @ConstructorResult(
                targetClass = EquipmentDTO.class,
                columns = {
                    @ColumnResult(name = "id", type = Long.class),
                    @ColumnResult(name = "organizationUnitID", type = Long.class),
                    @ColumnResult(name = "code", type = String.class),
                    @ColumnResult(name = "name", type = String.class),
                    @ColumnResult(name = "equipmentTypeID", type = Long.class),
                    @ColumnResult(name = "equipmentTypeName", type = String.class),
                    @ColumnResult(name = "status", type = Integer.class),
                    @ColumnResult(name = "description", type = String.class),
                    @ColumnResult(name = "groupOfEquipment", type = String.class),
                    @ColumnResult(name = "serial", type = String.class),
                }
            )
        }
    ),
    @SqlResultSetMapping(
        name = "EquipmentDTODetail",
        classes = {
            @ConstructorResult(
                targetClass = EquipmentDTO.class,
                columns = {
                    @ColumnResult(name = "id", type = Long.class),
                    @ColumnResult(name = "code", type = String.class),
                    @ColumnResult(name = "name", type = String.class),
                    @ColumnResult(name = "equipmentTypeName", type = String.class),
                    @ColumnResult(name = "serial", type = String.class),
                    @ColumnResult(name = "repositoryCode", type = String.class),
                    @ColumnResult(name = "repositoryName", type = String.class),
                    @ColumnResult(name = "tonKho", type = BigDecimal.class),
                }
            )
        }
    ),
    @SqlResultSetMapping(
        name = "SoTheoDoiDauTu",
        classes = {
            @ConstructorResult(
                targetClass = SoTheoDoiDauTu.class,
                columns = {
                    @ColumnResult(name = "date", type = LocalDateTime.class),
                    @ColumnResult(name = "postedDate", type = LocalDateTime.class),
                    @ColumnResult(name = "no", type = String.class),
                    @ColumnResult(name = "reason", type = String.class),
                    @ColumnResult(name = "deliver", type = String.class),
                    @ColumnResult(name = "phoneContact", type = String.class),
                    @ColumnResult(name = "amount", type = BigDecimal.class),
                    @ColumnResult(name = "unitPrice", type = BigDecimal.class),
                    @ColumnResult(name = "quantity", type = BigDecimal.class),
                    @ColumnResult(name = "prodName", type = String.class),
                }
            )
        }
    ),
    @SqlResultSetMapping(
        name = "TongHopTonKho",
        classes = {
            @ConstructorResult(
                targetClass = SoTheoDoiDauTu.class,
                columns = {
                    @ColumnResult(name = "prodName", type = String.class),
                    @ColumnResult(name = "repositoryName", type = String.class),
                    @ColumnResult(name = "nhapKho", type = BigDecimal.class),
                    @ColumnResult(name = "xuatKho", type = BigDecimal.class),
                    @ColumnResult(name = "tonKho", type = BigDecimal.class),
                }
            )
        }
    ),
    @SqlResultSetMapping(
        name = "TongHopTonKhoCT",
        classes = {
            @ConstructorResult(
                targetClass = SoTheoDoiDauTu.class,
                columns = {
                    @ColumnResult(name = "prodName", type = String.class),
                    @ColumnResult(name = "repositoryName", type = String.class),
                    @ColumnResult(name = "nhapKho", type = BigDecimal.class),
                    @ColumnResult(name = "xuatKho", type = BigDecimal.class),
                    @ColumnResult(name = "tonKho", type = BigDecimal.class),
                    @ColumnResult(name = "serial", type = String.class),
                }
            )
        }
    )
})

public class Equipment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "organization_unit_id")
    private Long organizationUnitID;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "equipment_type_id")
    private Long equipmentTypeID;

    @Transient
    @JsonDeserialize
    @JsonSerialize
    private String equipmentTypeName;

    @Column(name = "status")
    private Integer status;

    @Column(name = "description")
    private String description;

    @Column(name = "qrcode")
    private String qrcode;

    @Column(name = "group_of_equipment")
    private String groupOfEquipment;

    @OneToMany(cascade = {CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "equipmentID")
    private Set<TechnicalData> technicalData = new HashSet<>();

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

    public Equipment organizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
        return this;
    }

    public void setOrganizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
    }

    public String getCode() {
        return code;
    }

    public Equipment code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public Equipment name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getEquipmentTypeID() {
        return equipmentTypeID;
    }

    public Equipment equipmentTypeID(Long equipmentTypeID) {
        this.equipmentTypeID = equipmentTypeID;
        return this;
    }

    public void setEquipmentTypeID(Long equipmentTypeID) {
        this.equipmentTypeID = equipmentTypeID;
    }

    public Integer getStatus() {
        return status;
    }

    public Equipment status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public Equipment description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getQrcode() {
        return qrcode;
    }

    public Equipment qrcode(String qrcode) {
        this.qrcode = qrcode;
        return this;
    }

    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }

    public String getGroupOfEquipment() {
        return groupOfEquipment;
    }

    public void setGroupOfEquipment(String groupOfEquipment) {
        this.groupOfEquipment = groupOfEquipment;
    }

    public Set<TechnicalData> getTechnicalData() {
        return technicalData;
    }

    public void setTechnicalData(Set<TechnicalData> technicalData) {
        this.technicalData = technicalData;
    }

    public String getEquipmentTypeName() {
        return equipmentTypeName;
    }

    public void setEquipmentTypeName(String equipmentTypeName) {
        this.equipmentTypeName = equipmentTypeName;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Equipment)) {
            return false;
        }
        return id != null && id.equals(((Equipment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Equipment{" +
            "id=" + getId() +
            ", organizationUnitID=" + getOrganizationUnitID() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", equipmentTypeID=" + getEquipmentTypeID() +
            ", status=" + getStatus() +
            ", description='" + getDescription() + "'" +
            ", qrcode='" + getQrcode() + "'" +
            "}";
    }
}
