import { useState } from "react";
import AudioRecorder from "./components/AudioRecorder";
import QueryDisplay from "./components/QueryDisplay";
import TranscribeEditor from "./components/TranscribeEditor";
import SchemaEditor from "./components/schemaEditor";

function App() {
  const [transcription, setTranscription] = useState("");
  const [schema, setSchema] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div>
      <div className="bg-gray-800 text-white text-center py-4 shadow-md">
        <h1 className="text-xl md:text-3xl font-semibold">
          Speech 2 Sql Generator
        </h1>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="mb-4">
              <AudioRecorder onTranscriptionComplete={setTranscription} />
            </div>
            <div className="mb-4">
              <SchemaEditor schema={schema} setSchema={setSchema} />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <TranscribeEditor
                transcription={transcription}
                schema={schema}
                onQueryGenerated={setQuery}
              />
            </div>
            <QueryDisplay query={query} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
