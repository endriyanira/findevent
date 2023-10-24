import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"
import { Utils } from "./utils";

export default function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const protectedPaths = [ "/user", "/admin"]
    const isPathProtected = protectedPaths?.some((path) => pathname.startsWith(path))
    const res = NextResponse.next()
    const token = req.cookies.get('accessToken')?.value!;

    const decodedToken = Utils.decodeJWT(token!)
    const userId:string = decodedToken ? decodedToken.sub : null;
    console.log(userId)

    if(isPathProtected){
        if(!token){
            const url = new URL(`/login`, req.url)
            return NextResponse.redirect(url);
        }
        if(token){
            console.log("userID", userId)
            if(req.nextUrl.pathname.startsWith("/admin") && userId.includes("user")){
                const url = new URL(`/`, req.url)
                return NextResponse.redirect(url);

            }
            if(req.nextUrl.pathname.startsWith("/user") && userId.includes("admin")){
                const url = new URL(`/admin`, req.url)
                return NextResponse.redirect(url);

            }
        }
        
    }
    if(token && ( req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup"))){
        return NextResponse.redirect(new URL ("/", req.url))
        
    } 

    return res
}

export const config = {
    matcher: ["/login", "/signup", "/admin/:path*", "/user/:path*"]
};