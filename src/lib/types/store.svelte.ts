export type userRole = "host" | "guest";

class AppStates {
    lobbyUserRole?:userRole = $state();
}

export const controller = new AppStates();