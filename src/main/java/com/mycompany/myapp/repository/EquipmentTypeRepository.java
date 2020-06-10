package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EquipmentType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EquipmentType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EquipmentTypeRepository extends JpaRepository<EquipmentType, Long> {
    Page<EquipmentType> findAllByOrganizationUnitIDOrderByCode(Pageable pageable, Long id);
}
