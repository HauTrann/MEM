package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.ReportBrokenEquipmentService;
import com.mycompany.myapp.domain.ReportBrokenEquipment;
import com.mycompany.myapp.repository.ReportBrokenEquipmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ReportBrokenEquipment}.
 */
@Service
@Transactional
public class ReportBrokenEquipmentServiceImpl implements ReportBrokenEquipmentService {

    private final Logger log = LoggerFactory.getLogger(ReportBrokenEquipmentServiceImpl.class);

    private final ReportBrokenEquipmentRepository reportBrokenEquipmentRepository;

    public ReportBrokenEquipmentServiceImpl(ReportBrokenEquipmentRepository reportBrokenEquipmentRepository) {
        this.reportBrokenEquipmentRepository = reportBrokenEquipmentRepository;
    }

    /**
     * Save a reportBrokenEquipment.
     *
     * @param reportBrokenEquipment the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ReportBrokenEquipment save(ReportBrokenEquipment reportBrokenEquipment) {
        log.debug("Request to save ReportBrokenEquipment : {}", reportBrokenEquipment);
        if (reportBrokenEquipment.getOrganizationUnitID() == null) {
            reportBrokenEquipment.setOrganizationUnitID(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
        return reportBrokenEquipmentRepository.save(reportBrokenEquipment);
    }

    /**
     * Get all the reportBrokenEquipments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReportBrokenEquipment> findAll(Pageable pageable) {
        log.debug("Request to get all ReportBrokenEquipments");
        return reportBrokenEquipmentRepository.findAll(pageable);
    }

    /**
     * Get one reportBrokenEquipment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReportBrokenEquipment> findOne(Long id) {
        log.debug("Request to get ReportBrokenEquipment : {}", id);
        return reportBrokenEquipmentRepository.findById(id);
    }

    /**
     * Delete the reportBrokenEquipment by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReportBrokenEquipment : {}", id);
        reportBrokenEquipmentRepository.deleteById(id);
    }
}
