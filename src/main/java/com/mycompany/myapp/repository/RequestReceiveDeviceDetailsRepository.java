package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.RequestReceiveDeviceDetails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RequestReceiveDeviceDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequestReceiveDeviceDetailsRepository extends JpaRepository<RequestReceiveDeviceDetails, Long> {
}
