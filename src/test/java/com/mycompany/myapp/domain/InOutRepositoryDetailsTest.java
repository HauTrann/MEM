package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class InOutRepositoryDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InOutRepositoryDetails.class);
        InOutRepositoryDetails inOutRepositoryDetails1 = new InOutRepositoryDetails();
        inOutRepositoryDetails1.setId(1L);
        InOutRepositoryDetails inOutRepositoryDetails2 = new InOutRepositoryDetails();
        inOutRepositoryDetails2.setId(inOutRepositoryDetails1.getId());
        assertThat(inOutRepositoryDetails1).isEqualTo(inOutRepositoryDetails2);
        inOutRepositoryDetails2.setId(2L);
        assertThat(inOutRepositoryDetails1).isNotEqualTo(inOutRepositoryDetails2);
        inOutRepositoryDetails1.setId(null);
        assertThat(inOutRepositoryDetails1).isNotEqualTo(inOutRepositoryDetails2);
    }
}
