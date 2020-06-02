package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.InOutRepositoryService;
import com.mycompany.myapp.domain.InOutRepository;
import com.mycompany.myapp.repository.InOutRepositoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link InOutRepository}.
 */
@Service
@Transactional
public class InOutRepositoryServiceImpl implements InOutRepositoryService {

    private final Logger log = LoggerFactory.getLogger(InOutRepositoryServiceImpl.class);

    private final InOutRepositoryRepository inOutRepositoryRepository;

    public InOutRepositoryServiceImpl(InOutRepositoryRepository inOutRepositoryRepository) {
        this.inOutRepositoryRepository = inOutRepositoryRepository;
    }

    /**
     * Save a inOutRepository.
     *
     * @param inOutRepository the entity to save.
     * @return the persisted entity.
     */
    @Override
    public InOutRepository save(InOutRepository inOutRepository) {
        log.debug("Request to save InOutRepository : {}", inOutRepository);
        return inOutRepositoryRepository.save(inOutRepository);
    }

    /**
     * Get all the inOutRepositories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<InOutRepository> findAll(Pageable pageable) {
        log.debug("Request to get all InOutRepositories");
        return inOutRepositoryRepository.findAll(pageable);
    }

    /**
     * Get one inOutRepository by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<InOutRepository> findOne(Long id) {
        log.debug("Request to get InOutRepository : {}", id);
        return inOutRepositoryRepository.findById(id);
    }

    /**
     * Delete the inOutRepository by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete InOutRepository : {}", id);
        inOutRepositoryRepository.deleteById(id);
    }
}
