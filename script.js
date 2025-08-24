
const songs = [
  { title: "Mera Yar hai rab", artist: "ECHO", file: "/Music/WhatsApp Audio 2025-08-24 at 11.49.52_8032feb3.mp3", image: "/Images/Cover 2.jpg" },
  { title: "Sairat", artist: "Skyline", file: "/Music/WhatsApp Audio 2025-08-24 at 11.57.28_6b10bd0a.mp3.", image: "/Images/Cover3.jpg" },
  { title: "Rang Bavara", artist: "Atlas", file: "/Music/WhatsApp Audio 2025-08-24 at 11.59.14_6c31b6f5.mp3", image: "/Images/Cover4.jpg" },
  { title: "Zagmagt", artist: "Pixelwave",file: "/Music/WhatsApp Audio 2025-08-24 at 12.00.21_d9eed557.mp3", image: "/Images/Cover 5.jpg" },
  { title: "Gauraya", artist: "Lumen",file: "/Music/WhatsApp Audio 2025-08-24 at 12.05.37_b287ae5b.mp3", image: "/Images/Cover 6.jpg" },
  { title: "Tola Tola", artist: "Coastal", file: "/Music/WhatsApp Audio 2025-08-24 at 12.06.59_592879ac.mp3", image: "/Images/Cover 7.jpg" },
  { title: "Vatevar Mogra", artist: "Prism", file: "/Music/WhatsApp Audio 2025-08-24 at 12.08.18_9898b1a1.mp3", image: "/Images/Cover 8.jpg" },
  { title: "Madanmandiri", artist: "Reverb", file: "/Music/WhatsApp Audio 2025-08-24 at 12.09.37_3177466d.mp3", image: "/Images/Cover 9.jpg" },
  { title: "Hrudyat vaje something", artist: "Northlight", file: "/Music/WhatsApp Audio 2025-08-24 at 12.25.32_bde77b5f.mp3",image: "/Images/Cover 10.jpg" },
  { title: "Othaiyadi pathayila", artist: "Riverine", file: "/Music/WhatsApp Audio 2025-08-24 at 12.26.51_5458aaea.mp3", image: "/Images/Cover 11.jpg" }
];
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const seekBar = document.getElementById("seek");
const volumeBar = document.getElementById("volume");

const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");
const albumArt = document.getElementById("album-art");
const nowIndex = document.getElementById("now-index");
const favToggle = document.getElementById("fav-toggle");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const playlistEl = document.getElementById("playlist");
const recentlyPlayedEl = document.getElementById("recently-played");
const favoritesEl = document.getElementById("favorites");

const searchInput = document.getElementById("search");
const voiceSearchBtn = document.getElementById("voice-search");
const visitsEl = document.getElementById("visits");

// ---------- State ----------
let currentIndex = 0;
let order = [...songs.keys()]; // play order (shuffles if needed)
let isShuffle = false;
let repeatMode = "off"; // off | one | all

let recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

// ---------- Init ----------
renderPlaylist(songs);
renderRecentlyPlayed();
renderFavorites();
updateVisitorCounter();
loadSong(currentIndex);

function loadSong(index) {
  const song = songs[index];
  if (!song) return;
  audio.src = song.file;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  albumArt.src = song.image;
  nowIndex.textContent = `${index + 1} / ${songs.length}`;
  updateFavIcon();
}

// ---------- Controls ----------
playBtn.addEventListener("click", () => audio.play());
pauseBtn.addEventListener("click", () => audio.pause());
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.filter = isShuffle ? "brightness(1.2)" : "none";
  if (isShuffle) {
    order = shuffle([...songs.keys()]);
  } else {
    order = [...songs.keys()];
  }
});

repeatBtn.addEventListener("click", () => {
  repeatMode = repeatMode === "off" ? "one" : repeatMode === "one" ? "all" : "off";
  repeatBtn.title = `Repeat (${repeatMode})`;
  repeatBtn.style.filter = repeatMode === "off" ? "none" : "brightness(1.2)";
});

