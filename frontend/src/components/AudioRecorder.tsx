import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

interface AudioRecorderProps {
  onTranscriptionComplete: (transcription: string) => void;
}

const AudioRecorder = ({ onTranscriptionComplete }: AudioRecorderProps) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const sendAudioToServer = async () => {
    if (mediaBlobUrl) {
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("file", blob, "audio-file.mp3");

      try {
        const result = await axios.post(
          "http://localhost:8000/transcribe/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        onTranscriptionComplete(result.data["response"]);
        console.log(result.data);
      } catch (error) {
        console.error("Error uploading the file: ", error);
      }
    }
  };

  return (
    <div>
      <p>Status: {status}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={startRecording}
      >
        Start Recording
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={stopRecording}
      >
        Stop Recording
      </button>
      <button
        className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        onClick={sendAudioToServer}
        disabled={!mediaBlobUrl}
      >
        Upload
      </button>
      {mediaBlobUrl && <audio src={mediaBlobUrl} controls className="mt-2" />}
    </div>
  );
};

export default AudioRecorder;
