class DrumKit {
    // Här använder vi en konstruktorfunktion som definerar allt
    constructor() {
        // Hämtar alla trummpads
        this.pads = document.querySelectorAll('.pad');
        // Hämtar play-knappen
        this.playBtn = document.querySelector('.play');
        // Definierar standardljud för olika trummor
        this.currentKick = './sounds/kick1.wav';
        this.currentSnare = './sounds/snare1.wav';
        this.currentHihat = './sounds/hihat1.wav';
        this.currentTom = './sounds/tom-acoustic01.wav';
        // Hämtar ljudfiler
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.tomAudio = document.querySelector('.tom-sound');
        // Definerar nuvarande index och bpm
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null; // Håller koll på om trummorna spelar eller inte
        // Denna rad hämtar alla dropdown-menyer för att ändra ljud
        this.select = document.querySelectorAll('select');
        // Hämtar mute-knapparna
        this.muteBtns = document.querySelectorAll(".mute");
        // Hämtar tempo-slidern
        this.tempoSlider = document.querySelector(".tempo-slider");
    }

    // Funktion som är till för att aktivera eller inaktivera de olika trummplattorna
    activePad(e) {
        e.target.classList.toggle("active");
    }
    
    // Denna funktion är till för repetition
    repeat() {
        let step = this.index % 8; // Hämtar nuvarande steg
        const activeBars = document.querySelectorAll(`.b${step}`);
        
        // Loopar över alla aktiva trummplattor
        activeBars.forEach(bar => {
            // Lägger till animation på trummplattorna när funktionen är aktiv
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

            // Kontrollerar om trumplattor är aktiva
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0; // Återställer ljudets starttid
                    this.kickAudio.play(); // Spelar ljud
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

        this.index++; // Ökar indexet till nästa steg
    }

    // Startar eller stoppar spelningen
    start() {
        const interval = (60 / this.bpm) * 1000; // Beräknar intervallet baserat på bpm
        if (!this.isPlaying) { // Om inte redan spelar
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else { // Om spelar, stoppa
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    // Uppdaterar play-knappens utseende
    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerHTML = '<i class="fas fa-play"></i>'; // Visa play-ikon
            this.playBtn.classList.remove("active");
        } else {
            this.playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Visa paus-ikon
            this.playBtn.classList.add("active");
        }
    }

    // Ändra ljud baserat på användarens val
    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue; // Ändra ljudfil för kick
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue; // Ändra ljudfil för snare
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue; // Ändra ljudfil för hihat
                break;
            case "tom-select":
                this.tomAudio.src = selectionValue; // Ändra ljudfil för clap 
                break;
        }
    }

    // Mutar eller avmutar ljud
    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        const icon = e.target.querySelector('i');

        e.target.classList.toggle("active");

        if (e.target.classList.contains('active')) {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0; // Mutar kick-ljud
                    break;
                case "1":
                    this.snareAudio.volume = 0; // Mutar snare-ljud
                    break;
                case "2":
                    this.hihatAudio.volume = 0; // Mutar hihat-ljud
                    break;
                case "3":
                    this.tomAudio.volume = 0; // Mutar clap-ljud
                    break;
            }
            icon.classList.remove('fa-volume-up'); // Ikon för "aktivt" ljud
            icon.classList.add('fa-volume-mute'); // Ändrar ikon till mutad
        } else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1; // Återställer volym för kick
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
            icon.classList.remove('fa-volume-mute'); //Tar bort mute ikon
            icon.classList.add('fa-volume-up'); // Återställer ikon till ljud
        }
    }

    // Uppdaterar tempo numret
    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        tempoText.innerText = e.target.value; // Uppdaterar text med nytt tempo
    }

    // Uppdaterar tempo (och startar om ifall aktiv)
    updateTempo(e) {
        this.bpm = e.target.value; // Uppdaterar bpm-värde
        clearInterval(this.isPlaying); // Stoppar aktuell spelning
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains('active')) {
            this.start(); // Startar om med nytt tempo om aktiv
        }
    }
}

// Initialiserar DrumKit-klassen
const drumKit = new DrumKit();

// Lägger till event-lyssnare för trumplattor
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', (e) => drumKit.activePad(e)); // Aktivera/inaktivera trumplatta vid klick
    pad.addEventListener('animationend', function () {
        this.style.animation = ""; // Tar bort animation efter avslutad
    });
});

// Lyssnare för play-knappen
drumKit.playBtn.addEventListener("click", () => {
    drumKit.start(); // Starta eller stoppa
    drumKit.updateBtn(); // Uppdatera knappens utseende
});

// Lyssnare för att ändra ljud
drumKit.select.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    });
});

// Lyssnare för mute-knappar
drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        drumKit.mute(e);
    });
});

// Lyssnare för att ändra tempo i realtid
drumKit.tempoSlider.addEventListener('input', function (e) {
    drumKit.changeTempo(e);
});

// Lyssnare för att uppdatera tempo vid släpp
drumKit.tempoSlider.addEventListener('change', function (e) {
    drumKit.updateTempo(e);
});