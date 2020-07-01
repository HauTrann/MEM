package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ProposedRepairAndMaintain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ProposedRepairAndMaintain}.
 */
public interface ProposedRepairAndMaintainService {

    /**
     * Save a proposedRepairAndMaintain.
     *
     * @param proposedRepairAndMaintain the entity to save.
     * @return the persisted entity.
     */
    ProposedRepairAndMaintain save(ProposedRepairAndMaintain proposedRepairAndMaintain);

    /**
     * Get all the proposedRepairAndMaintains.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProposedRepairAndMaintain> findAll(Pageable pageable);

    /**
     * Get the "id" proposedRepairAndMaintain.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProposedRepairAndMaintain> findOne(Long id);

    /**
     * Delete the "id" proposedRepairAndMaintain.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
