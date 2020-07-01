package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.ProposedRepairAndMaintainDetailsService;
import com.mycompany.myapp.domain.ProposedRepairAndMaintainDetails;
import com.mycompany.myapp.repository.ProposedRepairAndMaintainDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ProposedRepairAndMaintainDetails}.
 */
@Service
@Transactional
public class ProposedRepairAndMaintainDetailsServiceImpl implements ProposedRepairAndMaintainDetailsService {

    private final Logger log = LoggerFactory.getLogger(ProposedRepairAndMaintainDetailsServiceImpl.class);

    private final ProposedRepairAndMaintainDetailsRepository proposedRepairAndMaintainDetailsRepository;

    public ProposedRepairAndMaintainDetailsServiceImpl(ProposedRepairAndMaintainDetailsRepository proposedRepairAndMaintainDetailsRepository) {
        this.proposedRepairAndMaintainDetailsRepository = proposedRepairAndMaintainDetailsRepository;
    }

    /**
     * Save a proposedRepairAndMaintainDetails.
     *
     * @param proposedRepairAndMaintainDetails the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ProposedRepairAndMaintainDetails save(ProposedRepairAndMaintainDetails proposedRepairAndMaintainDetails) {
        log.debug("Request to save ProposedRepairAndMaintainDetails : {}", proposedRepairAndMaintainDetails);
        return proposedRepairAndMaintainDetailsRepository.save(proposedRepairAndMaintainDetails);
    }

    /**
     * Get all the proposedRepairAndMaintainDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProposedRepairAndMaintainDetails> findAll(Pageable pageable) {
        log.debug("Request to get all ProposedRepairAndMaintainDetails");
        return proposedRepairAndMaintainDetailsRepository.findAll(pageable);
    }

    /**
     * Get one proposedRepairAndMaintainDetails by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProposedRepairAndMaintainDetails> findOne(Long id) {
        log.debug("Request to get ProposedRepairAndMaintainDetails : {}", id);
        return proposedRepairAndMaintainDetailsRepository.findById(id);
    }

    /**
     * Delete the proposedRepairAndMaintainDetails by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProposedRepairAndMaintainDetails : {}", id);
        proposedRepairAndMaintainDetailsRepository.deleteById(id);
    }
}
