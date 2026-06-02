export type userRole = "host" | "guest";

class AppStates {
    userName:string = $state("");
    lobbyUserRole?:userRole = $state();
    roomCode?:string = $state();
}

export const controller = new AppStates();