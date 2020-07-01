package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.MedicalSuppliesService;
import com.mycompany.myapp.domain.MedicalSupplies;
import com.mycompany.myapp.repository.MedicalSuppliesRepository;
import com.mycompany.myapp.service.dto.MedicalSuppliesDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link MedicalSupplies}.
 */
@Service
@Transactional
public class MedicalSuppliesServiceImpl implements MedicalSuppliesService {

    private final Logger log = LoggerFactory.getLogger(MedicalSuppliesServiceImpl.class);

    private final MedicalSuppliesRepository medicalSuppliesRepository;
    private final UserRepository userRepository;

    public MedicalSuppliesServiceImpl(MedicalSuppliesRepository medicalSuppliesRepository, UserRepository userRepository) {
        this.medicalSuppliesRepository = medicalSuppliesRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a medicalSupplies.
     *
     * @param medicalSupplies the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MedicalSupplies save(MedicalSupplies medicalSupplies) {
        log.debug("Request to save MedicalSupplies : {}", medicalSupplies);
        if (medicalSupplies.getOrganizationUnitID() == null) {
            medicalSupplies.setOrganizationUnitID(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
        return medicalSuppliesRepository.save(medicalSupplies);
    }

    /**
     * Get all the medicalSupplies.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MedicalSupplies> findAll(Pageable pageable) {
        log.debug("Request to get all MedicalSupplies");
        return medicalSuppliesRepository.findAll(pageable);
    }

    @Override
    public Page<MedicalSupplies> findAllByOrganizationUnitID(Pageable pageable) {
        log.debug("Request to get all MedicalSupplies");
        return medicalSuppliesRepository.findAllByOrganizationUnitID(pageable, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
    }

    @Override
    public Page<MedicalSuppliesDTO> findAllByOrganizationUnitIDUsing(Pageable pageable) {
        Optional<String> username = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = userRepository.findOneByLogin(username.get());
        return medicalSuppliesRepository.findAllByOrganizationUnitIDUsing(pageable, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg(), user.get().getId());
    }

    /**
     * Get one medicalSupplies by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MedicalSupplies> findOne(Long id) {
        log.debug("Request to get MedicalSupplies : {}", id);
        return medicalSuppliesRepository.findById(id);
    }

    /**
     * Delete the medicalSupplies by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MedicalSupplies : {}", id);
        medicalSuppliesRepository.deleteById(id);
    }
}
