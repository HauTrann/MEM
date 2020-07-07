package com.mycompany.myapp.repository.Impl;

import com.mycompany.myapp.repository.RepositoryLedgerRepositoryCustom;
import com.mycompany.myapp.service.dto.SoTheoDoiDauTu;
import com.mycompany.myapp.service.util.Common;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RepositoryLedgerRepositoryImpl implements RepositoryLedgerRepositoryCustom {
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<SoTheoDoiDauTu> soTheoDoiDauTu(String fromDate, String toDate, Long org) {
        List<SoTheoDoiDauTu> soNhatKyChungDTOS = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        sql.append("EXEC [Proc_SO_THEO_DOI_DAU_TU] @FromDate = :FromDate, @ToDate = :ToDate, @organizationUnitID = :org");
        params.put("FromDate", fromDate);
        params.put("ToDate", toDate);
        params.put("org", org);
        Query query = entityManager.createNativeQuery(sql.toString(), "SoTheoDoiDauTu");
        Common.setParams(query, params);
        soNhatKyChungDTOS = query.getResultList();
        return soNhatKyChungDTOS;
    }

    @Override
    public List<SoTheoDoiDauTu> getChiTietNhapKho(String fromDate, String toDate, Long org) {
        List<SoTheoDoiDauTu> soNhatKyChungDTOS = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        sql.append("EXEC [Proc_CHI_TIET_NHAP_KHO] @FromDate = :FromDate, @ToDate = :ToDate, @organizationUnitID = :org");
        params.put("FromDate", fromDate);
        params.put("ToDate", toDate);
        params.put("org", org);
        Query query = entityManager.createNativeQuery(sql.toString(), "SoTheoDoiDauTu");
        Common.setParams(query, params);
        soNhatKyChungDTOS = query.getResultList();
        return soNhatKyChungDTOS;
    }

    @Override
    public List<SoTheoDoiDauTu> getChiTietXuatKho(String fromDate, String toDate, Long org) {
        List<SoTheoDoiDauTu> soNhatKyChungDTOS = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        sql.append("EXEC [Proc_CHI_TIET_XUAT_KHO] @FromDate = :FromDate, @ToDate = :ToDate, @organizationUnitID = :org");
        params.put("FromDate", fromDate);
        params.put("ToDate", toDate);
        params.put("org", org);
        Query query = entityManager.createNativeQuery(sql.toString(), "SoTheoDoiDauTu");
        Common.setParams(query, params);
        soNhatKyChungDTOS = query.getResultList();
        return soNhatKyChungDTOS;
    }

    @Override
    public List<SoTheoDoiDauTu> getTongHopTonKho(String fromDate, String toDate, Long org) {
        List<SoTheoDoiDauTu> soNhatKyChungDTOS = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        sql.append("EXEC [Proc_TONG_HOP_TON_KHO] @FromDate = :FromDate, @ToDate = :ToDate, @organizationUnitID = :org");
        params.put("FromDate", fromDate);
        params.put("ToDate", toDate);
        params.put("org", org);
        Query query = entityManager.createNativeQuery(sql.toString(), "TongHopTonKho");
        Common.setParams(query, params);
        soNhatKyChungDTOS = query.getResultList();
        return soNhatKyChungDTOS;
    }

    @Override
    public List<SoTheoDoiDauTu> getTongHopChiTietTonKho(String fromDate, String toDate, Long org) {
        List<SoTheoDoiDauTu> soNhatKyChungDTOS = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        sql.append("EXEC [Proc_TONG_HOP_CHI_TIET_TON_KHO] @FromDate = :FromDate, @ToDate = :ToDate, @organizationUnitID = :org");
        params.put("FromDate", fromDate);
        params.put("ToDate", toDate);
        params.put("org", org);
        Query query = entityManager.createNativeQuery(sql.toString(), "TongHopTonKhoCT");
        Common.setParams(query, params);
        soNhatKyChungDTOS = query.getResultList();
        return soNhatKyChungDTOS;
    }
}
