package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TechnicalDataTimeLine;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the TechnicalDataTimeLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TechnicalDataTimeLineRepository extends JpaRepository<TechnicalDataTimeLine, Long> {

    @Query(value = "select * from TechnicalDataTimeLine\n" +
        "where serial = ?1 \n" +
        "and time = (select max(time) from TechnicalDataTimeLine where serial = ?1)", nativeQuery = true)
    List<TechnicalDataTimeLine> getNow(String serial);
}
