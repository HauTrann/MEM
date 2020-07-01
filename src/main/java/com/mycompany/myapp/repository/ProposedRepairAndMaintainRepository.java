package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ProposedRepairAndMaintain;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProposedRepairAndMaintain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProposedRepairAndMaintainRepository extends JpaRepository<ProposedRepairAndMaintain, Long> {
}
