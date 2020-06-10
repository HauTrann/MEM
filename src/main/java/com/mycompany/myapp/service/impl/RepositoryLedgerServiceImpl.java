package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.RepositoryLedgerService;
import com.mycompany.myapp.domain.RepositoryLedger;
import com.mycompany.myapp.repository.RepositoryLedgerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link RepositoryLedger}.
 */
@Service
@Transactional
public class RepositoryLedgerServiceImpl implements RepositoryLedgerService {

    private final Logger log = LoggerFactory.getLogger(RepositoryLedgerServiceImpl.class);

    private final RepositoryLedgerRepository repositoryLedgerRepository;

    public RepositoryLedgerServiceImpl(RepositoryLedgerRepository repositoryLedgerRepository) {
        this.repositoryLedgerRepository = repositoryLedgerRepository;
    }

    /**
     * Save a repositoryLedger.
     *
     * @param repositoryLedger the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RepositoryLedger save(RepositoryLedger repositoryLedger) {
        log.debug("Request to save RepositoryLedger : {}", repositoryLedger);
        if (repositoryLedger.getOrganizationUnitID() == null) {
            repositoryLedger.setOrganizationUnitID(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
        return repositoryLedgerRepository.save(repositoryLedger);
    }

    /**
     * Get all the repositoryLedgers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RepositoryLedger> findAll(Pageable pageable) {
        log.debug("Request to get all RepositoryLedgers");
        return repositoryLedgerRepository.findAll(pageable);
    }

    /**
     * Get one repositoryLedger by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RepositoryLedger> findOne(Long id) {
        log.debug("Request to get RepositoryLedger : {}", id);
        return repositoryLedgerRepository.findById(id);
    }

    /**
     * Delete the repositoryLedger by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RepositoryLedger : {}", id);
        repositoryLedgerRepository.deleteById(id);
    }
}
