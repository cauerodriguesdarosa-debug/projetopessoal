

const introOverlay = document.getElementById('introOverlay');
if (introOverlay) {
  document.body.classList.add('intro-lock');

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.remove('intro-lock');
      document.body.classList.add('intro-done');
    }, 9250);
  });

  introOverlay.addEventListener('click', () => {
    document.body.classList.remove('intro-lock');
    document.body.classList.add('intro-done');
  });
}

const cursorLight = document.querySelector('#cursorLight');
const revealElements = document.querySelectorAll('[data-reveal]');
const soundBtn = document.querySelector('#soundBtn');
const musicCurrent = document.querySelector('#musicCurrent');
const musicPrev = document.querySelector('#musicPrev');
const musicNext = document.querySelector('#musicNext');
const vinylPlayer = document.querySelector('#vinylPlayer');
const vinylPlayIcon = document.querySelector('#vinylPlayIcon');
const nowPlaying = document.querySelector('#nowPlaying');
const bgMusic = document.querySelector('#bgMusic');

const musicTracks = [
  { title: 'Trees...', src: 'assets/audio/OMORI OST - 012 Trees... - (320 Kbps).mp3' },
  { title: 'WHITE SPACE', src: 'assets/audio/OMORI OST - 002 WHITE SPACE [Extended] [ZzaSOis0_VU].mp3' },
  { title: 'By Your Side', src: 'assets/audio/faraway-park-theme.mp3' },
  { title: 'Bargain Bin Boys', src: 'assets/audio/hobbeez-theme.mp3' },
  { title: 'Spaces In-between', src: 'assets/audio/OMORI OST - 004 Spaces In-between [ljAyy-dhAz0](1).mp3' },
  { title: 'Dear Little Brother', src: 'assets/audio/OMORI OST - 092 Dear Little Brother.mp3' },
  { title: 'Tussle Among Trees', src: 'assets/audio/OMORI OST - 015 Tussle Among Trees.mp3' },
  { title: 'A Home For Flowers (Tulip)', src: 'assets/audio/OMORI OST - 013 A Home For Flowers (Tulip) [u2xW23u4qEY].mp3' },
  { title: 'Finding Shapes in the Clouds', src: 'assets/audio/OMORI OST - 043 Finding Shapes in the Clouds [uF9xZPwaIUY].mp3' },
  { title: "Sweetheart's Quest for Hearts", src: "assets/audio/OMORI OST - 077 Sweetheart's Quest for Hearts [FgXOBL1cdIA].mp3" },
  { title: 'Welcome Again.', src: 'assets/audio/OMORI OST - 131 Welcome Again. [gAWLivIzTKc].mp3' },
  { title: 'Fleur', src: 'assets/audio/OMORI OST - 132 Fleur [_1hnWBULqR4].mp3' },
  { title: 'A Home For Flowers (Daisy)', src: 'assets/audio/OMORI OST - 158 A Home For Flowers (Daisy) [9n6pcfsA3Yo].mp3' },
  { title: 'Crossroads', src: 'assets/audio/OMORI OST - 163 Crossroads [5s-1dej9Gsc].mp3' },
  { title: 'A Home For Flowers (Sunflower)', src: 'assets/audio/OMORI OST - 165 A Home For Flowers (Sunflower) [v6ofxD4fLms].mp3' },
  { title: 'You Must Carry On.', src: 'assets/audio/OMORI OST - 166 You Must Carry On. [ewvhlYh9wC0].mp3' },
  { title: 'OMORI', src: 'assets/audio/OMORI OST - 168 OMORI.mp3' }
];

let shuffledTracks = [...musicTracks];
let currentTrackIndex = 0;

for (let i = shuffledTracks.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffledTracks[i], shuffledTracks[j]] = [shuffledTracks[j], shuffledTracks[i]];
}

const mewoBtn = document.querySelector('#mewoBtn');
const mewoMessage = document.querySelector('#mewoMessage');
const emotionCards = document.querySelectorAll('.emotion-card');
const somethingCard = document.querySelector('#somethingCard');
const characterGrid = document.querySelector('.character-grid');
const somethingMessage = document.querySelector('#somethingMessage');
const basilCard = document.querySelector('#basilCard');
const basilImage = document.querySelector('#basilImage');
const basilDescription = document.querySelector('#basilDescription');

