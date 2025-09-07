const apiBase = 'http://localhost:8080/api/users';

// ---------------- Sign Up ----------------
async function signup() {
    const user = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value
    };

    if (!user.name || !user.email || !user.password) {
        alert("❌ Please fill all fields");
        return;
    }

    try {
        const res = await fetch(`${apiBase}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if (res.ok) {
            alert(`✅ User created successfully! You can now login.`);
            // Clear signup fields
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        } else {
            alert(data?.message || data?.error || "❌ Failed to create user");
        }
    } catch(err) {
        alert(`❌ Error: ${err.message}`);
    }
}

// ---------------- Login ----------------
async function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert("❌ Please enter email and password");
        return;
    }

    try {
        const res = await fetch(`${apiBase}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok && !data.error) {
            // Store logged-in user data in localStorage
            localStorage.setItem("userId", data.id);
            localStorage.setItem("userName", data.name);
            alert(`✅ Login successful! Welcome ${data.name}`);
            window.location.href = "dashboard.html"; // redirect to dashboard
        } else {
            alert(data?.error || "❌ Invalid credentials");
        }
    } catch(err) {
        alert(`❌ Error: ${err.message}. Make sure the backend is running.`);
    }
}

// Optional: Auto-fill email if user was previously logged in
window.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
        console.log(`Logged in as ${savedName}`);
    }
});
