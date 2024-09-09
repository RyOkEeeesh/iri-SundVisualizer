const musics = [];
const title = {"24-25":"sparkle","Best life":"sparkle","breaking dawn":"groove","brother":"groove","CAKE":"shade","Clear Color":"sparkle","Coaster":"sparkle","Come Away":"only","COME BACK TO MY CITY":"sparkle","Corner":"corner","DRAMA":"private","Flashlight":"shade","For life":"life","friends":"private","fruits":"life","Swamp":"swamp","Keep on trying":"shade","miracle":"sparkle","Only One":"only","rhythm":"groove","Roll":"private","Run":"run","Runaway":"sparkle","Season":"private","Shade":"shade","Sparkle":"sparkle","STARLIGHT":"private","stroll":"only","SUMMER END":"sparkle","Sway":"shade","Watashi":"watashi","Wonderland":"shade","はじまりの日":"hajimari","フェイバリット女子":"groove","渦":"uzu","会いたいわ":"life","言えない":"ienai","東へ西へ":"higashi","半端じゃない":"groove","飛行":"shade"};
let titleName = Object.keys(title)
const audio = document.querySelector('audio');
audio.volume = 0.4;
const album = document.querySelector('#album');
const background = document.querySelector('.wrap');
const music_title = document.getElementById('music-title')
let rand_music = [];
let j = 0;
musicsToTmp();
function musicsToTmp(){
	for(let i=1;i<=40;i++){
		const _i = i;
		musics[_i-1] = "./audio/music ("+_i+").mp3";
  }
}
function playAudio(track,num){
  audio.src = track[num];
  let titleName = Object.keys(title)
  let n = musics.indexOf(track[num])
  music_title.innerHTML = titleName[n];
  let url = 'https://github.com/RyOkEeeesh/iri-SundVisualizer/blob/main/img/audio/'+title[titleName[n]]+'.jpg?raw=true';
  album.src = url;
  background.style.backgroundImage = "url('"+url+"')";
}
function MakeRandMusics(){
  let randoms = [];
  let min = 0, max = musics.length-1;
  for(i = min; i <= max; i++){
    while(true){
      let tmp = intRandom(min, max);
      if(!randoms.includes(tmp)){
        randoms.push(tmp);
        rand_music[i] = musics[tmp];
        break;
      }
    }
  }
  function intRandom(min, max){
    return Math.floor( Math.random() * (max - min + 1)) + min;
  }
}
function trackMusic() {
if(j == false){
  MakeRandMusics();
  playAudio(rand_music,j);
  j++;
}
audio.addEventListener('ended', function() {
audio.autoplay = true;
  playAudio(rand_music,j);
  j++;
if(j == musics.length){
  j = 0;
  MakeRandMusics();
}
});
}
if(!window.localStorage){
  trackMusic();
}else{
  function saveData(track,num) {
    localStorage.setItem('track', JSON.stringify(track));
    localStorage.setItem('trackNum', JSON.stringify(num));
  }
  function removeStorage() {
    localStorage.removeItem("track");
    localStorage.removeItem("trackNum");
    localStorage.removeItem("time");
  }
  function resetTrack() {
    removeStorage();
    trackMusic();
    window.addEventListener('beforeunload', saveData(rand_music,j-1));
  }
  let track = JSON.parse(localStorage.getItem('track'));
  audio.addEventListener('timeupdate', function() {
    localStorage.setItem('time', JSON.stringify(audio.currentTime));
});
  if(Boolean(track) == false){
    resetTrack();
  }else if(Boolean(track)){
    let trackNum = JSON.parse(localStorage.getItem('trackNum'));
    const playbackTime = JSON.parse(localStorage.getItem('time'));
    audio.currentTime = playbackTime;
    if(trackNum < track.length){playAudio(track,trackNum);
    localStorage.setItem('trackNum', JSON.stringify(trackNum));
    trackNum ++;
    audio.addEventListener('ended', function() {
    audio.autoplay = true;
    playAudio(track,trackNum);
    localStorage.setItem('trackNum', JSON.stringify(trackNum));
    trackNum++;
    });}
    else if(trackNum == track.length){
      removeStorage();
      resetTrack();
    }
    }
}
