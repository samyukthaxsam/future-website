async function submitResponse() {
    const input = document.getElementById('responseInput');
    const responseText = input.value;
    if (responseText.trim() === '') {
        alert('Please enter a response!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ response: responseText })
        });

        if (response.ok) {
            const savedResponse = await response.json();
            displayResponse(savedResponse.response);
            input.value = ''; // Clear input after submission
        } else {
            throw new Error('Failed to save response');
        }
    } catch (error) {
        alert(error.message);
    }
}

async function loadResponses() {
    try {
        const response = await fetch('http://localhost:3000/responses');
        const responses = await response.json();
        responses.forEach(resp => {
            displayResponse(resp.response);
        });
    } catch (error) {
        console.log(error);
    }
}

function displayResponse(responseText) {
    const responsesDiv = document.getElementById('responses');
    const newResponse = document.createElement('div');
    newResponse.textContent = responseText;
    responsesDiv.appendChild(newResponse);
}

document.addEventListener('DOMContentLoaded', loadResponses);

