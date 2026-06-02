export type userRole = "host" | "guest";

class AppStates {
    lobbyUserRole?:userRole = $state();
    roomCode?:string = $state();
}

export const controller = new AppStates();