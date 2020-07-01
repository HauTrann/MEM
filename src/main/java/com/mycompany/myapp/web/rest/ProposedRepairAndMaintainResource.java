package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ProposedRepairAndMaintain;
import com.mycompany.myapp.service.ProposedRepairAndMaintainService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ProposedRepairAndMaintain}.
 */
@RestController
@RequestMapping("/api")
public class ProposedRepairAndMaintainResource {

    private final Logger log = LoggerFactory.getLogger(ProposedRepairAndMaintainResource.class);

    private static final String ENTITY_NAME = "proposedRepairAndMaintain";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProposedRepairAndMaintainService proposedRepairAndMaintainService;

    public ProposedRepairAndMaintainResource(ProposedRepairAndMaintainService proposedRepairAndMaintainService) {
        this.proposedRepairAndMaintainService = proposedRepairAndMaintainService;
    }

    /**
     * {@code POST  /proposed-repair-and-maintains} : Create a new proposedRepairAndMaintain.
     *
     * @param proposedRepairAndMaintain the proposedRepairAndMaintain to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proposedRepairAndMaintain, or with status {@code 400 (Bad Request)} if the proposedRepairAndMaintain has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proposed-repair-and-maintains")
    public ResponseEntity<ProposedRepairAndMaintain> createProposedRepairAndMaintain(@RequestBody ProposedRepairAndMaintain proposedRepairAndMaintain) throws URISyntaxException {
        log.debug("REST request to save ProposedRepairAndMaintain : {}", proposedRepairAndMaintain);
        if (proposedRepairAndMaintain.getId() != null) {
            throw new BadRequestAlertException("A new proposedRepairAndMaintain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProposedRepairAndMaintain result = proposedRepairAndMaintainService.save(proposedRepairAndMaintain);
        return ResponseEntity.created(new URI("/api/proposed-repair-and-maintains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proposed-repair-and-maintains} : Updates an existing proposedRepairAndMaintain.
     *
     * @param proposedRepairAndMaintain the proposedRepairAndMaintain to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proposedRepairAndMaintain,
     * or with status {@code 400 (Bad Request)} if the proposedRepairAndMaintain is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proposedRepairAndMaintain couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proposed-repair-and-maintains")
    public ResponseEntity<ProposedRepairAndMaintain> updateProposedRepairAndMaintain(@RequestBody ProposedRepairAndMaintain proposedRepairAndMaintain) throws URISyntaxException {
        log.debug("REST request to update ProposedRepairAndMaintain : {}", proposedRepairAndMaintain);
        if (proposedRepairAndMaintain.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProposedRepairAndMaintain result = proposedRepairAndMaintainService.save(proposedRepairAndMaintain);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proposedRepairAndMaintain.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /proposed-repair-and-maintains} : get all the proposedRepairAndMaintains.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of proposedRepairAndMaintains in body.
     */
    @GetMapping("/proposed-repair-and-maintains")
    public ResponseEntity<List<ProposedRepairAndMaintain>> getAllProposedRepairAndMaintains(Pageable pageable) {
        log.debug("REST request to get a page of ProposedRepairAndMaintains");
        Page<ProposedRepairAndMaintain> page = proposedRepairAndMaintainService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /proposed-repair-and-maintains/:id} : get the "id" proposedRepairAndMaintain.
     *
     * @param id the id of the proposedRepairAndMaintain to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proposedRepairAndMaintain, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proposed-repair-and-maintains/{id}")
    public ResponseEntity<ProposedRepairAndMaintain> getProposedRepairAndMaintain(@PathVariable Long id) {
        log.debug("REST request to get ProposedRepairAndMaintain : {}", id);
        Optional<ProposedRepairAndMaintain> proposedRepairAndMaintain = proposedRepairAndMaintainService.findOne(id);
        return ResponseUtil.wrapOrNotFound(proposedRepairAndMaintain);
    }

    /**
     * {@code DELETE  /proposed-repair-and-maintains/:id} : delete the "id" proposedRepairAndMaintain.
     *
     * @param id the id of the proposedRepairAndMaintain to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proposed-repair-and-maintains/{id}")
    public ResponseEntity<Void> deleteProposedRepairAndMaintain(@PathVariable Long id) {
        log.debug("REST request to delete ProposedRepairAndMaintain : {}", id);
        proposedRepairAndMaintainService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