// Seekbar sync
audio.addEventListener("timeupdate", () => {
  if (!isFinite(audio.duration)) return;
  seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

seekBar.addEventListener("input", () => {
  if (!isFinite(audio.duration)) return;
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

// Volume
volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.valueAsNumber;
});

// Autoplay next & track recently played
audio.addEventListener("ended", () => {
  if (repeatMode === "one") {
    audio.currentTime = 0;
    audio.play();
    return;
  }
  nextSong(true);
});

audio.addEventListener("play", () => {
  // add to recently played when playing starts
  addToRecentlyPlayed(songs[currentIndex]);
});

// ---------- Playlist UI ----------
function renderPlaylist(data) {
  playlistEl.innerHTML = data
    .map((s, i) => `
      <li onclick="playThis(${i})" title="${s.title} — ${s.artist}">
        <img src="${s.image}" alt="">
        <div>
          <div>${s.title}</div>
          <small style="opacity:.8">${s.artist}</small>
        </div>
      </li>
    `)
    .join("");
  // expose handler globally
  window.playThis = (i) => {
    currentIndex = i;
    loadSong(currentIndex);
    audio.play();
  };
}

// ---------- Recently Played ----------
function addToRecentlyPlayed(song) {
  // Keep unique by file, most recent first
  const filtered = recentlyPlayed.filter((s) => s.file !== song.file);
  filtered.unshift(song);
  recentlyPlayed = filtered.slice(0, 10); // cap to 10
  localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  renderRecentlyPlayed();
}
function renderRecentlyPlayed() {
  recentlyPlayedEl.innerHTML = recentlyPlayed
    .map((s) => `
      <li onclick='resume("${s.file}")' title="${s.title}">
        <img src="${s.image}" alt="">
        <div>${s.title}<br/><small style="opacity:.8">${s.artist}</small></div>
      </li>
    `)
    .join("");
  window.resume = (file) => {
    const idx = songs.findIndex((s) => s.file === file);
    if (idx !== -1) {
      currentIndex = idx;
      loadSong(idx);
      audio.play();
    }
  };
}

// ---------- Favorites ----------
favToggle.addEventListener("click", () => {
  toggleFavorite(songs[currentIndex]);
});

function toggleFavorite(song) {
  const exists = favorites.some((s) => s.file === song.file);
  favorites = exists
    ? favorites.filter((s) => s.file !== song.file)
    : [song, ...favorites];
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
  updateFavIcon();
}
function renderFavorites() {
  favoritesEl.innerHTML = favorites
    .map((s) => `
      <li onclick='resume("${s.file}")' title="${s.title}">
        <img src="${s.image}" alt="">
        <div>${s.title}<br/><small style="opacity:.8">${s.artist}</small></div>
      </li>
    `)
    .join("");
}
function updateFavIcon() {
  const isFav = favorites.some((s) => s.file === songs[currentIndex].file);
  favToggle.textContent = isFav ? "❤" : "♡";
}

// ---------- Search ----------
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q)
  );
  renderPlaylist(filtered);
});

// ---------- Voice Search ----------
voiceSearchBtn.addEventListener("click", () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert("Speech Recognition not supported in this browser.");
    return;
  }
  const recognition = new SR();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();

  recognition.onresult = (e) => {
    const query = e.results[0][0].transcript.toLowerCase();
    searchInput.value = query;
    const filtered = songs.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.artist.toLowerCase().includes(query)
    );
    renderPlaylist(filtered);
  };
});

// ---------- Navigation Helpers ----------
function nextSong(triggeredByEnded = false) {
  if (isShuffle) {
    // Move to next index in shuffled order based on currentIndex position
    const idxInOrder = order.indexOf(currentIndex);
    let nextIdxInOrder = idxInOrder + 1;
    if (nextIdxInOrder >= order.length) {
      if (repeatMode === "all" || triggeredByEnded) nextIdxInOrder = 0;
      else return;
    }
    currentIndex = order[nextIdxInOrder];
  } else {
    currentIndex++;
    if (currentIndex >= songs.length) {
      if (repeatMode === "all" || triggeredByEnded) currentIndex = 0;
      else return;
    }
  }
  loadSong(currentIndex);
  audio.play();
}
function prevSong() {
  if (isShuffle) {
    const idxInOrder = order.indexOf(currentIndex);
    let prevIdxInOrder = idxInOrder - 1;
    if (prevIdxInOrder < 0) prevIdxInOrder = order.length - 1;
    currentIndex = order[prevIdxInOrder];
  } else {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  }
  loadSong(currentIndex);
  audio.play();
}

// ---------- Utils ----------
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function formatTime(seconds) {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}
function updateVisitorCounter() {
  const key = "mp_visits";
  const count = Number(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(count));
  visitsEl.textContent = count;
}

// Optional: auto-load first track metadata duration when ready
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});
