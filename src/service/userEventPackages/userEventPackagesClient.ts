import { BASE_URL } from '../constants';
import { IUserEventPackages, UserEventPackagesServer } from './userEventPackagesServer';

export class UserEventPackagesClient {
    static create = async (payload:IUserEventPackages) =>{
        const response = await UserEventPackagesServer.post(`${BASE_URL}/userEventPackages`, payload)
        return response
    }

    static getList = async (params:IUserEventPackages) =>{
        const response = await UserEventPackagesServer.get(`${BASE_URL}/userEventPackages`, params)
        return response
    }
}