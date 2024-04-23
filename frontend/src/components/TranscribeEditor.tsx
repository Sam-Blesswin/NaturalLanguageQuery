import { useState, useEffect } from "react";
import axios from "axios";

interface TranscribeEditorProps {
  transcription: string;
  schema: string;
  onQueryGenerated: (query: string) => void;
}

const TranscribeEditor = ({
  transcription,
  schema,
  onQueryGenerated,
}: TranscribeEditorProps) => {
  const [responseData, setResponseData] = useState<string>(transcription);
  const [timer, setTimer] = useState<number>(5);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const sendData = async () => {
    try {
      const result = await axios.post("http://localhost:8000/generate", {
        schema: JSON.parse(schema),
        prompt: responseData,
      });
      console.log("Data sent successfully:", result.data);
      console.log(result.data["text"]);
      onQueryGenerated(result.data["response"]["text"]);
    } catch (error) {
      console.error("Failed to send data:", error);
    }
  };

  useEffect(() => {
    if (transcription == "") return;

    setResponseData(transcription);
    setTimer(5);
    setTimerActive(true);

    const intervalId = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime == 1) {
          clearInterval(intervalId);
          sendData();
          setTimerActive(false);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [transcription]);

  const ChangeTranscription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponseData(e.target.value);
    setTimerActive(false);
  };

  return (
    <div>
      <textarea
        value={responseData}
        onChange={ChangeTranscription}
        rows={4}
        cols={50}
        placeholder="Query the database with natural lanaguage"
      />
      <div>
        {timerActive && <span>auto send in {timer}</span>}
        <button
          className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
          onClick={sendData}
        >
          Get SQL Query
        </button>
      </div>
    </div>
  );
};

export default TranscribeEditor;
