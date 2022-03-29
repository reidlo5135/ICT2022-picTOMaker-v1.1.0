package kr.co.picTO.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.picTO.dto.sign.UserLoginRequestDTO;
import kr.co.picTO.dto.sign.UserSignUpRequestDTO;
import kr.co.picTO.entity.user.User;
import kr.co.picTO.repository.UserJpaRepo;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class SignControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserJpaRepo userJpaRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    Environment env;

    private static String accessToken;

    @Before
    public void setUp() {
        userJpaRepo.save(User.builder()
                .name("woonsik")
                .password(passwordEncoder.encode("password"))
                .nickName("woonsik")
                .email("email@email.com")
                .roles(Collections.singletonList("ROLE_USER"))
                .build());
    }

    @Test
    public void 로그인_성공() throws Exception {
        String object = objectMapper.writeValueAsString(UserLoginRequestDTO.builder()
                .email("email@email.com")
                .password("password")
                .build());

        ResultActions actions = mockMvc.perform(post("/v1/sign/login")
                .content(object)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON));

        actions.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.msg").exists());
    }

    @Test
    public void 로그인_실패() throws Exception {
        String object = objectMapper.writeValueAsString(UserLoginRequestDTO.builder()
                .email("email@email.com")
                .password("wrongPassword")
                .build());
        ResultActions actions = mockMvc.perform(
                post("/v1/login")
                        .content(object)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON));
        actions
                .andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.code").value(-1001));
    }

    @Test
    public void 회원가입_성공() throws Exception {
        long time = LocalDateTime.now().atZone(ZoneId.systemDefault()).toEpochSecond();

        String object = objectMapper.writeValueAsString(UserSignUpRequestDTO.builder()
                .email("email@email.com" + time)
                .nickName("woonsik")
                .name("woonsik")
                .password("myPassword")
                .build());
        ResultActions actions = mockMvc.perform(
                post("/v1/sign/signup")
                        .content(object)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON));

        actions.
                andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.msg").exists());
    }

    @Test
    public void 회원가입_실패() throws Exception {
        String object = objectMapper.writeValueAsString(UserSignUpRequestDTO.builder()
                .name("reidlo")
                .email("email@email.com")
                .password("password")
                .nickName("reidlo")
                .build());

        ResultActions actions = mockMvc.perform(
                post("/v1/sign/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(object));

        actions.andDo(print())
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.code").value(-1002));
    }

    @Test
    @WithMockUser(username = "mockUser", roles = {"GUEST"})
    public void 접근실패() throws Exception {
        mockMvc.perform(get("/v1/users"))
                .andDo(print())
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/exception/accessDenied"));
    }

    @Test
    @WithMockUser(username = "mockUser", roles = {"GUEST", "USER"})
    public void 접근성공() throws Exception {
        mockMvc.perform(
                        get("/v1/users"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
