package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.RepositoryLedger;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RepositoryLedger entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepositoryLedgerRepository extends JpaRepository<RepositoryLedger, Long> {

    void deleteAllByOrganizationUnitIDAndRefID(Long org, Long refID);

}
