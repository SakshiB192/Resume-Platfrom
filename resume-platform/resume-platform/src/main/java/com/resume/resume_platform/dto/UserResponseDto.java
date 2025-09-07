package com.resume.resume_platform.dto;

public class UserResponseDto {

    private Long id;
    private String name;
    private String email;

    // Resume sections
    private String summary;
    private String experience;
    private String skills;
    private String education;
    private String projects;
    private String certifications;
    private String achievements;

    // Constructor with all fields
    public UserResponseDto(Long id, String name, String email,
                           String summary, String experience, String skills,
                           String education, String projects, String certifications,
                           String achievements) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.summary = summary;
        this.experience = experience;
        this.skills = skills;
        this.education = education;
        this.projects = projects;
        this.certifications = certifications;
        this.achievements = achievements;
    }

    // No-args constructor
    public UserResponseDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getProjects() { return projects; }
    public void setProjects(String projects) { this.projects = projects; }

    public String getCertifications() { return certifications; }
    public void setCertifications(String certifications) { this.certifications = certifications; }

    public String getAchievements() { return achievements; }
    public void setAchievements(String achievements) { this.achievements = achievements; }
}
