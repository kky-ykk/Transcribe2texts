// lib/index.js
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');
const path = require('path');

const { execSync } = require('child_process');

function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
  } catch (err) {
    throw new Error('FFmpeg not found. Please install it from https://ffmpeg.org/download.html Or run command sudo apt install ffmpeg');
  }
}


function extractAudio(videoPath, outputPath) {
  
  checkFFmpeg();

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .noVideo()
      .audioChannels(1)               // Force mono  ,force the audio to be mono (1 channel) and 16 kHz sample rate — for Vosk
      .audioFrequency(16000)          // 16 kHz sample rate
      .audioCodec('pcm_s16le')        // 16-bit PCM
      .format('wav')                  // WAV format
      .save(outputPath)
      .on('end', () => {
        console.log('Audio extracted:', outputPath);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('FFmpeg error:', err);
        reject(err);
      });
  });
}


function transcribeAudio(audioPath) {

  exec('python3 -c "import vosk"', (err) => {
    if (err) {
      console.warn(' Python package `vosk` not found. Please run: pip install vosk');
    }
  });

  const modelPath = path.join(__dirname, '..', 'vosk-model-small-en-us-0.15'); 
  const scriptPath = path.join(__dirname, 'transcribe.py'); 

  return new Promise((resolve, reject) => {
    const command = `python3 "${scriptPath}" "${modelPath}" "${audioPath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error:', stderr);
        return reject(new Error(stderr));
      }
      resolve(stdout.trim());
    });
  });
}


// transcribeAudio("/home/krishna/Desktop/Custome NPM Packages/checkPackages/sample.wav").then(res=>console.log(res));

module.exports = {
  extractAudio,
  transcribeAudio
};
