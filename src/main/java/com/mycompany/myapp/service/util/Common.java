package com.mycompany.myapp.service.util;

import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import javax.persistence.Query;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.Map.Entry;


/**
 * @author congnd
 */
public class Common {
    private static final Logger log = LoggerFactory.getLogger(Common.class);

    /**
     * @param sort
     * @return
     */
    public static String addSort(Sort sort) {
        StringBuilder orderSql = new StringBuilder();
        if (sort == null)
            return "";
        for (Sort.Order order : sort) {
            orderSql.append("ORDER BY ");
            orderSql.append(order.getProperty());
            orderSql.append(" ");
            orderSql.append(order.getDirection());
            break;
        }
        return orderSql.toString();
    }

    /**
     * @Author phuonghv
     */
    public static String addMultiSort(Sort sort) {
        StringBuilder orderSql = new StringBuilder();
        if (sort == null) {
            return "";
        }
        orderSql.append("ORDER BY ");
        int i = 0;
        for (Sort.Order order : sort) {
            if (i > 0) {
                orderSql.append(", ");
            }
            orderSql.append(order.getProperty());
            orderSql.append(" ");
            orderSql.append(order.getDirection());
            i++;
        }
        return orderSql.toString();
    }

    public static Integer getNumberOfDayInMonth(Integer month, Integer year) {
        int number = 0;
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                number = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                number = 30;
                break;
            case 2: {
                if ((year % 400 == 0) || (year % 4 == 0 & year % 100 == 0)) {
                    number = 29;
                } else {
                    number = 28;
                }
                break;
            }
            default:
                number = 0;
                break;
        }
        return number;
    }

    /**
     * @param query
     * @param params
     * @Author hieugie
     * <p>
     * Hàm chung set param cho query
     */
    public static void setParams(Query query, Map<String, Object> params) {
        if (params != null && !params.isEmpty()) {
            Set<Entry<String, Object>> set = params.entrySet();
            for (Entry<String, Object> obj : set) {
                if (obj.getValue() == null)
                    query.setParameter(obj.getKey(), "");
                else
                    query.setParameter(obj.getKey(), obj.getValue());
            }
        }
    }

    /**
     * @param query
     * @param params
     * @Author hieugie
     * <p>
     * Hàm chung set param và pageable cho query
     * Set lại giá trị offset trong trong hợp offset > tổng số bản ghi tìm được
     */
    public static void setParamsWithPageable(@NotNull Query query, Map<String, Object> params, @NotNull Pageable pageable, @NotNull Number total) {
        if (params != null && !params.isEmpty()) {
            Set<Entry<String, Object>> set = params.entrySet();
            for (Entry<String, Object> obj : set) {
                query.setParameter(obj.getKey(), obj.getValue());
            }
        }
//        if (total.intValue() < (int)pageable.getOffset()) {
//            pageable = PageRequest.of(0, pageable.getPageSize(), pageable.getSort());
//        }
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
    }

    /**
     * @param fromDate   từ ngày - string yyyyMMdd
     * @param toDate     đến ngày - string yyyyMMdd
     * @param params     map các params
     * @param sqlBuilder câu sql
     * @param columnName tên cột ngày tháng cần truy vấn
     * @author dungvm
     * <p>
     * Thêm điều kiện ngày tháng nằm trong khoảng cho câu lệnh sql
     */
    public static void addDateSearch(String fromDate, String toDate, Map<String, Object> params,
                                     StringBuilder sqlBuilder, String columnName) {
        if (!Strings.isNullOrEmpty(fromDate) && !Strings.isNullOrEmpty(toDate)) {
            sqlBuilder.append("AND :fromDate" + columnName + " <= CONVERT(varchar, " + columnName + ", 112) AND :toDate" + columnName + " " +
                ">= CONVERT(varchar, " + columnName + ", 112) ");
            params.put("fromDate" + columnName, fromDate);
            params.put("toDate" + columnName, toDate);
        } else if (!Strings.isNullOrEmpty(fromDate)) {
            sqlBuilder.append("AND :fromDate" + columnName + " <= CONVERT(varchar, " + columnName + ", 112) ");
            params.put("fromDate" + columnName, fromDate);
        } else if (!Strings.isNullOrEmpty(toDate)) {
            sqlBuilder.append("AND :toDate" + columnName + " >= CONVERT(varchar, " + columnName + ", 112) ");
            params.put("toDate" + columnName, toDate);
        }
    }

    /**
     * @param fromDate   từ ngày - string yyyyMMdd
     * @param toDate     đến ngày - string yyyyMMdd
     * @param params     map các params
     * @param sqlBuilder câu sql
     * @param columnName tên cột ngày tháng cần truy vấn
     * @author phuonghv
     * <p>
     * Thêm điều kiện ngày tháng nằm trong khoảng cho câu lệnh sql
     */
    public static void addDateSearchCustom(String fromDate, String toDate, Map<String, Object> params,
                                           StringBuilder sqlBuilder, String columnName, String param) {
        if (!Strings.isNullOrEmpty(fromDate) && !Strings.isNullOrEmpty(toDate)) {
            sqlBuilder.append("AND :from" + param + " <= CONVERT(varchar, " + columnName + ", 112) AND :to" + param +
                " >= CONVERT(varchar, " + columnName + ", 112) ");
            params.put("from" + param, fromDate);
            params.put("to" + param, toDate);
        } else if (!Strings.isNullOrEmpty(fromDate)) {
            sqlBuilder.append("AND :from" + param + " <= CONVERT(varchar, " + columnName + ", 112) ");
            params.put("from" + param, fromDate);
        } else if (!Strings.isNullOrEmpty(toDate)) {
            sqlBuilder.append("AND :to" + param + " >= CONVERT(varchar, " + columnName + ", 112) ");
            params.put("to" + param, toDate);
        }
    }

    public static BigDecimal getBigDecimal(Object object) {
        return object != null ? (BigDecimal) object : null;
    }

    public static LocalDate getLocalDate(Object object) {
        return object != null ? ((Timestamp) object).toLocalDateTime().toLocalDate() : null;
    }

    public static UUID getUUID(Object object) {
        return object != null ? UUID.fromString((String) object) : null;
    }

    public static Float getFloat(Object object) {
        return object != null ? ((BigDecimal) object).floatValue() : null;
    }

    public static Integer getInteger(Object object) {
        return object != null ? ((BigDecimal) object).intValue() : null;
    }

    public static Integer getInteger(String object) {
        try {
            if (!Strings.isNullOrEmpty(object)) {
                return Integer.parseInt(object);
            }
        } catch (Exception ignore) {

        }
        return null;
    }

    public static Long getLong(Object object) {
        return object != null ? ((BigDecimal) object).longValue() : null;
    }

    public static Double getDouble(Object object) {
        return object != null ? ((BigDecimal) object).doubleValue() : null;
    }

    public static boolean getBoolean(Object object) {
        return object != null && ((BigDecimal) object).intValue() == 1;
    }

    /**
     * @param dateStr
     * @return
     * @author kienpv
     * <p>
     * convert string to string format yyyy/mm/dd
     */
    public static String converDate(String dateStr) {
        try {
            DateFormat formatter = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss Z");
            Date date = (Date) formatter.parse(dateStr);
            System.out.println(date);

            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            String formatedDate = cal.get(Calendar.YEAR) + "-" + (cal.get(Calendar.MONTH) + 1) + "-" + cal.get(Calendar.DATE);
            System.out.println("formatedDate : " + formatedDate);
            return formatedDate;
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return "";
        }
    }

    public static boolean isValidTaxCode(String mst) {
        if (mst.length() <= 14 && mst.length() >= 10) {
            Integer value =
                getInt(mst.charAt(0)) * 31 +
                    getInt(mst.charAt(1)) * 29 +
                    getInt(mst.charAt(2)) * 23 +
                    getInt(mst.charAt(3)) * 19 +
                    getInt(mst.charAt(4)) * 17 +
                    getInt(mst.charAt(5)) * 13 +
                    getInt(mst.charAt(6)) * 7 +
                    getInt(mst.charAt(7)) * 5 +
                    getInt(mst.charAt(8)) * 3;
            int mod = 10 - value % 11;
            return Math.abs(mod) == getInt(mst.charAt(9));
        } else {
            return false;
        }
    }

    private static Integer getInt(char c) {
        return (int) c - 48;
    }

    public static String removeDotAndComma(String before) {
        if (Strings.isNullOrEmpty(before)) {
            return "";
        }
        return before.replace(".", "").replace(",", "");
    }

    public static UUID revertUUID(UUID id) {
        if (id == null) {
            return null;
        }
        String data = id.toString();
        String finalData = data.substring(6, 8) + data.substring(4, 6) + data.substring(2, 4) + data.substring(0, 2) + "-"
            + data.substring(11, 13) + data.substring(9, 11) + "-"
            + data.substring(16, 18) + data.substring(14, 16)
            + data.substring(18);
        return UUID.fromString(finalData);
    }

    /**
     * @param input
     * @return
     * @author anmt
     */
    public static String getMd5(String input) {
        try {
            // Static getInstance method is called with hashing MD5
            MessageDigest md = MessageDigest.getInstance("MD5");
            // digest() method is called to calculate message digest
            //  of an input digest() return array of byte
            byte[] messageDigest = md.digest(input.getBytes());
            // Convert byte array into signum representation
            BigInteger no = new BigInteger(1, messageDigest);
            // Convert message digest into hex value
            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        }
        // For specifying wrong message digest algorithms
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param fromDate
     * @param toDate
     * @return
     * @Author Hautv
     */
    public static String getPeriod(LocalDate fromDate, LocalDate toDate) {
        if (fromDate.getDayOfMonth() == 1 && fromDate.getYear() == toDate.getYear()) {
            // Năm
            if (fromDate.getMonthValue() == 1 && toDate.getDayOfMonth() == 31 && toDate.getMonthValue() == 12)
                return String.format("Năm %1$s", fromDate.getYear());
            // Quý
            // List<int> lstMonth = new int[] {1,4,7,10};
            if (Arrays.asList(1, 4, 7, 10).contains(fromDate.getMonthValue())) {
                List<String> chars = Arrays.asList("I", "II", "III", "IV");
                LocalDate test = fromDate.plusMonths(3).plusDays(-1).atTime(0, 0, 0, 0).toLocalDate();
                if (fromDate.plusMonths(3).plusDays(-1).atTime(0, 0, 0, 0).toLocalDate().equals(toDate.atTime(0, 0, 0, 0).toLocalDate()))
                    return String.format("Quý %1$s năm %2$s", chars.get(((fromDate.getMonthValue() - 1) / 3)), fromDate.getYear());
            }
            // tháng
            if (fromDate.plusMonths(1).plusDays(-1).atTime(0, 0, 0, 0).toLocalDate().equals(toDate.atTime(0, 0, 0, 0).toLocalDate()))
                return String.format("Tháng %1$s năm %2$s", fromDate.getMonthValue(), fromDate.getYear());
        }
        return String.format("Từ ngày %1$s đến ngày %2$s", convertDate(fromDate), convertDate(toDate));
    }

    // Convert PostedDate, Date
    public static String convertDate(LocalDate date) {
        if (date == null) {
            return null;
        } else {
            return date.format(DateTimeFormatter.ofPattern(DateUtil.C_DD_MM_YYYY));
        }
    }

    // Convert PostedDate, Date
    public static String convertDate_C_DD_MM_YYYY(LocalDateTime date) {
        if (date == null) {
            return null;
        } else {
            return date.format(DateTimeFormatter.ofPattern(DateUtil.C_DD_MM_YYYY));
        }
    }

    // Convert PostedDate, Date
    public static String convertDate_C_YYYYMMDD_HHMMSS(LocalDateTime date) {
        if (date == null) {
            return null;
        } else {
            return date.format(DateTimeFormatter.ofPattern(DateUtil.C_YYYYMMDD_HHMMSS));
        }
    }

    public static String bigdecimalToString(BigDecimal bigDecimal) {
        if (bigDecimal == null) return "";
        DecimalFormat df = new DecimalFormat("###,###,###");
        return df.format(bigDecimal);
    }
}
