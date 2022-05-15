const musicContainer2 = document.getElementById('music-container2');
const playBtn2 = document.getElementById('play2');
const prevBtn2 = document.getElementById('prev2');
const nextBtn2 = document.getElementById('next2');

const audio2 = document.getElementById('audio2');
const progress2 = document.getElementById('progress2');
const progressContainer2 = document.getElementById('progress-container2');
const title2 = document.getElementById('title2');
const cover2 = document.getElementById('cover2');
const currTime2 = document.querySelector('#currTime2');
const durTime2 = document.querySelector('#durTime2');

// Song title2s
const songs2 = ['Winter', 'Winter', 'Winter'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong2(songs2[songIndex]);

// Update song details
function loadSong2(song) {
  title2.innerText = song;
  audio2.src = `Winter.mp3`;
  cover2.src = `cd.jpg`;
}

// Play song
function playSong2() {
  musicContainer2.classList.add('play');
  playBtn2.querySelector('i.fas').classList.remove('fa-play');
  playBtn2.querySelector('i.fas').classList.add('fa-pause');

  audio2.play();
}

// Pause song
function pauseSong2() {
  musicContainer2.classList.remove('play');
  playBtn2.querySelector('i.fas').classList.add('fa-play');
  playBtn2.querySelector('i.fas').classList.remove('fa-pause');

  audio2.pause();
}

// Previous song
function prevSong2() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs2.length - 1;
  }

  loadSong(songs2[songIndex]);

  playSong2();
}

// Next song
function nextSong2() {
  songIndex++;

  if (songIndex > songs2.length - 1) {
    songIndex = 0;
  }

  loadSong2(songs2[songIndex]);

  playSong2();
}

// Update progress bar
function updateProgress2(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress2.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress2(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio2.duration;

  audio2.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime2 (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime2.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d2 (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime2.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn2.addEventListener('click', () => {
  const isPlaying = musicContainer2.classList.contains('play');

  if (isPlaying) {
    pauseSong2();
  } else {
    playSong2();
  }
});

// Change song
prevBtn2.addEventListener('click', prevSong2);
nextBtn2.addEventListener('click', nextSong2);

// Time/song update
audio2.addEventListener('timeupdate', updateProgress2);

// Click on progress bar
progressContainer2.addEventListener('click', setProgress2);

// Song ends
audio2.addEventListener('ended', nextSong2);

// Time of song
audio2.addEventListener('timeupdate',DurTime2);