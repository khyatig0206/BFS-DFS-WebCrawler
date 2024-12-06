# Web Crawler Visualization

## Overview
Web Crawler Visualization is a project that demonstrates web crawling using both Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms, visualized in real-time on a user-friendly interface. The backend is implemented with FastAPI, while the frontend leverages React.js and the `react-force-graph-2d` library to display the crawling process.

## Features
- Real-time visualization of web crawling (BFS and DFS).
- Interactive graph representation of crawled URLs.
- Control to stop crawling at any time.
- Efficient backend using FastAPI for websocket communication.
- Modern, responsive frontend using React.js.

![Screenshot 2024-12-06 165331](https://github.com/user-attachments/assets/7c4ed874-e93a-4705-ba28-2079dbe6c498)
DFS Crawl
![Screenshot (124)](https://github.com/user-attachments/assets/2e831fef-45be-4df0-a47a-03e2943cfbde)
![Screenshot (123)](https://github.com/user-attachments/assets/f891bb53-bc9f-472e-b514-dfff95109efe)
![Screenshot (122)](https://github.com/user-attachments/assets/528f466b-46f5-4391-aabd-4da8e1ed83be)
![Screenshot (121)](https://github.com/user-attachments/assets/7dd972ae-85ea-425d-801a-bf876e3c8ed2)
![Screenshot (120)](https://github.com/user-attachments/assets/50a51149-3024-40a7-91a3-4f031b23739a)
![Screenshot (119)](https://github.com/user-attachments/assets/2601b3a3-ec5a-41e6-a890-68e203f8f641)
![Screenshot (118)](https://github.com/user-attachments/assets/cbec4f1e-4bb0-4934-85d1-361f26641ac5)

BFS Crawl
![Screenshot (129)](https://github.com/user-attachments/assets/ce3eb681-a9d6-4043-9a1c-9e9ca9c61be6)
![Screenshot (128)](https://github.com/user-attachments/assets/230d1620-a89c-4c5e-8d36-3fb354bd0e7d)
![Screenshot (127)](https://github.com/user-attachments/assets/9bcf5168-e9d6-4a13-9ccd-792bdf0d03b2)
![Screenshot (126)](https://github.com/user-attachments/assets/64dde42c-2511-460a-89c8-a0e2e44160b7)
![Screenshot (125)](https://github.com/user-attachments/assets/1fabca6c-edcf-4c06-8cec-ae0f7d2aee53)



## Technologies Used
### Backend
- **FastAPI**: Handles websocket connections and implements crawling logic.
- **Python Libraries**:
  - `requests` for fetching web pages.
  - `BeautifulSoup` for parsing HTML and extracting links.
  - `asyncio` for asynchronous crawling.

### Frontend
- **React.js**: Frontend framework.
- **react-force-graph-2d**: Library for interactive graph visualization.
- **React Router**: Manages navigation between different views.
- **Tailwind CSS**: For responsive and modern UI design.

## Installation

### Prerequisites
- Python 3.9 or higher
- Node.js 14 or higher
- npm or yarn

### Backend Setup
1. Clone the repository:
   ```
   git clone https://github.com/khyatig0206/BFS-DFS-WebCrawler.git
   cd BFS-DFS-WebCrawler
   ```
   
3. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # For Linux/MacOS
   venv\Scripts\activate  # For Windows
   ```
4. Install the dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd web-crawler-visualizer
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Usage
1. Open your browser and navigate to the frontend URL (usually `http://localhost:5173`).
2. Enter a seed URL in the input field.
3. Choose either BFS Crawl or DFS Crawl to start crawling.
4. Visualize the crawling process in real-time as nodes and links appear on the graph.
5. Use the **Stop** button to halt the crawling process.


## API Endpoints
### WebSocket Endpoints
- `/ws/crawl`: Handles DFS crawling requests.
- `/ws/bfs-crawl`: Handles BFS crawling requests.




