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
  private isConnecting: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.connect();
    }
  }

  public connect() {
    if (this.socket && (this.socket.connected || this.isConnecting)) return;

    try {
      this.isConnecting = true;
      this.socket = io(getSocketUrl(), {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 10000,
        timeout: 10000,
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        this.isConnecting = false;
        this.joinWorkspace('zansta-core');
      });

      // Global CMS Synchronization Listener without console pollution
      this.socket.on('cms:sync', (payload: { type: string; data?: any; timestamp: string }) => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('zansta:cms:update', {
              detail: payload,
            })
          );
        }
      });

      // Specific entity update listeners
      const entityTypes = [
        'project',
        'team',
        'service',
        'demo',
        'review',
        'landing',
        'enquiry',
        'demoRequest',
        'banner',
        'certificate',
      ];

      entityTypes.forEach((type) => {
        this.socket?.on(`cms:${type}:updated`, (data: any) => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(
              new CustomEvent('zansta:cms:update', {
                detail: { type, data, timestamp: new Date().toISOString() },
              })
            );
          }
        });
      });

      this.socket.on('connect_error', () => {
        this.isConnecting = false;
      });

      this.socket.on('disconnect', () => {
        this.isConnecting = false;
      });
    } catch {
      this.isConnecting = false;
    }
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
    if (!this.socket) this.connect();
    this.socket?.on(event, callback);
  }

  public off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback);
  }

  public disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.isConnecting = false;
  }
}

export const socketService = new SocketService();
