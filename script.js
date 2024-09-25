// Linear Random Number Generator Algorithm
const linearRandomGenerator = (x0, a, b, m, n) => {
    const results = [];
    for (let i = 0; i < n; i++) {
        x0 = (a * x0 + b) % m;
        results.push(x0);
    }
    return results;
};

// Function to get random number from random.org
const getRandom = async (min, max, base) => {
    try {
        const response = await fetch(`https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=${base}&format=plain&rnd=new`);
        return response.text();
    } catch (error) {
        throw new Error("Connection error. Unable to generate.");
    }
};

// Output handling for button click
const handleGenerate = () => {
    const generateButton = document.getElementById('generateButton');
    const resultValue = document.getElementById('resultValue');
    const prompter = document.getElementById('prompter');
    const minimum = document.getElementById('minimum');
    const maximum = document.getElementById('maximum');
    const binary = document.getElementById('binary');
    const decimal = document.getElementById('decimal');
    const hexadecimal = document.getElementById('hexadecimal');

    handleActive(generateButton); // For UI feedback when button is pressed

    // Determine the base (binary, decimal, hexadecimal)
    const base = binary.checked ? 2 : decimal.checked ? 10 : 16;

    // Validate input
    if (!minimum.value || !maximum.value) {
        prompter.style.color = 'red';
        prompter.textContent = "Enter Min & Max values";
    } else {
        // Generate random number
        getRandom(minimum.value, maximum.value, base)
            .then((data) => {
                resultValue.textContent = data.trim(); // Display random number
                prompter.textContent = "";
            })
            .catch((error) => {
                resultValue.textContent = 'ERROR';
                prompter.textContent = error.message;
            });
    }

    handleRestart();
};

// Toggle button activity (UI effect)
const handleActive = (button) => {
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 200);
};

// Reset function to clear values
const handleRestart = () => {
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        document.getElementById('minimum').value = '';
        document.getElementById('maximum').value = '';
        document.getElementById('resultValue').textContent = '---';
        document.getElementById('prompter').textContent = '';
    });
};

// Event listener for generating the random number
document.getElementById('generateButton').addEventListener('click', handleGenerate);

// Initial call for the restart button setup
handleRestart();
