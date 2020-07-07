package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Repository}.
 */
public interface RepositoryService {

    /**
     * Save a repository.
     *
     * @param repository the entity to save.
     * @return the persisted entity.
     */
    Repository save(Repository repository);

    /**
     * Get all the repositories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Repository> findAll(Pageable pageable);

    /**
     * Get the "id" repository.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Repository> findOne(Long id);



    /**
     * Delete the "id" repository.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
