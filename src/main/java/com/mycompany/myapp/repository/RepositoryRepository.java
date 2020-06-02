package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Repository;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data  repository for the Repository entity.
 */
@SuppressWarnings("unused")
@org.springframework.stereotype.Repository
public interface RepositoryRepository extends JpaRepository<Repository, Long> {
}
