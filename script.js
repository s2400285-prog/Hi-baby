/**
 * TO MY BABY JULIE — ETERNAL LOVE LETTER EXPERIENCE
 * Vanilla JavaScript: Particle Systems, 3D Envelope, Progressive Letter Reveal,
 * Lightbox Gallery, Love Question, Secret Modal, Timeline, Audio Player with Fallback.
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ==========================================================================
     1. STATE & CONFIGURATION
     ========================================================================== */
  const state = {
    isIntroActive: true,
    fxEnabled: true,
    reducedMotion: false,
    currentParagraph: 1,
    totalParagraphs: 11,
    galleryIndex: 0,
    isPlayingMusic: false,
    isMuted: false,
    audioInitialized: false,
    usingSynthMusic: false,
    synthInterval: null,
  };

  /* ==========================================================================
     2. DOM ELEMENTS
     ========================================================================== */
  // Intro & Main
  const introScreen = document.getElementById("intro-screen");
  const openHeartBtn = document.getElementById("open-heart-btn");
  const skipIntroBtn = document.getElementById("skip-intro-btn");
  const mainExperience = document.getElementById("main-experience");

  // Canvas & Background FX
  const ambientCanvas = document.getElementById("ambient-canvas");
  const starsContainer = document.getElementById("stars-container");
  const petalsContainer = document.getElementById("petals-container");
  const cursorGlow = document.getElementById("cursor-glow");
  const sparkleContainer = document.getElementById("sparkle-container");
  const toggleFxBtn = document.getElementById("toggle-fx-btn");
  const toggleMotionBtn = document.getElementById("toggle-motion-btn");

  // Envelope & Letter
  const interactiveEnvelope = document.getElementById("interactive-envelope");
  const envelopeSeal = document.getElementById("envelope-seal");
  const readLetterDirectBtn = document.getElementById("read-letter-direct-btn");
  const letterReadingArea = document.getElementById("letter-reading-area");
  const continueReadingBtn = document.getElementById("continue-reading-btn");
  const readAgainBtn = document.getElementById("read-again-btn");
  const letterReadProgress = document.getElementById("letter-read-progress");
  const readingCounterText = document.getElementById("reading-counter-text");
  const letterParagraphs = document.querySelectorAll(".letter-p");

  // Music Player
  const bgAudio = document.getElementById("bg-audio");
  const musicToggleBtn = document.getElementById("music-toggle-btn");
  const musicIcon = document.getElementById("music-icon");
  const musicMuteBtn = document.getElementById("music-mute-btn");
  const muteIcon = document.getElementById("mute-icon");
  const volumeSlider = document.getElementById("volume-slider");
  const playerDisc = document.getElementById("player-disc");
  const playerStatus = document.getElementById("player-status");
  const playerProgressBar = document.getElementById("player-progress-bar");
  const playerProgressFill = document.getElementById("player-progress-fill");
  const playerCurrentTime = document.getElementById("player-current-time");
  const playerDuration = document.getElementById("player-duration");

  // Gallery & Lightbox
  const galleryGrid = document.getElementById("gallery-grid");
  const galleryLightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");
  const lightboxPrevBtn = document.getElementById("lightbox-prev-btn");
  const lightboxNextBtn = document.getElementById("lightbox-next-btn");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");

  // Reason Modal
  const reasonsGrid = document.getElementById("reasons-grid");
  const reasonModal = document.getElementById("reason-modal");
  const reasonBackdrop = document.getElementById("reason-backdrop");
  const reasonCloseBtn = document.getElementById("reason-close-btn");
  const reasonModalIcon = document.getElementById("reason-modal-icon");
  const reasonModalTitle = document.getElementById("reason-modal-title");
  const reasonModalBody = document.getElementById("reason-modal-body");

  // Timeline
  const timelineItemsWrap = document.getElementById("timeline-items-wrap");

  // Love Question
  const questionButtons = document.querySelectorAll(".question-btn");
  const questionResponseBox = document.getElementById("question-response-box");
  const responseTitle = document.getElementById("response-title");
  const responseText = document.getElementById("response-text");

  // Secret Letter
  const secretBtn = document.getElementById("secret-btn");
  const secretModal = document.getElementById("secret-modal");
  const secretBackdrop = document.getElementById("secret-backdrop");
  const secretCloseBtn = document.getElementById("secret-close-btn");

  // Finale & Last Surprise
  const lastSurpriseBtn = document.getElementById("last-surprise-btn");
  const surpriseModal = document.getElementById("surprise-modal");
  const surpriseBackdrop = document.getElementById("surprise-backdrop");
  const surpriseCloseBtn = document.getElementById("surprise-close-btn");
  const celebrateAgainBtn = document.getElementById("celebrate-again-btn");

  // Toast Notification
  const toastNotify = document.getElementById("toast-notify");

  /* ==========================================================================
     3. DATA DEFINITIONS (Easily Customizable)
     ========================================================================== */

  // Little Things I Want You To Know (10 Sweet Reasons)
  const reasonsData = {
    1: {
      title: "Why I Choose You",
      icon: "fa-heart-circle-check",
      body: "Baby Julie, choosing you isn't just a decision I made once—it is a promise my soul renews every sunrise. You bring peace where there is noise, warmth where life feels cold, and a genuine smile that makes everything okay. I choose you on easy days, on quiet days, and especially on days when life asks us to be strong. You are my girl, my home, and my favorite blessing.",
    },
    2: {
      title: "You're My Favorite Person",
      icon: "fa-star",
      body: "Out of the entire universe, you are the person I look for in every room. When something funny happens, you are the one I want to tell. When I'm tired, your gentle voice is the only lullaby I need. There is no one else I would rather share my prayers, my silly jokes, and my life with. Palangga ta gid ka, baby.",
    },
    3: {
      title: "A Promise for You",
      icon: "fa-handshake-angle",
      body: "I promise to always listen when your heart is speaking, even in the quiet moments. I promise to pray for you daily, to protect your peace, to cheer for your dreams, and never to let you feel alone in this world. My love for you comes with patience, respect, and deep devotion that time will only strengthen.",
    },
    4: {
      title: "When You Miss Me",
      icon: "fa-moon",
      body: "Whenever you miss me, baby, look up at the night sky or gently place your hand over your heart. We are under the exact same stars, and every beat of my heart belongs to you. Distance or busy days can never lessen how much you mean to me. I am always holding you in my thoughts and prayers.",
    },
    5: {
      title: "Your Beautiful Smile",
      icon: "fa-face-smile-beam",
      body: "Do you know what happens to me when you smile, Julie? My entire chest softens, and all my worries melt away. Your smile is pure sunshine, so sweet and genuine. It lights up the whole room, and knowing that I can be the reason behind even one of those smiles is my greatest honor.",
    },
    6: {
      title: "My Prayer for Us",
      icon: "fa-hands-praying",
      body: "Lord God, thank You for the precious gift of Julie. Please guard her heart, protect her steps, and let Your peace surround her. Help us to keep You at the center of our relationship, to love each other with patient grace, and to grow closer in faith every single day. In Jesus' Name, Amen.",
    },
    7: {
      title: "Things I Adore About You",
      icon: "fa-gem",
      body: "I adore the sweet way you speak when you're sleepy. I adore how passionately you sing praises for God. I adore your gentle hands, your pure heart, your kindness to others, and the way your eyes sparkle when you're happy. Every little detail of who you are is a masterpiece to me.",
    },
    8: {
      title: "Our Future Memories",
      icon: "fa-compass",
      body: "I dream of all the adventures waiting for us: traveling to quiet beaches, trying new foods together, learning and cooking together, worshipping side-by-side on Sunday mornings, and building a peaceful, loving future rooted in God. The best chapters of our story are still ahead of us, baby.",
    },
    9: {
      title: "Open When You're Sad",
      icon: "fa-cloud-sun-rain",
      body: "Hey my sweet baby Julie, take a deep breath. You don't have to carry the weight of the world on your shoulders. It is okay to be tired; it is okay to rest. You are deeply loved, cherished, and valued more than words could ever describe. I am here for you, always in your corner, and I will hold your hand through whatever comes.",
    },
    10: {
      title: "One More Reason I Love You",
      icon: "fa-fire-flame-curved",
      body: "I love you because you make me want to be a better man—more patient, more faithful, and more loving. Loving you is the easiest, sweetest, and most natural thing my heart has ever known. You are God's most beautiful answered prayer in my life, Julie.",
    },
  };

  // Our Love Story Timeline (Easily editable milestones)
  const timelineData = [
    {
      date: "God's Perfect Timing",
      title: "The Day Our Paths Crossed",
      desc: "In a world of billions of people, God gently orchestrated our meeting. That moment started a melody that still plays sweetly in my heart every single day.",
      icon: "fa-cross",
    },
    {
      date: "A Tender Milestone",
      title: "Meeting Your Mother",
      desc: "I was so nervous and shy, baby, but that moment meant everything to me. Seeing the warmth of your home and honoring the family that raised the love of my life filled me with deep respect and gratitude.",
      icon: "fa-heart",
    },
    {
      date: "Pure Grace",
      title: "Hearing You Sing for God",
      desc: "The first time I heard you worship, time stood still. Your voice was so pure, gentle, and filled with devotion. Watching your faith shines brighter than any star in the night sky.",
      icon: "fa-music",
    },
    {
      date: "Quiet Magic",
      title: "Holding Your Gentle Hand",
      desc: "The warmth of your hand fitting perfectly into mine. It felt as if God crafted our hands to walk through this life together. In that moment, I knew I had found my home.",
      icon: "fa-hands-holding",
    },
    {
      date: "Everyday Blessings",
      title: "Our Dates & Sweet Conversations",
      desc: "Late night laughs, shared stories, talking about our dreams, and simply listening to you talk. Even the simplest days turn into golden memories when I'm with you.",
      icon: "fa-champagne-glasses",
    },
    {
      date: "Forever & Ever",
      title: "Growing, Praying & Loving You More",
      desc: "Our story isn't a fairy tale that ends; it is a lifetime covenant rooted in God's love. I look forward to choosing you, honoring you, and loving you through every season to come.",
      icon: "fa-infinity",
    },
  ];

  // Gallery Photos Data
  const galleryItems = [
    {
      src: "images/julie1.jpg",
      title: "Your Radiant Smile",
      caption:
        "Your sweetest smile that brightens my whole life. My favorite view in the universe.",
    },
    {
      src: "images/julie2.jpg",
      title: "Holding Your Hand",
      caption:
        "Walking hand-in-hand with you. In your hands, I hold my whole world.",
    },
    {
      src: "images/julie3.jpg",
      title: "A Heart of Pure Worship",
      caption:
        "Hearing you worship and sing for God. Your pure heart and lovely voice inspire me every day.",
    },
    {
      src: "images/julie4.jpg",
      title: "Sweetest Times Together",
      caption:
        "Our quiet dates and endless sweet laughter. The simple days that feel like pure gold.",
    },
  ];

  /* ==========================================================================
     4. PARTICLES, STARS, PETALS & AMBIENT CANVAS
     ========================================================================== */
  let canvasCtx = null;
  let heartParticles = [];
  let animFrameId = null;

  function initAmbientCanvas() {
    if (!ambientCanvas) return;
    canvasCtx = ambientCanvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    startParticleLoop();
  }

  function resizeCanvas() {
    if (!ambientCanvas) return;
    ambientCanvas.width = window.innerWidth;
    ambientCanvas.height = window.innerHeight;
  }

  // Particle Class for Heart Bursts
  class HeartBurstParticle {
    constructor(x, y, color = null) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 2;
      this.size = Math.random() * 14 + 10;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.012;
      this.gravity = 0.09;
      this.rotation = Math.random() * Math.PI;
      this.rotSpeed = (Math.random() - 0.5) * 0.1;
      const colors = [
        "#ff3385",
        "#ff65a3",
        "#a855f7",
        "#d8b4fe",
        "#fcd34d",
        "#ffffff",
      ];
      this.color = color || colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.alpha -= this.decay;
      this.rotation += this.rotSpeed;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;

      // Draw Heart Shape
      const s = this.size / 15;
      ctx.beginPath();
      ctx.moveTo(0, -5 * s);
      ctx.bezierCurveTo(-8 * s, -15 * s, -18 * s, -2 * s, 0, 14 * s);
      ctx.bezierCurveTo(18 * s, -2 * s, 8 * s, -15 * s, 0, -5 * s);
      ctx.fill();
      ctx.restore();
    }
  }

  function triggerHeartBurst(x, y, count = 28, color = null) {
    if (!state.fxEnabled || state.reducedMotion) return;
    for (let i = 0; i < count; i++) {
      heartParticles.push(new HeartBurstParticle(x, y, color));
    }
  }

  function startParticleLoop() {
    if (!canvasCtx) return;
    canvasCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);

    for (let i = heartParticles.length - 1; i >= 0; i--) {
      const p = heartParticles[i];
      p.update();
      p.draw(canvasCtx);
      if (p.alpha <= 0) {
        heartParticles.splice(i, 1);
      }
    }

    animFrameId = requestAnimationFrame(startParticleLoop);
  }

  // Populate Dreamy Stars
  function generateStars(count = 75) {
    if (!starsContainer) return;
    starsContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star-dot";
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${Math.random() * 3 + 1.8}s`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      fragment.appendChild(star);
    }
    starsContainer.appendChild(fragment);
  }

  // Populate Floating Petals
  function generatePetals(count = 18) {
    if (!petalsContainer) return;
    petalsContainer.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      petal.className = "petal";
      const width = Math.random() * 12 + 8;
      const height = width * (Math.random() * 0.5 + 1.2);
      petal.style.width = `${width}px`;
      petal.style.height = `${height}px`;
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${Math.random() * 7 + 7}s`;
      petal.style.animationDelay = `${Math.random() * 8}s`;
      petalsContainer.appendChild(petal);
    }
  }

  // Populate Floating Background Hearts
  function spawnFloatingHeart() {
    if (!state.fxEnabled || state.reducedMotion) return;
    const heart = document.createElement("div");
    heart.className = "floating-bg-heart";
    heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
    heart.style.left = `${Math.random() * 95}vw`;
    const size = Math.random() * 1.2 + 0.8;
    heart.style.fontSize = `${size}rem`;
    heart.style.animationDuration = `${Math.random() * 6 + 8}s`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 14000);
  }
  setInterval(spawnFloatingHeart, 2500);

  // Desktop Cursor Sparkle Trail
  let lastSparkleTime = 0;
  window.addEventListener("mousemove", (e) => {
    if (!state.fxEnabled || state.reducedMotion) return;
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }

    const now = Date.now();
    if (now - lastSparkleTime > 65) {
      lastSparkleTime = now;
      createCursorSparkle(e.clientX, e.clientY);
    }
  });

  function createCursorSparkle(x, y) {
    if (!sparkleContainer) return;
    const sparkle = document.createElement("div");
    sparkle.className = "cursor-sparkle";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    const size = Math.random() * 7 + 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    const colors = ["#ff3385", "#d8b4fe", "#fcd34d", "#fff"];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.background = chosenColor;
    sparkle.style.boxShadow = `0 0 8px ${chosenColor}`;
    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 700);
  }

  /* ==========================================================================
     5. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  let toastTimeout = null;
  function showToast(message, icon = "fa-heart") {
    if (!toastNotify) return;
    clearTimeout(toastTimeout);
    toastNotify.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toastNotify.classList.add("show");
    toastTimeout = setTimeout(() => {
      toastNotify.classList.remove("show");
    }, 3800);
  }

  /* ==========================================================================
     6. ROMANTIC MUSIC PLAYER & SYNTHESIZER FALLBACK
     ========================================================================== */
  // Fallback Web Audio API Synthesizer (plays a soft romantic lullaby chime if music.mp3 is absent)
  let audioCtx = null;
  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  const romanticChords = [
    [261.63, 329.63, 392.0, 523.25], // C major
    [220.0, 261.63, 329.63, 440.0], // A minor
    [174.61, 220.0, 261.63, 349.23], // F major
    [196.0, 246.94, 293.66, 392.0], // G major
  ];
  let chordIndex = 0;

  function playSynthArpeggio() {
    if (
      !audioCtx ||
      !state.usingSynthMusic ||
      !state.isPlayingMusic ||
      state.isMuted
    )
      return;
    const chord = romanticChords[chordIndex % romanticChords.length];
    chordIndex++;

    chord.forEach((freq, idx) => {
      setTimeout(() => {
        if (!state.isPlayingMusic || state.isMuted) return;
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

          const vol = parseFloat(volumeSlider.value) * 0.12;
          gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(
            vol,
            audioCtx.currentTime + 0.1,
          );
          gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioCtx.currentTime + 1.4,
          );

          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 1.5);
        } catch (e) {
          // ignore synth audio context edge cases
        }
      }, idx * 280);
    });
  }

  function startSynthMusic() {
    state.usingSynthMusic = true;
    state.isPlayingMusic = true;
    playerDisc.classList.add("playing");
    musicIcon.className = "fa-solid fa-pause";
    playerStatus.textContent = "Playing Romantic Melody";
    playerDuration.textContent = "∞:∞";
    showToast(
      "Playing romantic chime! Add your music.mp3 to hear your custom song 🎵",
      "fa-music",
    );

    if (!state.synthInterval) {
      playSynthArpeggio();
      state.synthInterval = setInterval(playSynthArpeggio, 2400);
    }
  }

  function stopSynthMusic() {
    state.usingSynthMusic = false;
    state.isPlayingMusic = false;
    playerDisc.classList.remove("playing");
    musicIcon.className = "fa-solid fa-play";
    playerStatus.textContent = "Paused";
    if (state.synthInterval) {
      clearInterval(state.synthInterval);
      state.synthInterval = null;
    }
  }

  function attemptPlayMusic() {
    initAudioContext();
    if (!bgAudio) return;

    bgAudio.volume = parseFloat(volumeSlider.value);

    // Try playing the real audio file
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          state.isPlayingMusic = true;
          playerDisc.classList.add("playing");
          musicIcon.className = "fa-solid fa-pause";
          playerStatus.textContent = "Playing for Julie";
        })
        .catch((err) => {
          // Browser prevented autoplay or music.mp3 is missing
          console.warn("Audio playback note:", err.message);
          // If file not found or load error, fall back to synthesized soft chime
          if (
            bgAudio.error ||
            bgAudio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE
          ) {
            startSynthMusic();
          } else {
            playerStatus.textContent = "Click to Play";
          }
        });
    }
  }

  function toggleMusic() {
    initAudioContext();
    if (state.usingSynthMusic) {
      if (state.isPlayingMusic) {
        stopSynthMusic();
      } else {
        startSynthMusic();
      }
      return;
    }

    if (!bgAudio) return;

    if (bgAudio.paused) {
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            state.isPlayingMusic = true;
            playerDisc.classList.add("playing");
            musicIcon.className = "fa-solid fa-pause";
            playerStatus.textContent = "Playing for Julie";
          })
          .catch(() => {
            // Fall back to sweet synth chime
            startSynthMusic();
          });
      }
    } else {
      bgAudio.pause();
      state.isPlayingMusic = false;
      playerDisc.classList.remove("playing");
      musicIcon.className = "fa-solid fa-play";
      playerStatus.textContent = "Paused";
    }
  }

  // Audio Event Listeners
  if (bgAudio) {
    bgAudio.addEventListener("error", () => {
      // music.mp3 missing — gracefully switch to synthesized romantic chimes
      if (state.isPlayingMusic) {
        startSynthMusic();
      }
    });

    bgAudio.addEventListener("timeupdate", () => {
      if (bgAudio.duration) {
        const percent = (bgAudio.currentTime / bgAudio.duration) * 100;
        playerProgressFill.style.width = `${percent}%`;
        playerCurrentTime.textContent = formatTime(bgAudio.currentTime);
        playerDuration.textContent = formatTime(bgAudio.duration);
      }
    });

    bgAudio.addEventListener("ended", () => {
      bgAudio.currentTime = 0;
      bgAudio.play();
    });
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  // Seek on click
  if (playerProgressBar && bgAudio) {
    playerProgressBar.addEventListener("click", (e) => {
      if (!bgAudio.duration) return;
      const rect = playerProgressBar.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      bgAudio.currentTime = clickPos * bgAudio.duration;
    });
  }

  // Volume slider
  if (volumeSlider && bgAudio) {
    volumeSlider.addEventListener("input", (e) => {
      const vol = parseFloat(e.target.value);
      bgAudio.volume = vol;
      state.isMuted = vol === 0;
      updateMuteIcon();
    });
  }

  // Mute button
  if (musicMuteBtn && bgAudio) {
    musicMuteBtn.addEventListener("click", () => {
      state.isMuted = !state.isMuted;
      bgAudio.muted = state.isMuted;
      updateMuteIcon();
    });
  }

  function updateMuteIcon() {
    if (state.isMuted || (bgAudio && bgAudio.volume === 0)) {
      muteIcon.className = "fa-solid fa-volume-xmark";
    } else {
      muteIcon.className = "fa-solid fa-volume-high";
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener("click", toggleMusic);
  }

  /* ==========================================================================
     7. THE ROMANTIC INTRODUCTION TRANSITION
     ========================================================================== */
  function enterMainExperience() {
    if (!state.isIntroActive) return;
    state.isIntroActive = false;

    // Start or attempt music
    attemptPlayMusic();

    // Trigger celebration burst
    const rect = openHeartBtn.getBoundingClientRect();
    triggerHeartBurst(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      45,
    );

    // Transition animations
    introScreen.classList.add("hidden");
    document.body.classList.remove("loading-locked");
    mainExperience.classList.remove("hidden");

    // Scroll to envelope smoothly
    setTimeout(() => {
      const envelopeSection = document.getElementById("envelope-section");
      if (envelopeSection) {
        envelopeSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 450);
  }

  if (openHeartBtn) {
    openHeartBtn.addEventListener("click", enterMainExperience);
  }

  if (skipIntroBtn) {
    skipIntroBtn.addEventListener("click", () => {
      enterMainExperience();
      setTimeout(() => {
        const letterArea = document.getElementById("letter-reading-area");
        if (letterArea) {
          letterArea.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    });
  }

  /* ==========================================================================
     8. 3D INTERACTIVE LOVE ENVELOPE
     ========================================================================== */
  function openEnvelope() {
    if (!interactiveEnvelope.classList.contains("opened")) {
      interactiveEnvelope.classList.add("opened");
      const rect = interactiveEnvelope.getBoundingClientRect();
      triggerHeartBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        35,
      );
      showToast("Letter unsealed with all my love 💌", "fa-envelope-open-text");
    }

    // Smooth scroll down to letter reading area
    setTimeout(() => {
      letterReadingArea.scrollIntoView({ behavior: "smooth" });
    }, 700);
  }

  if (interactiveEnvelope) {
    interactiveEnvelope.addEventListener("click", openEnvelope);
    interactiveEnvelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  if (readLetterDirectBtn) {
    readLetterDirectBtn.addEventListener("click", openEnvelope);
  }

  /* ==========================================================================
     9. PROGRESSIVE LOVE LETTER REVEAL
     ========================================================================== */
  function revealNextParagraph() {
    if (state.currentParagraph < state.totalParagraphs) {
      state.currentParagraph++;
      const nextP = document.querySelector(
        `.letter-p[data-paragraph="${state.currentParagraph}"]`,
      );
      if (nextP) {
        nextP.classList.add("active");

        // Update progress
        const percent = Math.round(
          (state.currentParagraph / state.totalParagraphs) * 100,
        );
        letterReadProgress.style.width = `${percent}%`;
        readingCounterText.textContent = `Part ${state.currentParagraph} of ${state.totalParagraphs}`;

        // Soft heart burst on button
        const rect = continueReadingBtn.getBoundingClientRect();
        triggerHeartBurst(rect.left + rect.width / 2, rect.top, 16);

        // Gentle scroll to newly opened paragraph
        nextP.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      // Check if finished
      if (state.currentParagraph === state.totalParagraphs) {
        continueReadingBtn.classList.add("hidden");
        readAgainBtn.classList.remove("hidden");

        // Big heart burst
        const rect = readAgainBtn.getBoundingClientRect();
        triggerHeartBurst(rect.left + rect.width / 2, rect.top, 50, "#ff3385");
        showToast("I love you endlessly, my baby Julie! 💖", "fa-heart");
      }
    }
  }

  function resetLetterReading() {
    state.currentParagraph = 1;
    letterParagraphs.forEach((p, index) => {
      if (index === 0) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });

    letterReadProgress.style.width = "9%";
    readingCounterText.textContent = `Part 1 of ${state.totalParagraphs}`;
    continueReadingBtn.classList.remove("hidden");
    readAgainBtn.classList.add("hidden");

    letterReadingArea.scrollIntoView({ behavior: "smooth" });
    showToast("Reading again with you, palangga ko 💕", "fa-book-open-reader");
  }

  if (continueReadingBtn) {
    continueReadingBtn.addEventListener("click", revealNextParagraph);
  }

  if (readAgainBtn) {
    readAgainBtn.addEventListener("click", resetLetterReading);
  }

  /* ==========================================================================
     10. OUR MEMORIES PHOTO GALLERY & LIGHTBOX
     ========================================================================== */
  // Graceful Image Fallback for Missing Photos
  function setupImageFallbacks() {
    const images = document.querySelectorAll(".gallery-img");
    images.forEach((img, idx) => {
      img.addEventListener("error", () => {
        const parentFrame = img.parentElement;
        if (!parentFrame) return;
        img.style.display = "none";

        const fallback = document.createElement("div");
        fallback.className = "fallback-photo-svg";
        fallback.innerHTML = `
          <i class="fa-solid fa-heart-pulse"></i>
          <h5 style="color:#fff; margin-bottom:4px;">Our Precious Memory</h5>
          <span>Add your photo to: <code>images/julie${idx + 1}.jpg</code></span>
        `;
        parentFrame.appendChild(fallback);
      });
    });
  }
  setupImageFallbacks();

  // Gallery Card Click
  const memoryCards = document.querySelectorAll(".memory-card");
  memoryCards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    state.galleryIndex = index;
    const item = galleryItems[index];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = `Photo ${index + 1} of ${galleryItems.length}`;

    // Handle lightbox fallback if image fails
    lightboxImg.onerror = () => {
      lightboxImg.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="%231b0833" width="600" height="400"/><text fill="%23ff3385" x="50%" y="45%" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold">Our Precious Memory</text><text fill="%23e9d5ff" x="50%" y="60%" text-anchor="middle" font-family="sans-serif" font-size="16">Place your picture in images/julie' +
        (index + 1) +
        ".jpg</text></svg>";
    };

    galleryLightbox.classList.add("active");
    triggerHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 22);
  }

  function closeLightbox() {
    galleryLightbox.classList.remove("active");
  }

  function nextLightbox() {
    state.galleryIndex = (state.galleryIndex + 1) % galleryItems.length;
    openLightbox(state.galleryIndex);
  }

  function prevLightbox() {
    state.galleryIndex =
      (state.galleryIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(state.galleryIndex);
  }

  if (lightboxCloseBtn)
    lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxBackdrop)
    lightboxBackdrop.addEventListener("click", closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener("click", nextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener("click", prevLightbox);

  /* ==========================================================================
     11. CLICKABLE LOVE TOKENS ("Little Things I Want You to Know")
     ========================================================================== */
  const reasonButtons = document.querySelectorAll(".reason-btn");
  reasonButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const reasonId = btn.getAttribute("data-reason");
      const data = reasonsData[reasonId];
      if (!data) return;

      reasonModalIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
      reasonModalTitle.textContent = data.title;
      reasonModalBody.textContent = data.body;

      const rect = btn.getBoundingClientRect();
      triggerHeartBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        25,
      );

      reasonModal.classList.add("active");
    });
  });

  function closeReasonModal() {
    reasonModal.classList.remove("active");
  }

  if (reasonCloseBtn)
    reasonCloseBtn.addEventListener("click", closeReasonModal);
  if (reasonBackdrop)
    reasonBackdrop.addEventListener("click", closeReasonModal);

  /* ==========================================================================
     12. OUR LOVE TIMELINE (Dynamic Rendering)
     ========================================================================== */
  function renderTimeline() {
    if (!timelineItemsWrap) return;
    timelineItemsWrap.innerHTML = "";

    timelineData.forEach((item, idx) => {
      const isLeft = idx % 2 === 0;
      const itemEl = document.createElement("div");
      itemEl.className = `timeline-item ${isLeft ? "left" : "right"}`;

      itemEl.innerHTML = `
        <div class="timeline-node" title="${item.title}"></div>
        <div class="timeline-card glass-card glowing-border">
          <span class="timeline-date"><i class="fa-solid ${item.icon}"></i> ${item.date}</span>
          <h3 class="timeline-title">${item.title}</h3>
          <p class="timeline-desc">${item.desc}</p>
        </div>
      `;

      // Hover / Click sparkle
      itemEl.addEventListener("click", (e) => {
        const rect = itemEl.getBoundingClientRect();
        triggerHeartBurst(rect.left + rect.width / 2, rect.top + 20, 15);
      });

      timelineItemsWrap.appendChild(itemEl);
    });
  }
  renderTimeline();

  /* ==========================================================================
     13. THE LOVE QUESTION
     ========================================================================== */
  const responseReplies = {
    always: {
      title: "My Heart is Overflowing! 💖",
      text: "Hearing you say yes makes my entire universe glow, Julie! You are my forever choice, my sweetest prayer, and my only home. Palangga ta gid ka subra!",
    },
    million: {
      title: "A Million Times Over! 🥰",
      text: "Even in a million lifetimes and across a million stars, I would search for you, find you, and ask God for you every single time. You are my greatest blessing, baby!",
    },
    twice: {
      title: "You Can Choose Me Every Single Second! 😉",
      text: "I would let you choose me a thousand times over, baby! As long as every choice ends with you in my arms and God in our hearts. Forever yours!",
    },
  };

  questionButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const choice = btn.getAttribute("data-choice");
      const data = responseReplies[choice];
      if (!data) return;

      responseTitle.textContent = data.title;
      responseText.textContent = data.text;
      questionResponseBox.classList.remove("hidden");

      const rect = btn.getBoundingClientRect();
      triggerHeartBurst(rect.left + rect.width / 2, rect.top, 50, "#ff3385");
      showToast("My heart is dancing for you, Julie! 💃💖", "fa-heart-pulse");
    });
  });

  /* ==========================================================================
     14. A SECRET LOVE LETTER
     ========================================================================== */
  if (secretBtn) {
    secretBtn.addEventListener("click", (e) => {
      const rect = secretBtn.getBoundingClientRect();
      triggerHeartBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        40,
        "#fcd34d",
      );
      secretModal.classList.add("active");
    });
  }

  function closeSecretModal() {
    secretModal.classList.remove("active");
  }

  if (secretCloseBtn)
    secretCloseBtn.addEventListener("click", closeSecretModal);
  if (secretBackdrop)
    secretBackdrop.addEventListener("click", closeSecretModal);

  /* ==========================================================================
     15. A FINAL ROMANTIC SURPRISE
     ========================================================================== */
  if (lastSurpriseBtn) {
    lastSurpriseBtn.addEventListener("click", (e) => {
      const rect = lastSurpriseBtn.getBoundingClientRect();
      triggerHeartBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        70,
      );
      surpriseModal.classList.add("active");
    });
  }

  function closeSurpriseModal() {
    surpriseModal.classList.remove("active");
  }

  if (surpriseCloseBtn)
    surpriseCloseBtn.addEventListener("click", closeSurpriseModal);
  if (surpriseBackdrop)
    surpriseBackdrop.addEventListener("click", closeSurpriseModal);

  if (celebrateAgainBtn) {
    celebrateAgainBtn.addEventListener("click", (e) => {
      const rect = celebrateAgainBtn.getBoundingClientRect();
      triggerHeartBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        60,
        "#ff3385",
      );
      showToast("Love sent straight to heaven for Julie! 🕊️💖", "fa-sparkles");
    });
  }

  /* ==========================================================================
     16. GLOBAL KEYBOARD ACCESSIBILITY (ESC TO CLOSE ANY MODAL)
     ========================================================================== */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      closeReasonModal();
      closeSecretModal();
      closeSurpriseModal();
    } else if (
      e.key === "ArrowRight" &&
      galleryLightbox.classList.contains("active")
    ) {
      nextLightbox();
    } else if (
      e.key === "ArrowLeft" &&
      galleryLightbox.classList.contains("active")
    ) {
      prevLightbox();
    }
  });

  /* ==========================================================================
     17. VISUAL CONTROLS (PARTICLES TOGGLE & REDUCED MOTION)
     ========================================================================== */
  if (toggleFxBtn) {
    toggleFxBtn.addEventListener("click", () => {
      state.fxEnabled = !state.fxEnabled;
      document.body.classList.toggle("fx-disabled", !state.fxEnabled);
      toggleFxBtn.setAttribute("aria-pressed", state.fxEnabled.toString());
      showToast(
        state.fxEnabled
          ? "Magical particles enabled ✨"
          : "Particles paused 💤",
        "fa-wand-magic-sparkles",
      );
    });
  }

  if (toggleMotionBtn) {
    toggleMotionBtn.addEventListener("click", () => {
      state.reducedMotion = !state.reducedMotion;
      document.body.classList.toggle("reduced-motion", state.reducedMotion);
      toggleMotionBtn.setAttribute(
        "aria-pressed",
        state.reducedMotion.toString(),
      );
      showToast(
        state.reducedMotion
          ? "Gentle motion mode enabled 🌸"
          : "Standard motion restored 💫",
        "fa-feather",
      );
    });
  }

  /* ==========================================================================
     18. FLOATING NAVIGATION ACTIVE LINK HIGHLIGHT ON SCROLL
     ========================================================================== */
  const navLinks = document.querySelectorAll(".nav-link");
  const observedSections = document.querySelectorAll("section[id], footer[id]");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 200;

    observedSections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${currentId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });

  /* ==========================================================================
     19. INITIALIZATION
     ========================================================================== */
  initAmbientCanvas();
  generateStars(85);
  generatePetals(18);

  // Initial user gesture listener to unlock audio if needed
  const unlockAudioOnGesture = () => {
    initAudioContext();
    window.removeEventListener("click", unlockAudioOnGesture);
    window.removeEventListener("touchstart", unlockAudioOnGesture);
  };
  window.addEventListener("click", unlockAudioOnGesture, { once: true });
  window.addEventListener("touchstart", unlockAudioOnGesture, { once: true });
});
