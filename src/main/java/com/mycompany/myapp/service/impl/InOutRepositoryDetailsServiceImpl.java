package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.InOutRepositoryDetailsService;
import com.mycompany.myapp.domain.InOutRepositoryDetails;
import com.mycompany.myapp.repository.InOutRepositoryDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link InOutRepositoryDetails}.
 */
@Service
@Transactional
public class InOutRepositoryDetailsServiceImpl implements InOutRepositoryDetailsService {

    private final Logger log = LoggerFactory.getLogger(InOutRepositoryDetailsServiceImpl.class);

    private final InOutRepositoryDetailsRepository inOutRepositoryDetailsRepository;

    public InOutRepositoryDetailsServiceImpl(InOutRepositoryDetailsRepository inOutRepositoryDetailsRepository) {
        this.inOutRepositoryDetailsRepository = inOutRepositoryDetailsRepository;
    }

    /**
     * Save a inOutRepositoryDetails.
     *
     * @param inOutRepositoryDetails the entity to save.
     * @return the persisted entity.
     */
    @Override
    public InOutRepositoryDetails save(InOutRepositoryDetails inOutRepositoryDetails) {
        log.debug("Request to save InOutRepositoryDetails : {}", inOutRepositoryDetails);
        return inOutRepositoryDetailsRepository.save(inOutRepositoryDetails);
    }

    /**
     * Get all the inOutRepositoryDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<InOutRepositoryDetails> findAll(Pageable pageable) {
        log.debug("Request to get all InOutRepositoryDetails");
        return inOutRepositoryDetailsRepository.findAll(pageable);
    }

    /**
     * Get one inOutRepositoryDetails by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<InOutRepositoryDetails> findOne(Long id) {
        log.debug("Request to get InOutRepositoryDetails : {}", id);
        return inOutRepositoryDetailsRepository.findById(id);
    }

    /**
     * Delete the inOutRepositoryDetails by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete InOutRepositoryDetails : {}", id);
        inOutRepositoryDetailsRepository.deleteById(id);
    }
}
