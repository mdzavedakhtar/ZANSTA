import { io, Socket } from 'socket.io-client';

export const getSocketUrl = (): string => {
  const envUrl = import.meta.env.VITE_SOCKET_URL;

  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    if (envUrl && !envUrl.includes('localhost') && envUrl.startsWith('http')) {
      return envUrl;
    }

    if (isLocalhost) {
      return `${protocol}//${hostname}:5000`;
    }

    // On LAN device (e.g. 192.168.1.10)
    if (hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.')) {
      return `${protocol}//${hostname}:5000`;
    }

    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  }

  return envUrl || 'http://localhost:5000';
};


class SocketService {
  private socket: Socket | null = null;

  public connect() {
    if (this.socket) return;

    this.socket = io(getSocketUrl(), {
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
