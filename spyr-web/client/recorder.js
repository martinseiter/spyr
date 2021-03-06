
/* globals $,Recorder */

var AudioContext = webkitAudioContext || window.webkitAudioContext || AudioContext;
var audioContext = new AudioContext();

exports.audioContext = audioContext;

var recorder;

if (!navigator.getUserMedia) {
  navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
}

if (navigator.getUserMedia) {
  navigator.getUserMedia({audio:true}, userMediaHandler, function(e) {
    console.log('Error getting audio: ' + e);
  });

  function userMediaHandler(stream) {
    // Create an AudioNode from the stream.
    var audioInput = audioContext.createMediaStreamSource(stream);
    recorder = new Recorder(audioInput, {workerPath: '/lib/recorderjs/recorderWorker.js'});
    exports.recorder = recorder;
  }
}
