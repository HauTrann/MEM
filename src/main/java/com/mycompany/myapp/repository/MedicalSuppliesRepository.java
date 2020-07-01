package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MedicalSupplies;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MedicalSupplies entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicalSuppliesRepository extends JpaRepository<MedicalSupplies, Long>, MedicalSuppliesRepositoryCustom {
    Page<MedicalSupplies> findAllByOrganizationUnitID(Pageable pageable, Long org);
}
