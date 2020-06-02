package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.InOutRepositoryDetails;
import com.mycompany.myapp.service.InOutRepositoryDetailsService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.InOutRepositoryDetails}.
 */
@RestController
@RequestMapping("/api")
public class InOutRepositoryDetailsResource {

    private final Logger log = LoggerFactory.getLogger(InOutRepositoryDetailsResource.class);

    private static final String ENTITY_NAME = "inOutRepositoryDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InOutRepositoryDetailsService inOutRepositoryDetailsService;

    public InOutRepositoryDetailsResource(InOutRepositoryDetailsService inOutRepositoryDetailsService) {
        this.inOutRepositoryDetailsService = inOutRepositoryDetailsService;
    }

    /**
     * {@code POST  /in-out-repository-details} : Create a new inOutRepositoryDetails.
     *
     * @param inOutRepositoryDetails the inOutRepositoryDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inOutRepositoryDetails, or with status {@code 400 (Bad Request)} if the inOutRepositoryDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/in-out-repository-details")
    public ResponseEntity<InOutRepositoryDetails> createInOutRepositoryDetails(@RequestBody InOutRepositoryDetails inOutRepositoryDetails) throws URISyntaxException {
        log.debug("REST request to save InOutRepositoryDetails : {}", inOutRepositoryDetails);
        if (inOutRepositoryDetails.getId() != null) {
            throw new BadRequestAlertException("A new inOutRepositoryDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InOutRepositoryDetails result = inOutRepositoryDetailsService.save(inOutRepositoryDetails);
        return ResponseEntity.created(new URI("/api/in-out-repository-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /in-out-repository-details} : Updates an existing inOutRepositoryDetails.
     *
     * @param inOutRepositoryDetails the inOutRepositoryDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inOutRepositoryDetails,
     * or with status {@code 400 (Bad Request)} if the inOutRepositoryDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inOutRepositoryDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/in-out-repository-details")
    public ResponseEntity<InOutRepositoryDetails> updateInOutRepositoryDetails(@RequestBody InOutRepositoryDetails inOutRepositoryDetails) throws URISyntaxException {
        log.debug("REST request to update InOutRepositoryDetails : {}", inOutRepositoryDetails);
        if (inOutRepositoryDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InOutRepositoryDetails result = inOutRepositoryDetailsService.save(inOutRepositoryDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inOutRepositoryDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /in-out-repository-details} : get all the inOutRepositoryDetails.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inOutRepositoryDetails in body.
     */
    @GetMapping("/in-out-repository-details")
    public ResponseEntity<List<InOutRepositoryDetails>> getAllInOutRepositoryDetails(Pageable pageable) {
        log.debug("REST request to get a page of InOutRepositoryDetails");
        Page<InOutRepositoryDetails> page = inOutRepositoryDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /in-out-repository-details/:id} : get the "id" inOutRepositoryDetails.
     *
     * @param id the id of the inOutRepositoryDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inOutRepositoryDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/in-out-repository-details/{id}")
    public ResponseEntity<InOutRepositoryDetails> getInOutRepositoryDetails(@PathVariable Long id) {
        log.debug("REST request to get InOutRepositoryDetails : {}", id);
        Optional<InOutRepositoryDetails> inOutRepositoryDetails = inOutRepositoryDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(inOutRepositoryDetails);
    }

    /**
     * {@code DELETE  /in-out-repository-details/:id} : delete the "id" inOutRepositoryDetails.
     *
     * @param id the id of the inOutRepositoryDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/in-out-repository-details/{id}")
    public ResponseEntity<Void> deleteInOutRepositoryDetails(@PathVariable Long id) {
        log.debug("REST request to delete InOutRepositoryDetails : {}", id);
        inOutRepositoryDetailsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
