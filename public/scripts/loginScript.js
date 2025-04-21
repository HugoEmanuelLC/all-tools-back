let loginForm = document.getElementById('loginForm');
let usernameInput = loginForm.querySelector('input[name="email"]');
let passwordInput = loginForm.querySelector('input[name="password"]');
let loginBtn = loginForm.querySelector('button[type="submit"]');


const createCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    console.log('Login button clicked!'); // Log to console for debugging

    let formData = new FormData(loginForm); // Create a FormData object from the form

    console.log('Form data:'); // Log the form data for debugging
    console.log(formData);

    let body = {
        auth: {
            email: usernameInput.value,
            password: passwordInput.value
        },
    }

    // Send the form data to the server using fetch
    fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        console.log(data.token); // Log the token for debugging

        createCookie('tokenSession', data.token, 1); // Create a cookie with the token
        
    })
    .catch((error) => {
        // console.error('Error:', error);
        error.json().then(err => {
            console.log('Error response:', err); // Log the error response for debugging
        });
    });
}

loginBtn.addEventListener('click', handleLogin); // Attach the event listener to the button