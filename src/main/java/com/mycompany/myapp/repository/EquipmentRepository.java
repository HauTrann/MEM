package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Equipment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Equipment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long>, EquipmentRepositoryCustom {

    Page<Equipment> findAllByOrganizationUnitIDOrderByCode(Pageable pageable, Long id);
}
