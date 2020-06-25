package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.RequestReceiveDevice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link RequestReceiveDevice}.
 */
public interface RequestReceiveDeviceService {

    /**
     * Save a requestReceiveDevice.
     *
     * @param requestReceiveDevice the entity to save.
     * @return the persisted entity.
     */
    RequestReceiveDevice save(RequestReceiveDevice requestReceiveDevice);

    /**
     * Get all the requestReceiveDevices.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RequestReceiveDevice> findAll(Pageable pageable);

    Page<RequestReceiveDevice> findAllForEmployee(Pageable pageable);
    Page<RequestReceiveDevice> findAllForEmployeePay(Pageable pageable);

    Page<RequestReceiveDevice> findAllForManager(Pageable pageable);
    Page<RequestReceiveDevice> findAllForManagerPay(Pageable pageable);

    /**
     * Get the "id" requestReceiveDevice.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RequestReceiveDevice> findOne(Long id);

    /**
     * Delete the "id" requestReceiveDevice.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
