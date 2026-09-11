import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  public connect() {
    if (this.socket) return;

    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log(`[Socket.IO Client] Connected with ID: ${this.socket?.id}`);
    });

    this.socket.on('connect_error', (err) => {
      console.warn(`[Socket.IO Client] Connection Notice: Server Gateway offline (${err.message}). App running in decoupled state.`);
    });
  }

  public joinWorkspace(workspaceId: string = 'zansta-core') {
    this.socket?.emit('join_workspace', workspaceId);
  }

  public joinProject(projectId: string = 'caresprint') {
    this.socket?.emit('join_project', projectId);
  }

  public emitTaskUpdate(projectId: string, task: any) {
    this.socket?.emit('task_update', { projectId, task });
  }

  public emitCommentAdd(projectId: string, taskId: string, comment: any) {
    this.socket?.emit('comment_add', { projectId, taskId, comment });
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback);
  }

  public off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback);
  }

  public disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const socketService = new SocketService();
