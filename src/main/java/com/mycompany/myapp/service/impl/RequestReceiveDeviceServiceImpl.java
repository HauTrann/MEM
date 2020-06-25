package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.RequestReceiveDevice;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.RequestReceiveDeviceRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.SecurityDTO;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.RequestReceiveDeviceService;
import com.mycompany.myapp.service.dto.UserDTO;
import io.undertow.util.BadRequestException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.mycompany.myapp.security.AuthoritiesConstants.ADMIN;

/**
 * Service Implementation for managing {@link RequestReceiveDevice}.
 */
@Service
@Transactional
public class RequestReceiveDeviceServiceImpl implements RequestReceiveDeviceService {

    private final Logger log = LoggerFactory.getLogger(RequestReceiveDeviceServiceImpl.class);

    private final RequestReceiveDeviceRepository requestReceiveDeviceRepository;
    private final UserRepository userRepository;

    public RequestReceiveDeviceServiceImpl(RequestReceiveDeviceRepository requestReceiveDeviceRepository, UserRepository userRepository) {
        this.requestReceiveDeviceRepository = requestReceiveDeviceRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a requestReceiveDevice.
     *
     * @param requestReceiveDevice the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RequestReceiveDevice save(RequestReceiveDevice requestReceiveDevice) {
        log.debug("Request to save RequestReceiveDevice : {}", requestReceiveDevice);
        if (requestReceiveDevice.getOrganizationUnitID() == null) {
            requestReceiveDevice.setOrganizationUnitID(SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
//        Optional<SecurityDTO> securityDTO = SecurityUtils.getCurrentUserLoginAndOrg();
        if(requestReceiveDevice.getUserID() == null){
            Optional<String> username = SecurityUtils.getCurrentUserLogin();
            Optional<User> user = userRepository.findOneByLogin(username.get());
            requestReceiveDevice.setUserID(user.get().getId());
            requestReceiveDevice.setUserName((StringUtils.isEmpty(user.get().getLastName()) ? "" : user.get().getLastName()) + " " + (StringUtils.isEmpty(user.get().getFirstName()) ? "" : user.get().getFirstName()));
        }
        return requestReceiveDeviceRepository.save(requestReceiveDevice);
    }

    /**
     * Get all the requestReceiveDevices.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RequestReceiveDevice> findAll(Pageable pageable) {
        log.debug("Request to get all RequestReceiveDevices");
        return requestReceiveDeviceRepository.findAll(pageable);
    }

    @Override
    public Page<RequestReceiveDevice> findAllForEmployee(Pageable pageable) {
        log.debug("Request to get all RequestReceiveDevices Employee");
        Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
        return requestReceiveDeviceRepository.findAllByUserIDAndIsPay(pageable, user.get().getId(), false);
    }

    @Override
    public Page<RequestReceiveDevice> findAllForManager(Pageable pageable) {
        log.debug("Request to get all RequestReceiveDevices manager");
        return requestReceiveDeviceRepository.findAllByOrganizationUnitIDAndByIsPay(pageable, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg(), false);
    }

    @Override
    public Page<RequestReceiveDevice> findAllForEmployeePay(Pageable pageable) {
        log.debug("Request to get all RequestReceiveDevices Employee");
        Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
        return requestReceiveDeviceRepository.findAllByUserIDAndIsPay(pageable, user.get().getId(), true);
    }

    @Override
    public Page<RequestReceiveDevice> findAllForManagerPay(Pageable pageable) {
        log.debug("Request to get all RequestReceiveDevices manager");
        return requestReceiveDeviceRepository.findAllByOrganizationUnitIDAndByIsPay(pageable, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg(), true);
    }

    /**
     * Get one requestReceiveDevice by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RequestReceiveDevice> findOne(Long id) {
        log.debug("Request to get RequestReceiveDevice : {}", id);
        return requestReceiveDeviceRepository.findById(id);
    }

    /**
     * Delete the requestReceiveDevice by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RequestReceiveDevice : {}", id);
        requestReceiveDeviceRepository.deleteById(id);
    }
}
