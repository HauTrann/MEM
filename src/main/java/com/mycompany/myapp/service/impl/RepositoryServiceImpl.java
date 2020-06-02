package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.RepositoryService;
import com.mycompany.myapp.domain.Repository;
import com.mycompany.myapp.repository.RepositoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Repository}.
 */
@Service
@Transactional
public class RepositoryServiceImpl implements RepositoryService {

    private final Logger log = LoggerFactory.getLogger(RepositoryServiceImpl.class);

    private final RepositoryRepository repositoryRepository;

    public RepositoryServiceImpl(RepositoryRepository repositoryRepository) {
        this.repositoryRepository = repositoryRepository;
    }

    /**
     * Save a repository.
     *
     * @param repository the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Repository save(Repository repository) {
        log.debug("Request to save Repository : {}", repository);
        return repositoryRepository.save(repository);
    }

    /**
     * Get all the repositories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Repository> findAll(Pageable pageable) {
        log.debug("Request to get all Repositories");
        return repositoryRepository.findAll(pageable);
    }

    /**
     * Get one repository by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Repository> findOne(Long id) {
        log.debug("Request to get Repository : {}", id);
        return repositoryRepository.findById(id);
    }

    /**
     * Delete the repository by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Repository : {}", id);
        repositoryRepository.deleteById(id);
    }
}
