package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.RepositoryLedger;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RepositoryLedger entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepositoryLedgerRepository extends JpaRepository<RepositoryLedger, Long>, RepositoryLedgerRepositoryCustom {

    void deleteAllByOrganizationUnitIDAndRefID(Long org, Long refID);

    @Query(value = "select TOP(1) a.stt " +
        "from (select r.prodID                                                       as id, " +
        "             r.organizationUnitID, " +
        "             e.code, " +
        "             e.name, " +
        "             r.serial, " +
        "             r.repositoryID, " +
        "             rp.name                                                           repositoryName, " +
        "             e.group_of_equipment                                           as groupOfEquipment, " +
        "             et.id                                                          as equipmentTypeID, " +
        "             et.name                                                        as equipmentTypeName, " +
        "             null                                                              status, " +
        "             e.description, " +
        "             (SUM(ISNULL(r.inquantity, 0)) - SUM(ISNULL(r.outquantity, 0))) as stt " +
        "      from repository_ledger r " +
        "               inner join equipment e on e.id = r.prodID " +
        "               left join equipment_type et on et.id = e.equipment_type_id " +
        "               left join repository rp on rp.id = r.repositoryID " +
        "      group by r.prodID, e.code, e.name, et.name, r.serial, r.repositoryID, rp.name, e.group_of_equipment, " +
        "               r.organizationUnitID, " +
        "               e.description, " +
        "               et.id) a " +
        "where a.organizationUnitID = ?1 " +
        "  and a.serial = ?2 " +
        "  and a.repositoryID = ?3 ", nativeQuery = true)
    Number checkTonKho(Long org, String serial, Long id);

    @Query(value = "select a.stt " +
        "from (select r.prodID                                                       as id, " +
        "             r.organizationUnitID, " +
        "             e.code, " +
        "             e.name, " +
        "             r.serial, " +
        "             r.repositoryID, " +
        "             rp.name                                                           repositoryName, " +
        "             NULL                                                           as groupOfEquipment, " +
        "             et.id                                                          as equipmentTypeID, " +
        "             et.name                                                        as equipmentTypeName, " +
        "             null                                                              status, " +
        "             e.description, " +
        "             (SUM(ISNULL(r.inquantity, 0)) - SUM(ISNULL(r.outquantity, 0))) as stt " +
        "      from repository_ledger r " +
        "               inner join medical_supplies e on e.id = r.prodID " +
        "               left join medical_supplies_type et on et.id = e.medical_supplies_type_id " +
        "               left join repository rp on rp.id = r.repositoryID " +
        "      group by r.prodID, e.code, e.name, et.name, r.serial, r.repositoryID, rp.name, " +
        "               r.organizationUnitID, " +
        "               e.description, " +
        "               et.id) a " +
        "where a.organizationUnitID = ?1 " +
        "  and a.id = ?2 " +
        "  and a.repositoryID = ?3", nativeQuery = true)
    Number checkTonKhoVT(Long org, Long serial, Long id);

}
