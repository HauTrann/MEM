package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.InOutRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InOutRepository entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InOutRepositoryRepository extends JpaRepository<InOutRepository, Long> {

    Page<InOutRepository> findAllByOrganizationUnitIDAndOutOfStockIsTrue(Pageable pageable, Long org);
    Page<InOutRepository> findAllByOrganizationUnitIDAndOutOfStockIsFalseOrOutOfStockIsNull(Pageable pageable, Long org);

    Integer countAllByOutOfStockAndOrganizationUnitID(Boolean ofs, Long org);

}
