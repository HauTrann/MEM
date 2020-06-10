package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.security.SecurityDTO;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.DepartmentService;
import com.mycompany.myapp.domain.Department;
import com.mycompany.myapp.repository.DepartmentRepository;
import com.mycompany.myapp.service.dto.UserDTO;
import io.undertow.util.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.mycompany.myapp.security.AuthoritiesConstants.ADMIN;

/**
 * Service Implementation for managing {@link Department}.
 */
@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final Logger log = LoggerFactory.getLogger(DepartmentServiceImpl.class);

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    /**
     * Save a department.
     *
     * @param department the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Department save(Department department) {
        log.debug("Request to save Department : {}", department);
        if (department.getOrganizationUnitID() == null) {
            department.setOrganizationUnitID(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
        return departmentRepository.save(department);
    }

    /**
     * Get all the departments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Department> findAll(Pageable pageable) throws BadRequestException {
        log.debug("Request to get all Departments");
        Optional<SecurityDTO> securityDTO = SecurityUtils.getCurrentUserLoginAndOrg();
        if (securityDTO.isPresent() && securityDTO.get().getOrg() != -1) {
            return departmentRepository.findAllByOrganizationUnitIDCustom(pageable, securityDTO.get().getOrg());
        } else {
            if (securityDTO.isPresent() && securityDTO.get().getAuthorities().stream().anyMatch(n -> n.getAuthority().equals(ADMIN))) {
                return departmentRepository.findAllCustom(pageable);
            }
            throw new BadRequestException("");
        }
    }

    @Override
    public List<Department> findAll() {
        log.debug("Request to get all Departments");
        if (SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg() != null) {
            return departmentRepository.findAllByOrganizationUnitIDOrderByCode(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        } else {
            return departmentRepository.findAll();
        }
    }

    /**
     * Get one department by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Department> findOne(Long id) {
        log.debug("Request to get Department : {}", id);
        return departmentRepository.findById(id);
    }

    /**
     * Delete the department by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Department : {}", id);
        departmentRepository.deleteById(id);
    }
}
