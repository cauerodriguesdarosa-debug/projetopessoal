const cursorLight = document.getElementById('cursorLight');
const mewoBtn = document.getElementById('mewoBtn');
const mewoMessage = document.getElementById('mewoMessage');
const mewoAudio = document.getElementById('mewoAudio');
const textboxAudio = document.getElementById('textboxAudio');
const whiteLamp = document.getElementById('whiteLamp');
const modal = document.getElementById('lightbulb-modal');
const closeBtn = document.getElementById('lightbulb-close');
const dialogText = document.getElementById('lightbulb-dialog-text');

if (textboxAudio) textboxAudio.volume = 0.35;
if (mewoAudio) mewoAudio.volume = 0.55;

document.addEventListener('mousemove', (event) => {
  if (!cursorLight) return;
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

let mewoClicks = 0;
let mewoVisible = false;
mewoBtn?.addEventListener('click', () => {
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
      mewoVisible = false;
    }, 3200);
  }
});

let typingTimer = null;
function stopTyping() {
  if (typingTimer) clearTimeout(typingTimer);
  typingTimer = null;
  textboxAudio?.pause();
  if (textboxAudio) textboxAudio.currentTime = 0;
}

function typeText(text) {
  stopTyping();
  if (!dialogText) return;
  dialogText.textContent = '';
  let i = 0;
  textboxAudio.currentTime = 0;
  textboxAudio.play().catch(() => {});
  const step = () => {
    dialogText.textContent += text[i] || '';
    i++;
    if (i <= text.length) {
      typingTimer = setTimeout(step, 38);
    } else {
      setTimeout(() => textboxAudio.pause(), 120);
    }
  };
  step();
}

function openModal() {
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  typeText('É escuro como breu por dentro, você não consegue ver nada.');
}

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  if (dialogText) dialogText.textContent = '';
  stopTyping();
}

whiteLamp?.addEventListener('click', openModal);
closeBtn?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});


const bgMusic = document.getElementById('bgMusic');
const whiteMusicSelect = document.getElementById('whiteMusicSelect');
const whiteSoundBtn = document.getElementById('whiteSoundBtn');



function setWhiteSpaceMusic(src) {
  if (!bgMusic) return;
  if (!src) {
    bgMusic.pause();
    bgMusic.removeAttribute('src');
    if (whiteSoundBtn) {
      whiteSoundBtn.classList.remove('is-playing');
      whiteSoundBtn.textContent = '▶';
    }
    return;
  }

  const wasPlaying = !!bgMusic.src && !bgMusic.paused;
  bgMusic.src = src;
  bgMusic.volume = getWhiteSpaceMusicVolume(src);

  if (wasPlaying) {
    bgMusic.play().catch(() => {});
  }
}

whiteMusicSelect?.addEventListener('change', () => {
  setWhiteSpaceMusic(whiteMusicSelect.value);
});

whiteSoundBtn?.addEventListener('click', async () => {
  if (!bgMusic.src && whiteMusicSelect?.value) {
    setWhiteSpaceMusic(whiteMusicSelect.value);
  }

  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      whiteSoundBtn.classList.add('is-playing');
      whiteSoundBtn.textContent = '❚❚';
    } else {
      bgMusic.pause();
      whiteSoundBtn.classList.remove('is-playing');
      whiteSoundBtn.textContent = '▶';
    }
  } catch (error) {
    whiteSoundBtn.textContent = 'erro';
  }
});

bgMusic?.addEventListener('ended', () => {
  if (!whiteSoundBtn) return;
  whiteSoundBtn.classList.remove('is-playing');
  whiteSoundBtn.textContent = '▶';
});

if (whiteMusicSelect?.value) {
  setWhiteSpaceMusic(whiteMusicSelect.value);
}


function splitWhiteTitles() {
  const targets = document.querySelectorAll('.soft-glitch-title');

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

splitWhiteTitles();

window.addEventListener('scroll', () => {
  document.body.classList.toggle('is-scrolled', window.scrollY > 18);
});

const redHandsImage = document.getElementById('redHandsImage');
const redHandsFigure = document.getElementById('redHandsFigure');

if (redHandsImage && redHandsFigure) {
  redHandsImage.addEventListener('error', () => {
    redHandsFigure.classList.add('is-missing');
  });
}

function getWhiteSpaceMusicVolume(src) {
  if (!src) return 0.1;
  if (src.includes('WHITE SPACE')) return 0.10;
  if (src.includes('Spaces In-between')) return 0.11;
  if (src.includes('Trees')) return 0.12;
  if (src.includes('faraway-park-theme')) return 0.12;
  if (src.includes('hobbeez-theme')) return 0.12;
  if (src.includes('Dear Little Brother')) return 0.11;
  if (src.includes('Tussle Among Trees')) return 0.12;
  return 0.12;
}
