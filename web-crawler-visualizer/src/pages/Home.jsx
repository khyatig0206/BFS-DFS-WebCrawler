import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [seedUrl, setSeedUrl] = useState("");

  const handleCrawlSelection = (type) => {
    if (!seedUrl) {
      alert("Please enter a seed URL.");
      return;
    }
    if (type === "realtime-dfs") {
      navigate(`/realtime-dfs`, { state: { seedUrl } });
    } else {
      navigate(`/${type}`, { state: { seedUrl } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Web Crawler Visualization
      </h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Enter seed URL"
          value={seedUrl}
          onChange={(e) => setSeedUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={() => handleCrawlSelection("bfs")}
            className="w-[48%] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
          >
            BFS Crawl
          </button>
          <button
            onClick={() => handleCrawlSelection("realtime-dfs")}
            className="w-[48%] bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
          >
            DFS Crawl
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
