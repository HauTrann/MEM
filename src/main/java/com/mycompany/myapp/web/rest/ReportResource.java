package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.service.ReportService;
import io.micrometer.core.annotation.Timed;
import net.sf.jasperreports.engine.JRException;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.InvocationTargetException;

@RestController
@RequestMapping("/api")
public class ReportResource {

    private final ReportService reportService;


    public ReportResource(ReportService reportService) {
        this.reportService = reportService;
    }

    /**
     * @return trả ra mảng byte của báo cáo.
     * @Author hieugie
     * <p>
     * Hàm tạo biểu mẫu
     * Edit Hautv
     */
    @GetMapping("/report-pdf")
    @Timed
    public ResponseEntity<byte[]> getReportPdf(@RequestParam(required = false) String fromDate,
                                               @RequestParam(required = false) String toDate,
                                               @RequestParam(required = false) String typeID) throws JRException, InvocationTargetException, IllegalAccessException {
        String name = "Name";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        try {
            byte[] bytes = reportService.getReport(fromDate, toDate, typeID);
            headers.setContentDispositionFormData(name, name);
            headers.setCacheControl(CacheControl.noCache());
            headers.setPragma("no-cache");
            return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
