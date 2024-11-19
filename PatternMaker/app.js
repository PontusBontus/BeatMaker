class DrumKit {
    // Constructor function - defines what is what
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.currentKick = './sounds/kick1.wav';
        this.currentSnare = './sounds/snare1.wav';
        this.currentHihat = './sounds/hihat1.wav';
        this.currentTom = './sounds/tom-acoustic01.wav';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.tomAudio = document.querySelector('.tom-sound');
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
        this.select = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.darkmodeSwitch = document.querySelector(".dark-mode");
    }

    // Toggle active state of a pad
    activePad(e) {
        e.target.classList.toggle("active");
    }
    
    // Method for repetitions (function to repeat)
    repeat() {
        let step = this.index % 8; // Get the current step
        const activeBars = document.querySelectorAll(`.b${step}`);
        
        // Loop over bars
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

            // Check if pads are active
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
                if (bar.classList.contains('tom-pad')) {
                    this.tomAudio.currentTime = 0;
                    this.tomAudio.play();
                }
            }
        });

        this.index++; // Increment the index
    }

    // Start method to begin the intervals
    start() {
        const interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        } else {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        }
    }

    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
            case "tom-select":
                this.tomAudio.src = selectionValue;
                break;
        }
    }

    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        const icon = e.target.querySelector('i');

        e.target.classList.toggle("active");

        if (e.target.classList.contains('active')) {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
                case "3":
                    this.tomAudio.volume = 0;
                    break;
            }
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        } else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
                case "3":
                    this.tomAudio.volume = 1;
                    break;
            }
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
        }
    }

    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        tempoText.innerText = e.target.value;
    }

    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains('active')) {
            this.start();
        }
    }

    updateDarkMode() {
        document.body.classList.toggle("dark-mode-active");
    }
}

// Initialize the DrumKit class
const drumKit = new DrumKit();

// Add event listeners
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', (e) => drumKit.activePad(e));
    pad.addEventListener('animationend', function () {
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click", () => {
    drumKit.start();
    drumKit.updateBtn();
});

drumKit.select.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener('input', function (e) {
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function (e) {
    drumKit.updateTempo(e);
});

drumKit.darkmodeSwitch.addEventListener("click", function () {
    drumKit.updateDarkMode();
});