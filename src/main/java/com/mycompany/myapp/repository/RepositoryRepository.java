package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data  repository for the Repository entity.
 */
@SuppressWarnings("unused")
@org.springframework.stereotype.Repository
public interface RepositoryRepository extends JpaRepository<Repository, Long> {

    Page<Repository> findAllByOrganizationUnitIDOrderByCode(Pageable pageable, Long id);
}
