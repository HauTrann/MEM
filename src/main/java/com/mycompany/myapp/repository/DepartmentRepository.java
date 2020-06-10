package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Department;

import com.mycompany.myapp.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Department entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    List<Department> findAllByOrganizationUnitIDOrderByCode(Long id);

    Page<Department> findAllByOrganizationUnitID(Pageable pageable, Long org);

    @Query(value = "select *, o.name as organizationUnitName, o.name as organizationUnitCode from department d " +
        "join organization_unit o on d.organization_unit_id = o.id where d.organization_unit_id = ?1 ", nativeQuery = true)
    Page<Department> findAllByOrganizationUnitIDCustom(Pageable pageable, Long org);

    @Query(value = "select *, o.name as organizationUnitName, o.name as organizationUnitCode from department d " +
        "join organization_unit o on d.organization_unit_id = o.id ", nativeQuery = true)
    Page<Department> findAllCustom(Pageable pageable);
}
