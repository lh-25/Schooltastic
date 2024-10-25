// Global variables
const searchButton = document.querySelector('#search-button')
const searchResults = document.querySelector('#search-results')
const coursesList = document.querySelector('#teachers-list')
const searchInput = document.querySelector('#search-input')
const BASE_URL = `http://localhost:3001/teachers`



const loadTeachers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`)
        coursesList.innerHTML = response.data.map(teacher => `
            <li>
                Name: ${teacher.name} <br> Email: ${teacher.email}
            </li>
        `).join('')
    } catch (error) {
        console.error('Error loading teachers:', error)
    }
}


const searchTeachers = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/name/${encodeURIComponent(query)}`)
        searchResults.innerHTML = response.data.length > 0
            ? response.data.map(teacher => `
                 <div class="teacher-result">
                    <h3>${teacher.name}</h3>
                    <img src="${teacher.profilePicture}" alt="profile picture">
                    <p><strong>Email:</strong> ${teacher.email}</p>
                    <p><strong>Subject:</strong> ${teacher.subject ? teacher.subject.name : 'N/A'}</p>
                </div>
            `).join('')
            : '<p>No teacher found.</p>'
    } catch (error) {
        console.error('Error searching courses:', error)
        alert('Failed to search for courses. Please try again.')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTeachers()

    searchButton.addEventListener('click', () => {
        searchTeachers(searchInput.value)
    })
})