class DrumKit {
    //cunstructor function - defines what is what
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
        this.tomAudio = document.querySelector('.tom-sound')
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
        this.select = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.darkmodeSwitch = document.querySelector(".dark-mode");
    }
    activePad() {
        console.log(this)
        this.classList.toggle("active");
    }
    // method for repetions (function to repeat)
    repeat() {
        // if the index's remainder is equal to 8, change step back to 0
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        //loop over bars
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
            // Check if pads are active
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    //restarts time of current audio track
                    this.kickAudio.currentTime = 0;
                    // plays the track
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
        })

        //add 1 to index
        this.index++
    }
    // start method in order to begin the intervals
    start() {
        const interval = (60 / this.bpm) * 1000;
        // set interval method with arrow function, becuase if there is no error function - this.repeat will refer to the window- not the constructor
        //if this is playing is null run the interval
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                // invoking the repeat method every 1 second
                this.repeat()
            }, interval)
            // if this.isPlaying is true or not null clear the interval and set it back to null
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active")
        } else {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active")
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
        }
    };
    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        tempoText.innerText = e.target.value;
    };
    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains('active')) {
            this.start()
        }
    }
    updateDarkMode() {
        const body = document.querySelector("body");
        body.classList.toggle("dark-mode")
    }
};

// new method call
const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad)
    pad.addEventListener('animationend', function () {
        this.style.animation = ""
    })
});
// calling the drumkit object with the start() method
drumKit.playBtn.addEventListener("click", () => {
    drumKit.start();
    drumKit.updateBtn();
});

drumKit.select.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    })
})

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        drumKit.mute(e);
    })
});

//use inut to update tempo number everytime for p tag
drumKit.tempoSlider.addEventListener('input', function (e) {
    drumKit.changeTempo(e)
})

drumKit.tempoSlider.addEventListener('change', function (e) {
    drumKit.updateTempo(e)
})
drumKit.darkmodeSwitch.addEventListener("click", function () {
    drumKit.updateDarkMode()
})