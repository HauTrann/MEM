package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.repository.RepositoryLedgerRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.ReportService;
import com.mycompany.myapp.service.dto.SoTheoDoiDauTu;
import com.mycompany.myapp.service.util.Common;
import com.mycompany.myapp.service.util.Constants;
import com.mycompany.myapp.service.util.ReportUtils;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperReport;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class ReportServiceImpl implements ReportService {

    private final RepositoryLedgerRepository repositoryLedgerRepository;

    public ReportServiceImpl(RepositoryLedgerRepository repositoryLedgerRepository) {
        this.repositoryLedgerRepository = repositoryLedgerRepository;
    }

    @Override
    public byte[] getReport(String fromDate, String toDate, String typeID) throws JRException, InvocationTargetException, IllegalAccessException {
        switch (typeID) {
            case Constants.Report
                .SO_THEO_DOI_DAU_TU:
                return getSoTheoDoiDauTu(fromDate, toDate, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
            case Constants.Report
                .CHI_TIET_NHAP_KHO:
                return getChiTietNhapKho(fromDate, toDate, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
            case Constants.Report
                .CHI_TIET_XUAT_KHO:
                return getChiTietXuatKho(fromDate, toDate, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
            case Constants.Report
                .TONG_HOP_TON_KHO:
                return getTongHopTonKho(fromDate, toDate, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
            case Constants.Report
                .TONG_HOP_CHI_TIET_TON_KHO:
                return getTongHopChiTietTonKho(fromDate, toDate, SecurityUtils.getCurrentUserLoginAndOrg().get().getOrg());
        }
        return new byte[0];
    }

    /**
     * @return
     * @Author Hautv
     */
    private byte[] getSoTheoDoiDauTu(String fromDate, String toDate, Long org) throws JRException {
        byte[] result = null;
        String reportName = "SoTheoDoiDauTu";
        List<SoTheoDoiDauTu> soTheoDoiDauTus = new ArrayList<>();
        soTheoDoiDauTus = repositoryLedgerRepository.soTheoDoiDauTu(fromDate, toDate, org);
        Map<String, Object> parameter = new HashMap<>();
        BigDecimal total = BigDecimal.ZERO;
        for (SoTheoDoiDauTu soTheoDoiDauTu : soTheoDoiDauTus) {
            soTheoDoiDauTu.setAmountString(Common.bigdecimalToString(soTheoDoiDauTu.getAmount()));
            soTheoDoiDauTu.setQuantityString(Common.bigdecimalToString(soTheoDoiDauTu.getQuantity()));
            soTheoDoiDauTu.setUnitPriceString(Common.bigdecimalToString(soTheoDoiDauTu.getUnitPrice()));
            soTheoDoiDauTu.setDateString(Common.convertDate_C_DD_MM_YYYY(soTheoDoiDauTu.getDate()));
            soTheoDoiDauTu.setPostedDateString(Common.convertDate_C_DD_MM_YYYY(soTheoDoiDauTu.getPostedDate()));
            if (soTheoDoiDauTu.getAmount() != null) {
                total = total.add(soTheoDoiDauTu.getAmount());
            }
        }
        parameter.put("total", Common.bigdecimalToString(total));
        parameter.put("REPORT_MAX_COUNT", soTheoDoiDauTus.size());
        // tạo file báo cáo
        JasperReport jasperReport = ReportUtils.getCompiledFile(reportName + ".jasper", reportName + ".jrxml");
        jasperReport.setProperty("net.sf.jasperreports.default.pdf.encoding", "Cp1250");
        result = ReportUtils.generateReportPDF(soTheoDoiDauTus, parameter, jasperReport);
        return result;
    }

    /**
     * @return
     * @Author Hautv
     */
    private byte[] getChiTietNhapKho(String fromDate, String toDate, Long org) throws JRException {
        byte[] result = null;
        String reportName = "ChiTietNhapKho";
        List<SoTheoDoiDauTu> soTheoDoiDauTus = new ArrayList<>();
        soTheoDoiDauTus = repositoryLedgerRepository.getChiTietNhapKho(fromDate, toDate, org);
        Map<String, Object> parameter = new HashMap<>();
        BigDecimal total = BigDecimal.ZERO;
        for (SoTheoDoiDauTu soTheoDoiDauTu : soTheoDoiDauTus) {
            soTheoDoiDauTu.setAmountString(Common.bigdecimalToString(soTheoDoiDauTu.getAmount()));
            soTheoDoiDauTu.setQuantityString(Common.bigdecimalToString(soTheoDoiDauTu.getQuantity()));
            soTheoDoiDauTu.setUnitPriceString(Common.bigdecimalToString(soTheoDoiDauTu.getUnitPrice()));
            soTheoDoiDauTu.setDateString(Common.convertDate_C_DD_MM_YYYY(soTheoDoiDauTu.getDate()));
            soTheoDoiDauTu.setPostedDateString(Common.convertDate_C_DD_MM_YYYY(soTheoDoiDauTu.getPostedDate()));
            if (soTheoDoiDauTu.getAmount() != null) {
                total = total.add(soTheoDoiDauTu.getAmount());
            }
        }
        parameter.put("total", Common.bigdecimalToString(total));
        parameter.put("REPORT_MAX_COUNT", soTheoDoiDauTus.size());
        // tạo file báo cáo
        JasperReport jasperReport = ReportUtils.getCompiledFile(reportName + ".jasper", reportName + ".jrxml");
        jasperReport.setProperty("net.sf.jasperreports.default.pdf.encoding", "Cp1250");
        result = ReportUtils.generateReportPDF(soTheoDoiDauTus, parameter, jasperReport);
        return result;
    }

    private byte[] getChiTietXuatKho(String fromDate, String toDate, Long org) throws JRException {
        byte[] result = null;
        String reportName = "ChiTietXuatKho";
        List<SoTheoDoiDauTu> soTheoDoiDauTus = new ArrayList<>();
        soTheoDoiDauTus = repositoryLedgerRepository.getChiTietXuatKho(fromDate, toDate, org);
        Map<String, Object> parameter = new HashMap<>();
        BigDecimal total = BigDecimal.ZERO;
        for (SoTheoDoiDauTu soTheoDoiDauTu : soTheoDoiDauTus) {
            soTheoDoiDauTu.setAmountString(Common.bigdecimalToString(soTheoDoiDauTu.getAmount()));
            soTheoDoiDauTu.setQuantityString(Common.bigdecimalToString(soTheoDoiDauTu.getQuantity()));
            soTheoDoiDauTu.setUnitPriceString(Common.bigdecimalToString(soTheoDoiDauTu.getUnitPrice()));
            soTheoDoiDauTu.setDateString(Common.convertDate_C_DD_MM_YYYY(soTheoDoiDauTu.getDate()));
            soTheoDoiDauTu.setPostedDateString(Common.convertDate_C_DD_MM_YYYY(soTheoDoiDauTu.getPostedDate()));
            if (soTheoDoiDauTu.getAmount() != null) {
                total = total.add(soTheoDoiDauTu.getAmount());
            }
        }
        parameter.put("total", Common.bigdecimalToString(total));
        parameter.put("REPORT_MAX_COUNT", soTheoDoiDauTus.size());
        // tạo file báo cáo
        JasperReport jasperReport = ReportUtils.getCompiledFile(reportName + ".jasper", reportName + ".jrxml");
        jasperReport.setProperty("net.sf.jasperreports.default.pdf.encoding", "Cp1250");
        result = ReportUtils.generateReportPDF(soTheoDoiDauTus, parameter, jasperReport);
        return result;
    }

    private byte[] getTongHopTonKho(String fromDate, String toDate, Long org) throws JRException {
        byte[] result = null;
        String reportName = "TongHopTonKho";
        List<SoTheoDoiDauTu> soTheoDoiDauTus = new ArrayList<>();
        soTheoDoiDauTus = repositoryLedgerRepository.getTongHopTonKho(fromDate, toDate, org);
        Map<String, Object> parameter = new HashMap<>();
        BigDecimal total = BigDecimal.ZERO;
        for (SoTheoDoiDauTu soTheoDoiDauTu : soTheoDoiDauTus) {
            soTheoDoiDauTu.setNhapKhoString(Common.bigdecimalToString(soTheoDoiDauTu.getNhapKho()));
            soTheoDoiDauTu.setXuatKhoString(Common.bigdecimalToString(soTheoDoiDauTu.getXuatKho()));
            soTheoDoiDauTu.setTonKhoString(Common.bigdecimalToString(soTheoDoiDauTu.getTonKho()));
        }
        parameter.put("REPORT_MAX_COUNT", soTheoDoiDauTus.size());
        // tạo file báo cáo
        JasperReport jasperReport = ReportUtils.getCompiledFile(reportName + ".jasper", reportName + ".jrxml");
        jasperReport.setProperty("net.sf.jasperreports.default.pdf.encoding", "Cp1250");
        result = ReportUtils.generateReportPDF(soTheoDoiDauTus, parameter, jasperReport);
        return result;
    }

    private byte[] getTongHopChiTietTonKho(String fromDate, String toDate, Long org) throws JRException {
        byte[] result = null;
        String reportName = "TongHopChiTietTonKho";
        List<SoTheoDoiDauTu> soTheoDoiDauTus = new ArrayList<>();
        soTheoDoiDauTus = repositoryLedgerRepository.getTongHopChiTietTonKho(fromDate, toDate, org);
        Map<String, Object> parameter = new HashMap<>();
        BigDecimal total = BigDecimal.ZERO;
        for (SoTheoDoiDauTu soTheoDoiDauTu : soTheoDoiDauTus) {
            soTheoDoiDauTu.setNhapKhoString(Common.bigdecimalToString(soTheoDoiDauTu.getNhapKho()));
            soTheoDoiDauTu.setXuatKhoString(Common.bigdecimalToString(soTheoDoiDauTu.getXuatKho()));
            soTheoDoiDauTu.setTonKhoString(Common.bigdecimalToString(soTheoDoiDauTu.getTonKho()));
        }
        parameter.put("REPORT_MAX_COUNT", soTheoDoiDauTus.size());
        // tạo file báo cáo
        JasperReport jasperReport = ReportUtils.getCompiledFile(reportName + ".jasper", reportName + ".jrxml");
        jasperReport.setProperty("net.sf.jasperreports.default.pdf.encoding", "Cp1250");
        result = ReportUtils.generateReportPDF(soTheoDoiDauTus, parameter, jasperReport);
        return result;
    }

}
