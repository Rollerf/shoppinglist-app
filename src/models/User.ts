export class User {
    userName: string;
    accessToken: string;
    refreshToken: string;

    constructor(userName: string, refreshToken: string, accessToken: string) {
        this.userName = userName;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
    }
}