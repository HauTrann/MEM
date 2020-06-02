package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.InOutRepositoryDetails;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link InOutRepositoryDetails}.
 */
public interface InOutRepositoryDetailsService {

    /**
     * Save a inOutRepositoryDetails.
     *
     * @param inOutRepositoryDetails the entity to save.
     * @return the persisted entity.
     */
    InOutRepositoryDetails save(InOutRepositoryDetails inOutRepositoryDetails);

    /**
     * Get all the inOutRepositoryDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<InOutRepositoryDetails> findAll(Pageable pageable);

    /**
     * Get the "id" inOutRepositoryDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InOutRepositoryDetails> findOne(Long id);

    /**
     * Delete the "id" inOutRepositoryDetails.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
