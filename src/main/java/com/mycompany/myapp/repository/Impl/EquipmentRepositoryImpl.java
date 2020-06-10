package com.mycompany.myapp.repository.Impl;

import com.google.common.base.Strings;
import com.mycompany.myapp.repository.EquipmentRepositoryCustom;
import com.mycompany.myapp.service.dto.DeviceModelDTO;
import com.mycompany.myapp.service.util.Common;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;

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
        sql.append("select * from (select id,\n" +
            "       organization_unit_id organizationUnitID,\n" +
            "       code,\n" +
            "       name,\n" +
            "       equipment_type_id    equipmentTypeID,\n" +
            "       null                 medicalSuppliesTypeID,\n" +
            "       status,\n" +
            "       description\n" +
            "from equipment\n" +
            "union all\n" +
            "select id,\n" +
            "       organization_unit_id     organizationUnitID,\n" +
            "       code,\n" +
            "       name,\n" +
            "       null                     equipmentTypeID,\n" +
            "       medical_supplies_type_id medicalSuppliesTypeID,\n" +
            "       status,\n" +
            "       description\n" +
            "from medical_supplies) a\n" +
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
        sql.append("select * from (select id,\n" +
            "       organization_unit_id organizationUnitID,\n" +
            "       code,\n" +
            "       name,\n" +
            "       equipment_type_id    equipmentTypeID,\n" +
            "       null                 medicalSuppliesTypeID,\n" +
            "       status,\n" +
            "       description\n" +
            "from equipment\n" +
            "union all\n" +
            "select id,\n" +
            "       organization_unit_id     organizationUnitID,\n" +
            "       code,\n" +
            "       name,\n" +
            "       null                     equipmentTypeID,\n" +
            "       medical_supplies_type_id medicalSuppliesTypeID,\n" +
            "       status,\n" +
            "       description\n" +
            "from medical_supplies) a\n" +
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
}
