import { useReactMediaRecorder } from "react-media-recorder";
import Loading from "./Loading";
import axios from "axios";
import { useState } from "react";

interface AudioRecorderProps {
  onTranscriptionComplete: (transcription: string) => void;
}

const AudioRecorder = ({ onTranscriptionComplete }: AudioRecorderProps) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
  const [loading, setLoading] = useState<boolean>(false);

  const sendAudioToServer = async () => {
    setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="rounded-lg shadow-lg p-4 bg-white">
      {loading ? <Loading /> : ""}
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        Audio Recorder
      </h2>
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600">
          Status: <span className="text-blue-600">{status}</span>
        </p>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <button
          className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
          onClick={startRecording}
        >
          Start Recording
        </button>
        <button
          className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
          onClick={stopRecording}
        >
          Stop Recording
        </button>
        <button
          className={`inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out ${
            mediaBlobUrl ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={sendAudioToServer}
          disabled={!mediaBlobUrl}
        >
          Upload
        </button>
      </div>
      {mediaBlobUrl && (
        <div className="flex justify-center">
          <audio src={mediaBlobUrl} controls className="rounded" />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
