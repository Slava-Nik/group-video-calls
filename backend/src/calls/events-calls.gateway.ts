import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { v4 as uuidV4 } from 'uuid';

interface RoomParams {
  roomId: string;
  peerId: string;
  username?: string;
}

@WebSocketGateway({
  cors: {
    origin: ['https://admin.socket.io', 'http://localhost:5173'],
    credentials: true,
  },
})
export class EventsCallsGateway implements OnGatewayInit, OnModuleInit {
  @WebSocketServer()
  server: Server;

  private rooms: Record<string, string[]> = {};

  afterInit() {
    instrument(this.server, {
      auth: false,
      mode: 'development',
    });
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('client connected', socket.id);

      socket.on('disconnect', (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
      });
    });
  }

  @SubscribeMessage('create-room')
  public handleCreateRoom(socket: Socket) {
    const roomId = uuidV4();
    this.rooms[roomId] = [];
    socket.emit('room-created', { roomId });
    console.log('Room was created');
  }

  @SubscribeMessage('join-room')
  public handleJoinRoom(
    socket: Socket,
    { roomId, peerId, username }: RoomParams,
  ) {
    if (!roomId || !this.rooms[roomId] || !peerId) return;
    this.rooms[roomId].push(peerId);
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', { peerId, username });
    socket.emit('get-users', { roomId, participants: this.rooms[roomId] });
    console.log('User joined the room', peerId);
    socket.on('disconnect', () => {
      this.handleLeaveRoom({ roomId, peerId });
      socket.to(roomId).emit('user-disconnected', { peerId });
    });
  }

  public handleLeaveRoom({ roomId, peerId }: RoomParams) {
    this.rooms[roomId] = this.rooms[roomId].filter((id) => id !== peerId);
  }
}
