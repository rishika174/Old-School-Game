# Old School Game

Welcome to the **Old School Game** project! This is a simple Tic-Tac-Toe game built with Next.js, featuring real-time multiplayer functionality using Socket.io.

## Project Overview

**Time Pass** is a fun Tic-Tac-Toe game where you can create or join a game room and play with other users in real-time. The project consists of a frontend built with Next.js and a backend powered by Nest.js with Socket.io for real-time communication.


### Project Structure

- **Frontend (Next.js)**
  - `src/app/game/tic-tac-toe/page.tsx`: Main game logic and UI
  - `src/app/page.tsx`: Home page with game start link

- **Backend**
  - `src/app/server/server.js`: Entry point for the WebSocket server
  - `src/app/server/socketInstance.js`: Socket.io server configuration and game logic

### How to Play

1. **Create a Game**: Click the "Create Game" button on the home page to create a new game room. Share the game number with your friend.

2. **Join a Game**: Enter the game number provided by your friend and click "Join Game" to join their game room.

3. **Start Playing**: Once in the game room, make your moves by clicking on the board. The game updates in real-time for both players.

### Contributing

Feel free to fork the repository and submit pull requests. If you encounter any issues or have suggestions, please create an [issue](https://github.com/ajaynegi45/Time-Pass/issues).


Enjoy playing Tic-Tac-Toe and contributing to the project!

