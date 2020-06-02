package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MedicalEquipmentManagerApp;
import com.mycompany.myapp.domain.Repository;
import com.mycompany.myapp.repository.RepositoryRepository;
import com.mycompany.myapp.service.RepositoryService;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RepositoryResource} REST controller.
 */
@SpringBootTest(classes = MedicalEquipmentManagerApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class RepositoryResourceIT {

    private static final Long DEFAULT_ORGANIZATION_UNIT_ID = 1L;
    private static final Long UPDATED_ORGANIZATION_UNIT_ID = 2L;

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    @Autowired
    private RepositoryRepository repositoryRepository;

    @Autowired
    private RepositoryService repositoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRepositoryMockMvc;

    private Repository repository;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Repository createEntity(EntityManager em) {
        Repository repository = new Repository()
            .organizationUnitID(DEFAULT_ORGANIZATION_UNIT_ID)
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .status(DEFAULT_STATUS);
        return repository;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Repository createUpdatedEntity(EntityManager em) {
        Repository repository = new Repository()
            .organizationUnitID(UPDATED_ORGANIZATION_UNIT_ID)
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .status(UPDATED_STATUS);
        return repository;
    }

    @BeforeEach
    public void initTest() {
        repository = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepository() throws Exception {
        int databaseSizeBeforeCreate = repositoryRepository.findAll().size();

        // Create the Repository
        restRepositoryMockMvc.perform(post("/api/repositories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repository)))
            .andExpect(status().isCreated());

        // Validate the Repository in the database
        List<Repository> repositoryList = repositoryRepository.findAll();
        assertThat(repositoryList).hasSize(databaseSizeBeforeCreate + 1);
        Repository testRepository = repositoryList.get(repositoryList.size() - 1);
        assertThat(testRepository.getOrganizationUnitID()).isEqualTo(DEFAULT_ORGANIZATION_UNIT_ID);
        assertThat(testRepository.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testRepository.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRepository.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRepository.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createRepositoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repositoryRepository.findAll().size();

        // Create the Repository with an existing ID
        repository.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepositoryMockMvc.perform(post("/api/repositories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repository)))
            .andExpect(status().isBadRequest());

        // Validate the Repository in the database
        List<Repository> repositoryList = repositoryRepository.findAll();
        assertThat(repositoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRepositories() throws Exception {
        // Initialize the database
        repositoryRepository.saveAndFlush(repository);

        // Get all the repositoryList
        restRepositoryMockMvc.perform(get("/api/repositories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repository.getId().intValue())))
            .andExpect(jsonPath("$.[*].organizationUnitID").value(hasItem(DEFAULT_ORGANIZATION_UNIT_ID.intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }
    
    @Test
    @Transactional
    public void getRepository() throws Exception {
        // Initialize the database
        repositoryRepository.saveAndFlush(repository);

        // Get the repository
        restRepositoryMockMvc.perform(get("/api/repositories/{id}", repository.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(repository.getId().intValue()))
            .andExpect(jsonPath("$.organizationUnitID").value(DEFAULT_ORGANIZATION_UNIT_ID.intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    public void getNonExistingRepository() throws Exception {
        // Get the repository
        restRepositoryMockMvc.perform(get("/api/repositories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepository() throws Exception {
        // Initialize the database
        repositoryService.save(repository);

        int databaseSizeBeforeUpdate = repositoryRepository.findAll().size();

        // Update the repository
        Repository updatedRepository = repositoryRepository.findById(repository.getId()).get();
        // Disconnect from session so that the updates on updatedRepository are not directly saved in db
        em.detach(updatedRepository);
        updatedRepository
            .organizationUnitID(UPDATED_ORGANIZATION_UNIT_ID)
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .status(UPDATED_STATUS);

        restRepositoryMockMvc.perform(put("/api/repositories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRepository)))
            .andExpect(status().isOk());

        // Validate the Repository in the database
        List<Repository> repositoryList = repositoryRepository.findAll();
        assertThat(repositoryList).hasSize(databaseSizeBeforeUpdate);
        Repository testRepository = repositoryList.get(repositoryList.size() - 1);
        assertThat(testRepository.getOrganizationUnitID()).isEqualTo(UPDATED_ORGANIZATION_UNIT_ID);
        assertThat(testRepository.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testRepository.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRepository.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRepository.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingRepository() throws Exception {
        int databaseSizeBeforeUpdate = repositoryRepository.findAll().size();

        // Create the Repository

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepositoryMockMvc.perform(put("/api/repositories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repository)))
            .andExpect(status().isBadRequest());

        // Validate the Repository in the database
        List<Repository> repositoryList = repositoryRepository.findAll();
        assertThat(repositoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepository() throws Exception {
        // Initialize the database
        repositoryService.save(repository);

        int databaseSizeBeforeDelete = repositoryRepository.findAll().size();

        // Delete the repository
        restRepositoryMockMvc.perform(delete("/api/repositories/{id}", repository.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Repository> repositoryList = repositoryRepository.findAll();
        assertThat(repositoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
