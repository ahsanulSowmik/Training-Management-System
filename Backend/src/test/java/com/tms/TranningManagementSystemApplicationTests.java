package com.tms;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TranningManagementSystemApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    private String admin_token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5MDM0OTc2NSwiZXhwIjoxNjkwNDM2MTY1fQ.9J6rvNF6V1IIJ1kvLcGbV92KIvhqpduTJaXAN0F1LmE";


    @Before
    public void setup() {
        System.out.println("[Started] - Integration Test");
    }


    @Test
    public void testAssignRoleByAdminFeature() throws Exception {
        String requestBody = "{\n" +
                "        \"email\": \"trainee1@gmail.com\",\n" +
                "        \"roleName\": \"TRAINEE\"\n" +
                "    }";
        this.mockMvc.perform(post("/api/user/assign-role")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token))
                .andExpect(status().isNotFound())
        ;
    }


    @org.junit.Test
    public void testGetProfileData() throws Exception {
        this.mockMvc.perform(get("/api/user/get/trainer1@gmail.com").header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }

    @org.junit.Test
    public void testGetCourseData() throws Exception {
        this.mockMvc.perform(get("/api/course/get/all").header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }

    @org.junit.Test
    public void testGetBatchData() throws Exception {
        this.mockMvc.perform(get("/api/batch/get/all").header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token)).andExpect(status().is2xxSuccessful());
    }

	@Test
	public void testDeleteUser() throws Exception {
		this.mockMvc.perform(delete("/api/user/delete/trainer1@gmail.com")
						.header(HttpHeaders.AUTHORIZATION, "Bearer " + admin_token))
				.andExpect(status().isNotFound());
	}

    @After
    public void tearDown() {
        System.out.println("[Ended] - Integration Test");
    }

}
