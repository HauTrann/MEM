package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.RequestReceiveDeviceDetailsService;
import com.mycompany.myapp.domain.RequestReceiveDeviceDetails;
import com.mycompany.myapp.repository.RequestReceiveDeviceDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link RequestReceiveDeviceDetails}.
 */
@Service
@Transactional
public class RequestReceiveDeviceDetailsServiceImpl implements RequestReceiveDeviceDetailsService {

    private final Logger log = LoggerFactory.getLogger(RequestReceiveDeviceDetailsServiceImpl.class);

    private final RequestReceiveDeviceDetailsRepository requestReceiveDeviceDetailsRepository;

    public RequestReceiveDeviceDetailsServiceImpl(RequestReceiveDeviceDetailsRepository requestReceiveDeviceDetailsRepository) {
        this.requestReceiveDeviceDetailsRepository = requestReceiveDeviceDetailsRepository;
    }

    /**
     * Save a requestReceiveDeviceDetails.
     *
     * @param requestReceiveDeviceDetails the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RequestReceiveDeviceDetails save(RequestReceiveDeviceDetails requestReceiveDeviceDetails) {
        log.debug("Request to save RequestReceiveDeviceDetails : {}", requestReceiveDeviceDetails);
        return requestReceiveDeviceDetailsRepository.save(requestReceiveDeviceDetails);
    }

    /**
     * Get all the requestReceiveDeviceDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RequestReceiveDeviceDetails> findAll(Pageable pageable) {
        log.debug("Request to get all RequestReceiveDeviceDetails");
        return requestReceiveDeviceDetailsRepository.findAll(pageable);
    }

    /**
     * Get one requestReceiveDeviceDetails by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RequestReceiveDeviceDetails> findOne(Long id) {
        log.debug("Request to get RequestReceiveDeviceDetails : {}", id);
        return requestReceiveDeviceDetailsRepository.findById(id);
    }

    /**
     * Delete the requestReceiveDeviceDetails by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RequestReceiveDeviceDetails : {}", id);
        requestReceiveDeviceDetailsRepository.deleteById(id);
    }
}
