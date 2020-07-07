package com.mycompany.myapp.repository;

import com.mycompany.myapp.service.dto.SoTheoDoiDauTu;

import java.util.List;

/**
 * Spring Data  repository for the RepositoryLedger entity.
 */
@SuppressWarnings("unused")
public interface RepositoryLedgerRepositoryCustom {
    List<SoTheoDoiDauTu> soTheoDoiDauTu(String fromDate, String toDate, Long org);
    List<SoTheoDoiDauTu> getChiTietNhapKho(String fromDate, String toDate, Long org);
    List<SoTheoDoiDauTu> getChiTietXuatKho(String fromDate, String toDate, Long org);
    List<SoTheoDoiDauTu> getTongHopTonKho(String fromDate, String toDate, Long org);
    List<SoTheoDoiDauTu> getTongHopChiTietTonKho(String fromDate, String toDate, Long org);
}
