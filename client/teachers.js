// Global variables
const searchButton = document.querySelector('#search-button');
const createButton = document.querySelector('#create-button');
const searchResults = document.querySelector('#search-results');
const coursesList = document.querySelector('#teachers-list');
const searchInput = document.querySelector('#search-input')
const BASE_URL = `http://localhost:3001/teachers`

document.addEventListener('DOMContentLoaded', () => {
    loadTeachers();

    searchButton.addEventListener('click', () => {
        searchTeachers(searchInput.value);
    });
});

const loadTeachers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        coursesList.innerHTML = response.data.map(teacher => `
            <li>
                ${teacher.name} - ${teacher.email}
            </li>
        `).join('');
    } catch (error) {
        console.error('Error loading teachers:', error);
    }
};



const searchTeachers = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/name/${encodeURIComponent(query)}`);
        searchResults.innerHTML = response.data.length > 0
            ? response.data.map(teacher => `
                 <div class="teacher-result">
                    <h3>${teacher.name}</h3>
                    <img src="${teacher.profilePicture}" alt="profile picture">
                    <p><strong>Email:</strong> ${teacher.email}</p>
                    <p><strong>Subject:</strong> ${teacher.subject ? teacher.subject.name : 'N/A'}</p>
                </div>
            `).join('')
            : '<p>No teacher found.</p>';
    } catch (error) {
        console.error('Error searching courses:', error);
        alert('Failed to search for courses. Please try again.');
    }
};

// const searchTeachers = async (query) => {
//     const searchType = document.querySelector('#search-type').value; 
//     const endpoint = searchType === 'email' 
//         ? `${BASE_URL}/email/${encodeURIComponent(query)}`
//         : `${BASE_URL}/name/${query}`;

//     try {
//         const response = await axios.get(endpoint);
//         const teacher = response.data;
//         searchResults.innerHTML = teacher 
//             ? `
//                 <div class="teacher-result">
//                     <h3>Name: ${teacher.name}</h3>
//                     <p>Email: ${teacher.email}</p>
//                     <p>Subject: ${teacher.subject ? teacher.subject.name : 'N/A'}</p>
//                 </div>
//             ` 
//             : '<p>No teacher found.</p>';
//     } catch (error) {
//         console.error('Error searching teachers:', error);
//         alert('Failed to search for teachers. Please try again.');
//     }
// };

