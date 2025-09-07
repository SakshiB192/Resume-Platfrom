package com.resume.resume_platform.controller;

import com.resume.resume_platform.entity.User;
import com.resume.resume_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.resume.resume_platform.dto.UserRequestDto;
import com.resume.resume_platform.dto.UserResponseDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserRestController {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ---------------- Create new user ----------------
    @PostMapping("/create")
    public UserResponseDto createUser(@RequestBody UserRequestDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setSummary(userDto.getSummary());
        user.setExperience(userDto.getExperience());
        user.setSkills(userDto.getSkills());
        user.setEducation(userDto.getEducation());
        user.setProjects(userDto.getProjects());
        user.setCertifications(userDto.getCertifications());
        user.setAchievements(userDto.getAchievements());

        user = userRepository.save(user);

        return new UserResponseDto(
            user.getId(), user.getName(), user.getEmail(),
            user.getSummary(), user.getExperience(), user.getSkills(),
            user.getEducation(), user.getProjects(), user.getCertifications(),
            user.getAchievements()
        );
    }

    // ---------------- Login ----------------
    @PostMapping("/login")
    public Object login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return new UserResponseDto(
                    user.getId(), user.getName(), user.getEmail(),
                    user.getSummary(), user.getExperience(), user.getSkills(),
                    user.getEducation(), user.getProjects(), user.getCertifications(),
                    user.getAchievements()
                );
            }
        }
        return Map.of("error", "Invalid credentials");
    }


    // ---------------- Get all users ----------------
    @GetMapping
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponseDto(
                    user.getId(), user.getName(), user.getEmail(),
                    user.getSummary(), user.getExperience(), user.getSkills(),
                    user.getEducation(), user.getProjects(), user.getCertifications(),
                    user.getAchievements()
                ))
                .toList();
    }

 // ---------------- Get user by ID ----------------
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
        }

        User user = optionalUser.get();
        UserResponseDto responseDto = new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getSummary(),
                user.getExperience(),
                user.getSkills(),
                user.getEducation(),
                user.getProjects(),
                user.getCertifications(),
                user.getAchievements()
        );

        return ResponseEntity.ok(responseDto);
    }




    // ---------------- Update resume info ----------------
    @PutMapping("/{id}/resume")
    public ResponseEntity<Object> updateResume(@PathVariable Long id, @RequestBody Map<String, String> resumeData) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
        }

        User user = optionalUser.get();
        if (resumeData.containsKey("summary")) user.setSummary(resumeData.get("summary"));
        if (resumeData.containsKey("experience")) user.setExperience(resumeData.get("experience"));
        if (resumeData.containsKey("skills")) user.setSkills(resumeData.get("skills"));
        if (resumeData.containsKey("education")) user.setEducation(resumeData.get("education"));
        if (resumeData.containsKey("projects")) user.setProjects(resumeData.get("projects"));
        if (resumeData.containsKey("certifications")) user.setCertifications(resumeData.get("certifications"));
        if (resumeData.containsKey("achievements")) user.setAchievements(resumeData.get("achievements"));

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Resume updated successfully"));
    }
}
