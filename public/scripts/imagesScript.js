let uploadForm = document.getElementById('uploadForm');
let images = uploadForm.querySelectorAll('input[type="file"]');
let uploadBtn = uploadForm.querySelector('button[type="submit"]');

function handleFileUpload(event) {
    event.preventDefault(); // Prevent the default form submission
    
    let token = document.cookie.split('; ').find(row => row.startsWith('tokenSession=')).split('=')[1]; // Get the token from cookies
    
    // let formData = new FormData(uploadForm); // Create a FormData object from the form

    const formData = new FormData();
    formData.append('file', images[0].files[0]); // Append the file to the FormData object
    formData.append('section', 's1');

    // Send the form data to the server using fetch
    fetch('/auth/image/create', {
        method: 'POST',
        headers: {
            'Authorization': token ? token : null
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:');
        console.log(data); // Log the success response for debugging
        // Handle success response from the server
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error response from the server
    });
}

uploadBtn.addEventListener('click', handleFileUpload); // Attach the event listener to the button