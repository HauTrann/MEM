package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TechnicalDataTimeLine;
import com.mycompany.myapp.service.TechnicalDataTimeLineService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.TechnicalDataTimeLine}.
 */
@RestController
@RequestMapping("/api")
public class TechnicalDataTimeLineResource {

    private final Logger log = LoggerFactory.getLogger(TechnicalDataTimeLineResource.class);

    private static final String ENTITY_NAME = "technicalDataTimeLine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TechnicalDataTimeLineService technicalDataTimeLineService;

    public TechnicalDataTimeLineResource(TechnicalDataTimeLineService technicalDataTimeLineService) {
        this.technicalDataTimeLineService = technicalDataTimeLineService;
    }

    /**
     * {@code POST  /technical-data-time-lines} : Create a new technicalDataTimeLine.
     *
     * @param technicalDataTimeLine the technicalDataTimeLine to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new technicalDataTimeLine, or with status {@code 400 (Bad Request)} if the technicalDataTimeLine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/technical-data-time-lines")
    public ResponseEntity<TechnicalDataTimeLine> createTechnicalDataTimeLine(@RequestBody TechnicalDataTimeLine technicalDataTimeLine) throws URISyntaxException {
        log.debug("REST request to save TechnicalDataTimeLine : {}", technicalDataTimeLine);
        if (technicalDataTimeLine.getId() != null) {
            throw new BadRequestAlertException("A new technicalDataTimeLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TechnicalDataTimeLine result = technicalDataTimeLineService.save(technicalDataTimeLine);
        return ResponseEntity.created(new URI("/api/technical-data-time-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /technical-data-time-lines} : Updates an existing technicalDataTimeLine.
     *
     * @param technicalDataTimeLine the technicalDataTimeLine to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated technicalDataTimeLine,
     * or with status {@code 400 (Bad Request)} if the technicalDataTimeLine is not valid,
     * or with status {@code 500 (Internal Server Error)} if the technicalDataTimeLine couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/technical-data-time-lines")
    public ResponseEntity<TechnicalDataTimeLine> updateTechnicalDataTimeLine(@RequestBody TechnicalDataTimeLine technicalDataTimeLine) throws URISyntaxException {
        log.debug("REST request to update TechnicalDataTimeLine : {}", technicalDataTimeLine);
        if (technicalDataTimeLine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TechnicalDataTimeLine result = technicalDataTimeLineService.save(technicalDataTimeLine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, technicalDataTimeLine.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /technical-data-time-lines} : get all the technicalDataTimeLines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of technicalDataTimeLines in body.
     */
    @GetMapping("/technical-data-time-lines")
    public List<TechnicalDataTimeLine> getAllTechnicalDataTimeLines() {
        log.debug("REST request to get all TechnicalDataTimeLines");
        return technicalDataTimeLineService.findAll();
    }

    /**
     * {@code GET  /technical-data-time-lines/:id} : get the "id" technicalDataTimeLine.
     *
     * @param id the id of the technicalDataTimeLine to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the technicalDataTimeLine, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/technical-data-time-lines/{id}")
    public ResponseEntity<TechnicalDataTimeLine> getTechnicalDataTimeLine(@PathVariable Long id) {
        log.debug("REST request to get TechnicalDataTimeLine : {}", id);
        Optional<TechnicalDataTimeLine> technicalDataTimeLine = technicalDataTimeLineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(technicalDataTimeLine);
    }

    /**
     * {@code DELETE  /technical-data-time-lines/:id} : delete the "id" technicalDataTimeLine.
     *
     * @param id the id of the technicalDataTimeLine to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/technical-data-time-lines/{id}")
    public ResponseEntity<Void> deleteTechnicalDataTimeLine(@PathVariable Long id) {
        log.debug("REST request to delete TechnicalDataTimeLine : {}", id);
        technicalDataTimeLineService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code GET  /technical-data-time-lines} : get all the technicalDataTimeLines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of technicalDataTimeLines in body.
     */
    @GetMapping("/technical-data-time-lines/get-now/{serial}")
    public List<TechnicalDataTimeLine> getNow(@PathVariable String serial) {
        log.debug("REST request to get all TechnicalDataTimeLines");
        return technicalDataTimeLineService.getNow(serial);
    }
}
