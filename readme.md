



# Video to Text Transcription Service

A Node.js application that extracts audio from video files and converts speech to text using offline transcription. This work with video where english language is used.

## Features

- pass video or audio path to specific functions
- Extract audio from videos using FFmpeg
- Convert speech to text using Vosk offline speech recognition
- Local processing - no external API calls required

## Prerequisites

- Node.js (v14+)
- Python 3.6+
- FFmpeg
- pip

## Installation

### 1. Install System Dependencies

**Install FFmpeg:**
```bash
sudo apt install ffmpeg
```

**Install Python dependencies:**
```bash
pip install vosk
```


## How It Works

2. **Audio Extraction**: `extractAudio()` function uses FFmpeg to extract audio from video
3. **Speech Recognition**: `transcribeAudio()` function calls Python script with Vosk to convert audio to text
4. **Output**: Returns transcribed text 

## Example
```bash
    import { extractAudio, transcribeAudio } from 'transcribe2texts';

    extractAudio("<video-path>.mp4","<path-to-save-extracted-audio>/sample.wav");

    async function fun(){

        const res=await transcribeAudio("./sample.wav");
        console.log("res:",res);
    }

    fun();
```

## Key Technologies

- **FFmpeg**: Processes multimedia files, extracts audio from video
- **Fluent-FFmpeg**: Node.js wrapper for FFmpeg commands
- **Vosk**: Open-source offline speech recognition toolkit
- **Child Process**: Executes Python transcription script from Node.js



