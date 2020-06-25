package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.RequestReceiveDeviceDetails;
import com.mycompany.myapp.service.RequestReceiveDeviceDetailsService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.RequestReceiveDeviceDetails}.
 */
@RestController
@RequestMapping("/api")
public class RequestReceiveDeviceDetailsResource {

    private final Logger log = LoggerFactory.getLogger(RequestReceiveDeviceDetailsResource.class);

    private static final String ENTITY_NAME = "requestReceiveDeviceDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RequestReceiveDeviceDetailsService requestReceiveDeviceDetailsService;

    public RequestReceiveDeviceDetailsResource(RequestReceiveDeviceDetailsService requestReceiveDeviceDetailsService) {
        this.requestReceiveDeviceDetailsService = requestReceiveDeviceDetailsService;
    }

    /**
     * {@code POST  /request-receive-device-details} : Create a new requestReceiveDeviceDetails.
     *
     * @param requestReceiveDeviceDetails the requestReceiveDeviceDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new requestReceiveDeviceDetails, or with status {@code 400 (Bad Request)} if the requestReceiveDeviceDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/request-receive-device-details")
    public ResponseEntity<RequestReceiveDeviceDetails> createRequestReceiveDeviceDetails(@RequestBody RequestReceiveDeviceDetails requestReceiveDeviceDetails) throws URISyntaxException {
        log.debug("REST request to save RequestReceiveDeviceDetails : {}", requestReceiveDeviceDetails);
        if (requestReceiveDeviceDetails.getId() != null) {
            throw new BadRequestAlertException("A new requestReceiveDeviceDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RequestReceiveDeviceDetails result = requestReceiveDeviceDetailsService.save(requestReceiveDeviceDetails);
        return ResponseEntity.created(new URI("/api/request-receive-device-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /request-receive-device-details} : Updates an existing requestReceiveDeviceDetails.
     *
     * @param requestReceiveDeviceDetails the requestReceiveDeviceDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated requestReceiveDeviceDetails,
     * or with status {@code 400 (Bad Request)} if the requestReceiveDeviceDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the requestReceiveDeviceDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/request-receive-device-details")
    public ResponseEntity<RequestReceiveDeviceDetails> updateRequestReceiveDeviceDetails(@RequestBody RequestReceiveDeviceDetails requestReceiveDeviceDetails) throws URISyntaxException {
        log.debug("REST request to update RequestReceiveDeviceDetails : {}", requestReceiveDeviceDetails);
        if (requestReceiveDeviceDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RequestReceiveDeviceDetails result = requestReceiveDeviceDetailsService.save(requestReceiveDeviceDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, requestReceiveDeviceDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /request-receive-device-details} : get all the requestReceiveDeviceDetails.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of requestReceiveDeviceDetails in body.
     */
    @GetMapping("/request-receive-device-details")
    public ResponseEntity<List<RequestReceiveDeviceDetails>> getAllRequestReceiveDeviceDetails(Pageable pageable) {
        log.debug("REST request to get a page of RequestReceiveDeviceDetails");
        Page<RequestReceiveDeviceDetails> page = requestReceiveDeviceDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /request-receive-device-details/:id} : get the "id" requestReceiveDeviceDetails.
     *
     * @param id the id of the requestReceiveDeviceDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the requestReceiveDeviceDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/request-receive-device-details/{id}")
    public ResponseEntity<RequestReceiveDeviceDetails> getRequestReceiveDeviceDetails(@PathVariable Long id) {
        log.debug("REST request to get RequestReceiveDeviceDetails : {}", id);
        Optional<RequestReceiveDeviceDetails> requestReceiveDeviceDetails = requestReceiveDeviceDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(requestReceiveDeviceDetails);
    }

    /**
     * {@code DELETE  /request-receive-device-details/:id} : delete the "id" requestReceiveDeviceDetails.
     *
     * @param id the id of the requestReceiveDeviceDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/request-receive-device-details/{id}")
    public ResponseEntity<Void> deleteRequestReceiveDeviceDetails(@PathVariable Long id) {
        log.debug("REST request to delete RequestReceiveDeviceDetails : {}", id);
        requestReceiveDeviceDetailsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
