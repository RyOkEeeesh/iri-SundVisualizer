let musics = [];
loadAudioToTmp();
function loadAudioToTmp(){
	for(var i=1;i<=55;i++){
		const _i = i;
		const music = new Audio();
		musics[_i-1] = "./audio/music ("+_i+").mp3";
		music.src = "./audio/music ("+_i+").mp3";
		music.addEventListener("load",()=>{
			musics[_i] = music;
		});
}
}

let randoms = [];
let rand_music = [];
let min = 0, max = 54;

for(i = min; i <= max; i++){
  while(true){
    var tmp = intRandom(min, max);
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

let audio = document.querySelector('audio');
let j = 0;
audio.src = rand_music[j];
audio.volume = 0.6;
j++;
audio.addEventListener('ended', function() {
audio.src = rand_music[j];
audio.autoplay = true;
j++;
});