const mewoAudio = new Audio('assets/audio/omori-meow.mp3');
const somethingAudio = new Audio('assets/audio/something-sound-effect-omori.mp3');
const textboxAudio = new Audio('assets/audio/Talking (Text Box) _ OMORI SFX [kc4WYXwDgV4].mp3');

somethingAudio.volume = .75;
textboxAudio.volume = .42;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .18 });

revealElements.forEach((element) => observer.observe(element));

document.addEventListener('mousemove', (event) => {
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

const musicVolumeRules = [
  { match: 'Tussle Among Trees', volume: .12 },
  { match: 'WHITE SPACE', volume: .10 },
  { match: 'white-space-ost', volume: .10 },
  { match: 'hobbeez-theme', volume: .12 },
  { match: 'Bargain Bin Boys', volume: .12 }
];

function getMusicVolume(src) {
  const rule = musicVolumeRules.find((item) => src.includes(item.match));
  return rule ? rule.volume : .22;
}

function updateNowPlaying() {
  const track = shuffledTracks[currentTrackIndex];
  musicCurrent.textContent = track.title;
  nowPlaying.hidden = false;
}

function updatePlayerState() {
  const isPlaying = !bgMusic.paused;
  vinylPlayer.classList.toggle('is-playing', isPlaying);
  vinylPlayIcon.textContent = isPlaying ? '❚❚' : '▶';
  soundBtn.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Tocar música');
}

function setMusic(src, { autoplay = false } = {}) {
  if (!src) return;

  bgMusic.src = src;
  bgMusic.volume = getMusicVolume(src);
  updateNowPlaying();

  if (autoplay) {
    bgMusic.play().catch(() => {});
  }

  updatePlayerState();
}

function playTrack(index, autoplay = true) {
  currentTrackIndex = (index + shuffledTracks.length) % shuffledTracks.length;
  const track = shuffledTracks[currentTrackIndex];
  bgMusic.pause();
  bgMusic.currentTime = 0;
  setMusic(track.src, { autoplay });
}

function nextTrack() {
  playTrack(currentTrackIndex + 1, true);
}

function previousTrack() {
  playTrack(currentTrackIndex - 1, true);
}

soundBtn.addEventListener('click', async () => {
  try {
    if (bgMusic.paused) {
      if (!bgMusic.src) playTrack(currentTrackIndex, false);
      await bgMusic.play();
    } else {
      bgMusic.pause();
    }
    updatePlayerState();
  } catch (error) {
    vinylPlayIcon.textContent = '▶';
  }
});

musicPrev.addEventListener('click', (event) => {
  event.stopPropagation();
  previousTrack();
});

musicNext.addEventListener('click', (event) => {
  event.stopPropagation();
  nextTrack();
});

bgMusic.addEventListener('play', updatePlayerState);
bgMusic.addEventListener('pause', updatePlayerState);
bgMusic.addEventListener('ended', nextTrack);

// A primeira faixa é aleatória, mas não começa sozinha para respeitar o bloqueio
// de reprodução automática dos navegadores.
playTrack(0, false);

let mewoClicks = 0;
let mewoVisible = false;

mewoBtn.addEventListener('click', () => {
  mewoAudio.currentTime = 0;
  mewoAudio.play().catch(() => {});
  mewoClicks++;

  if (mewoVisible) return;

  if (mewoClicks >= 3) {
    mewoVisible = true;
    mewoClicks = 0;
    mewoMessage.classList.add('show');

    setTimeout(() => {
      mewoMessage.classList.remove('show');
      setTimeout(() => {
        mewoVisible = false;
      }, 400);
    }, 3200);
  }
});

const emotionThemeClasses = [
  'emotion-theme-happy',
  'emotion-theme-sad',
  'emotion-theme-angry',
  'emotion-theme-neutral'
];

function clearEmotionThemes() {
  document.body.classList.remove(...emotionThemeClasses);
}

emotionCards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    clearEmotionThemes();
    document.body.classList.add(`emotion-theme-${card.dataset.emotion}`);
  });

  card.addEventListener('mouseleave', clearEmotionThemes);

  card.addEventListener('click', () => {
    clearEmotionThemes();
    document.body.classList.add(`emotion-theme-${card.dataset.emotion}`);
    setTimeout(clearEmotionThemes, 1600);
  });
});

