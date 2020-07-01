package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ReportBrokenEquipment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ReportBrokenEquipment}.
 */
public interface ReportBrokenEquipmentService {

    /**
     * Save a reportBrokenEquipment.
     *
     * @param reportBrokenEquipment the entity to save.
     * @return the persisted entity.
     */
    ReportBrokenEquipment save(ReportBrokenEquipment reportBrokenEquipment);

    /**
     * Get all the reportBrokenEquipments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReportBrokenEquipment> findAll(Pageable pageable);

    /**
     * Get the "id" reportBrokenEquipment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReportBrokenEquipment> findOne(Long id);

    /**
     * Delete the "id" reportBrokenEquipment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
