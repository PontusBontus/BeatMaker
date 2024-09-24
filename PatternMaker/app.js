// Array to store sound samples
const samples = {
    kick: new Audio('kick.wav'),
    snare: new Audio('snare.wav'),
    hihat: new Audio('hihat.wav'),
    clap: new Audio('clap.wav'),
};

// Variables for pattern, tempo, and play control
const pattern = document.querySelectorAll("input[type='checkbox']");
let bpm = document.getElementById('bpm').value;
let interval;
let step = 0;

document.getElementById('startButton').addEventListener('click', startPlaying);
document.getElementById('stopButton').addEventListener('click', stopPlaying);

document.getElementById('bpm').addEventListener('input', (e) => {
    bpm = e.target.value;
    if (interval) {
        clearInterval(interval);
        startPlaying();
    }
});

function startPlaying() {
    let intervalTime = (60 / bpm) / 4 * 1000;
    step = 0; // Reset step to 0 when starting
    interval = setInterval(playStep, intervalTime);
}

function stopPlaying() {
    clearInterval(interval);
    resetPattern();
    step = 0; // Reset step after stopping
}

function playStep() {
    resetPattern(); // Clear previous step highlights
    document.querySelectorAll("td")[step + 1].classList.add('active'); // Highlight current step with red overlay and arrow
    
    // Loop through each row and play sound if checked
    document.querySelectorAll('tr').forEach((row, rowIndex) => {
        const instrument = row.children[0].textContent.toLowerCase();
        if (row.children[step + 1].children[0].checked) {
            samples[instrument].currentTime = 0; // Reset the sound
            samples[instrument].play(); // Play sound
        }
    });

    step = (step + 1) % 16; // Go to the next step
}

function resetPattern() {
    document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
}
