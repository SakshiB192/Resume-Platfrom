const userId = localStorage.getItem("userId");
const apiBase = 'http://localhost:8080/api/users';

async function loadResume() {
    if (!userId) {
        alert("User not logged in!");
        window.location.href = "index.html";
        return;
    }
    try {
        const res = await fetch(`${apiBase}/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const user = await res.json();

        document.getElementById('resName').textContent = user.name || '';
        document.getElementById('resEmail').textContent = user.email || '';
        document.getElementById('resSummary').textContent = user.summary || '';
        document.getElementById('resExperience').textContent = user.experience || '';
        document.getElementById('resSkills').textContent = user.skills || '';
        document.getElementById('resEducation').textContent = user.education || '';
        document.getElementById('resProjects').textContent = user.projects || '';
        document.getElementById('resCertifications').textContent = user.certifications || '';
        document.getElementById('resAchievements').textContent = user.achievements || '';
    } catch (err) {
        alert(`Error: ${err.message}`);
    }
}

function downloadResume() {
    const element = document.getElementById('resumeContainer');
    const opt = {
        margin: 0.2,
        filename: `${document.getElementById('resName').textContent}-Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

window.onload = loadResume;
