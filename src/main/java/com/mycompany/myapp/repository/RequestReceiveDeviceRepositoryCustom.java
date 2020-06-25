package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.RequestReceiveDevice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RequestReceiveDevice entity.
 */
@SuppressWarnings("unused")
public interface RequestReceiveDeviceRepositoryCustom {
    Page<RequestReceiveDevice> findAllByOrganizationUnitIDAndByIsPay(Pageable pageable, Long userID, Boolean pay);
}
