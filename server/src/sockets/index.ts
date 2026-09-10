import { Server as SocketIOServer, Socket } from 'socket.io';

export const initSockets = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Join workspace room
    socket.on('join_workspace', (workspaceId: string) => {
      socket.join(`workspace:${workspaceId}`);
      console.log(`[Socket.IO] Socket ${socket.id} joined room: workspace:${workspaceId}`);
    });

    // Join project room
    socket.on('join_project', (projectId: string) => {
      socket.join(`project:${projectId}`);
      console.log(`[Socket.IO] Socket ${socket.id} joined room: project:${projectId}`);
    });

    // Broadcast Task Updates (Status shifts, inline edits)
    socket.on('task_update', (data: { projectId: string; task: any }) => {
      const room = `project:${data.projectId || 'caresprint'}`;
      socket.to(room).emit('task:updated', data.task);
      io.to(`workspace:zansta-core`).emit('activity:new', {
        id: `act_${Date.now()}`,
        userName: 'Team Member',
        action: `updated task "${data.task.title}" to ${data.task.status}`,
        time: 'Just now',
      });
    });

    // Broadcast New Comment (with @mentions)
    socket.on('comment_add', (data: { projectId: string; taskId: string; comment: any }) => {
      const room = `project:${data.projectId || 'caresprint'}`;
      io.to(room).emit('comment:created', data);

      // Trigger notification if comment mentions a user
      if (data.comment.text.includes('@')) {
        io.emit('notification:new', {
          id: `notif_${Date.now()}`,
          type: 'MENTION',
          title: 'You were mentioned in a comment',
          message: `${data.comment.author} mentioned you: "${data.comment.text}"`,
          read: false,
          time: 'Just now',
        });
      }
    });

    // User Presence Ping
    socket.on('presence_ping', (user: { name: string; email: string }) => {
      socket.broadcast.emit('presence:update', { user, status: 'online' });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};
