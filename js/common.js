export function useUi(onClickFirstPlay) {
  let isInited = false; // 初期化済か
  let isUserPlaying = false; // ユーザーが音量ON/OFFのどちらを選択したか

  const audioElement = document.querySelector("audio");

  // -------------------------------------
  // 画面のUI処理
  // -------------------------------------
  const btnPlay = document.querySelector("#btnPlay");
  btnPlay.addEventListener("click", () => {
    // ユーザーの意思をもって再生したことを記録
    isUserPlaying = true;
    playSound();

    if (isInited === false) {
      onClickFirstPlay();
    }

    isInited = true;
  });

  const btnStop = document.querySelector("#btnStop");
  btnStop.addEventListener("click", () => {
    // ユーザーの意思をもって停止したことを記録
    isUserPlaying = false;
    stopSound();
  });

  document.addEventListener('keypress',keypress_event)

  let count = 0;
  function keypress_event(e) {
    if(e.code === 'Space'){
      if(count % 2 == 0){
        isUserPlaying = true;
        playSound();
        if (isInited === false) {
          onClickFirstPlay();
        }
    
        isInited = true;
      }else if(count % 2 == 1){
        isUserPlaying = false;
        stopSound();
      }
    }
    count ++;
    return false; 
  }

  // タブの切り替えでサウンドのON/OFFを切りかえる
  document.addEventListener("visibilitychange", () => {
    // 初期化前であればなにもしない
    if (isInited === false) {
      return;
    }
    if (document.visibilityState === "visible") {
      // ユーザーの意思を確認
      if (isUserPlaying === true) {
        playSound();
      }
    } else {
      stopSound();
    }
  });

  function playSound() {
    audioElement.play();
    btnPlay.style.display = "none";
    btnStop.style.display = "block";
  }
  function stopSound() {
    audioElement.pause();
    btnPlay.style.display = "block";
    btnStop.style.display = "none";
  }

  return { audioElement };
}
