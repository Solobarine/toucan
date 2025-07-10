import { Socket } from "phoenix";

let socket: null | Socket = null;

export function initSocket(token: string) {
  socket = new Socket("ws://localhost:4000/socket", { params: { token } });
  socket.connect();
  return socket;
}

export function getSocket() {
  return socket;
}
