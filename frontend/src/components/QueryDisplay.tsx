import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

interface QueryDisplayProp {
  query: string;
}

const QueryDisplay = ({ query }: QueryDisplayProp) => {
  const [dbUrl, setDbUrl] = useState<string>(""); // State to hold the database URL
  const [response, setResponse] = useState<string>(""); // State to hold the server response
  const [loading, setLoading] = useState<boolean>(false);

  const executeQuery = async () => {
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:8000/executeQuery/", {
        db_url: dbUrl,
        query: query,
      });
      setResponse(`Success: ${JSON.stringify(result.data)}`);
    } catch (error: any) {
      setResponse(`Error: ${error.response?.data?.detail || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg shadow-lg p-4 bg-white">
      {loading ? <Loading /> : ""}
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        Generated Query:
      </h2>
      {query == "" ? (
        ""
      ) : (
        <div className="bg-gray-100 p-3 rounded-lg mb-4">{query}</div>
      )}
      <input
        type="text"
        value={dbUrl}
        onChange={(e) => setDbUrl(e.target.value)}
        placeholder="Paste the database URL here"
        className="w-full p-3 text-sm text-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 block transition duration-300 ease-in-out mb-4"
      />
      <button
        onClick={executeQuery}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out mb-4"
      >
        Execute Query
      </button>
      {response && (
        <div
          className="bg-gray-100 p-3 rounded-lg overflow-auto"
          style={{ maxHeight: "200px" }}
        >
          {response}
        </div>
      )}
    </div>
  );
};

export default QueryDisplay;
