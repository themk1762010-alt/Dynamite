// Song Data
const songs = {
    "ENGLISH": [
        {
            id: 1,
            title: "Billie Jean",
            artist: "Michael Jackson",
            album: "Thriller",
            duration: "4:54",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778782813/Michael_Jackson_Billie_Jean_ojb0jy.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 2,
            title: "Dracula",
            artist: "SpotiDownloader.com - Tame Impala",
            album: "Single",
            duration: "3:30",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778782812/SpotiDownloader.com_-_Dracula_-_Tame_Impala_abftht.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 3,
            title: "The Less I Know The Better",
            artist: "Tame Impala",
            album: "Currents",
            duration: "3:36",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778782813/07_-_The_Less_I_Know_The_Better_i2flok.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 4,
            title: "Thriller",
            artist: "Michael Jackson",
            album: "Thriller",
            duration: "5:57",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778827699/Thriller_j2g0y4.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 5,
            title: "They Don't Care About Us",
            artist: "Michael Jackson",
            album: "HIStory",
            duration: "4:44",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778830198/They_Don_t_Care_About_Us_-_Michael_Jackson_-_US-UK_v1yxhv.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 6,
            title: "Bad",
            artist: "Michael Jackson",
            album: "Bad",
            duration: "4:07",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778830199/Bad_rqwpaj.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 7,
            title: "Beat It",
            artist: "Michael Jackson",
            album: "Thriller",
            duration: "4:18",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778830199/Beat_It_xxay5y.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 8,
            title: "A Horse With No Name",
            artist: "America",
            album: "America",
            duration: "4:12",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778836522/America_-_A_Horse_With_No_Name_Official_Audio_-_320_Kbps_tbppg1.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 9,
            title: "Reality In Motion",
            artist: "Tame Impala",
            album: "Currents",
            duration: "4:12",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778836523/Tame_Impala_-_Reality_In_Motion_Audio_-_320_Kbps_qqb0ya.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 10,
            title: "New Person, Same Old Mistakes",
            artist: "Tame Impala",
            album: "Currents",
            duration: "6:02",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778836523/New_Person_Same_Old_Mistakes_g3cvzc.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 11,
            title: "Neverender",
            artist: "Justice",
            album: "Hyperdrama",
            duration: "4:26",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778836525/Neverender_xu5zmg.mp3",
            cover: "custom_cover.jpg"
        },
        {
            id: 12,
            title: "Let It Happen",
            artist: "Tame Impala",
            album: "Currents",
            duration: "7:47",
            url: "https://res.cloudinary.com/dlbhr4bte/video/upload/v1778836527/Tame_Impala-Let_It_Happen-kissvk.com_ekabpg.mp3",
            cover: "custom_cover.jpg"
        }
    ],
    "TAMIL & OTHER": []
};

// State
let currentPlaylist = "ENGLISH";
let currentSongIndex = -1;
let isPlaying = false;
let audio = new Audio();
let currentSearchTerm = "";

// DOM Elements
const songsBody = document.getElementById("songs-body");
const playlistList = document.getElementById("playlist-list");
const searchInput = document.getElementById("search-input");
const currentPlaylistTitle = document.getElementById("current-playlist-title");
const currentPlaylistDesc = document.getElementById("current-playlist-desc");
const songCount = document.getElementById("song-count");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBarFill = document.getElementById("progress-bar-fill");
const progressBarBg = document.getElementById("progress-bar-bg");
const timeCurrent = document.getElementById("time-current");
const timeTotal = document.getElementById("time-total");
const trackName = document.getElementById("track-name");
const artistName = document.getElementById("artist-name");
const nowPlayingImg = document.getElementById("now-playing-img");

// Initialization
function init() {
    renderPlaylists();
    renderSongs();
    setupEventListeners();
}

// Render Functions
function renderPlaylists() {
    playlistList.innerHTML = "";
    Object.keys(songs).forEach(playlistName => {
        const a = document.createElement("a");
        a.href = "#";
        a.className = `playlist-item ${playlistName === currentPlaylist ? "active" : ""}`;
        a.dataset.playlist = playlistName;
        a.textContent = playlistName;
        a.addEventListener("click", (e) => {
            e.preventDefault();
            currentPlaylist = playlistName;
            renderPlaylists();
            renderSongs();
            updatePlaylistHeader();
        });
        playlistList.appendChild(a);
    });
}

