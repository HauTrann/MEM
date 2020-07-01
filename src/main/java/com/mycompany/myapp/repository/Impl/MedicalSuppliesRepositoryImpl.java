package com.mycompany.myapp.repository.Impl;

import com.mycompany.myapp.domain.MedicalSupplies;
import com.mycompany.myapp.repository.MedicalSuppliesRepositoryCustom;
import com.mycompany.myapp.service.dto.EquipmentDTO;
import com.mycompany.myapp.service.dto.MedicalSuppliesDTO;
import com.mycompany.myapp.service.util.Common;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MedicalSuppliesRepositoryImpl implements MedicalSuppliesRepositoryCustom {
    @Autowired
    private EntityManager entityManager;


    @Override
    public Page<MedicalSupplies> findAllForEmployee(Pageable pageable, Long org) {
        StringBuilder sql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        List<MedicalSupplies> lst = new ArrayList<>();
        sql.append("(select r.organizationUnitID,\n" +
            "       m.id,\n" +
            "       m.code,\n" +
            "       m.name,\n" +
            "       mt.name                                                        as medicalSuppliesTypeNam,\n" +
            "       r.repositoryID,\n" +
            "       rp.name                                                        as repositoryName,\n" +
            "       (SUM(ISNULL(r.inquantity, 0)) - SUM(ISNULL(r.outquantity, 0))) as stt\n" +
            "from repository_ledger r\n" +
            "         inner join medical_supplies m on m.id = r.prodID\n" +
            "         left join medical_supplies_type mt on mt.id = m.medical_supplies_type_id\n" +
            "         left join repository rp on rp.id = r.repositoryID\n" +
            "group by r.organizationUnitID, m.id, m.code, m.name, mt.name, r.repositoryID, rp.name) a " +
            "where a.organizationUnitID = :org ");
        params.put("org", org);
        Query countQuerry = entityManager.createNativeQuery("SELECT Count(1) " + sql.toString());
        Common.setParams(countQuerry, params);
        Number total = (Number) countQuerry.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("SELECT e.id id, e.organization_unit_id organizationUnitID," +
                " e.equipment_type_id equipmentTypeID, e.code code, e.name name, e.description description, e.status status, e.group_of_equipment groupOfEquipment, et.name as equipmentTypeName , NULL serial  " + sql.toString(), "EquipmentDTO");
            Common.setParamsWithPageable(query, params, pageable, total);
            lst = query.getResultList();
        }
        return new PageImpl<>(((List<MedicalSupplies>) lst), pageable, total.longValue());
    }

    @Override
    public Page<MedicalSuppliesDTO> findAllByOrganizationUnitIDUsing(Pageable pageable, Long org, Long userID) {
        StringBuilder sql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        List<MedicalSuppliesDTO> lst = new ArrayList<>();
        sql.append(" from (select r.prodID                                                       as id,\n" +
            "             r.organizationUnitID,\n" +
            "             r.userID,\n" +
            "             r.departmentID,\n" +
            "             e.code,\n" +
            "             e.name,\n" +
            "             et.id                                                          as medicalSuppliesTypeID,\n" +
            "             et.name                                                        as medicalSuppliesTypeName,\n" +
            "             e.status                                                          status,\n" +
            "             e.description,\n" +
            "             r.outOfStock,\n" +
            "             r.repositoryID,\n" +
            "             rp.name                                                        as repositoryName,\n" +
            "             SUM(ISNULL(r.inquantity, 0))                                   as totalIW,\n" +
            "             SUM(ISNULL(r.outquantity, 0))                                  as totalOW,\n" +
            "             (SUM(ISNULL(r.inquantity, 0)) - SUM(ISNULL(r.outquantity, 0))) as stt\n" +
            "      from repository_ledger r\n" +
            "               inner join medical_supplies e on e.id = r.prodID\n" +
            "               left join medical_supplies_type et on et.id = e.medical_supplies_type_id\n" +
            "               left join repository rp on rp.id = r.repositoryID\n" +
            "      group by r.prodID, r.organizationUnitID, r.userID, r.departmentID, e.code, e.name, et.id, et.name, e.status, e.description, r.outOfStock, r.repositoryID, rp.name) a " +
            "where a.userID =:userID");
        params.put("userID", userID);
        Query countQuerry = entityManager.createNativeQuery("SELECT Count(1) " + sql.toString());
        Common.setParams(countQuerry, params);
        Number total = (Number) countQuerry.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("SELECT a.* " + sql.toString(), "MedicalSuppliesDTO");
            Common.setParamsWithPageable(query, params, pageable, total);
            lst = query.getResultList();
        }
        return new PageImpl<>(((List<MedicalSuppliesDTO>) lst), pageable, total.longValue());
    }
}
