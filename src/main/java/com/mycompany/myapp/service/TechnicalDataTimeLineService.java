package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.TechnicalDataTimeLine;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TechnicalDataTimeLine}.
 */
public interface TechnicalDataTimeLineService {

    /**
     * Save a technicalDataTimeLine.
     *
     * @param technicalDataTimeLine the entity to save.
     * @return the persisted entity.
     */
    TechnicalDataTimeLine save(TechnicalDataTimeLine technicalDataTimeLine);

    /**
     * Get all the technicalDataTimeLines.
     *
     * @return the list of entities.
     */
    List<TechnicalDataTimeLine> findAll();

    /**
     * Get the "id" technicalDataTimeLine.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TechnicalDataTimeLine> findOne(Long id);

    /**
     * Delete the "id" technicalDataTimeLine.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
