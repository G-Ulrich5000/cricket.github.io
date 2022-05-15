const musicContainer3 = document.getElementById('music-container3');
const playBtn3 = document.getElementById('play3');
const prevBtn3 = document.getElementById('prev3');
const nextBtn3 = document.getElementById('next3');

const audio3 = document.getElementById('audio3');
const progress3 = document.getElementById('progress3');
const progressContainer3 = document.getElementById('progress-container3');
const title3 = document.getElementById('title3');
const cover3 = document.getElementById('cover3');
const currTime3 = document.querySelector('#currTime');
const durTime3 = document.querySelector('#durTime');

// Song title3s
const songs3 = ['Rubicon', 'Rubicon', 'Rubicon'];

// Keep track of song
let songIndex3 = 2;

// Initially load song details into DOM
loadSong(songs3[songIndex3]);

// Update song details
function loadSong(song) {
  title3.innerText = song;
  audio3.src = `Rubicon.mp3`;
  cover3.src = `cd.jpg`;
}

// Play song
function playSong3() {
  musicContainer3.classList.add('play');
  playBtn3.querySelector('i.fas').classList.remove('fa-play');
  playBtn3.querySelector('i.fas').classList.add('fa-pause');

  audio3.play();
}

// Pause song
function pauseSong3() {
  musicContainer3.classList.remove('play');
  playBtn3.querySelector('i.fas').classList.add('fa-play');
  playBtn3.querySelector('i.fas').classList.remove('fa-pause');

  audio3.pause();
}

// Previous song
function prevSong() {
  songIndex3--;

  if (songIndex3 < 0) {
    songIndex3 = songs3.length - 1;
  }

  loadSong(songs3[songIndex3]);

  playSong3();
}

// Next song
function nextSong() {
  songIndex3++;

  if (songIndex3 > songs3.length - 1) {
    songIndex3 = 0;
  }

  loadSong(songs3[songIndex3]);

  playSong3();
}

// Update progress3 bar
function updateProgress3(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent3 = (currentTime / duration) * 100;
  progress3.style.width = `${progressPercent3}%`;
}

// Set progress3 bar
function setProgress3(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio3.duration;

  audio3.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime3 (e) {
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
	currTime3.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
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
	durTime3.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn3.addEventListener('click', () => {
  const isPlaying3 = musicContainer3.classList.contains('play');

  if (isPlaying3) {
    pauseSong3();
  } else {
    playSong3();
  }
});

// Change song
prevBtn3.addEventListener('click', prevSong);
nextBtn3.addEventListener('click', nextSong);

// Time/song update
audio3.addEventListener('timeupdate', updateProgress3);

// Click on progress3 bar
progressContainer3.addEventListener('click', setProgress3);

// Song ends
audio3.addEventListener('ended', nextSong);

// Time of song
audio3.addEventListener('timeupdate',DurTime3);