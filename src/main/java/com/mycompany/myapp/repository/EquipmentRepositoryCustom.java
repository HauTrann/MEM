package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Equipment;
import com.mycompany.myapp.service.dto.DeviceModelDTO;
import com.mycompany.myapp.service.dto.EquipmentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Equipment entity.
 */
@SuppressWarnings("unused")
public interface EquipmentRepositoryCustom {
    List<DeviceModelDTO> findAllbyCodeText(String text, Long org);

    List<DeviceModelDTO> findAllDevice(Long org);

    List<DeviceModelDTO> findAllDeviceDTO(Long org);

    Page<EquipmentDTO> findAllByOrganizationUnitIDCustom(Pageable pageable, Long id);

    Page<EquipmentDTO> getAllEquipmentUsing(Pageable pageable, Long org, Long userID);

    List<EquipmentDTO> getAllEquipmentDT(Long id);
}
