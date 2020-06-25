package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.RequestReceiveDevice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RequestReceiveDevice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequestReceiveDeviceRepository extends JpaRepository<RequestReceiveDevice, Long>, RequestReceiveDeviceRepositoryCustom {

//    Page<RequestReceiveDevice> findAllByOrganizationUnitID(Pageable pageable, Long org);

    /*@Query(value = "select r.*, d.name as departmentName from request_receive_device r left join jhi_user u on u.id = r.userID " +
        "left join department d on u.department_id = d.id where r.userID = ?1 ", nativeQuery = true)*/
    Page<RequestReceiveDevice> findAllByUserIDAndIsPay(Pageable pageable, Long userID, Boolean pay);
}
