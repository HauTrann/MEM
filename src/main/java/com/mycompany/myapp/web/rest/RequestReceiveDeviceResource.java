package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.RequestReceiveDevice;
import com.mycompany.myapp.service.RequestReceiveDeviceService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.RequestReceiveDevice}.
 */
@RestController
@RequestMapping("/api")
public class RequestReceiveDeviceResource {

    private final Logger log = LoggerFactory.getLogger(RequestReceiveDeviceResource.class);

    private static final String ENTITY_NAME = "requestReceiveDevice";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RequestReceiveDeviceService requestReceiveDeviceService;

    public RequestReceiveDeviceResource(RequestReceiveDeviceService requestReceiveDeviceService) {
        this.requestReceiveDeviceService = requestReceiveDeviceService;
    }

    /**
     * {@code POST  /request-receive-devices} : Create a new requestReceiveDevice.
     *
     * @param requestReceiveDevice the requestReceiveDevice to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new requestReceiveDevice, or with status {@code 400 (Bad Request)} if the requestReceiveDevice has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/request-receive-devices")
    public ResponseEntity<RequestReceiveDevice> createRequestReceiveDevice(@RequestBody RequestReceiveDevice requestReceiveDevice) throws URISyntaxException {
        log.debug("REST request to save RequestReceiveDevice : {}", requestReceiveDevice);
        if (requestReceiveDevice.getId() != null) {
            throw new BadRequestAlertException("A new requestReceiveDevice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RequestReceiveDevice result = requestReceiveDeviceService.save(requestReceiveDevice);
        return ResponseEntity.created(new URI("/api/request-receive-devices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /request-receive-devices} : Updates an existing requestReceiveDevice.
     *
     * @param requestReceiveDevice the requestReceiveDevice to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated requestReceiveDevice,
     * or with status {@code 400 (Bad Request)} if the requestReceiveDevice is not valid,
     * or with status {@code 500 (Internal Server Error)} if the requestReceiveDevice couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/request-receive-devices")
    public ResponseEntity<RequestReceiveDevice> updateRequestReceiveDevice(@RequestBody RequestReceiveDevice requestReceiveDevice) throws URISyntaxException {
        log.debug("REST request to update RequestReceiveDevice : {}", requestReceiveDevice);
        if (requestReceiveDevice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RequestReceiveDevice result = requestReceiveDeviceService.save(requestReceiveDevice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, requestReceiveDevice.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /request-receive-devices} : get all the requestReceiveDevices.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of requestReceiveDevices in body.
     */
    @GetMapping("/request-receive-devices")
    public ResponseEntity<List<RequestReceiveDevice>> getAllRequestReceiveDevices(Pageable pageable) {
        log.debug("REST request to get a page of RequestReceiveDevices");
        Page<RequestReceiveDevice> page = requestReceiveDeviceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /request-receive-devices} : get all the requestReceiveDevices.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of requestReceiveDevices in body.
     */
    @GetMapping("/request-receive-devices/for-employee")
    public ResponseEntity<List<RequestReceiveDevice>> getAllRequestReceiveDevicesForEmployee(Pageable pageable) {
        log.debug("REST request to get a page of RequestReceiveDevices");
        Page<RequestReceiveDevice> page = requestReceiveDeviceService.findAllForEmployee(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /request-receive-devices} : get all the requestReceiveDevices.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of requestReceiveDevices in body.
     */
    @GetMapping("/request-receive-devices/for-manager")
    public ResponseEntity<List<RequestReceiveDevice>> getAllRequestReceiveDevicesForManager(Pageable pageable) {
        log.debug("REST request to get a page of RequestReceiveDevices");
        Page<RequestReceiveDevice> page = requestReceiveDeviceService.findAllForManager(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /request-receive-devices} : get all the requestReceiveDevices.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of requestReceiveDevices in body.
     */
    @GetMapping("/request-receive-devices/for-employee-pay")
    public ResponseEntity<List<RequestReceiveDevice>> getAllRequestReceiveDevicesForEmployeePay(Pageable pageable) {
        log.debug("REST request to get a page of RequestReceiveDevices");
        Page<RequestReceiveDevice> page = requestReceiveDeviceService.findAllForEmployeePay(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /request-receive-devices} : get all the requestReceiveDevices.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of requestReceiveDevices in body.
     */
    @GetMapping("/request-receive-devices/for-manager-pay")
    public ResponseEntity<List<RequestReceiveDevice>> getAllRequestReceiveDevicesForManagerPay(Pageable pageable) {
        log.debug("REST request to get a page of RequestReceiveDevices");
        Page<RequestReceiveDevice> page = requestReceiveDeviceService.findAllForManagerPay(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /request-receive-devices/:id} : get the "id" requestReceiveDevice.
     *
     * @param id the id of the requestReceiveDevice to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the requestReceiveDevice, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/request-receive-devices/{id}")
    public ResponseEntity<RequestReceiveDevice> getRequestReceiveDevice(@PathVariable Long id) {
        log.debug("REST request to get RequestReceiveDevice : {}", id);
        Optional<RequestReceiveDevice> requestReceiveDevice = requestReceiveDeviceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(requestReceiveDevice);
    }

    /**
     * {@code DELETE  /request-receive-devices/:id} : delete the "id" requestReceiveDevice.
     *
     * @param id the id of the requestReceiveDevice to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/request-receive-devices/{id}")
    public ResponseEntity<Void> deleteRequestReceiveDevice(@PathVariable Long id) {
        log.debug("REST request to delete RequestReceiveDevice : {}", id);
        requestReceiveDeviceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
