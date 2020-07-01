package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.ProposedRepairAndMaintainService;
import com.mycompany.myapp.domain.ProposedRepairAndMaintain;
import com.mycompany.myapp.repository.ProposedRepairAndMaintainRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ProposedRepairAndMaintain}.
 */
@Service
@Transactional
public class ProposedRepairAndMaintainServiceImpl implements ProposedRepairAndMaintainService {

    private final Logger log = LoggerFactory.getLogger(ProposedRepairAndMaintainServiceImpl.class);

    private final ProposedRepairAndMaintainRepository proposedRepairAndMaintainRepository;

    public ProposedRepairAndMaintainServiceImpl(ProposedRepairAndMaintainRepository proposedRepairAndMaintainRepository) {
        this.proposedRepairAndMaintainRepository = proposedRepairAndMaintainRepository;
    }

    /**
     * Save a proposedRepairAndMaintain.
     *
     * @param proposedRepairAndMaintain the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ProposedRepairAndMaintain save(ProposedRepairAndMaintain proposedRepairAndMaintain) {
        log.debug("Request to save ProposedRepairAndMaintain : {}", proposedRepairAndMaintain);
        if (proposedRepairAndMaintain.getOrganizationUnitID() == null) {
            proposedRepairAndMaintain.setOrganizationUnitID(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
        return proposedRepairAndMaintainRepository.save(proposedRepairAndMaintain);
    }

    /**
     * Get all the proposedRepairAndMaintains.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProposedRepairAndMaintain> findAll(Pageable pageable) {
        log.debug("Request to get all ProposedRepairAndMaintains");
        return proposedRepairAndMaintainRepository.findAll(pageable);
    }

    /**
     * Get one proposedRepairAndMaintain by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProposedRepairAndMaintain> findOne(Long id) {
        log.debug("Request to get ProposedRepairAndMaintain : {}", id);
        return proposedRepairAndMaintainRepository.findById(id);
    }

    /**
     * Delete the proposedRepairAndMaintain by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProposedRepairAndMaintain : {}", id);
        proposedRepairAndMaintainRepository.deleteById(id);
    }
}
