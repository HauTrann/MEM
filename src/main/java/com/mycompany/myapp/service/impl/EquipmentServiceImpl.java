package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.EquipmentType;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.EquipmentTypeRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.EquipmentService;
import com.mycompany.myapp.domain.Equipment;
import com.mycompany.myapp.repository.EquipmentRepository;
import com.mycompany.myapp.service.dto.DeviceModelDTO;
import com.mycompany.myapp.service.dto.EquipmentDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Equipment}.
 */
@Service
@Transactional
public class EquipmentServiceImpl implements EquipmentService {

    private final Logger log = LoggerFactory.getLogger(EquipmentServiceImpl.class);

    private final EquipmentRepository equipmentRepository;
    private final EquipmentTypeRepository equipmentTypeRepository;
    private final UserRepository userRepository;

    public EquipmentServiceImpl(EquipmentRepository equipmentRepository, EquipmentTypeRepository equipmentTypeRepository, UserRepository userRepository) {
        this.equipmentRepository = equipmentRepository;
        this.equipmentTypeRepository = equipmentTypeRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a equipment.
     *
     * @param equipment the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Equipment save(Equipment equipment) {
        log.debug("Request to save Equipment : {}", equipment);
        if (equipment.getOrganizationUnitID() == null) {
            equipment.setOrganizationUnitID(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
        return equipmentRepository.save(equipment);
    }

    /**
     * Get all the equipment.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EquipmentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Equipment");
        /*if (SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg() == null) {
            return equipmentRepository.findAll(pageable);
        } else {*/
        return equipmentRepository.findAllByOrganizationUnitIDCustom(pageable, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
//        }
    }

    @Override
    public Page<EquipmentDTO> getAllEquipmentUsing(Pageable pageable) {
        Optional<String> username = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = userRepository.findOneByLogin(username.get());
        return equipmentRepository.getAllEquipmentUsing(pageable, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg(), user.get().getId());
    }

    /**
     * Get one equipment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Equipment> findOne(Long id) {
        log.debug("Request to get Equipment : {}", id);
        Optional<Equipment> equipment = equipmentRepository.findById(id);
        if (equipment.get().getEquipmentTypeID() != null) {
            EquipmentType equipmentType = equipmentTypeRepository.findById(equipment.get().getEquipmentTypeID()).get();
            equipment.get().setEquipmentTypeName(equipmentType.getName());
        }
        return equipment;
    }

    /**
     * Delete the equipment by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Equipment : {}", id);
        equipmentRepository.deleteById(id);
    }

    @Override
    public List<DeviceModelDTO> findAllbyCodeText(String text) {
        return equipmentRepository.findAllbyCodeText(text, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
    }

    @Override
    public List<DeviceModelDTO> findAllDevice() {
        return equipmentRepository.findAllDevice(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
    }

    @Override
    public List<DeviceModelDTO> findAllDeviceDTO() {
        return equipmentRepository.findAllDeviceDTO(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
    }

    @Override
    public List<EquipmentDTO> getAllEquipmentDT(Long id) {
        return equipmentRepository.getAllEquipmentDT(id);
    }
}