function updatePlaylistHeader() {
    currentPlaylistTitle.textContent = currentPlaylist;
    if (currentPlaylist === "ENGLISH") {
        currentPlaylistDesc.textContent = "Your favorite English tracks.";
    } else {
        currentPlaylistDesc.textContent = "Tamil & Other language tracks.";
    }
}

function renderSongs() {
    songsBody.innerHTML = "";
    let playlistSongs = songs[currentPlaylist];
    
    // Filter by search term
    if (currentSearchTerm) {
        playlistSongs = playlistSongs.filter(song => 
            song.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) || 
            song.artist.toLowerCase().includes(currentSearchTerm.toLowerCase())
        );
    }

    if (playlistSongs.length === 0) {
        songsBody.innerHTML = `<div class="empty-state">
            ${currentSearchTerm ? "No songs found for your search." : "This playlist is currently empty."}
        </div>`;
        songCount.textContent = "0 songs";
        return;
    }

    songCount.textContent = `${playlistSongs.length} song${playlistSongs.length > 1 ? 's' : ''}`;

    playlistSongs.forEach((song, index) => {
        const originalIndex = songs[currentPlaylist].indexOf(song);
        const isCurrentSong = originalIndex === currentSongIndex;
        
        const row = document.createElement("div");
        row.className = `song-row ${isCurrentSong && isPlaying ? "playing" : ""}`;
        row.innerHTML = `
            <div class="song-index">
                <span class="song-index-number">${index + 1}</span>
                <i class="fas fa-play song-play-icon"></i>
            </div>
            <div class="song-title-col">
                <div class="song-img"><img src="${song.cover}" alt="cover" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;"></div>
                <div class="song-info">
                    <div class="song-title-text">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            </div>
            <div class="song-album">${song.album}</div>
            <div class="song-duration">${song.duration}</div>
        `;
        
        row.addEventListener("click", () => {
            playSong(originalIndex);
        });

        songsBody.appendChild(row);
    });
}

// Audio Player Functions
function playSong(index) {
    if (index < 0 || index >= songs[currentPlaylist].length) return;
    
    if (currentSongIndex === index) {
        togglePlay();
        return;
    }

    currentSongIndex = index;
    const song = songs[currentPlaylist][index];
    
    audio.src = song.url;
    audio.play();
    isPlaying = true;
    
    updatePlayerUI(song);
    renderSongs();
    
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function togglePlay() {
    if (currentSongIndex === -1 && songs[currentPlaylist].length > 0) {
        playSong(0);
        return;
    }
    
    if (currentSongIndex === -1) return;

    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
    renderSongs();
}

function playNext() {
    if (songs[currentPlaylist].length === 0) return;
    let nextIndex = currentSongIndex + 1;
    if (nextIndex >= songs[currentPlaylist].length) nextIndex = 0;
    playSong(nextIndex);
}

function playPrev() {
    if (songs[currentPlaylist].length === 0) return;
    let prevIndex = currentSongIndex - 1;
    if (prevIndex < 0) prevIndex = songs[currentPlaylist].length - 1;
    playSong(prevIndex);
}

function updatePlayerUI(song) {
    trackName.textContent = song.title;
    artistName.textContent = song.artist;
    nowPlayingImg.innerHTML = `<img src="${song.cover}" alt="cover" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">`;
}

// Formatting time
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event Listeners
function setupEventListeners() {
    playPauseBtn.addEventListener("click", togglePlay);
    nextBtn.addEventListener("click", playNext);
    prevBtn.addEventListener("click", playPrev);

    searchInput.addEventListener("input", (e) => {
        currentSearchTerm = e.target.value;
        renderSongs();
    });

    audio.addEventListener("timeupdate", () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        
        timeCurrent.textContent = formatTime(currentTime);
        timeTotal.textContent = formatTime(duration);
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBarFill.style.width = `${progressPercent}%`;
        }
    });

    audio.addEventListener("ended", playNext);

    progressBarBg.addEventListener("click", (e) => {
        if (!audio.duration) return;
        const width = progressBarBg.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });
}

// Start
init();
