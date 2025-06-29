# transcribe.py
import sys
import wave
import json
from vosk import Model, KaldiRecognizer

if len(sys.argv) < 3:
    print("Usage: python3 transcribe.py <model_path> <audio_file>")
    exit(1)

model_path = sys.argv[1]
audio_file = sys.argv[2]

wf = wave.open(audio_file, "rb")
if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getframerate() not in [8000, 16000, 44100]:
    print("Audio file must be WAV format mono PCM.")
    exit(1)

model = Model(model_path)
rec = KaldiRecognizer(model, wf.getframerate())

result_text = ""
while True:
    data = wf.readframes(4000)
    if len(data) == 0:
        break
    if rec.AcceptWaveform(data):
        res = json.loads(rec.Result())
        result_text += res.get("text", "") + " "

# Final partial result
res = json.loads(rec.FinalResult())
result_text += res.get("text", "")

print(result_text.strip())
