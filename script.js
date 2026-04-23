// canciones — poné el archivo mp3 en la misma carpeta con el mismo nombre
const songs = [
  {
    title: "Chamber of Reflection",
    src: "music/Chamber Of Reflection.mp3"
  },
  {
    title: "Salad Days",
    src: "music/Salad Days.mp3"
  },
  {
    title: "My Kind of Woman",
    src: "music/My Kind of Woman.mp3"
  },
  {
    title: "Ode to Viceroy",
    src: "music/Ode to Viceroy.mp3"
  },
  {
    title: "20190724",
    src: "music/20190724.mp3"
  }
];

let current = 0;
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('song-title');

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function loadSong(i, el) {
  current = i;
  audio.src = songs[i].src;
  songTitle.textContent = songs[i].title;
  document.querySelectorAll('.playlist li').forEach(l => l.classList.remove('active'));
  if (el) el.classList.add('active');
  audio.play().catch(() => {
    playBtn.textContent = '▶';
  });
  playBtn.textContent = '⏸';
}

function togglePlay() {
  if (!audio.src || audio.src === window.location.href) {
    loadSong(0, document.querySelector('.playlist li'));
    return;
  }
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
}

function nextSong() {
  const next = (current + 1) % songs.length;
  loadSong(next, document.querySelectorAll('.playlist li')[next]);
}

function prevSong() {
  const prev = (current - 1 + songs.length) % songs.length;
  loadSong(prev, document.querySelectorAll('.playlist li')[prev]);
}

function seek(val) {
  if (audio.duration) {
    audio.currentTime = (val / 100) * audio.duration;
  }
}

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = fmt(audio.currentTime);
    durationEl.textContent = fmt(audio.duration);
  }
});

audio.addEventListener('ended', nextSong);

function show(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('visible');
  btn.classList.add('active');
}