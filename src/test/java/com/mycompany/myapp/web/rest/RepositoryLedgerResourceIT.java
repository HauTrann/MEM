package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MedicalEquipmentManagerApp;
import com.mycompany.myapp.domain.RepositoryLedger;
import com.mycompany.myapp.repository.RepositoryLedgerRepository;
import com.mycompany.myapp.service.RepositoryLedgerService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RepositoryLedgerResource} REST controller.
 */
@SpringBootTest(classes = MedicalEquipmentManagerApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class RepositoryLedgerResourceIT {

    private static final Long DEFAULT_ORGANIZATION_UNIT_ID = 1L;
    private static final Long UPDATED_ORGANIZATION_UNIT_ID = 2L;

    private static final Long DEFAULT_REF_ID = 1L;
    private static final Long UPDATED_REF_ID = 2L;

    private static final Long DEFAULT_DETAIL_ID = 1L;
    private static final Long UPDATED_DETAIL_ID = 2L;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_POSTED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_POSTED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NO = "AAAAAAAAAA";
    private static final String UPDATED_NO = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVER = "AAAAAAAAAA";
    private static final String UPDATED_DELIVER = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_CONTACT = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_QUANTITY = new BigDecimal(1);
    private static final BigDecimal UPDATED_QUANTITY = new BigDecimal(2);

    private static final String DEFAULT_UNIT = "AAAAAAAAAA";
    private static final String UPDATED_UNIT = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_UNIT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_UNIT_PRICE = new BigDecimal(2);

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final Boolean DEFAULT_OUT_OF_STOCK = false;
    private static final Boolean UPDATED_OUT_OF_STOCK = true;

    @Autowired
    private RepositoryLedgerRepository repositoryLedgerRepository;

    @Autowired
    private RepositoryLedgerService repositoryLedgerService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRepositoryLedgerMockMvc;

    private RepositoryLedger repositoryLedger;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RepositoryLedger createEntity(EntityManager em) {
        RepositoryLedger repositoryLedger = new RepositoryLedger()
            .organizationUnitID(DEFAULT_ORGANIZATION_UNIT_ID)
            .refID(DEFAULT_REF_ID)
            .detailID(DEFAULT_DETAIL_ID)
            .date(DEFAULT_DATE)
            .postedDate(DEFAULT_POSTED_DATE)
            .no(DEFAULT_NO)
            .deliver(DEFAULT_DELIVER)
            .phoneContact(DEFAULT_PHONE_CONTACT)
            .quantity(DEFAULT_QUANTITY)
            .unit(DEFAULT_UNIT)
            .unitPrice(DEFAULT_UNIT_PRICE)
            .amount(DEFAULT_AMOUNT)
            .outOfStock(DEFAULT_OUT_OF_STOCK);
        return repositoryLedger;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RepositoryLedger createUpdatedEntity(EntityManager em) {
        RepositoryLedger repositoryLedger = new RepositoryLedger()
            .organizationUnitID(UPDATED_ORGANIZATION_UNIT_ID)
            .refID(UPDATED_REF_ID)
            .detailID(UPDATED_DETAIL_ID)
            .date(UPDATED_DATE)
            .postedDate(UPDATED_POSTED_DATE)
            .no(UPDATED_NO)
            .deliver(UPDATED_DELIVER)
            .phoneContact(UPDATED_PHONE_CONTACT)
            .quantity(UPDATED_QUANTITY)
            .unit(UPDATED_UNIT)
            .unitPrice(UPDATED_UNIT_PRICE)
            .amount(UPDATED_AMOUNT)
            .outOfStock(UPDATED_OUT_OF_STOCK);
        return repositoryLedger;
    }

    @BeforeEach
    public void initTest() {
        repositoryLedger = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepositoryLedger() throws Exception {
        int databaseSizeBeforeCreate = repositoryLedgerRepository.findAll().size();

        // Create the RepositoryLedger
        restRepositoryLedgerMockMvc.perform(post("/api/repository-ledgers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repositoryLedger)))
            .andExpect(status().isCreated());

        // Validate the RepositoryLedger in the database
        List<RepositoryLedger> repositoryLedgerList = repositoryLedgerRepository.findAll();
        assertThat(repositoryLedgerList).hasSize(databaseSizeBeforeCreate + 1);
        RepositoryLedger testRepositoryLedger = repositoryLedgerList.get(repositoryLedgerList.size() - 1);
        assertThat(testRepositoryLedger.getOrganizationUnitID()).isEqualTo(DEFAULT_ORGANIZATION_UNIT_ID);
        assertThat(testRepositoryLedger.getRefID()).isEqualTo(DEFAULT_REF_ID);
        assertThat(testRepositoryLedger.getDetailID()).isEqualTo(DEFAULT_DETAIL_ID);
        assertThat(testRepositoryLedger.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testRepositoryLedger.getPostedDate()).isEqualTo(DEFAULT_POSTED_DATE);
        assertThat(testRepositoryLedger.getNo()).isEqualTo(DEFAULT_NO);
        assertThat(testRepositoryLedger.getDeliver()).isEqualTo(DEFAULT_DELIVER);
        assertThat(testRepositoryLedger.getPhoneContact()).isEqualTo(DEFAULT_PHONE_CONTACT);
        assertThat(testRepositoryLedger.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testRepositoryLedger.getUnit()).isEqualTo(DEFAULT_UNIT);
        assertThat(testRepositoryLedger.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
        assertThat(testRepositoryLedger.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testRepositoryLedger.isOutOfStock()).isEqualTo(DEFAULT_OUT_OF_STOCK);
    }

    @Test
    @Transactional
    public void createRepositoryLedgerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repositoryLedgerRepository.findAll().size();

        // Create the RepositoryLedger with an existing ID
        repositoryLedger.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepositoryLedgerMockMvc.perform(post("/api/repository-ledgers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repositoryLedger)))
            .andExpect(status().isBadRequest());

        // Validate the RepositoryLedger in the database
        List<RepositoryLedger> repositoryLedgerList = repositoryLedgerRepository.findAll();
        assertThat(repositoryLedgerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRepositoryLedgers() throws Exception {
        // Initialize the database
        repositoryLedgerRepository.saveAndFlush(repositoryLedger);

        // Get all the repositoryLedgerList
        restRepositoryLedgerMockMvc.perform(get("/api/repository-ledgers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repositoryLedger.getId().intValue())))
            .andExpect(jsonPath("$.[*].organizationUnitID").value(hasItem(DEFAULT_ORGANIZATION_UNIT_ID.intValue())))
            .andExpect(jsonPath("$.[*].refID").value(hasItem(DEFAULT_REF_ID.intValue())))
            .andExpect(jsonPath("$.[*].detailID").value(hasItem(DEFAULT_DETAIL_ID.intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].postedDate").value(hasItem(DEFAULT_POSTED_DATE.toString())))
            .andExpect(jsonPath("$.[*].no").value(hasItem(DEFAULT_NO)))
            .andExpect(jsonPath("$.[*].deliver").value(hasItem(DEFAULT_DELIVER)))
            .andExpect(jsonPath("$.[*].phoneContact").value(hasItem(DEFAULT_PHONE_CONTACT)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT)))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].outOfStock").value(hasItem(DEFAULT_OUT_OF_STOCK.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getRepositoryLedger() throws Exception {
        // Initialize the database
        repositoryLedgerRepository.saveAndFlush(repositoryLedger);

        // Get the repositoryLedger
        restRepositoryLedgerMockMvc.perform(get("/api/repository-ledgers/{id}", repositoryLedger.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(repositoryLedger.getId().intValue()))
            .andExpect(jsonPath("$.organizationUnitID").value(DEFAULT_ORGANIZATION_UNIT_ID.intValue()))
            .andExpect(jsonPath("$.refID").value(DEFAULT_REF_ID.intValue()))
            .andExpect(jsonPath("$.detailID").value(DEFAULT_DETAIL_ID.intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.postedDate").value(DEFAULT_POSTED_DATE.toString()))
            .andExpect(jsonPath("$.no").value(DEFAULT_NO))
            .andExpect(jsonPath("$.deliver").value(DEFAULT_DELIVER))
            .andExpect(jsonPath("$.phoneContact").value(DEFAULT_PHONE_CONTACT))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()))
            .andExpect(jsonPath("$.unit").value(DEFAULT_UNIT))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.outOfStock").value(DEFAULT_OUT_OF_STOCK.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRepositoryLedger() throws Exception {
        // Get the repositoryLedger
        restRepositoryLedgerMockMvc.perform(get("/api/repository-ledgers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepositoryLedger() throws Exception {
        // Initialize the database
        repositoryLedgerService.save(repositoryLedger);

        int databaseSizeBeforeUpdate = repositoryLedgerRepository.findAll().size();

        // Update the repositoryLedger
        RepositoryLedger updatedRepositoryLedger = repositoryLedgerRepository.findById(repositoryLedger.getId()).get();
        // Disconnect from session so that the updates on updatedRepositoryLedger are not directly saved in db
        em.detach(updatedRepositoryLedger);
        updatedRepositoryLedger
            .organizationUnitID(UPDATED_ORGANIZATION_UNIT_ID)
            .refID(UPDATED_REF_ID)
            .detailID(UPDATED_DETAIL_ID)
            .date(UPDATED_DATE)
            .postedDate(UPDATED_POSTED_DATE)
            .no(UPDATED_NO)
            .deliver(UPDATED_DELIVER)
            .phoneContact(UPDATED_PHONE_CONTACT)
            .quantity(UPDATED_QUANTITY)
            .unit(UPDATED_UNIT)
            .unitPrice(UPDATED_UNIT_PRICE)
            .amount(UPDATED_AMOUNT)
            .outOfStock(UPDATED_OUT_OF_STOCK);

        restRepositoryLedgerMockMvc.perform(put("/api/repository-ledgers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRepositoryLedger)))
            .andExpect(status().isOk());

        // Validate the RepositoryLedger in the database
        List<RepositoryLedger> repositoryLedgerList = repositoryLedgerRepository.findAll();
        assertThat(repositoryLedgerList).hasSize(databaseSizeBeforeUpdate);
        RepositoryLedger testRepositoryLedger = repositoryLedgerList.get(repositoryLedgerList.size() - 1);
        assertThat(testRepositoryLedger.getOrganizationUnitID()).isEqualTo(UPDATED_ORGANIZATION_UNIT_ID);
        assertThat(testRepositoryLedger.getRefID()).isEqualTo(UPDATED_REF_ID);
        assertThat(testRepositoryLedger.getDetailID()).isEqualTo(UPDATED_DETAIL_ID);
        assertThat(testRepositoryLedger.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testRepositoryLedger.getPostedDate()).isEqualTo(UPDATED_POSTED_DATE);
        assertThat(testRepositoryLedger.getNo()).isEqualTo(UPDATED_NO);
        assertThat(testRepositoryLedger.getDeliver()).isEqualTo(UPDATED_DELIVER);
        assertThat(testRepositoryLedger.getPhoneContact()).isEqualTo(UPDATED_PHONE_CONTACT);
        assertThat(testRepositoryLedger.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testRepositoryLedger.getUnit()).isEqualTo(UPDATED_UNIT);
        assertThat(testRepositoryLedger.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
        assertThat(testRepositoryLedger.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testRepositoryLedger.isOutOfStock()).isEqualTo(UPDATED_OUT_OF_STOCK);
    }

    @Test
    @Transactional
    public void updateNonExistingRepositoryLedger() throws Exception {
        int databaseSizeBeforeUpdate = repositoryLedgerRepository.findAll().size();

        // Create the RepositoryLedger

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepositoryLedgerMockMvc.perform(put("/api/repository-ledgers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repositoryLedger)))
            .andExpect(status().isBadRequest());

        // Validate the RepositoryLedger in the database
        List<RepositoryLedger> repositoryLedgerList = repositoryLedgerRepository.findAll();
        assertThat(repositoryLedgerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepositoryLedger() throws Exception {
        // Initialize the database
        repositoryLedgerService.save(repositoryLedger);

        int databaseSizeBeforeDelete = repositoryLedgerRepository.findAll().size();

        // Delete the repositoryLedger
        restRepositoryLedgerMockMvc.perform(delete("/api/repository-ledgers/{id}", repositoryLedger.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RepositoryLedger> repositoryLedgerList = repositoryLedgerRepository.findAll();
        assertThat(repositoryLedgerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
