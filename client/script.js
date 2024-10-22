// Global variables
const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');

// Load event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Function to handle signup
const handleSignup = async (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const profession = document.querySelector('#profession').value;
    const grade = profession === 'student' ? document.querySelector('#grade').value : null;
    const subject = profession === 'teacher' ? document.querySelector('#subject').value : null;

    try {
        const response = await axios.post('http://localhost:3001/signup', {
            name, email, password, profession, grade, subject
        });

        alert(response.data.message);
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
    }
};

// Function to handle login
const handleLogin = async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
        const response = await axios.post('http://localhost:3001/login', {
            email, password
        });

        if (response.data.message === 'Login successful') {
            alert('Login successful');
            window.location.href = 'dashboard.html';
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
    }
};

