// Global variables
const searchButton = document.querySelector('#search-button');
const createButton = document.querySelector('#create-button');
const searchResults = document.querySelector('#search-results');
const studentsList = document.querySelector('#students-list');
const searchInput = document.querySelector('#search-input')
const BASE_URL = `http://localhost:3001/students`

// Load courses on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();

    searchButton.addEventListener('click', () => {
        searchStudents(searchInput.value);
    });
});

// Function to load students
const loadStudents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        studentsList.innerHTML = response.data.map(student => `
            <li>
                Name: ${student.name} <br> Email:  ${student.email}
            </li>
            

        `).join('');
    } catch (error) {
        console.error('Error loading courses:', error);
    }
};
loadStudents()


const searchStudents = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/name/${encodeURIComponent(query)}`);
        searchResults.innerHTML = response.data.length > 0
            ? response.data.map(student => `
                 <div class="student-result">
                    <h3>${student.name}</h3>
                    <img src="${student.profilePicture}" alt="profile picture">
                    <p><strong>Email:</strong> ${student.email}</p>
                    <p><strong>Grade:</strong> ${student.grade}</p>
                    <p><strong>Course:</strong> ${student.course ? student.course.name : 'N/A'}</p>
                </div>
            `).join('')
            : '<p>No teacher found.</p>';
    } catch (error) {
        console.error('Error searching Student:', error);
        alert('Failed to search for Student. Please try again.');
    }
}

