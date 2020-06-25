package com.mycompany.myapp.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mycompany.myapp.service.dto.RequestReceiveDeviceDTO;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A RequestReceiveDevice.
 */
@Entity
@Table(name = "request_receive_device")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@SqlResultSetMappings({
    @SqlResultSetMapping(
        name = "RequestReceiveDeviceDTO",
        classes = {
            @ConstructorResult(
                targetClass = RequestReceiveDeviceDTO.class,
                columns = {
                    @ColumnResult(name = "id", type = Long.class),
                    @ColumnResult(name = "organizationUnitID", type = Long.class),
                    @ColumnResult(name = "userid", type = Long.class),
                    @ColumnResult(name = "username", type = String.class),
                    @ColumnResult(name = "requestdate", type = LocalDateTime.class),
                    @ColumnResult(name = "dateofdelivery", type = LocalDateTime.class),
                    @ColumnResult(name = "description", type = String.class),
                    @ColumnResult(name = "status", type = Integer.class),
                    @ColumnResult(name = "departmentName", type = String.class),
                    @ColumnResult(name = "isPay", type = Boolean.class),
                }
            )
        }
    )
})
public class RequestReceiveDevice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "organizationunitid")
    private Long organizationUnitID;

    @Column(name = "userid")
    private Long userID;

    @Column(name = "username")
    private String userName;

    @Column(name = "requestdate")
    private LocalDateTime requestDate;

    @Column(name = "dateofdelivery")
    private LocalDateTime dateOfDelivery;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private Integer status;

    @Column(name = "ispay")
    private Boolean isPay;

    @OneToMany(cascade = {CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "requestreceivedeviceid")
    private Set<RequestReceiveDeviceDetails> requestReceiveDeviceDetails = new HashSet<>();

    @Transient
    @JsonSerialize
    @JsonDeserialize
    private String departmentName;

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

    public RequestReceiveDevice organizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
        return this;
    }

    public void setOrganizationUnitID(Long organizationUnitID) {
        this.organizationUnitID = organizationUnitID;
    }

    public Long getUserID() {
        return userID;
    }

    public RequestReceiveDevice userID(Long userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public RequestReceiveDevice requestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
        return this;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public LocalDateTime getDateOfDelivery() {
        return dateOfDelivery;
    }

    public RequestReceiveDevice dateOfDelivery(LocalDateTime dateOfDelivery) {
        this.dateOfDelivery = dateOfDelivery;
        return this;
    }

    public void setDateOfDelivery(LocalDateTime dateOfDelivery) {
        this.dateOfDelivery = dateOfDelivery;
    }

    public String getDescription() {
        return description;
    }

    public RequestReceiveDevice description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public RequestReceiveDevice status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Set<RequestReceiveDeviceDetails> getRequestReceiveDeviceDetails() {
        return requestReceiveDeviceDetails;
    }

    public void setRequestReceiveDeviceDetails(Set<RequestReceiveDeviceDetails> requestReceiveDeviceDetails) {
        this.requestReceiveDeviceDetails = requestReceiveDeviceDetails;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Boolean getIsPay() {
        return isPay;
    }

    public void setIsPay(Boolean pay) {
        isPay = pay;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RequestReceiveDevice)) {
            return false;
        }
        return id != null && id.equals(((RequestReceiveDevice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RequestReceiveDevice{" +
            "id=" + getId() +
            ", organizationUnitID=" + getOrganizationUnitID() +
            ", userID=" + getUserID() +
            ", requestDate='" + getRequestDate() + "'" +
            ", dateOfDelivery='" + getDateOfDelivery() + "'" +
            ", description='" + getDescription() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
