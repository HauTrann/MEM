package com.mycompany.myapp.repository.Impl;

import com.google.common.base.Strings;
import com.mycompany.myapp.domain.Equipment;
import com.mycompany.myapp.repository.EquipmentRepositoryCustom;
import com.mycompany.myapp.service.dto.DeviceModelDTO;
import com.mycompany.myapp.service.dto.EquipmentDTO;
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

/**
 * Spring Data  repository for the Equipment entity.
 */
@SuppressWarnings("unused")
public class EquipmentRepositoryImpl implements EquipmentRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<DeviceModelDTO> findAllbyCodeText(String text, Long org) {
        StringBuilder sql = new StringBuilder();
        List<DeviceModelDTO> deviceModelDTOS = new ArrayList<>();
        Map<String, Object> params = new HashMap<>();
        sql.append("select * from (select id, " +
            "       organization_unit_id organizationUnitID, " +
            "       code, " +
            "       name, " +
            "       equipment_type_id    equipmentTypeID, " +
            "       null                 medicalSuppliesTypeID, " +
            "       status, " +
            "       description " +
            "from equipment " +
            "union all " +
            "select id, " +
            "       organization_unit_id     organizationUnitID, " +
            "       code, " +
            "       name, " +
            "       null                     equipmentTypeID, " +
            "       medical_supplies_type_id medicalSuppliesTypeID, " +
            "       status, " +
            "       description " +
            "from medical_supplies) a " +
            "where a.name like '%" + text + "% ' and a.organizationUnitID = :org order by a.code ");
        params.put("org", org);

