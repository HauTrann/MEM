package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ProposedRepairAndMaintainDetails;
import com.mycompany.myapp.service.ProposedRepairAndMaintainDetailsService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ProposedRepairAndMaintainDetails}.
 */
@RestController
@RequestMapping("/api")
public class ProposedRepairAndMaintainDetailsResource {

    private final Logger log = LoggerFactory.getLogger(ProposedRepairAndMaintainDetailsResource.class);

    private static final String ENTITY_NAME = "proposedRepairAndMaintainDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProposedRepairAndMaintainDetailsService proposedRepairAndMaintainDetailsService;

    public ProposedRepairAndMaintainDetailsResource(ProposedRepairAndMaintainDetailsService proposedRepairAndMaintainDetailsService) {
        this.proposedRepairAndMaintainDetailsService = proposedRepairAndMaintainDetailsService;
    }

    /**
     * {@code POST  /proposed-repair-and-maintain-details} : Create a new proposedRepairAndMaintainDetails.
     *
     * @param proposedRepairAndMaintainDetails the proposedRepairAndMaintainDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proposedRepairAndMaintainDetails, or with status {@code 400 (Bad Request)} if the proposedRepairAndMaintainDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proposed-repair-and-maintain-details")
    public ResponseEntity<ProposedRepairAndMaintainDetails> createProposedRepairAndMaintainDetails(@RequestBody ProposedRepairAndMaintainDetails proposedRepairAndMaintainDetails) throws URISyntaxException {
        log.debug("REST request to save ProposedRepairAndMaintainDetails : {}", proposedRepairAndMaintainDetails);
        if (proposedRepairAndMaintainDetails.getId() != null) {
            throw new BadRequestAlertException("A new proposedRepairAndMaintainDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProposedRepairAndMaintainDetails result = proposedRepairAndMaintainDetailsService.save(proposedRepairAndMaintainDetails);
        return ResponseEntity.created(new URI("/api/proposed-repair-and-maintain-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proposed-repair-and-maintain-details} : Updates an existing proposedRepairAndMaintainDetails.
     *
     * @param proposedRepairAndMaintainDetails the proposedRepairAndMaintainDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proposedRepairAndMaintainDetails,
     * or with status {@code 400 (Bad Request)} if the proposedRepairAndMaintainDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proposedRepairAndMaintainDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proposed-repair-and-maintain-details")
    public ResponseEntity<ProposedRepairAndMaintainDetails> updateProposedRepairAndMaintainDetails(@RequestBody ProposedRepairAndMaintainDetails proposedRepairAndMaintainDetails) throws URISyntaxException {
        log.debug("REST request to update ProposedRepairAndMaintainDetails : {}", proposedRepairAndMaintainDetails);
        if (proposedRepairAndMaintainDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProposedRepairAndMaintainDetails result = proposedRepairAndMaintainDetailsService.save(proposedRepairAndMaintainDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proposedRepairAndMaintainDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /proposed-repair-and-maintain-details} : get all the proposedRepairAndMaintainDetails.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of proposedRepairAndMaintainDetails in body.
     */
    @GetMapping("/proposed-repair-and-maintain-details")
    public ResponseEntity<List<ProposedRepairAndMaintainDetails>> getAllProposedRepairAndMaintainDetails(Pageable pageable) {
        log.debug("REST request to get a page of ProposedRepairAndMaintainDetails");
        Page<ProposedRepairAndMaintainDetails> page = proposedRepairAndMaintainDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /proposed-repair-and-maintain-details/:id} : get the "id" proposedRepairAndMaintainDetails.
     *
     * @param id the id of the proposedRepairAndMaintainDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proposedRepairAndMaintainDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proposed-repair-and-maintain-details/{id}")
    public ResponseEntity<ProposedRepairAndMaintainDetails> getProposedRepairAndMaintainDetails(@PathVariable Long id) {
        log.debug("REST request to get ProposedRepairAndMaintainDetails : {}", id);
        Optional<ProposedRepairAndMaintainDetails> proposedRepairAndMaintainDetails = proposedRepairAndMaintainDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(proposedRepairAndMaintainDetails);
    }

    /**
     * {@code DELETE  /proposed-repair-and-maintain-details/:id} : delete the "id" proposedRepairAndMaintainDetails.
     *
     * @param id the id of the proposedRepairAndMaintainDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proposed-repair-and-maintain-details/{id}")
    public ResponseEntity<Void> deleteProposedRepairAndMaintainDetails(@PathVariable Long id) {
        log.debug("REST request to delete ProposedRepairAndMaintainDetails : {}", id);
        proposedRepairAndMaintainDetailsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
