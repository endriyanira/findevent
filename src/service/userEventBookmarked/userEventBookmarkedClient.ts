import { BASE_URL } from "../constants";
import { UserEventBookmarkedData, UserEventBookmarkedServer } from "./userEventBookmarkedServer";

export class UserEventBookmarkedClient {
    static create = async (payload:UserEventBookmarkedData) => {
        const response = await UserEventBookmarkedServer.post(`${BASE_URL}/userEventBookmarked`,payload)
        return response
    }
}