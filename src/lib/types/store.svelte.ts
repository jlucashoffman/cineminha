export type userRole = "host" | "guest";

export interface IViewer {
    id: string,
    name: string,
    role: userRole,
}

class AppStates {
    userName:string = $state("");
    lobbyUserRole?:userRole = $state();
    roomCode?:string = $state();
    viewers:IViewer[] = $state([]);
}

export const controller = new AppStates();