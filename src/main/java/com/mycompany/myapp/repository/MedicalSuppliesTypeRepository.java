package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MedicalSuppliesType;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MedicalSuppliesType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicalSuppliesTypeRepository extends JpaRepository<MedicalSuppliesType, Long> {

    Page<MedicalSuppliesType> findAllByOrganizationUnitID(Pageable pageable, Long org);
}
