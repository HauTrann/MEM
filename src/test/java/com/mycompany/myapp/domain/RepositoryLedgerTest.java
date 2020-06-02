package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class RepositoryLedgerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepositoryLedger.class);
        RepositoryLedger repositoryLedger1 = new RepositoryLedger();
        repositoryLedger1.setId(1L);
        RepositoryLedger repositoryLedger2 = new RepositoryLedger();
        repositoryLedger2.setId(repositoryLedger1.getId());
        assertThat(repositoryLedger1).isEqualTo(repositoryLedger2);
        repositoryLedger2.setId(2L);
        assertThat(repositoryLedger1).isNotEqualTo(repositoryLedger2);
        repositoryLedger1.setId(null);
        assertThat(repositoryLedger1).isNotEqualTo(repositoryLedger2);
    }
}
