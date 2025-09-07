const userId = localStorage.getItem("userId");
const apiBase = 'http://localhost:8080/api/users';

// Welcome message
const userName = localStorage.getItem("userName");
document.getElementById('welcomeText').textContent = `Hello, ${userName || "User"}!`;

// Load resume for current user
async function loadResume() {
    if (!userId) {
        alert("❌ You are not logged in. Redirecting to login page.");
        window.location.href = "index.html";
        return;
    }

    try {
        const res = await fetch(`${apiBase}/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const user = await res.json();

        document.getElementById('resSummary').value = user.summary || '';
        document.getElementById('resExperience').value = user.experience || '';
        document.getElementById('resSkills').value = user.skills || '';
        document.getElementById('resEducation').value = user.education || '';
        document.getElementById('resProjects').value = user.projects || '';
        document.getElementById('resCertifications').value = user.certifications || '';
        document.getElementById('resAchievements').value = user.achievements || '';
    } catch(err) {
        alert(`Error: ${err.message}`);
    }
}

// Save or update resume
async function saveResume() {
    const resumeData = {
        summary: document.getElementById('resSummary').value.trim(),
        experience: document.getElementById('resExperience').value.trim(),
        skills: document.getElementById('resSkills').value.trim(),
        education: document.getElementById('resEducation').value.trim(),
        projects: document.getElementById('resProjects').value.trim(),
        certifications: document.getElementById('resCertifications').value.trim(),
        achievements: document.getElementById('resAchievements').value.trim()
    };

    try {
        const res = await fetch(`${apiBase}/${userId}/resume`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resumeData)
        });

        const data = await res.json();
        if (res.ok) {
            alert("✅ Resume saved successfully!");
            getAllUsers();
        } else {
            throw new Error(data?.error || "Failed to save resume");
        }
    } catch(err) {
        alert(`❌ Error: ${err.message}`);
    }
}

// Load all users
async function getAllUsers() {
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = `<tr><td colspan="10">Loading...</td></tr>`;

    try {
        const res = await fetch(apiBase);
        const users = await res.json();

        if(users.length === 0) {
            tbody.innerHTML = `<tr><td colspan="10">No users found</td></tr>`;
            return;
        }

        tbody.innerHTML = users.map(u => `
            <tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.summary || ''}</td>
                <td>${u.experience || ''}</td>
                <td>${u.skills || ''}</td>
                <td>${u.education || ''}</td>
                <td>${u.projects || ''}</td>
                <td>${u.certifications || ''}</td>
                <td>${u.achievements || ''}</td>
            </tr>
        `).join('');
    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="10">Error: ${err.message}</td></tr>`;
    }
}

// View resume (you can implement a simple modal or redirect to resume page)
function viewResume() {
    window.location.href = "resume.html";
}

// Auto-load on page open
window.onload = () => {
    loadResume();
    getAllUsers();
};
