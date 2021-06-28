class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playNtn = document.querySelector(".play");
    this.currentKick = "./sound/kick-classic.wav";
    this.currentSnare = "./sound/snare-808.wav";
    this.currentHihat = "./sound/hihat-808.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.select = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider")
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // loop over the bars
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      if (bar.classList.contains("active")) {
        // check sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;

          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;

          this.hihatAudio.play();
        }
      }
    });
    // check pad are active

    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  activePad() {
    this.classList.toggle("active");
  }
  updateBtn() {
    if (this.isPlaying) {
      this.playNtn.innerText = "play";
      this.playNtn.classList.remove("active");
    } else {
      this.playNtn.innerText = "stop";
      this.playNtn.classList.add("active");
    }
  }

  changeSound(e) {
    const selectionSound = e.target.name;
    const selectValue = e.target.value;
    console.log(selectValue);
    switch (selectionSound) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectValue;
        break
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    console.log(muteIndex)
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.hihatAudio.volume = 0;
          break
        case "2":
          this.snareAudio.volume = 0;
          break
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.hihatAudio.volume = 1;
          break
        case "2":
          this.snareAudio.volume = 1;
          break
      }
    }
  }
  changeInput(e) {
    const tempoText = document.querySelector(".tempo-nr")
    this.bpm = e.target.value
    tempoText.innerText = e.target.value
  }
  updateTempo() {
    clearInterval(this.isPlaying)
    this.isPlaying = null
    const playBtn = document.querySelector(".play")
    console.log(playBtn)
    if (this.playBtn.classList.contains("active")) {
      this.start()
      
    }
  }
}
const drumKit = new Drumkit();
// Event Listners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playNtn.addEventListener("click", () => {
  drumKit.start();
  drumKit.updateBtn();
});

drumKit.select.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtn.forEach((mute) => {
  mute.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});
drumKit.tempoSlider.addEventListener("input",function (e) {
  drumKit.changeInput(e)
})
drumKit.tempoSlider.addEventListener("change",function () {
  drumKit.updateTempo()
})