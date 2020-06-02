package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MedicalEquipmentManagerApp;
import com.mycompany.myapp.domain.InOutRepository;
import com.mycompany.myapp.repository.InOutRepositoryRepository;
import com.mycompany.myapp.service.InOutRepositoryService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link InOutRepositoryResource} REST controller.
 */
@SpringBootTest(classes = MedicalEquipmentManagerApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class InOutRepositoryResourceIT {

    private static final Long DEFAULT_ORGANIZATION_UNIT_ID = 1L;
    private static final Long UPDATED_ORGANIZATION_UNIT_ID = 2L;

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

    private static final Boolean DEFAULT_OUT_OF_STOCK = false;
    private static final Boolean UPDATED_OUT_OF_STOCK = true;

    private static final Boolean DEFAULT_RECORDED = false;
    private static final Boolean UPDATED_RECORDED = true;

    @Autowired
    private InOutRepositoryRepository inOutRepositoryRepository;

    @Autowired
    private InOutRepositoryService inOutRepositoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInOutRepositoryMockMvc;

    private InOutRepository inOutRepository;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InOutRepository createEntity(EntityManager em) {
        InOutRepository inOutRepository = new InOutRepository()
            .organizationUnitID(DEFAULT_ORGANIZATION_UNIT_ID)
            .date(DEFAULT_DATE)
            .postedDate(DEFAULT_POSTED_DATE)
            .no(DEFAULT_NO)
            .deliver(DEFAULT_DELIVER)
            .phoneContact(DEFAULT_PHONE_CONTACT)
            .outOfStock(DEFAULT_OUT_OF_STOCK)
            .recorded(DEFAULT_RECORDED);
        return inOutRepository;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InOutRepository createUpdatedEntity(EntityManager em) {
        InOutRepository inOutRepository = new InOutRepository()
            .organizationUnitID(UPDATED_ORGANIZATION_UNIT_ID)
            .date(UPDATED_DATE)
            .postedDate(UPDATED_POSTED_DATE)
            .no(UPDATED_NO)
            .deliver(UPDATED_DELIVER)
            .phoneContact(UPDATED_PHONE_CONTACT)
            .outOfStock(UPDATED_OUT_OF_STOCK)
            .recorded(UPDATED_RECORDED);
        return inOutRepository;
    }

    @BeforeEach
    public void initTest() {
        inOutRepository = createEntity(em);
    }

    @Test
    @Transactional
    public void createInOutRepository() throws Exception {
        int databaseSizeBeforeCreate = inOutRepositoryRepository.findAll().size();

        // Create the InOutRepository
        restInOutRepositoryMockMvc.perform(post("/api/in-out-repositories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inOutRepository)))
            .andExpect(status().isCreated());

        // Validate the InOutRepository in the database
        List<InOutRepository> inOutRepositoryList = inOutRepositoryRepository.findAll();
        assertThat(inOutRepositoryList).hasSize(databaseSizeBeforeCreate + 1);
        InOutRepository testInOutRepository = inOutRepositoryList.get(inOutRepositoryList.size() - 1);
        assertThat(testInOutRepository.getOrganizationUnitID()).isEqualTo(DEFAULT_ORGANIZATION_UNIT_ID);
        assertThat(testInOutRepository.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testInOutRepository.getPostedDate()).isEqualTo(DEFAULT_POSTED_DATE);
        assertThat(testInOutRepository.getNo()).isEqualTo(DEFAULT_NO);
        assertThat(testInOutRepository.getDeliver()).isEqualTo(DEFAULT_DELIVER);
        assertThat(testInOutRepository.getPhoneContact()).isEqualTo(DEFAULT_PHONE_CONTACT);
        assertThat(testInOutRepository.isOutOfStock()).isEqualTo(DEFAULT_OUT_OF_STOCK);
        assertThat(testInOutRepository.isRecorded()).isEqualTo(DEFAULT_RECORDED);
    }

    @Test
    @Transactional
    public void createInOutRepositoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inOutRepositoryRepository.findAll().size();

        // Create the InOutRepository with an existing ID
        inOutRepository.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInOutRepositoryMockMvc.perform(post("/api/in-out-repositories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inOutRepository)))
            .andExpect(status().isBadRequest());

        // Validate the InOutRepository in the database
        List<InOutRepository> inOutRepositoryList = inOutRepositoryRepository.findAll();
        assertThat(inOutRepositoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInOutRepositories() throws Exception {
        // Initialize the database
        inOutRepositoryRepository.saveAndFlush(inOutRepository);

        // Get all the inOutRepositoryList
        restInOutRepositoryMockMvc.perform(get("/api/in-out-repositories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inOutRepository.getId().intValue())))
            .andExpect(jsonPath("$.[*].organizationUnitID").value(hasItem(DEFAULT_ORGANIZATION_UNIT_ID.intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].postedDate").value(hasItem(DEFAULT_POSTED_DATE.toString())))
            .andExpect(jsonPath("$.[*].no").value(hasItem(DEFAULT_NO)))
            .andExpect(jsonPath("$.[*].deliver").value(hasItem(DEFAULT_DELIVER)))
            .andExpect(jsonPath("$.[*].phoneContact").value(hasItem(DEFAULT_PHONE_CONTACT)))
            .andExpect(jsonPath("$.[*].outOfStock").value(hasItem(DEFAULT_OUT_OF_STOCK.booleanValue())))
            .andExpect(jsonPath("$.[*].recorded").value(hasItem(DEFAULT_RECORDED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getInOutRepository() throws Exception {
        // Initialize the database
        inOutRepositoryRepository.saveAndFlush(inOutRepository);

        // Get the inOutRepository
        restInOutRepositoryMockMvc.perform(get("/api/in-out-repositories/{id}", inOutRepository.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(inOutRepository.getId().intValue()))
            .andExpect(jsonPath("$.organizationUnitID").value(DEFAULT_ORGANIZATION_UNIT_ID.intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.postedDate").value(DEFAULT_POSTED_DATE.toString()))
            .andExpect(jsonPath("$.no").value(DEFAULT_NO))
            .andExpect(jsonPath("$.deliver").value(DEFAULT_DELIVER))
            .andExpect(jsonPath("$.phoneContact").value(DEFAULT_PHONE_CONTACT))
            .andExpect(jsonPath("$.outOfStock").value(DEFAULT_OUT_OF_STOCK.booleanValue()))
            .andExpect(jsonPath("$.recorded").value(DEFAULT_RECORDED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingInOutRepository() throws Exception {
        // Get the inOutRepository
        restInOutRepositoryMockMvc.perform(get("/api/in-out-repositories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInOutRepository() throws Exception {
        // Initialize the database
        inOutRepositoryService.save(inOutRepository);

        int databaseSizeBeforeUpdate = inOutRepositoryRepository.findAll().size();

        // Update the inOutRepository
        InOutRepository updatedInOutRepository = inOutRepositoryRepository.findById(inOutRepository.getId()).get();
        // Disconnect from session so that the updates on updatedInOutRepository are not directly saved in db
        em.detach(updatedInOutRepository);
        updatedInOutRepository
            .organizationUnitID(UPDATED_ORGANIZATION_UNIT_ID)
            .date(UPDATED_DATE)
            .postedDate(UPDATED_POSTED_DATE)
            .no(UPDATED_NO)
            .deliver(UPDATED_DELIVER)
            .phoneContact(UPDATED_PHONE_CONTACT)
            .outOfStock(UPDATED_OUT_OF_STOCK)
            .recorded(UPDATED_RECORDED);

        restInOutRepositoryMockMvc.perform(put("/api/in-out-repositories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInOutRepository)))
            .andExpect(status().isOk());

        // Validate the InOutRepository in the database
        List<InOutRepository> inOutRepositoryList = inOutRepositoryRepository.findAll();
        assertThat(inOutRepositoryList).hasSize(databaseSizeBeforeUpdate);
        InOutRepository testInOutRepository = inOutRepositoryList.get(inOutRepositoryList.size() - 1);
        assertThat(testInOutRepository.getOrganizationUnitID()).isEqualTo(UPDATED_ORGANIZATION_UNIT_ID);
        assertThat(testInOutRepository.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testInOutRepository.getPostedDate()).isEqualTo(UPDATED_POSTED_DATE);
        assertThat(testInOutRepository.getNo()).isEqualTo(UPDATED_NO);
        assertThat(testInOutRepository.getDeliver()).isEqualTo(UPDATED_DELIVER);
        assertThat(testInOutRepository.getPhoneContact()).isEqualTo(UPDATED_PHONE_CONTACT);
        assertThat(testInOutRepository.isOutOfStock()).isEqualTo(UPDATED_OUT_OF_STOCK);
        assertThat(testInOutRepository.isRecorded()).isEqualTo(UPDATED_RECORDED);
    }

    @Test
    @Transactional
    public void updateNonExistingInOutRepository() throws Exception {
        int databaseSizeBeforeUpdate = inOutRepositoryRepository.findAll().size();

        // Create the InOutRepository

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInOutRepositoryMockMvc.perform(put("/api/in-out-repositories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inOutRepository)))
            .andExpect(status().isBadRequest());

        // Validate the InOutRepository in the database
        List<InOutRepository> inOutRepositoryList = inOutRepositoryRepository.findAll();
        assertThat(inOutRepositoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInOutRepository() throws Exception {
        // Initialize the database
        inOutRepositoryService.save(inOutRepository);

        int databaseSizeBeforeDelete = inOutRepositoryRepository.findAll().size();

        // Delete the inOutRepository
        restInOutRepositoryMockMvc.perform(delete("/api/in-out-repositories/{id}", inOutRepository.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InOutRepository> inOutRepositoryList = inOutRepositoryRepository.findAll();
        assertThat(inOutRepositoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
