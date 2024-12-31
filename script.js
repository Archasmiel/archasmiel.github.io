const sessionDuration = 3600 * 1000; // 1 година в мілісекундах
const correctCode = "12345"; // Код доступу для викладачів

window.onload = function () {
    const isTeacher = localStorage.getItem("isTeacher");
    const sessionExpiry = localStorage.getItem("sessionExpiry");
    const currentTime = Date.now();

    const userTypeSpan = document.getElementById("userType");
    const teacherLink = document.getElementById("teacherLink");
    const logoutButton = document.getElementById("logoutButton");

    if (sessionExpiry && currentTime < parseInt(sessionExpiry)) {
        // Якщо сесія активна
        if (isTeacher === "true") {
            userTypeSpan.textContent = "Тип доступу: Викладач";
            teacherLink.style.display = "block";
            logoutButton.style.display = "inline-block"; // Додати кнопку "Вийти" для викладача
        } else {
            userTypeSpan.textContent = "Тип доступу: Учень";
            logoutButton.style.display = "none"; // Учень не має кнопки "Вийти"
        }
    } else {
        // Якщо сесія прострочена, встановлюємо тип "Учень" за замовчуванням
        saveSession(false); // Учень за замовчуванням
        userTypeSpan.textContent = "Тип доступу: Учень";
        logoutButton.style.display = "none"; // Учень не має кнопки "Вийти"
    }
};

function login() {
    const accessCode = document.getElementById("accessCode").value;
    const messageDiv = document.getElementById("message");

    if (accessCode === correctCode) {
        saveSession(true); // Викладач
        const userTypeSpan = document.getElementById("userType");
        const teacherLink = document.getElementById("teacherLink");
        const logoutButton = document.getElementById("logoutButton");
        userTypeSpan.textContent = "Тип доступу: Викладач";
        teacherLink.style.display = "block"; // Відкрити доступ для викладачів
        logoutButton.style.display = "inline-block"; // Відкрити кнопку "Вийти"
        messageDiv.textContent = ""; // Очистити повідомлення
    } else {
        messageDiv.textContent = "Невірний код! Ви залишаєтесь учнем.";
        saveSession(false); // Учень
    }
}

function loginAsStudent() {
    saveSession(false); // Учень
    window.location.href = "student.html"; // Перенаправлення тільки для учнів
}

function saveSession(isTeacher) {
    const expiryTime = Date.now() + sessionDuration;
    localStorage.setItem("isTeacher", isTeacher);
    localStorage.setItem("sessionExpiry", expiryTime);
}

function logout() {
    clearStorage();
    window.location.href = "index.html"; // Повернення на головну сторінку
}

function clearStorage() {
    localStorage.removeItem("isTeacher");
    localStorage.removeItem("sessionExpiry");
}
