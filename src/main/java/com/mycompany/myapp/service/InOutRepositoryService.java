package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.InOutRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link InOutRepository}.
 */
public interface InOutRepositoryService {

    /**
     * Save a inOutRepository.
     *
     * @param inOutRepository the entity to save.
     * @return the persisted entity.
     */
    InOutRepository save(InOutRepository inOutRepository);

    /**
     * Get all the inOutRepositories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<InOutRepository> findAll(Pageable pageable);
    Page<InOutRepository> findAllInRp(Pageable pageable);
    Page<InOutRepository> findAllOutRp(Pageable pageable);

    /**
     * Get the "id" inOutRepository.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InOutRepository> findOne(Long id);

    /**
     * Delete the "id" inOutRepository.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
