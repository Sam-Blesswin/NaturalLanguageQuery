import AudioRecorder from "./components/AudioRecorder";
import QueryDisplay from "./components/QueryDisplay";
import TranscribeEditor from "./components/TranscribeEditor";
import SchemaEditor from "./components/schemaEditor";
import { useState } from "react";

function App() {
  const [transcription, setTranscription] = useState<string>("");
  const [schema, setSchema] = useState<string>();
  const [query, setQuery] = useState<string>();

  return (
    <div>
      <AudioRecorder onTranscriptionComplete={setTranscription} />
      <TranscribeEditor transcription={transcription} schema={schema} onQueryGenerated ={setQuery}/>
      <SchemaEditor schema={schema} setSchema={setSchema} />
      <QueryDisplay query={query}/>
    </div>
  );
}

export default App;
