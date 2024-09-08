let musics = [];
const title = {"24-25":"sparkle","Best life":"sparkle","breaking dawn":"groove","brother":"groove","CAKE":"shade","Clear Color":"sparkle","Coaster":"sparkle","Come Away":"only","COME BACK TO MY CITY":"sparkle","Corner":"corner","DRAMA":"private","Flashlight":"shade","For life":"life","friends":"private","fruits":"life","Swamp":"swamp","Keep on trying":"shade","miracle":"sparkle","Only One":"only","rhythm":"groove","Roll":"private","Run":"run","Runaway":"sparkle","Season":"private","Shade":"shade","Sparkle":"sparkle","STARLIGHT":"private","stroll":"only","SUMMER END":"sparkle","Sway":"shade","Watashi":"watashi","Wonderland":"shade","はじまりの日":"hajimari","フェイバリット女子":"groove","渦":"uzu","会いたいわ":"life","言えない":"ienai","東へ西へ":"higashi","半端じゃない":"groove","飛行":"shade"};
musicsToTmp();
function musicsToTmp(){
	for(let i=1;i<=40;i++){
		const _i = i;
		musics[_i-1] = "../audio/music ("+_i+").mp3";
  }
}
function playAudio(j){
  audio.src = rand_music[j];
  let = titleName = Object.keys(title)
  let n = musics.indexOf(rand_music[j])
  music_title.innerHTML = titleName[n];
  let url = '../img/audio/'+title[titleName[n]]+'.jpg';
  album.src = url;
  $('.wrap').css({"background-image": `url(${url})`,});
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
const audio = document.querySelector('audio');
const album = document.querySelector('#album')
let rand_music = [];
audio.volume = 0.4;
let music_title = document.getElementById('music-title')
let j = 0;
if(j == false){
  MakeRandMusics();
  playAudio(j);
  j++;
}
audio.addEventListener('ended', function() {
audio.autoplay = true;
playAudio(j);
j++;
if(j == musics.length){
  j = 0;
  MakeRandMusics();
}
});
// // 再生時間を取得
// audio.addEventListener('timeupdate', function() {
// 	console.log(audio.currentTime);
// });

if(!window.localStorage){
  console.log("aaaa")
}