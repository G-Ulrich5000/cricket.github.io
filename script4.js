const musicContainer4 = document.getElementById('music-container4');
const playBtn4 = document.getElementById('play4');
const prevBtn4 = document.getElementById('prev4');
const nextBtn4 = document.getElementById('next4');

const audio4 = document.getElementById('audio4');
const progress4 = document.getElementById('progress4');
const progressContainer4 = document.getElementById('progress-container4');
const title4 = document.getElementById('title4');
const cover4 = document.getElementById('cover4');
const currTime4 = document.querySelector('#currTime');
const durTime4 = document.querySelector('#durTime');

// Song title4s
const songs4 = ['Cronopios Creature (Official Audio)', 'Cronopios Creature (Official Audio)', 'Cronopios Creature (Official Audio)'];

// Keep track of song
let songIndex4 = 2;

// Initially load song details into DOM
loadSong(songs4[songIndex4]);

// Update song details
function loadSong(song) {
  title4.innerText = song;
  audio4.src = `Cronopios Creature (Official Audio).mp3`;
  cover4.src = `cd.jpg`;
}

// Play song
function playSong4() {
  musicContainer4.classList.add('play');
  playBtn4.querySelector('i.fas').classList.remove('fa-play');
  playBtn4.querySelector('i.fas').classList.add('fa-pause');

  audio4.play();
}

// Pause song
function pauseSong4() {
  musicContainer4.classList.remove('play');
  playBtn4.querySelector('i.fas').classList.add('fa-play');
  playBtn4.querySelector('i.fas').classList.remove('fa-pause');

  audio4.pause();
}

// Previous song
function prevSong() {
  songIndex4--;

  if (songIndex4 < 0) {
    songIndex4 = songs4.length - 1;
  }

  loadSong(songs4[songIndex4]);

  playSong4();
}

// Next song
function nextSong() {
  songIndex4++;

  if (songIndex4 > songs4.length - 1) {
    songIndex4 = 0;
  }

  loadSong(songs4[songIndex4]);

  playSong4();
}

// Update progress4 bar
function updateProgress4(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent4 = (currentTime / duration) * 100;
  progress4.style.width = `${progressPercent4}%`;
}

// Set progress4 bar
function setProgress4(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio4.duration;

  audio4.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime4 (e) {
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
	currTime4.innerHTML = min +':'+ sec;

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
	durTime4.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn4.addEventListener('click', () => {
  const isPlaying4 = musicContainer4.classList.contains('play');

  if (isPlaying4) {
    pauseSong4();
  } else {
    playSong4();
  }
});

// Change song
prevBtn4.addEventListener('click', prevSong);
nextBtn4.addEventListener('click', nextSong);

// Time/song update
audio4.addEventListener('timeupdate', updateProgress4);

// Click on progress4 bar
progressContainer4.addEventListener('click', setProgress4);

// Song ends
audio4.addEventListener('ended', nextSong);

// Time of song
audio4.addEventListener('timeupdate',DurTime4);