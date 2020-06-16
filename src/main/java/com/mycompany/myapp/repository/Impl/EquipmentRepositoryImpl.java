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
                " e.equipment_type_id equipmentTypeID, e.code code, e.name name, e.description description, e.status status, e.group_of_equipment groupOfEquipment, et.name as equipmentTypeName   " + sql.toString(), "EquipmentDTO");
            Common.setParamsWithPageable(query, params, pageable, total);
            lst = query.getResultList();
        }
        return new PageImpl<>(((List<EquipmentDTO>) lst), pageable, total.longValue());
    }
}
