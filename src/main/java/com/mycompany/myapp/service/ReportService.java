package com.mycompany.myapp.service;

import net.sf.jasperreports.engine.JRException;

import java.lang.reflect.InvocationTargetException;
import java.time.LocalDateTime;
import java.util.UUID;

public interface ReportService {
    /**
     * @return trả ra mảng byte của báo cáo.
     * @Author hautv
     * <p>
     * Hàm tạo báo cáo demo.
     */
    byte[] getReport(String fromDate, String toDate, String typeID) throws JRException, InvocationTargetException, IllegalAccessException;
}
