package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.RepositoryLedger;
import com.mycompany.myapp.service.RepositoryLedgerService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.RepositoryLedger}.
 */
@RestController
@RequestMapping("/api")
public class RepositoryLedgerResource {

    private final Logger log = LoggerFactory.getLogger(RepositoryLedgerResource.class);

    private static final String ENTITY_NAME = "repositoryLedger";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepositoryLedgerService repositoryLedgerService;

    public RepositoryLedgerResource(RepositoryLedgerService repositoryLedgerService) {
        this.repositoryLedgerService = repositoryLedgerService;
    }

    /**
     * {@code POST  /repository-ledgers} : Create a new repositoryLedger.
     *
     * @param repositoryLedger the repositoryLedger to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new repositoryLedger, or with status {@code 400 (Bad Request)} if the repositoryLedger has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/repository-ledgers")
    public ResponseEntity<RepositoryLedger> createRepositoryLedger(@RequestBody RepositoryLedger repositoryLedger) throws URISyntaxException {
        log.debug("REST request to save RepositoryLedger : {}", repositoryLedger);
        if (repositoryLedger.getId() != null) {
            throw new BadRequestAlertException("A new repositoryLedger cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepositoryLedger result = repositoryLedgerService.save(repositoryLedger);
        return ResponseEntity.created(new URI("/api/repository-ledgers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /repository-ledgers} : Updates an existing repositoryLedger.
     *
     * @param repositoryLedger the repositoryLedger to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated repositoryLedger,
     * or with status {@code 400 (Bad Request)} if the repositoryLedger is not valid,
     * or with status {@code 500 (Internal Server Error)} if the repositoryLedger couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/repository-ledgers")
    public ResponseEntity<RepositoryLedger> updateRepositoryLedger(@RequestBody RepositoryLedger repositoryLedger) throws URISyntaxException {
        log.debug("REST request to update RepositoryLedger : {}", repositoryLedger);
        if (repositoryLedger.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RepositoryLedger result = repositoryLedgerService.save(repositoryLedger);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, repositoryLedger.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /repository-ledgers} : get all the repositoryLedgers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of repositoryLedgers in body.
     */
    @GetMapping("/repository-ledgers")
    public ResponseEntity<List<RepositoryLedger>> getAllRepositoryLedgers(Pageable pageable) {
        log.debug("REST request to get a page of RepositoryLedgers");
        Page<RepositoryLedger> page = repositoryLedgerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /repository-ledgers/:id} : get the "id" repositoryLedger.
     *
     * @param id the id of the repositoryLedger to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the repositoryLedger, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/repository-ledgers/{id}")
    public ResponseEntity<RepositoryLedger> getRepositoryLedger(@PathVariable Long id) {
        log.debug("REST request to get RepositoryLedger : {}", id);
        Optional<RepositoryLedger> repositoryLedger = repositoryLedgerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(repositoryLedger);
    }

    /**
     * {@code DELETE  /repository-ledgers/:id} : delete the "id" repositoryLedger.
     *
     * @param id the id of the repositoryLedger to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/repository-ledgers/{id}")
    public ResponseEntity<Void> deleteRepositoryLedger(@PathVariable Long id) {
        log.debug("REST request to delete RepositoryLedger : {}", id);
        repositoryLedgerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
