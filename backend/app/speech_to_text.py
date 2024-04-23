import json
from google.cloud import speech
from google.oauth2.service_account import Credentials

from fastapi import File, UploadFile

service_account_info = json.load(open('dependencies/speech2sql.json'))
credentials = Credentials.from_service_account_info(service_account_info)
client = speech.SpeechClient(credentials = credentials)

def speech_to_text(config: speech.RecognitionConfig, audio: speech.RecognitionAudio,) -> speech.RecognizeResponse:
    # Synchronous speech recognition request
    response = client.recognize(config=config, audio=audio)
    return response


def print_response(response: speech.RecognizeResponse):
    for result in response.results:
        print_result(result)


def print_result(result: speech.SpeechRecognitionResult):
    best_alternative = result.alternatives[0]
    print("-" * 80)
    print(f"language_code: {result.language_code}")
    print(f"transcript:    {best_alternative.transcript}")
    print(f"confidence:    {best_alternative.confidence:.0%}")
    

async def transcribe_audio(file: UploadFile = File(...)):
    # config = speech.RecognitionConfig(language_code="en")
    # audio = speech.RecognitionAudio(uri="gs://cloud-samples-data/speech/brooklyn_bridge.flac")

    if not file.filename.endswith(('.mp3')):
        raise HTTPException(status_code=400, detail="Unsupported file format")

    # Read file content
    file_content = await file.read()

    # Prepare the audio data for the Google API
    audio = speech.RecognitionAudio(content=file_content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code="en-US"
    )

    # Call the speech_to_text function
    response = speech_to_text(config, audio)

    print_response(response)

    result = response.results[0]
    transcript = result.alternatives[0].transcript

    return {"response": transcript}
