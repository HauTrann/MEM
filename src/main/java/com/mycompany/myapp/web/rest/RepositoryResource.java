package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Repository;
import com.mycompany.myapp.service.RepositoryService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Repository}.
 */
@RestController
@RequestMapping("/api")
public class RepositoryResource {

    private final Logger log = LoggerFactory.getLogger(RepositoryResource.class);

    private static final String ENTITY_NAME = "repository";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepositoryService repositoryService;

    public RepositoryResource(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    /**
     * {@code POST  /repositories} : Create a new repository.
     *
     * @param repository the repository to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new repository, or with status {@code 400 (Bad Request)} if the repository has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/repositories")
    public ResponseEntity<Repository> createRepository(@RequestBody Repository repository) throws URISyntaxException {
        log.debug("REST request to save Repository : {}", repository);
        if (repository.getId() != null) {
            throw new BadRequestAlertException("A new repository cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Repository result = repositoryService.save(repository);
        return ResponseEntity.created(new URI("/api/repositories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /repositories} : Updates an existing repository.
     *
     * @param repository the repository to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated repository,
     * or with status {@code 400 (Bad Request)} if the repository is not valid,
     * or with status {@code 500 (Internal Server Error)} if the repository couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/repositories")
    public ResponseEntity<Repository> updateRepository(@RequestBody Repository repository) throws URISyntaxException {
        log.debug("REST request to update Repository : {}", repository);
        if (repository.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Repository result = repositoryService.save(repository);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, repository.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /repositories} : get all the repositories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of repositories in body.
     */
    @GetMapping("/repositories")
    public ResponseEntity<List<Repository>> getAllRepositories(Pageable pageable) {
        log.debug("REST request to get a page of Repositories");
        Page<Repository> page = repositoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /repositories/:id} : get the "id" repository.
     *
     * @param id the id of the repository to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the repository, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/repositories/{id}")
    public ResponseEntity<Repository> getRepository(@PathVariable Long id) {
        log.debug("REST request to get Repository : {}", id);
        Optional<Repository> repository = repositoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(repository);
    }

    /**
     * {@code DELETE  /repositories/:id} : delete the "id" repository.
     *
     * @param id the id of the repository to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/repositories/{id}")
    public ResponseEntity<Void> deleteRepository(@PathVariable Long id) {
        log.debug("REST request to delete Repository : {}", id);
        repositoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
