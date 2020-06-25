package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TechnicalDataTimeLineService;
import com.mycompany.myapp.domain.TechnicalDataTimeLine;
import com.mycompany.myapp.repository.TechnicalDataTimeLineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TechnicalDataTimeLine}.
 */
@Service
@Transactional
public class TechnicalDataTimeLineServiceImpl implements TechnicalDataTimeLineService {

    private final Logger log = LoggerFactory.getLogger(TechnicalDataTimeLineServiceImpl.class);

    private final TechnicalDataTimeLineRepository technicalDataTimeLineRepository;

    public TechnicalDataTimeLineServiceImpl(TechnicalDataTimeLineRepository technicalDataTimeLineRepository) {
        this.technicalDataTimeLineRepository = technicalDataTimeLineRepository;
    }

    /**
     * Save a technicalDataTimeLine.
     *
     * @param technicalDataTimeLine the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TechnicalDataTimeLine save(TechnicalDataTimeLine technicalDataTimeLine) {
        log.debug("Request to save TechnicalDataTimeLine : {}", technicalDataTimeLine);
        return technicalDataTimeLineRepository.save(technicalDataTimeLine);
    }

    /**
     * Get all the technicalDataTimeLines.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TechnicalDataTimeLine> findAll() {
        log.debug("Request to get all TechnicalDataTimeLines");
        return technicalDataTimeLineRepository.findAll();
    }

    /**
     * Get one technicalDataTimeLine by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TechnicalDataTimeLine> findOne(Long id) {
        log.debug("Request to get TechnicalDataTimeLine : {}", id);
        return technicalDataTimeLineRepository.findById(id);
    }

    /**
     * Delete the technicalDataTimeLine by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TechnicalDataTimeLine : {}", id);
        technicalDataTimeLineRepository.deleteById(id);
    }
}
