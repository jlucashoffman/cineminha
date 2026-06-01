export type userRole = "host" | "guest";

class AppStates {
    lobbyUserRole?:userRole = $state();
    roomCode?:number = $state();
}

export const controller = new AppStates();