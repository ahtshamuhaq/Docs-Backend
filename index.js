import { Server } from "socket.io";
import express from "express";
import Connection from "./database/db.js";
import { signup, login } from "./controller/userController.js";
import {
  getDocument,
  updateDocument,
} from "./controller/document-controller.js";
import { createServer } from "http";
import cors from "cors";

const PORT = 9000;

Connection();
const app = express();
app.use(cors());

app.use(express.json());

app.post("/signup", signup);
app.post("/login", login);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});
httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await getDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await updateDocument(documentId, data);
    });
  });
});
