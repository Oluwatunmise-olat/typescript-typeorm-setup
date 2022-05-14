import jwt from "jsonwebtoken";
import { IPayload } from "../interfaces/jwt-payload.interface";

class JwtService {
  async generateAccessToken(payload: IPayload) {
    return await jwt.sign(payload, process!.env!.JWT_SECRET_KEY!, {
      expiresIn: 60 * 60, // expires in 1 hour
    });
  }
}

export default new JwtService();