const somethingLine = '. . .';
const normalBasilImage = 'assets/images/basil.gif';
const scaredBasilImage = 'assets/images/scaredbasil.webp';
const normalBasilDescription = 'Sensível e reservado, guarda memórias decisivas para o desenrolar da história.';

function updateBasilForSomething() {
  if (!basilCard || !basilImage || !basilDescription) return;

  basilCard.classList.toggle('basil-something-mode', somethingIsPresent);
  basilImage.src = somethingIsPresent ? scaredBasilImage : normalBasilImage;
  basilImage.alt = somethingIsPresent ? 'Basil assustado' : 'Basil';
  basilDescription.textContent = normalBasilDescription;
}
let typingNow = false;
let somethingIsPresent = false;

function showSomethingRarely() {
  if (!somethingCard || !somethingMessage) return;

  // A existência do card é decidida uma única vez por carregamento.
  // Em 90% dos carregamentos ele simplesmente não aparece.
  somethingIsPresent = Math.random() < 0.10;
  somethingCard.classList.toggle('something-absent', !somethingIsPresent);
  somethingCard.classList.toggle('something-present', somethingIsPresent);
  updateBasilForSomething();
  if (characterGrid) characterGrid.classList.toggle('something-missing', !somethingIsPresent);

  if (!somethingIsPresent) {
    somethingMessage.classList.remove('typing', 'fade-out', 'something-visible');
    return;
  }

  somethingMessage.textContent = somethingLine;
  somethingMessage.classList.remove('fade-out');
}

function triggerSomething() {
  if (!somethingIsPresent || !somethingMessage || typingNow) return;

  typingNow = true;
  somethingAudio.currentTime = 0;
  somethingAudio.play().catch(() => {});
  somethingMessage.textContent = somethingLine;
  somethingMessage.classList.remove('fade-out');
  somethingMessage.classList.add('typing', 'something-visible');

  window.setTimeout(() => {
    somethingMessage.classList.add('fade-out');
    somethingMessage.classList.remove('typing', 'something-visible');
    typingNow = false;
  }, 1100);
}

if (somethingCard) {
  somethingCard.addEventListener('click', triggerSomething);
}

// A aparição é decidida novamente a cada abertura/refresh da página.
window.addEventListener('load', () => {
  setTimeout(showSomethingRarely, 450);
});



window.addEventListener('scroll', () => {
  document.body.classList.toggle('is-scrolled', window.scrollY > 18);
});


function splitAnimatedTitleLetters() {
  const targets = document.querySelectorAll('.hero h1:not(#mainOmoriTitle), .soft-glitch-title, .something-card h3');

  targets.forEach((element) => {
    if (element.dataset.splitDone === 'true') return;

    const originalText = element.textContent;
    element.setAttribute('aria-label', originalText.trim());
    element.dataset.splitDone = 'true';
    element.classList.add('letter-wave');

    const fragment = document.createDocumentFragment();

    [...originalText].forEach((char) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = char === ' ' ? '\u00A0' : char;
      fragment.appendChild(span);
    });

    element.textContent = '';
    element.appendChild(fragment);
  });
}

splitAnimatedTitleLetters();


