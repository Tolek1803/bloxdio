document.addEventListener('DOMContentLoaded', (event) => {
    // Redirect to another website after 2 seconds if no key is pressed
    const redirectTimeout = setTimeout(() => {
        window.location.href = 'https://www.example.com'; // Replace with your desired URL
    }, 2000);

    document.addEventListener('keydown', (event) => {
        if (event.key.toLowerCase() === 'b') {
            clearTimeout(redirectTimeout); // Cancel the redirection
            
            // Display all images
            for (let i = 1; i <= 10; i++) {
                document.getElementById(`image${i}`).style.display = 'block';
            }
        }
    });
});
