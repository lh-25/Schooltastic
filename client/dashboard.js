document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const createButton = document.getElementById('create-button');
    
    searchButton.addEventListener('click', searchCourses);
    createButton.addEventListener('click', createCourse);

    loadCourses();  // Load courses on page load
});

async function searchCourses() {
    const query = document.getElementById('search-input').value.trim();
    try {
        const response = await axios.get(`http://localhost:3001/courses/name/${encodeURIComponent(query)}`);
        const searchResults = document.getElementById('search-results');

        if (!searchResults) return;

        searchResults.innerHTML = response.data.map(course => `
            <li>
                Course: ${course.name}, Code: ${course.courseCode}, 
                Schedule: ${course.schedule}, Duration: ${course.durationInMinutes} mins, 
                Seats Available: ${course.seatsAvailable}
            </li>
        `).join('');
    } catch (error) {
        console.error('Error searching courses:', error);
    }
}

async function loadCourses() {
    try {
        const response = await axios.get('http://localhost:3001/courses');
        const coursesList = document.getElementById('courses-list');

        if (!coursesList) return;

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
}

async function createCourse() {
    const name = document.getElementById('course-name').value.trim();
    const courseCode = parseInt(document.getElementById('course-code').value.trim());
    const schedule = document.getElementById('course-schedule').value.trim().split(',').map(day => day.toLowerCase());
    const durationInMinutes = parseInt(document.getElementById('course-duration').value);
    const seatsAvailable = parseInt(document.getElementById('course-seats').value);

    const newCourse = { name, courseCode, schedule, durationInMinutes, seatsAvailable };

    try {
        const response = await axios.post('http://localhost:3001/courses/create', newCourse);
        alert('Course created!');
        loadCourses();  // Refresh the course list
    } catch (error) {
        console.error('Error creating course:', error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.error || error.message}`);
    }
}


async function updateCourse(courseId) {
    const name = prompt("Enter new course name:");
    const courseCode = prompt("Enter new course code:");
    const schedule = prompt("Enter new schedule:");
    const durationInMinutes = parseInt(prompt("Enter duration in minutes:"));
    const seatsAvailable = parseInt(prompt("Enter available seats:"));

    const updatedCourse = {
        name,
        courseCode,
        schedule,
        durationInMinutes,
        seatsAvailable
    };

    try {
        const response = await axios.put(`http://localhost:3001/courses/update/${courseId}`, updatedCourse);
        alert('Course updated!');
        loadCourses();  // Refresh the course list
    } catch (error) {
        console.error('Error updating course:', error);
    }
}

async function deleteCourse(courseId) {
    try {
        await axios.delete(`http://localhost:3001/courses/delete/${courseId}`);
        alert('Course deleted!');
        loadCourses();  // Refresh the course list
    } catch (error) {
        console.error('Error deleting course:', error);
    }
}
