// Global variables
const searchButton = document.querySelector('#search-button');
const createButton = document.querySelector('#create-button');
const searchResults = document.querySelector('#search-results');
const coursesList = document.querySelector('#courses-list');
const searchInput = document.querySelector('#search-input')

// Load courses on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCourses();

    searchButton.addEventListener('click', () => {
        searchCourses(searchInput.value);
    });

    createButton.addEventListener('click', () => {
        createCourse();
    });
});

// Function to load courses
const loadCourses = async () => {
    try {
        const response = await axios.get('http://localhost:3001/courses');
        coursesList.innerHTML = response.data.map(course => `
            <li>
                ${course.name} - ${course.courseCode}
                <button onclick="deleteCourse('${course._id}')">Delete</button>
                <button onclick="updateCourse('${course._id}')">Update</button>
            </li>
        `).join('');
    } catch (error) {
        console.error('Error loading courses:', error);
    }
};

// Function to search for courses by name
const searchCourses = async (query) => {
    try {
        const response = await axios.get(`http://localhost:3001/courses/name/${encodeURIComponent(query)}`);
        searchResults.innerHTML = response.data.length > 0
            ? response.data.map(course => `
                <div class="course-result">
                    <h3>${course.name}</h3>
                    <p>Code: ${course.courseCode}</p>
                    <p>Schedule: ${course.schedule.join(', ')}</p>
                    <p>Duration: ${course.durationInMinutes} mins</p>
                    <p>Seats Available: ${course.seatsAvailable}</p>
                </div>
            `).join('')
            : '<p>No courses found.</p>';
    } catch (error) {
        console.error('Error searching courses:', error);
        alert('Failed to search for courses. Please try again.');
    }
};

// Function to create a new course
const createCourse = async () => {
    const name = document.querySelector('#course-name').value.trim();
    const courseCode = parseInt(document.querySelector('#course-code').value.trim());
    const schedule = document.querySelector('#course-schedule').value.trim().split(',').map(day => day.toLowerCase());
    const durationInMinutes = parseInt(document.querySelector('#course-duration').value);
    const seatsAvailable = parseInt(document.querySelector('#course-seats').value);

    const newCourse = { name, courseCode, schedule, durationInMinutes, seatsAvailable };

    try {
        await axios.post('http://localhost:3001/courses/create', newCourse);
        alert('Course created!');
        loadCourses();
    } catch (error) {
        console.error('Error creating course:', error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.error || error.message}`);
    }
};

// Function to update a course
const updateCourse = async (courseId) => {
    const name = prompt("Enter new course name:");
    const courseCode = prompt("Enter new course code:");
    const schedule = prompt("Enter new schedule:");
    const durationInMinutes = parseInt(prompt("Enter duration in minutes:"));
    const seatsAvailable = parseInt(prompt("Enter available seats:"));

    const updatedCourse = { name, courseCode, schedule, durationInMinutes, seatsAvailable };

    try {
        await axios.put(`http://localhost:3001/courses/update/${courseId}`, updatedCourse);
        alert('Course updated!');
        loadCourses();
    } catch (error) {
        console.error('Error updating course:', error);
    }
};

// Function to delete a course
const deleteCourse = async (courseId) => {
    try {
        await axios.delete(`http://localhost:3001/courses/delete/${courseId}`);
        alert('Course deleted!');
        loadCourses();
    } catch (error) {
        console.error('Error deleting course:', error);
    }
};
