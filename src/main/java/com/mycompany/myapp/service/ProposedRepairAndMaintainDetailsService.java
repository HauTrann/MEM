package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ProposedRepairAndMaintainDetails;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ProposedRepairAndMaintainDetails}.
 */
public interface ProposedRepairAndMaintainDetailsService {

    /**
     * Save a proposedRepairAndMaintainDetails.
     *
     * @param proposedRepairAndMaintainDetails the entity to save.
     * @return the persisted entity.
     */
    ProposedRepairAndMaintainDetails save(ProposedRepairAndMaintainDetails proposedRepairAndMaintainDetails);

    /**
     * Get all the proposedRepairAndMaintainDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProposedRepairAndMaintainDetails> findAll(Pageable pageable);

    /**
     * Get the "id" proposedRepairAndMaintainDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProposedRepairAndMaintainDetails> findOne(Long id);

    /**
     * Delete the "id" proposedRepairAndMaintainDetails.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
