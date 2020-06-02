package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.InOutRepositoryDetails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InOutRepositoryDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InOutRepositoryDetailsRepository extends JpaRepository<InOutRepositoryDetails, Long> {
}
