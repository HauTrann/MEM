package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.RepositoryLedger;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link RepositoryLedger}.
 */
public interface RepositoryLedgerService {

    /**
     * Save a repositoryLedger.
     *
     * @param repositoryLedger the entity to save.
     * @return the persisted entity.
     */
    RepositoryLedger save(RepositoryLedger repositoryLedger);

    /**
     * Get all the repositoryLedgers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RepositoryLedger> findAll(Pageable pageable);

    /**
     * Get the "id" repositoryLedger.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RepositoryLedger> findOne(Long id);

    /**
     * Delete the "id" repositoryLedger.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
