import { io } from './socketInstance.js';
const PORT = Number(process.env.PORT) || 3001;
io.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
});
