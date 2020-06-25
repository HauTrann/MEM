package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.RequestReceiveDeviceDetails;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link RequestReceiveDeviceDetails}.
 */
public interface RequestReceiveDeviceDetailsService {

    /**
     * Save a requestReceiveDeviceDetails.
     *
     * @param requestReceiveDeviceDetails the entity to save.
     * @return the persisted entity.
     */
    RequestReceiveDeviceDetails save(RequestReceiveDeviceDetails requestReceiveDeviceDetails);

    /**
     * Get all the requestReceiveDeviceDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RequestReceiveDeviceDetails> findAll(Pageable pageable);

    /**
     * Get the "id" requestReceiveDeviceDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RequestReceiveDeviceDetails> findOne(Long id);

    /**
     * Delete the "id" requestReceiveDeviceDetails.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
