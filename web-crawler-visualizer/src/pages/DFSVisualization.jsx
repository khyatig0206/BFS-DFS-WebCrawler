import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useLocation } from "react-router-dom";

const RealTimeDFSVisualization = () => {
  const { state } = useLocation();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [isCrawling, setIsCrawling] = useState(true); // Control button visibility
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_BASE_URL}/ws/crawl`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected.");
      ws.send(JSON.stringify({ seedUrl: state.seedUrl }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { url, parent } = data;

        setGraphData((prev) => {
          const nodes = [...prev.nodes];
          const links = [...prev.links];

          if (!nodes.find((node) => node.id === url)) {
            nodes.push({ id: url, name: url, color: generateRandomColor() });
          }

          if (parent && !links.find((link) => link.source === parent && link.target === url)) {
            links.push({ source: parent, target: url });
          }

          return { nodes, links };
        });
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
      console.log("WebSocket cleanup.");
    };
  }, [state.seedUrl]);

  const stopCrawl = () => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ stop: true }));
      wsRef.current.close();
      setIsCrawling(false); // Hide the button
    }
  };

  const generateRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Real-Time DFS Crawl</h1>
      <div
        className="w-full bg-white shadow-lg rounded-lg"
        style={{ width: "100vw", height: "80vh" }}
      >
        <ForceGraph2D
          graphData={graphData}
          nodeLabel={(node) => node.name}
          nodeAutoColorBy="color"
          width={window.innerWidth}
          height={window.innerHeight * 0.8}
          linkDirectionalArrowLength={10}
          linkDirectionalArrowRelPos={0.8}
          linkWidth={2}
          nodeCanvasObject={(node, ctx) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color;
            ctx.fill();
          }}
        />
      </div>
      {isCrawling && (
        <button
          onClick={stopCrawl}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          Stop Crawler
        </button>
      )}
    </div>
  );
};

export default RealTimeDFSVisualization;
