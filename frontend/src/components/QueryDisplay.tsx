import { useState } from "react";
import axios from "axios";

interface QueryDisplayProp {
  query: string;
}

const QueryDisplay = ({ query }: QueryDisplayProp) => {
  const [dbUrl, setDbUrl] = useState<string>(""); // State to hold the database URL
  const [response, setResponse] = useState<string>(""); // State to hold the server response

  const executeQuery = async () => {
    try {
      const result = await axios.post("http://localhost:8000/executeQuery/", {
        db_url: dbUrl,
        query: query,
      });
      setResponse(`Success: ${JSON.stringify(result.data)}`);
    } catch (error: any) {
      setResponse(`Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <div>
      <div>Generated Query:</div>
      <div>{query}</div>
      <input
        type="text"
        value={dbUrl}
        onChange={(e) => setDbUrl(e.target.value)}
        placeholder="Paste the database URL here"
        style={{ margin: "10px 0", width: "100%" }}
      />
      <button onClick={executeQuery} style={{ marginBottom: "10px" }}>
        Execute Query
      </button>
      <div>{response}</div>
    </div>
  );
};

export default QueryDisplay;