/* v34: efeito de estrelas viajando no espaço */
(() => {
  const canvas = document.getElementById("starfield");
  if (!canvas || canvas.dataset.ready === "true") return;
  canvas.dataset.ready = "true";

  const ctx = canvas.getContext("2d", { alpha: false });
  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;
  let stars = [];
  const STAR_COUNT = 620;
  const DEPTH = 1200;
  const SPEED = 2.1;

  function resizeStarfield() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function resetStar(star, far = false) {
    const spread = Math.max(width, height) * 1.25;
    star.x = (Math.random() - 0.5) * spread;
    star.y = (Math.random() - 0.5) * spread;
    star.z = far ? Math.random() * DEPTH + 1 : DEPTH;
    star.prevX = null;
    star.prevY = null;
  }

  function createStars() {
    stars = Array.from({ length: STAR_COUNT }, () => {
      const star = {};
      resetStar(star, true);
      return star;
    });
  }

  function drawStarfield() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    for (const star of stars) {
      star.z -= SPEED;

      if (star.z <= 1) {
        resetStar(star);
        continue;
      }

      const scale = 260 / star.z;
      const x = centerX + star.x * scale;
      const y = centerY + star.y * scale;

      if (x < -80 || x > width + 80 || y < -80 || y > height + 80) {
        resetStar(star);
        continue;
      }

      const progress = 1 - star.z / DEPTH;
      const size = Math.max(0.7, progress * 3.8);
      const opacity = Math.min(1, 0.18 + progress * 1.2);

      ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.lineWidth = size;

      if (star.prevX !== null && progress > 0.18) {
        ctx.beginPath();
        ctx.moveTo(star.prevX, star.prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      star.prevX = x;
      star.prevY = y;
    }

    requestAnimationFrame(drawStarfield);
  }

  resizeStarfield();
  createStars();
  window.addEventListener("resize", () => {
    resizeStarfield();
    createStars();
  });

  drawStarfield();
})();


/* v45 - Eventos da lâmpada e do espelho do Espaço Branco */
(() => {
  const lightbulbButton = document.getElementById('white-space-lightbulb');
  const lightbulbModal = document.getElementById('lightbulb-modal');
  const lightbulbClose = document.getElementById('lightbulb-close');
  const lightbulbDialogText = document.getElementById('lightbulb-dialog-text');

  const footerMirror = document.getElementById('footer-mirror');
  const mirrorModal = document.getElementById('mirror-modal');
  const mirrorClose = document.getElementById('mirror-close');
  const mirrorView = document.getElementById('mirror-view');
  const mirrorDialog = document.getElementById('mirror-dialog');
  const mirrorDialogText = document.getElementById('mirror-dialog-text');

  const talkingAudio = new Audio('assets/audio/Talking (Text Box) _ OMORI SFX [kc4WYXwDgV4].mp3');
  talkingAudio.loop = true;
  talkingAudio.volume = 0.42;

  const mirrorJumpscareAudio = new Audio('assets/audio/something-sound-effect-omori.mp3');
  mirrorJumpscareAudio.loop = false;
  mirrorJumpscareAudio.volume = 0.72;

  let activeTyping = null;
  let lightbulbOpen = false;
  let mirrorOpen = false;

  function stopTyping() {
    clearInterval(activeTyping);
    activeTyping = null;
    talkingAudio.pause();
    talkingAudio.currentTime = 0;
  }

  function typeText(target, text, onDone) {
    if (!target) return;
    stopTyping();
    target.textContent = '';
    let index = 0;

    talkingAudio.currentTime = 0;
    talkingAudio.play().catch(() => {});

    activeTyping = setInterval(() => {
      target.textContent += text[index] || '';
      index++;

      if (index > text.length) {
        stopTyping();
        if (typeof onDone === 'function') onDone();
      }
    }, 45);
  }

  function closeLightbulb() {
    if (!lightbulbModal) return;
    lightbulbModal.classList.remove('show');
    lightbulbModal.setAttribute('aria-hidden', 'true');
    lightbulbOpen = false;
    if (lightbulbDialogText) lightbulbDialogText.textContent = '';
    stopTyping();
  }

  function openLightbulb() {
    if (!lightbulbModal || lightbulbOpen) return;
    lightbulbOpen = true;
    lightbulbModal.classList.add('show');
    lightbulbModal.setAttribute('aria-hidden', 'false');
    typeText(lightbulbDialogText, 'É escuro como breu por dentro, você não consegue ver nada.', () => {
      setTimeout(closeLightbulb, 650);
    });
  }

  function closeMirror() {
    if (!mirrorModal) return;
    mirrorModal.classList.remove('show');
    mirrorModal.setAttribute('aria-hidden', 'true');
    mirrorOpen = false;
    if (mirrorDialogText) mirrorDialogText.textContent = '';
    stopTyping();
    mirrorJumpscareAudio.pause();
    mirrorJumpscareAudio.currentTime = 0;
  }

  function restartMirrorImage(src) {
    if (!mirrorView) return;
    mirrorView.src = '';
    requestAnimationFrame(() => {
      mirrorView.src = `${src}?restart=${Date.now()}`;
    });
  }

  function openMirror() {
    if (!mirrorModal || mirrorOpen) return;
    mirrorOpen = true;
    mirrorModal.classList.add('show');
    mirrorModal.setAttribute('aria-hidden', 'false');

    const isJumpscare = Math.random() < 0.05;

    if (isJumpscare) {
      if (mirrorDialog) mirrorDialog.classList.add('hidden');
      restartMirrorImage('assets/images/mirror_jumpscare.webp');
      mirrorJumpscareAudio.currentTime = 0;
      mirrorJumpscareAudio.play().catch(() => {});
    } else {
      if (mirrorDialog) mirrorDialog.classList.remove('hidden');
      restartMirrorImage('assets/images/mirror.webp');
      typeText(mirrorDialogText, 'Um espelho flutuante.\nSeus amigos sorriem calorosamente atrás de você.');
    }
  }

  mirrorJumpscareAudio.addEventListener('ended', closeMirror);

  lightbulbButton?.addEventListener('click', openLightbulb);
  lightbulbClose?.addEventListener('click', closeLightbulb);
  lightbulbModal?.addEventListener('click', (event) => {
    if (event.target === lightbulbModal) closeLightbulb();
  });

  footerMirror?.addEventListener('click', openMirror);
  mirrorClose?.addEventListener('click', closeMirror);
  mirrorModal?.addEventListener('click', (event) => {
    if (event.target === mirrorModal) closeMirror();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (lightbulbModal?.classList.contains('show')) closeLightbulb();
    if (mirrorModal?.classList.contains('show')) closeMirror();
  });
})();


// Abre/fecha os cards de Lugares Estranhos dentro da seção Mundos
(() => {
  const strangeBtn = document.getElementById('strangePlacesBtn');
  const strangePanel = document.getElementById('strangeAreasPanel');
  if (!strangeBtn || !strangePanel) return;

  strangeBtn.addEventListener('click', () => {
    const isOpen = strangePanel.classList.toggle('is-open');
    strangeBtn.classList.toggle('is-active', isOpen);
    strangeBtn.setAttribute('aria-expanded', String(isOpen));
    strangePanel.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      setTimeout(() => {
        strangePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 120);
    }
  });
})();


const cutscene = [
  { src: "assets/images/marihanging.webp", time: 3500, className: "cs-fade" },
  { src: "assets/images/omoriwake.webp", time: 3500, className: "cs-fade" },
  { src: "assets/images/omorimirror2.webp", time: 3000, className: "cs-cut" },
  { src: "assets/images/sunnyscared.png", time: 3000, className: "cs-cut" },
  { src: "assets/images/omorimirror(1).webp", time: 3500, className: "cs-fade" },
  { src: null, time: 2400, className: "cs-black" },
  { src: "assets/images/Basil.webp", time: 3200, className: "cs-fade" },
  { src: "assets/images/basileye.webp", time: 3200, className: "cs-fade" }
];

const overlay = document.getElementById("introOverlay");
const stage = document.getElementById("csStage");

function showFrame(frame){
  stage.className = "cs-stage " + (frame.className || "");
  stage.innerHTML = "";

  if(frame.src){
    const img = document.createElement("img");
    img.src = frame.src;
    img.className = "cs-img";
    stage.appendChild(img);
  }
}

function startCutscene(){
  let i = 0;

  function next(){
    if(i >= cutscene.length){
      endCutscene();
      return;
    }
    showFrame(cutscene[i]);
    setTimeout(() => {
      i++;
      next();
    }, cutscene[i].time);
  }

  next();
}

function endCutscene(){
  overlay.classList.add("done");
  document.body.classList.add("intro-done");

  // scroll to OMORI title
  const title = document.querySelector("h1");
  if(title){
    title.scrollIntoView({behavior:"smooth", block:"center"});
  }

  setTimeout(()=>{
    document.body.classList.add("page-reveal");
  }, 800);
}

window.addEventListener("load", () => {
  document.body.classList.add("intro-lock");
  startCutscene();
});

