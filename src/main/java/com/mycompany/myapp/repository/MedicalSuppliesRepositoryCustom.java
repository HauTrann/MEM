package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MedicalSupplies;
import com.mycompany.myapp.service.dto.MedicalSuppliesDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MedicalSupplies entity.
 */
@SuppressWarnings("unused")
public interface MedicalSuppliesRepositoryCustom {
    Page<MedicalSupplies> findAllForEmployee(Pageable pageable, Long org);

    Page<MedicalSuppliesDTO> findAllByOrganizationUnitIDUsing(Pageable pageable, Long org, Long userID);
}
