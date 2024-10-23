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

    createButton.addEventListener('click', () => {
        createStudent();
    });
});

// Function to load courses
const loadStudents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        studentsList.innerHTML = response.data.map(student => `
            <li>
                ${student.name} - ${student.email} - ${student.grade} - ${student.course ? student.course.name : 'N/A'}
            </li>
        `).join('');
    } catch (error) {
        console.error('Error loading courses:', error);
    }
};

const searchStudents = async (query) => {
    const searchType = document.querySelector('#search-type').value; // Get search type
    const endpoint = searchType === 'email' 
        ? `${BASE_URL}/email/${encodeURIComponent(query)}`
        : `${BASE_URL}/name/${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(endpoint);
        const student = response.data;
        searchResults.innerHTML = response.data.map(student =>
             `
                <div class="student-result">
                    <h3>Name: ${student.name}</h3>
                    <img src="${student.profilePicture}" alt="profile picture">
                    <p>Email: ${student.email}</p>
                    <p>Grade: ${student.grade}</p>
                    <p>Course: ${student.course ? student.course.name : 'N/A'}</p>
                </div>
            ` 
        ).join(''); '<p>No student found.</p>';
    } catch (error) {
        console.error('Error searching students:', error);
        alert('Failed to search for students. Please try again.');
    }
};

// Function to create a new course
// const createCourse = async () => {
//     const name = document.querySelector('#course-name').value.trim();
//     const courseCode = parseInt(document.querySelector('#course-code').value.trim());
//     const schedule = document.querySelector('#course-schedule').value.trim().split(',').map(day => day.toLowerCase());
//     const durationInMinutes = parseInt(document.querySelector('#course-duration').value);
//     const seatsAvailable = parseInt(document.querySelector('#course-seats').value);

//     const newCourse = { name, courseCode, schedule, durationInMinutes, seatsAvailable };

//     try {
//         await axios.post(`${BASE_URL}/create`, newCourse);
//         alert('Course created!');
//         loadCourses();
//     } catch (error) {
//         console.error('Error creating course:', error.response?.data || error.message);
//         alert(`Error: ${error.response?.data?.error || error.message}`);
//     }
// };

// Function to update a course
// const updateCourse = async (courseId) => {
//     const name = prompt("Enter new course name:");
//     const courseCode = prompt("Enter new course code:");
//     const schedule = prompt("Enter new schedule:");
//     const durationInMinutes = parseInt(prompt("Enter duration in minutes:"));
//     const seatsAvailable = parseInt(prompt("Enter available seats:"));

//     const updatedCourse = { name, courseCode, schedule, durationInMinutes, seatsAvailable };

//     try {
//         await axios.put(`${BASE_URL}/update/${courseId}`, updatedCourse);
//         alert('Course updated!');
//         loadCourses();
//     } catch (error) {
//         console.error('Error updating course:', error);
//     }
// };

// Function to delete a course
// const deleteCourse = async (courseId) => {
//     try {
//         await axios.delete(`${BASE_URL}/delete/${courseId}`);
//         alert('Course deleted!');
//         loadCourses();
//     } catch (error) {
//         console.error('Error deleting course:', error);
//     }
// };
