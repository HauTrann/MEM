package com.mycompany.myapp.repository.Impl;

import com.mycompany.myapp.domain.RequestReceiveDevice;
import com.mycompany.myapp.repository.RequestReceiveDeviceRepositoryCustom;
import com.mycompany.myapp.service.dto.DeviceModelDTO;
import com.mycompany.myapp.service.dto.EquipmentDTO;
import com.mycompany.myapp.service.dto.RequestReceiveDeviceDTO;
import com.mycompany.myapp.service.util.Common;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Spring Data  repository for the RequestReceiveDevice entity.
 */
@SuppressWarnings("unused")
public class RequestReceiveDeviceRepositoryImpl implements RequestReceiveDeviceRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public Page<RequestReceiveDevice> findAllByOrganizationUnitIDAndByIsPay(Pageable pageable, Long organizationUnitID, Boolean pay) {
        StringBuilder sql = new StringBuilder();
        List<RequestReceiveDevice> requestReceiveDevices = new ArrayList<>();
        List<RequestReceiveDeviceDTO> requestReceiveDeviceDTOS = new ArrayList<>();
        Map<String, Object> params = new HashMap<>();
        sql.append(" from request_receive_device r left join jhi_user u on u.id = r.userID\n" +
            "left join department d on u.department_id = d.id where r.organizationUnitID = :organizationUnitID and r.isPay =:pay ");
        params.put("organizationUnitID", organizationUnitID);
        params.put("pay", pay ? 1 : 0);

        Query countQuerry = entityManager.createNativeQuery("SELECT Count(1) " + sql.toString());
        Common.setParams(countQuerry, params);
        Number total = (Number) countQuerry.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("select r.*, d.name as DepartmentName " + sql.toString(), "RequestReceiveDeviceDTO");
            Common.setParamsWithPageable(query, params, pageable, total);
            requestReceiveDevices = query.getResultList();
        }
        return new PageImpl<>(requestReceiveDevices, pageable, total.longValue());
    }
}
