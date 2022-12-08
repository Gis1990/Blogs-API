import {settings} from "../settings";
import {UserAccountDBClass} from "../types/types";
import jwt from 'jsonwebtoken'



export class JwtService {
    async createAccessJWT(user: UserAccountDBClass) {
        const accessToken = jwt.sign({userId: user.id}, settings.jwtAccessTokenSecret, {expiresIn: '10 seconds'})
        return accessToken
    }
    async createRefreshJWT(user: UserAccountDBClass) {
        const refreshToken = jwt.sign({userId: user.id,ip:user.userDevicesData[0].ip,title:user.userDevicesData[0].title,lastActiveDate:user.userDevicesData[0].lastActiveDate,deviceId:user.userDevicesData[0].deviceId}, settings.jwtRefreshTokenSecret, {expiresIn: '20 seconds'})
        return refreshToken
    }
    async getUserIdByAccessToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.jwtAccessTokenSecret)
            return result.userId
        } catch (error) {
            return null
        }
    }
    async getUserIdByRefreshToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.jwtRefreshTokenSecret)
            return result.userId
        } catch (error) {
            return null
        }
    }
}





