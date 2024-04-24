import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

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
  const [loading, setLoading] = useState<boolean>(false);

  const sendData = async () => {
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:8000/generate", {
        schema: JSON.parse(schema),
        prompt: responseData,
      });
      console.log("Data sent successfully:", result.data);
      console.log(result.data["text"]);
      onQueryGenerated(result.data["response"]["text"]);
    } catch (error) {
      console.error("Failed to send data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResponseData(transcription);
  }, [transcription]);

  const changeTranscription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponseData(e.target.value);
    console.log("modified");
  };

  return (
    <div className="rounded-lg shadow-lg p-4 bg-white">
      {loading ? <Loading /> : ""}
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        Transcribe Editor
      </h2>
      <textarea
        className="w-full p-3 text-sm text-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 block transition duration-300 ease-in-out mb-4 "
        value={responseData}
        onChange={changeTranscription}
        rows={4}
        placeholder="Query the database with natural language"
      />
      <div className="flex items-center space-x-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out "
          onClick={sendData}
        >
          Get SQL Query
        </button>
      </div>
    </div>
  );
};

export default TranscribeEditor;
