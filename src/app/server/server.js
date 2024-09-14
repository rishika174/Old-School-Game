import { io } from './socketInstance.js';
//  3001 use in production
const PORT = Number(process.env.PORT) || 3001;
io.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
});
