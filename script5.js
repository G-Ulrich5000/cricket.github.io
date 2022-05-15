const musicContainer5 = document.getElementById('music-container5');
const playBtn5 = document.getElementById('play5');
const prevBtn5 = document.getElementById('prev5');
const nextBtn5 = document.getElementById('next5');

const audio5 = document.getElementById('audio5');
const progress5 = document.getElementById('progress5');
const progressContainer5 = document.getElementById('progress-container5');
const title5 = document.getElementById('title5');
const cover5 = document.getElementById('cover5');
const currTime5 = document.querySelector('#currTime');
const durTime5 = document.querySelector('#durTime');

// Song title5s
const songs5 = ['Crossing The Chasm', 'Crossing The Chasm', 'Crossing The Chasm'];

// Keep track of song
let songIndex5 = 2;

// Initially load song details into DOM
loadSong(songs5[songIndex5]);

// Update song details
function loadSong(song) {
  title5.innerText = song;
  audio5.src = `Crossing The Chasm.mp3`;
  cover5.src = `cd.jpg`;
}

// Play song
function playSong5() {
  musicContainer5.classList.add('play');
  playBtn5.querySelector('i.fas').classList.remove('fa-play');
  playBtn5.querySelector('i.fas').classList.add('fa-pause');

  audio5.play();
}

// Pause song
function pauseSong5() {
  musicContainer5.classList.remove('play');
  playBtn5.querySelector('i.fas').classList.add('fa-play');
  playBtn5.querySelector('i.fas').classList.remove('fa-pause');

  audio5.pause();
}

// Previous song
function prevSong() {
  songIndex5--;

  if (songIndex5 < 0) {
    songIndex5 = songs5.length - 1;
  }

  loadSong(songs5[songIndex5]);

  playSong5();
}

// Next song
function nextSong() {
  songIndex5++;

  if (songIndex5 > songs5.length - 1) {
    songIndex5 = 0;
  }

  loadSong(songs5[songIndex5]);

  playSong5();
}

// Update progress5 bar
function updateProgress5(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent5 = (currentTime / duration) * 100;
  progress5.style.width = `${progressPercent5}%`;
}

// Set progress5 bar
function setProgress5(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio5.duration;

  audio5.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime5 (e) {
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
	currTime5.innerHTML = min +':'+ sec;

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
	durTime5.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn5.addEventListener('click', () => {
  const isPlaying5 = musicContainer5.classList.contains('play');

  if (isPlaying5) {
    pauseSong5();
  } else {
    playSong5();
  }
});

// Change song
prevBtn5.addEventListener('click', prevSong);
nextBtn5.addEventListener('click', nextSong);

// Time/song update
audio5.addEventListener('timeupdate', updateProgress5);

// Click on progress5 bar
progressContainer5.addEventListener('click', setProgress5);

// Song ends
audio5.addEventListener('ended', nextSong);

// Time of song
audio5.addEventListener('timeupdate',DurTime5);