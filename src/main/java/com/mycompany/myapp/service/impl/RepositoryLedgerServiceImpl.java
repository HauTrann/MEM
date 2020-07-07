package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.InOutRepository;
import com.mycompany.myapp.domain.InOutRepositoryDetails;
import com.mycompany.myapp.domain.RepositoryLedger;
import com.mycompany.myapp.repository.InOutRepositoryRepository;
import com.mycompany.myapp.repository.RepositoryLedgerRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.RepositoryLedgerService;
import com.mycompany.myapp.service.dto.CheckTonKhoDTO;
import com.mycompany.myapp.service.dto.Record;
import com.mycompany.myapp.service.util.Constants;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

/**
 * Service Implementation for managing {@link RepositoryLedger}.
 */
@Service
@Transactional
public class RepositoryLedgerServiceImpl implements RepositoryLedgerService {

    private final Logger log = LoggerFactory.getLogger(RepositoryLedgerServiceImpl.class);

    private final RepositoryLedgerRepository repositoryLedgerRepository;
    private final InOutRepositoryRepository inOutRepositoryRepository;

    public RepositoryLedgerServiceImpl(RepositoryLedgerRepository repositoryLedgerRepository, InOutRepositoryRepository inOutRepositoryRepository) {
        this.repositoryLedgerRepository = repositoryLedgerRepository;
        this.inOutRepositoryRepository = inOutRepositoryRepository;
    }

    /**
     * Save a repositoryLedger.
     *
     * @param repositoryLedger the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RepositoryLedger save(RepositoryLedger repositoryLedger) {
        log.debug("Request to save RepositoryLedger : {}", repositoryLedger);
        if (repositoryLedger.getOrganizationUnitID() == null) {
            repositoryLedger.setOrganizationUnitID(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
        return repositoryLedgerRepository.save(repositoryLedger);
    }

    /**
     * Get all the repositoryLedgers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RepositoryLedger> findAll(Pageable pageable) {
        log.debug("Request to get all RepositoryLedgers");
        return repositoryLedgerRepository.findAll(pageable);
    }

    /**
     * Get one repositoryLedger by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RepositoryLedger> findOne(Long id) {
        log.debug("Request to get RepositoryLedger : {}", id);
        return repositoryLedgerRepository.findById(id);
    }

    /**
     * Delete the repositoryLedger by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RepositoryLedger : {}", id);
        repositoryLedgerRepository.deleteById(id);
    }

    @Override
    public Record record(Record record) {
        Record record1 = new Record();
        Long idhospital = SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg();
        InOutRepository inOutRepository = inOutRepositoryRepository.findById(record.getId()).get();
        List<RepositoryLedger> repositoryLedgers = new ArrayList<>();
        for (InOutRepositoryDetails item : inOutRepository.getInOutRepositoryDetails()
        ) {
            RepositoryLedger repositoryLedger = new RepositoryLedger();
            BeanUtils.copyProperties(item, repositoryLedger);
            repositoryLedger.setId(null);
            repositoryLedger.setRefID(inOutRepository.getId());
            repositoryLedger.setDetailID(item.getId());
            repositoryLedger.setDate(inOutRepository.getDate());
            repositoryLedger.setPostedDate(inOutRepository.getPostedDate());
            repositoryLedger.setNo(inOutRepository.getNo());
            repositoryLedger.setDeliver(inOutRepository.getDeliver());
            repositoryLedger.setPhoneContact(inOutRepository.getPhoneContact());
            repositoryLedger.setReceiver(inOutRepository.getReceiver());
            repositoryLedger.setPhoneContactReceiver(inOutRepository.getPhoneContactReceiver());
            repositoryLedger.setReason(inOutRepository.getReason());
            repositoryLedger.setOrganizationUnitID(idhospital);
            repositoryLedger.setDepartmentID(inOutRepository.getDepartmentID());
            repositoryLedger.setUserID(inOutRepository.getUserID());
            repositoryLedger.setType(inOutRepository.getType());
            repositoryLedger.setOutOfStock(inOutRepository.getOutOfStock());
            if (inOutRepository.isOutOfStock()) {
                repositoryLedger.setOutquantity(item.getQuantity());
            } else {
                repositoryLedger.setInquantity(item.getQuantity());
            }
            repositoryLedgers.add(repositoryLedger);
            if (Boolean.TRUE.equals(inOutRepository.getOutOfStock())) {
                if (checkTonKho(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg(), item.getSerial(), item.getQuantity(), item.getRepositoryID(), item.getProdID()).intValue() == 0) {
                    record1.setStatus(Constants.ResponeStatus.Fail);
                    record1.setMess("Thiết bị " + item.getProdName() + " vượt quá số lượng tồn");
                    return record1;
                }
            }
        }
        inOutRepository.setRecorded(true);
        inOutRepositoryRepository.save(inOutRepository);
        repositoryLedgerRepository.saveAll(repositoryLedgers);
        record1.setStatus(Constants.ResponeStatus.Success);
        return record1;
    }

    @Override
    public Record unrecord(Record record) {
        Record record1 = new Record();
        repositoryLedgerRepository.deleteAllByOrganizationUnitIDAndRefID(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg(), record.getId());
        InOutRepository inOutRepository = inOutRepositoryRepository.getOne(record.getId());
        inOutRepository.setRecorded(false);
        inOutRepositoryRepository.save(inOutRepository);
        record1.setStatus(Constants.ResponeStatus.Success);
        return record1;
    }

    @Override
    public byte[] getReport(Long id, int typeID) {

        Map<String, Object> parameter = new HashMap<>();


        return new byte[0];
    }

    @Override
    public BigDecimal getCurrentInReository(String serial) {

        return null;
    }

    @Override
    public CheckTonKhoDTO checkTonKho(String serial, BigDecimal quantity, Long id) {

        return null;
    }

    @Override
    public Number checkTonKho(Long org, String serial, BigDecimal quantity, Long id, Long prodID) {
        if (serial == null || StringUtils.isEmpty(serial)) {
            Number stt = repositoryLedgerRepository.checkTonKhoVT(org, prodID, id);
            if (new BigDecimal(stt.toString()).compareTo(quantity) >= 0) {
                return 1;
            } else {
                return 0;
            }
        } else {
            return repositoryLedgerRepository.checkTonKho(org, serial, id);
        }
    }


}
