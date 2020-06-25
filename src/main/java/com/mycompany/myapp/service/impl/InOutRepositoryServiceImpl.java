package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.InOutRepository;
import com.mycompany.myapp.domain.InOutRepositoryDetails;
import com.mycompany.myapp.domain.TechnicalData;
import com.mycompany.myapp.domain.TechnicalDataTimeLine;
import com.mycompany.myapp.repository.InOutRepositoryRepository;
import com.mycompany.myapp.repository.TechnicalDataTimeLineRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.InOutRepositoryService;
import com.mycompany.myapp.service.RepositoryLedgerService;
import com.mycompany.myapp.service.dto.Record;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link InOutRepository}.
 */
@Service
@Transactional
public class InOutRepositoryServiceImpl implements InOutRepositoryService {

    private final Logger log = LoggerFactory.getLogger(InOutRepositoryServiceImpl.class);

    private final InOutRepositoryRepository inOutRepositoryRepository;
    private final RepositoryLedgerService repositoryLedgerService;
    private final TechnicalDataTimeLineRepository technicalDataTimeLineRepository;

    public InOutRepositoryServiceImpl(InOutRepositoryRepository inOutRepositoryRepository, RepositoryLedgerService repositoryLedgerService, TechnicalDataTimeLineRepository technicalDataTimeLineRepository) {
        this.inOutRepositoryRepository = inOutRepositoryRepository;
        this.repositoryLedgerService = repositoryLedgerService;
        this.technicalDataTimeLineRepository = technicalDataTimeLineRepository;
    }

    /**
     * Save a inOutRepository.
     *
     * @param inOutRepository the entity to save.
     * @return the persisted entity.
     */
    @Override
    public InOutRepository save(InOutRepository inOutRepository) {
        log.debug("Request to save InOutRepository : {}", inOutRepository);
        if (inOutRepository.getOrganizationUnitID() == null) {
            inOutRepository.setOrganizationUnitID(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
        InOutRepository inOutRepository1 = inOutRepositoryRepository.save(inOutRepository);
        for (InOutRepositoryDetails item : inOutRepository1.getInOutRepositoryDetails()) {
            if (item.getTechnicalDataModel() != null) {
                List<TechnicalDataTimeLine> technicalDataTimeLines = new ArrayList<>();
                for (TechnicalData technicalData : item.getTechnicalDataModel()) {
                    TechnicalDataTimeLine technicalDataTimeLine = new TechnicalDataTimeLine();
                    BeanUtils.copyProperties(technicalData, technicalDataTimeLine);
                    technicalDataTimeLine.setEquipmentID(item.getProdID());
                    technicalDataTimeLine.setSerial(item.getSerial());
                    technicalDataTimeLine.setTime(LocalDateTime.now());
                    if (inOutRepository1.getUserID() != null) {
                        technicalDataTimeLine.setUserID(inOutRepository1.getUserID());
                    }

                    if (inOutRepository1.getDepartmentID() != null) {
                        technicalDataTimeLine.setDepartmentID(inOutRepository1.getDepartmentID());
                    }
                    technicalDataTimeLines.add(technicalDataTimeLine);
                }
                technicalDataTimeLineRepository.saveAll(technicalDataTimeLines);
            }
        }

        Record record = new Record();
        record.setId(inOutRepository1.getId());
        repositoryLedgerService.record(record);
        return inOutRepository1;
    }

    /**
     * Get all the inOutRepositories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<InOutRepository> findAll(Pageable pageable) {
        log.debug("Request to get all InOutRepositories");
        return inOutRepositoryRepository.findAll(pageable);
    }

    @Override
    public Page<InOutRepository> findAllInRp(Pageable pageable) {
        return inOutRepositoryRepository.findAllByOrganizationUnitIDAndOutOfStockIsFalseOrOutOfStockIsNull(pageable, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
    }

    @Override
    public Page<InOutRepository> findAllOutRp(Pageable pageable) {
        return inOutRepositoryRepository.findAllByOrganizationUnitIDAndOutOfStockIsTrue(pageable, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
    }

    /**
     * Get one inOutRepository by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<InOutRepository> findOne(Long id) {
        log.debug("Request to get InOutRepository : {}", id);
        return inOutRepositoryRepository.findById(id);
    }

    @Override
    public Integer count(Integer typeNo) {
        if (typeNo == 0) {
            return inOutRepositoryRepository.countAllByOutOfStockAndOrganizationUnitID(false, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        } else {
            return inOutRepositoryRepository.countAllByOutOfStockAndOrganizationUnitID(true, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
    }

    /**
     * Delete the inOutRepository by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete InOutRepository : {}", id);
        inOutRepositoryRepository.deleteById(id);
    }
}
