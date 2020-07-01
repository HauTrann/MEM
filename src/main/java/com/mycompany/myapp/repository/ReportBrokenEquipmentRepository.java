package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ReportBrokenEquipment;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ReportBrokenEquipment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportBrokenEquipmentRepository extends JpaRepository<ReportBrokenEquipment, Long> {
}
