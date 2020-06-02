package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MedicalEquipmentManagerApp;
import com.mycompany.myapp.domain.InOutRepositoryDetails;
import com.mycompany.myapp.repository.InOutRepositoryDetailsRepository;
import com.mycompany.myapp.service.InOutRepositoryDetailsService;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link InOutRepositoryDetailsResource} REST controller.
 */
@SpringBootTest(classes = MedicalEquipmentManagerApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class InOutRepositoryDetailsResourceIT {

    private static final Long DEFAULT_PROD_ID = 1L;
    private static final Long UPDATED_PROD_ID = 2L;

    private static final String DEFAULT_PROD_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROD_NAME = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_QUANTITY = new BigDecimal(1);
    private static final BigDecimal UPDATED_QUANTITY = new BigDecimal(2);

    private static final String DEFAULT_UNIT = "AAAAAAAAAA";
    private static final String UPDATED_UNIT = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_UNIT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_UNIT_PRICE = new BigDecimal(2);

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    @Autowired
    private InOutRepositoryDetailsRepository inOutRepositoryDetailsRepository;

    @Autowired
    private InOutRepositoryDetailsService inOutRepositoryDetailsService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInOutRepositoryDetailsMockMvc;

    private InOutRepositoryDetails inOutRepositoryDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InOutRepositoryDetails createEntity(EntityManager em) {
        InOutRepositoryDetails inOutRepositoryDetails = new InOutRepositoryDetails()
            .prodID(DEFAULT_PROD_ID)
            .prodName(DEFAULT_PROD_NAME)
            .quantity(DEFAULT_QUANTITY)
            .unit(DEFAULT_UNIT)
            .unitPrice(DEFAULT_UNIT_PRICE)
            .amount(DEFAULT_AMOUNT);
        return inOutRepositoryDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InOutRepositoryDetails createUpdatedEntity(EntityManager em) {
        InOutRepositoryDetails inOutRepositoryDetails = new InOutRepositoryDetails()
            .prodID(UPDATED_PROD_ID)
            .prodName(UPDATED_PROD_NAME)
            .quantity(UPDATED_QUANTITY)
            .unit(UPDATED_UNIT)
            .unitPrice(UPDATED_UNIT_PRICE)
            .amount(UPDATED_AMOUNT);
        return inOutRepositoryDetails;
    }

    @BeforeEach
    public void initTest() {
        inOutRepositoryDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createInOutRepositoryDetails() throws Exception {
        int databaseSizeBeforeCreate = inOutRepositoryDetailsRepository.findAll().size();

        // Create the InOutRepositoryDetails
        restInOutRepositoryDetailsMockMvc.perform(post("/api/in-out-repository-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inOutRepositoryDetails)))
            .andExpect(status().isCreated());

        // Validate the InOutRepositoryDetails in the database
        List<InOutRepositoryDetails> inOutRepositoryDetailsList = inOutRepositoryDetailsRepository.findAll();
        assertThat(inOutRepositoryDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        InOutRepositoryDetails testInOutRepositoryDetails = inOutRepositoryDetailsList.get(inOutRepositoryDetailsList.size() - 1);
        assertThat(testInOutRepositoryDetails.getProdID()).isEqualTo(DEFAULT_PROD_ID);
        assertThat(testInOutRepositoryDetails.getProdName()).isEqualTo(DEFAULT_PROD_NAME);
        assertThat(testInOutRepositoryDetails.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testInOutRepositoryDetails.getUnit()).isEqualTo(DEFAULT_UNIT);
        assertThat(testInOutRepositoryDetails.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
        assertThat(testInOutRepositoryDetails.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createInOutRepositoryDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inOutRepositoryDetailsRepository.findAll().size();

        // Create the InOutRepositoryDetails with an existing ID
        inOutRepositoryDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInOutRepositoryDetailsMockMvc.perform(post("/api/in-out-repository-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inOutRepositoryDetails)))
            .andExpect(status().isBadRequest());

        // Validate the InOutRepositoryDetails in the database
        List<InOutRepositoryDetails> inOutRepositoryDetailsList = inOutRepositoryDetailsRepository.findAll();
        assertThat(inOutRepositoryDetailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInOutRepositoryDetails() throws Exception {
        // Initialize the database
        inOutRepositoryDetailsRepository.saveAndFlush(inOutRepositoryDetails);

        // Get all the inOutRepositoryDetailsList
        restInOutRepositoryDetailsMockMvc.perform(get("/api/in-out-repository-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inOutRepositoryDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].prodID").value(hasItem(DEFAULT_PROD_ID.intValue())))
            .andExpect(jsonPath("$.[*].prodName").value(hasItem(DEFAULT_PROD_NAME)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT)))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }
    
    @Test
    @Transactional
    public void getInOutRepositoryDetails() throws Exception {
        // Initialize the database
        inOutRepositoryDetailsRepository.saveAndFlush(inOutRepositoryDetails);

        // Get the inOutRepositoryDetails
        restInOutRepositoryDetailsMockMvc.perform(get("/api/in-out-repository-details/{id}", inOutRepositoryDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(inOutRepositoryDetails.getId().intValue()))
            .andExpect(jsonPath("$.prodID").value(DEFAULT_PROD_ID.intValue()))
            .andExpect(jsonPath("$.prodName").value(DEFAULT_PROD_NAME))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()))
            .andExpect(jsonPath("$.unit").value(DEFAULT_UNIT))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingInOutRepositoryDetails() throws Exception {
        // Get the inOutRepositoryDetails
        restInOutRepositoryDetailsMockMvc.perform(get("/api/in-out-repository-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInOutRepositoryDetails() throws Exception {
        // Initialize the database
        inOutRepositoryDetailsService.save(inOutRepositoryDetails);

        int databaseSizeBeforeUpdate = inOutRepositoryDetailsRepository.findAll().size();

        // Update the inOutRepositoryDetails
        InOutRepositoryDetails updatedInOutRepositoryDetails = inOutRepositoryDetailsRepository.findById(inOutRepositoryDetails.getId()).get();
        // Disconnect from session so that the updates on updatedInOutRepositoryDetails are not directly saved in db
        em.detach(updatedInOutRepositoryDetails);
        updatedInOutRepositoryDetails
            .prodID(UPDATED_PROD_ID)
            .prodName(UPDATED_PROD_NAME)
            .quantity(UPDATED_QUANTITY)
            .unit(UPDATED_UNIT)
            .unitPrice(UPDATED_UNIT_PRICE)
            .amount(UPDATED_AMOUNT);

        restInOutRepositoryDetailsMockMvc.perform(put("/api/in-out-repository-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInOutRepositoryDetails)))
            .andExpect(status().isOk());

        // Validate the InOutRepositoryDetails in the database
        List<InOutRepositoryDetails> inOutRepositoryDetailsList = inOutRepositoryDetailsRepository.findAll();
        assertThat(inOutRepositoryDetailsList).hasSize(databaseSizeBeforeUpdate);
        InOutRepositoryDetails testInOutRepositoryDetails = inOutRepositoryDetailsList.get(inOutRepositoryDetailsList.size() - 1);
        assertThat(testInOutRepositoryDetails.getProdID()).isEqualTo(UPDATED_PROD_ID);
        assertThat(testInOutRepositoryDetails.getProdName()).isEqualTo(UPDATED_PROD_NAME);
        assertThat(testInOutRepositoryDetails.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testInOutRepositoryDetails.getUnit()).isEqualTo(UPDATED_UNIT);
        assertThat(testInOutRepositoryDetails.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
        assertThat(testInOutRepositoryDetails.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingInOutRepositoryDetails() throws Exception {
        int databaseSizeBeforeUpdate = inOutRepositoryDetailsRepository.findAll().size();

        // Create the InOutRepositoryDetails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInOutRepositoryDetailsMockMvc.perform(put("/api/in-out-repository-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inOutRepositoryDetails)))
            .andExpect(status().isBadRequest());

        // Validate the InOutRepositoryDetails in the database
        List<InOutRepositoryDetails> inOutRepositoryDetailsList = inOutRepositoryDetailsRepository.findAll();
        assertThat(inOutRepositoryDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInOutRepositoryDetails() throws Exception {
        // Initialize the database
        inOutRepositoryDetailsService.save(inOutRepositoryDetails);

        int databaseSizeBeforeDelete = inOutRepositoryDetailsRepository.findAll().size();

        // Delete the inOutRepositoryDetails
        restInOutRepositoryDetailsMockMvc.perform(delete("/api/in-out-repository-details/{id}", inOutRepositoryDetails.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InOutRepositoryDetails> inOutRepositoryDetailsList = inOutRepositoryDetailsRepository.findAll();
        assertThat(inOutRepositoryDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
