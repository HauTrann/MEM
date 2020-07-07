package com.mycompany.myapp.service.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public interface Constants {

    interface ResponeStatus {
        int Success = 1;
        int Fail = 0;
    }

    interface Report {
        String SO_THEO_DOI_DAU_TU = "SO_THEO_DOI_DAU_TU";
        String CHI_TIET_NHAP_KHO = "CHI_TIET_NHAP_KHO";
        String CHI_TIET_XUAT_KHO = "CHI_TIET_XUAT_KHO";
        String TONG_HOP_TON_KHO = "TONG_HOP_TON_KHO";
        String TONG_HOP_CHI_TIET_TON_KHO = "TONG_HOP_CHI_TIET_TON_KHO";
    }
}
