package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.InOutRepository;
import com.mycompany.myapp.service.InOutRepositoryService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.InOutRepository}.
 */
@RestController
@RequestMapping("/api")
public class InOutRepositoryResource {

    private final Logger log = LoggerFactory.getLogger(InOutRepositoryResource.class);

    private static final String ENTITY_NAME = "inOutRepository";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InOutRepositoryService inOutRepositoryService;

    public InOutRepositoryResource(InOutRepositoryService inOutRepositoryService) {
        this.inOutRepositoryService = inOutRepositoryService;
    }

    /**
     * {@code POST  /in-out-repositories} : Create a new inOutRepository.
     *
     * @param inOutRepository the inOutRepository to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inOutRepository, or with status {@code 400 (Bad Request)} if the inOutRepository has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/in-out-repositories")
    public ResponseEntity<InOutRepository> createInOutRepository(@RequestBody InOutRepository inOutRepository) throws URISyntaxException {
        log.debug("REST request to save InOutRepository : {}", inOutRepository);
        if (inOutRepository.getId() != null) {
            throw new BadRequestAlertException("A new inOutRepository cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InOutRepository result = inOutRepositoryService.save(inOutRepository);
        return ResponseEntity.created(new URI("/api/in-out-repositories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /in-out-repositories} : Updates an existing inOutRepository.
     *
     * @param inOutRepository the inOutRepository to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inOutRepository,
     * or with status {@code 400 (Bad Request)} if the inOutRepository is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inOutRepository couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/in-out-repositories")
    public ResponseEntity<InOutRepository> updateInOutRepository(@RequestBody InOutRepository inOutRepository) throws URISyntaxException {
        log.debug("REST request to update InOutRepository : {}", inOutRepository);
        if (inOutRepository.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InOutRepository result = inOutRepositoryService.save(inOutRepository);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inOutRepository.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /in-out-repositories} : get all the inOutRepositories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inOutRepositories in body.
     */
    @GetMapping("/in-out-repositories")
    public ResponseEntity<List<InOutRepository>> getAllInOutRepositories(Pageable pageable) {
        log.debug("REST request to get a page of InOutRepositories");
        Page<InOutRepository> page = inOutRepositoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /in-out-repositories} : get all the inOutRepositories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inOutRepositories in body.
     */
    @GetMapping("/in-out-repositories/getno")
    public ResponseEntity<Integer> getNo(@RequestParam Integer typeNo) {
        log.debug("REST request to get a page of InOutRepositories");
        Integer count = inOutRepositoryService.count(typeNo);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    /**
     * {@code GET  /in-out-repositories} : get all the inOutRepositories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inOutRepositories in body.
     */
    @GetMapping("/in-out-repositories/in")
    public ResponseEntity<List<InOutRepository>> getAllInOutRepositoriesIn(Pageable pageable) {
        log.debug("REST request to get a page of InOutRepositories");
        Page<InOutRepository> page = inOutRepositoryService.findAllInRp(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /in-out-repositories} : get all the inOutRepositories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inOutRepositories in body.
     */
    @GetMapping("/in-out-repositories/out")
    public ResponseEntity<List<InOutRepository>> getAllInOutRepositoriesOut(Pageable pageable) {
        log.debug("REST request to get a page of InOutRepositories");
        Page<InOutRepository> page = inOutRepositoryService.findAllOutRp(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /in-out-repositories/:id} : get the "id" inOutRepository.
     *
     * @param id the id of the inOutRepository to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inOutRepository, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/in-out-repositories/{id}")
    public ResponseEntity<InOutRepository> getInOutRepository(@PathVariable Long id) {
        log.debug("REST request to get InOutRepository : {}", id);
        Optional<InOutRepository> inOutRepository = inOutRepositoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(inOutRepository);
    }

    /**
     * {@code DELETE  /in-out-repositories/:id} : delete the "id" inOutRepository.
     *
     * @param id the id of the inOutRepository to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/in-out-repositories/{id}")
    public ResponseEntity<Void> deleteInOutRepository(@PathVariable Long id) {
        log.debug("REST request to delete InOutRepository : {}", id);
        inOutRepositoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
