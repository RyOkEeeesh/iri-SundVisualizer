let musics = [];
const title = ["24-25","Best life","breaking dawn","brother","CAKE","Clear Color","Coaster","Come Away","COME BACK TO MY CITY","Corner","DRAMA","Flashlight","For life","friends","fruits","Swamp","Keep on trying","miracle","Only One","rhythm","Roll","Run","Runaway","Season","Shade","Sparkle","STARLIGHT","stroll","SUMMER END","Sway","Watashi","Wonderland","はじまりの日","フェイバリット女子","渦","会いたいわ","言えない","東へ西へ","半端じゃない","飛行"];

loadAudioToTmp();
function loadAudioToTmp(){
	for(var i=1;i<=40;i++){
		const _i = i;
		const music = new Audio();
		musics[_i-1] = "./audio/music ("+_i+").mp3";
		music.src = "./audio/music ("+_i+").mp3";
		music.addEventListener("load",()=>{
			musics[_i] = music;
		});
}
}

console.log(musics);
console.log(musics.length);

let randoms = [];
let rand_music = [];
MakeRandMusics();

console.log(rand_music);

let audio = document.querySelector('audio');
audio.volume = 0.6;
let music_title = document.getElementById('music-title')
let j = 0;
playAudio(j);
j++;
audio.addEventListener('ended', function() {
audio.autoplay = true;
playAudio(j);
j++;
});

function playAudio(j){
  audio.src = rand_music[j];
  music_title.innerHTML = title[musics.indexOf(rand_music[j])];
}

function MakeRandMusics(){
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