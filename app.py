from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup
import asyncio

app = FastAPI()

stop_flag = False
visited = set()


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[WebSocket] = {}

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[websocket] = websocket
        print(f"New connection accepted: {websocket}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            del self.active_connections[websocket]
            print(f"Disconnected WebSocket: {websocket}")

    async def broadcast(self, message: dict):
        for connection in list(self.active_connections.keys()):
            try:
                await connection.send_json(message)
            except WebSocketDisconnect:
                self.disconnect(connection)


manager = ConnectionManager()


def get_links(url: str):
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.content, "html.parser")
        links = set()
        for a_tag in soup.find_all("a", href=True):
            href = a_tag.get("href")
            full_url = urljoin(url, href)
            if urlparse(full_url).netloc == urlparse(url).netloc:  # Same domain
                links.add(full_url)
        return links
    except Exception as e:
        print(f"Error fetching links from {url}: {e}")
        return set()


async def dfs_crawl(url, websocket: WebSocket):
    global stop_flag
    stack = [url]
    parent_map = {}

    while stack:
        if stop_flag:
            print("Crawling stopped.")
            break
        current = stack.pop()
        if current not in visited:
            visited.add(current)
            await websocket.send_json({
                "url": current,
                "parent": parent_map.get(current)
            })

            links = get_links(current)
            for link in links - visited:
                stack.append(link)
                parent_map[link] = current

            await asyncio.sleep(0.1)  # Simulate delay


@app.websocket("/ws/crawl")
async def crawl(websocket: WebSocket):
    global stop_flag, visited
    visited = set()
    stop_flag = False  # Reset stop flag

    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            if "stop" in data and data["stop"]:
                stop_flag = True
                break

            url = data.get("seedUrl")
            if url:
                print(f"Starting DFS crawl with seed URL: {url}")
                await dfs_crawl(url, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"Unexpected error: {e}")




async def bfs_crawl(url, websocket: WebSocket):
    global stop_flag
    queue = [url]
    parent_map = {}

    while queue:
        if stop_flag:
            print("Crawling stopped.")
            break
        current = queue.pop(0)
        if current not in visited:
            visited.add(current)
            await websocket.send_json({
                "url": current,
                "parent": parent_map.get(current)
            })

            links = get_links(current)
            for link in links - visited:
                queue.append(link)
                parent_map[link] = current

            await asyncio.sleep(0.1)  # Simulate delay

@app.websocket("/ws/bfs-crawl")
async def crawl(websocket: WebSocket):
    global stop_flag, visited
    visited = set()
    stop_flag = False  # Reset stop flag

    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            if "stop" in data and data["stop"]:
                stop_flag = True
                break

            url = data.get("seedUrl")
            if url:
                print(f"Starting BFS crawl with seed URL: {url}")
                await bfs_crawl(url, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"Unexpected error: {e}")


