import { IPackage } from "@/interfaces/event"
import { BASE_URL } from "../constants"
import { PackageServer } from "./packageServer"

export class PackageClient {
    static getPackageListByEvent = async (eventId:number) => {
        const response = await PackageServer.get(`${BASE_URL}/packages`, {eventId: eventId})
        return response
    }

    static updatePackageById = async (packageId:number, payload: IPackage) =>{
        const response = await PackageServer.patch(`${BASE_URL}/packages/${packageId}`, payload)
        return response
    }

    static postPackage = async (payload:IPackage) => {
        const response = await PackageServer.post(`${BASE_URL}/packages`, payload)
        return response
    }
}