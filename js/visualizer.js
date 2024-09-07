import { useUi } from "./common.js";

const FFT_SIZE = 512;
const containerElement = document.querySelector(".container");
const { audioElement } = useUi(initSound);

// 2Dの初期化
const boxes = [];
// div要素の配置
for (let i = 0; i < FFT_SIZE / 2; i++) {
  const div = document.createElement("div");
  div.classList.add("box");
  containerElement.append(div);
  boxes[i] = div;
}

// 音の解析
let nodeAnalyzer = null;

function initSound() {
  // サウンドを読み込み
  const obj = analyseSound(audioElement);
  nodeAnalyzer = obj.nodeAnalyser;
}

function analyseSound(audioElement) {
  const context = new AudioContext();

  // アナライザーを生成
  const nodeAnalyser = context.createAnalyser();
  // フーリエ変換を行う分割数。2の乗数でなくてはならない
  nodeAnalyser.fftSize = FFT_SIZE;
  // 0～1の範囲でデータの動きの速さ
  nodeAnalyser.smoothingTimeConstant = 0.8;
  // オーディオの出力先を設定
  nodeAnalyser.connect(context.destination);
  // audio 要素と紐付ける
  const nodeSource = context.createMediaElementSource(audioElement);
  nodeSource.connect(nodeAnalyser);
  return { nodeAnalyser };
}

function loop() {
  requestAnimationFrame(loop);
  draw();
}

function draw() {
  if (nodeAnalyzer == null) {
    return;
  }
  // 波形データを格納する配列の生成
  const freqByteData = new Uint8Array(FFT_SIZE / 2);
  // それぞれの周波数の振幅を取得
  nodeAnalyzer.getByteFrequencyData(freqByteData);
  for (let i = 0; i < freqByteData.length; i++) {
    const freqSum = freqByteData[i];
    const scale = freqSum / 256;
    const div = boxes[i];
    div.style.scale = `1 ${scale}`;
  }
}
loop();