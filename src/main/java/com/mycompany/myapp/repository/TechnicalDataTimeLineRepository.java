package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TechnicalDataTimeLine;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TechnicalDataTimeLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TechnicalDataTimeLineRepository extends JpaRepository<TechnicalDataTimeLine, Long> {
}
