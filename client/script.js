document.addEventListener('DOMContentLoaded', () => {
    // Handle Signup Form Submission
    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const profession = document.getElementById('profession').value;
            const grade = profession === 'student' ? document.getElementById('grade').value : null;
            const subject = profession === 'teacher' ? document.getElementById('subject').value : null;

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
        });
    }

    // Handle Login Form Submission
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

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
        });
    }
});
