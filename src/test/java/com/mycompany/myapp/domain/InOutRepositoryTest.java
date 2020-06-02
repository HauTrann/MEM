package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class InOutRepositoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InOutRepository.class);
        InOutRepository inOutRepository1 = new InOutRepository();
        inOutRepository1.setId(1L);
        InOutRepository inOutRepository2 = new InOutRepository();
        inOutRepository2.setId(inOutRepository1.getId());
        assertThat(inOutRepository1).isEqualTo(inOutRepository2);
        inOutRepository2.setId(2L);
        assertThat(inOutRepository1).isNotEqualTo(inOutRepository2);
        inOutRepository1.setId(null);
        assertThat(inOutRepository1).isNotEqualTo(inOutRepository2);
    }
}