        /*Query countQuerry = entityManager.createNativeQuery("SELECT Count(1) " + sql.toString());
        Common.setParams(countQuerry, params);
        Number total = (Number) countQuerry.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("SELECT * " + sql.toString(), AccountList.class);
            accountLists = query.getResultList();
        }*/
        Query query = entityManager.createNativeQuery(sql.toString(), "DeviceModelDTO");
        Common.setParams(query, params);
        deviceModelDTOS = query.getResultList();
        return deviceModelDTOS;
    }

    @Override
    public List<DeviceModelDTO> findAllDevice(Long org) {
        StringBuilder sql = new StringBuilder();
        List<DeviceModelDTO> deviceModelDTOS = new ArrayList<>();
        Map<String, Object> params = new HashMap<>();
        sql.append("select * from (select id, " +
            "       organization_unit_id organizationUnitID, " +
            "       code, " +
            "       name, " +
            "       equipment_type_id    equipmentTypeID, " +
            "       null                 medicalSuppliesTypeID, " +
            "       status, " +
            "       description, " +
            "       0 isMedicalSupplies " +
            "from equipment " +
            "union all " +
            "select id, " +
            "       organization_unit_id     organizationUnitID, " +
            "       code, " +
            "       name, " +
            "       null                     equipmentTypeID, " +
            "       medical_supplies_type_id medicalSuppliesTypeID, " +
            "       status, " +
            "       description, " +
            "       1 isMedicalSupplies " +
            "from medical_supplies) a " +
            "where a.organizationUnitID = :org order by a.code ");
        params.put("org", org);
        /*Query countQuerry = entityManager.createNativeQuery("SELECT Count(1) " + sql.toString());
        Common.setParams(countQuerry, params);
        Number total = (Number) countQuerry.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("SELECT * " + sql.toString(), AccountList.class);
            accountLists = query.getResultList();
        }*/
        Query query = entityManager.createNativeQuery(sql.toString(), "DeviceModelDTO");
        Common.setParams(query, params);
        deviceModelDTOS = query.getResultList();
        return deviceModelDTOS;
    }

    @Override
    public List<DeviceModelDTO> findAllDeviceDTO(Long org) {
        StringBuilder sql = new StringBuilder();
        List<DeviceModelDTO> deviceModelDTOS = new ArrayList<>();
        Map<String, Object> params = new HashMap<>();
        sql.append("SELECT * from (select DISTINCT r.prodID             id,\n" +
            "                r.organizationUnitID,\n" +
            "                eq.code,\n" +
            "                eq.name,\n" +
            "                eq.equipment_type_id equipmentTypeID,\n" +
            "                NULL                 medicalSuppliesTypeID,\n" +
            "                eq.status,\n" +
            "                eq.description,\n" +
            "                0                    isMedicalSupplies,\n" +
            "                r.serial             serial\n" +
            "from repository_ledger r\n" +
            "         inner join equipment eq on eq.id = r.prodID\n" +
            "where r.outOfStock = 0\n" +
            "union all\n" +
            "select DISTINCT r.prodID                    id,\n" +
            "                r.organizationUnitID,\n" +
            "                mc.code,\n" +
            "                mc.name,\n" +
            "                NULL                        equipmentTypeID,\n" +
            "                mc.medical_supplies_type_id medicalSuppliesTypeID,\n" +
            "                mc.status,\n" +
            "                mc.description,\n" +
            "                1                           isMedicalSupplies,\n" +
            "                r.serial                    serial\n" +
            "from repository_ledger r\n" +
            "         inner join medical_supplies mc on mc.id = r.prodID\n" +
            "where r.outOfStock = 0) a " +
            "where a.organizationUnitID = :org order by a.code");
        params.put("org", org);
        /*Query countQuerry = entityManager.createNativeQuery("SELECT Count(1) " + sql.toString());
        Common.setParams(countQuerry, params);
        Number total = (Number) countQuerry.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("SELECT * " + sql.toString(), AccountList.class);
            accountLists = query.getResultList();
        }*/
        Query query = entityManager.createNativeQuery(sql.toString(), "DeviceModelDTO1");
        Common.setParams(query, params);
        deviceModelDTOS = query.getResultList();
        return deviceModelDTOS;
    }

    @Override
    public Page<EquipmentDTO> findAllByOrganizationUnitIDCustom(Pageable pageable, Long id) {
        StringBuilder sql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        List<EquipmentDTO> lst = new ArrayList<>();
        sql.append("" +
            "from equipment e  " +
            "         left join equipment_type et on e.equipment_type_id = et.id  " +
            "where e.organization_unit_id = :organization_unit_id ");
        params.put("organization_unit_id", id);
        Query countQuerry = entityManager.createNativeQuery("SELECT Count(1) " + sql.toString());
        Common.setParams(countQuerry, params);
        Number total = (Number) countQuerry.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("SELECT e.id id, e.organization_unit_id organizationUnitID," +
                " e.equipment_type_id equipmentTypeID, e.code code, e.name name, e.description description, e.status status, e.group_of_equipment groupOfEquipment, et.name as equipmentTypeName , NULL serial  " + sql.toString(), "EquipmentDTO");
            Common.setParamsWithPageable(query, params, pageable, total);
            lst = query.getResultList();
        }
        return new PageImpl<>(((List<EquipmentDTO>) lst), pageable, total.longValue());
    }

    @Override
    public Page<EquipmentDTO> getAllEquipmentUsing(Pageable pageable, Long org, Long userID) {
        StringBuilder sql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        List<EquipmentDTO> lst = new ArrayList<>();
        sql.append("from (select r.prodID                                                       as id,\n" +
            "             r.organizationUnitID,\n" +
            "             e.code,\n" +
            "             e.name,\n" +
            "             r.serial,\n" +
            "             e.group_of_equipment as groupOfEquipment,\n" +
            "             et.id                                                          as equipmentTypeID,\n" +
            "             et.name                                                        as equipmentTypeName,\n" +
            "             null                                                              status,\n" +
            "             e.description,\n" +
            "             (SUM(ISNULL(r.inquantity, 0)) - SUM(ISNULL(r.outquantity, 0))) as stt\n" +
            "      from repository_ledger r\n" +
            "               inner join equipment e on e.id = r.prodID\n" +
            "               left join equipment_type et on et.id = e.equipment_type_id\n" +
            "      where userID = :userID\n" +
            "      group by r.prodID, e.code, e.name, et.name, r.serial, e.group_of_equipment, r.organizationUnitID, e.description,\n" +
            "               et.id) a" +
            " where a.stt <>0 ");
        params.put("userID", userID);
        Query countQuerry = entityManager.createNativeQuery("SELECT Count(1) " + sql.toString());
        Common.setParams(countQuerry, params);
        Number total = (Number) countQuerry.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("SELECT * " + sql.toString(), "EquipmentDTO");
            Common.setParamsWithPageable(query, params, pageable, total);
            lst = query.getResultList();
        }
        return new PageImpl<>(((List<EquipmentDTO>) lst), pageable, total.longValue());
    }

    @Override
    public List<EquipmentDTO> getAllEquipmentDT(Long id) {
        StringBuilder sql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        List<EquipmentDTO> lst = new ArrayList<>();
        sql.append("from (select\n" +
            "             e.id,\n" +
            "             e.code                                            ,\n" +
            "             e.name                                            ,\n" +
            "             r.serial,\n" +
            "             rp.code                                           as repositoryCode,\n" +
            "             rp.name                                           as repositoryName,\n" +
            "             et.name                                           as equipmentTypeName,\n" +
            "             sum(r.inquantity) - SUM(ISNULL(r.outquantity, 0)) as tonKho\n" +
            "      from repository_ledger r\n" +
            "               inner join equipment e on e.id = r.prodID\n" +
            "               left join equipment_type et on et.id = e.equipment_type_id\n" +
            "               left join repository rp on rp.id = r.repositoryID\n" +
            "      group by e.code, e.name, e.id, rp.code, rp.name, r.serial, et.name, e.id\n" +
            "     ) a\n" +
            "where id = :id ");
        params.put("id", id);
        Query countQuerry = entityManager.createNativeQuery("SELECT Count(1) " + sql.toString());
        Common.setParams(countQuerry, params);
        Number total = (Number) countQuerry.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("SELECT * " + sql.toString(), "EquipmentDTODetail");
            Common.setParams(query, params);
            lst = query.getResultList();
        }
        return lst;
    }
}
