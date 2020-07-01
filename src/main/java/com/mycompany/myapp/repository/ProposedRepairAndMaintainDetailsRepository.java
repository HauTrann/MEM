package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ProposedRepairAndMaintainDetails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProposedRepairAndMaintainDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProposedRepairAndMaintainDetailsRepository extends JpaRepository<ProposedRepairAndMaintainDetails, Long> {
}
