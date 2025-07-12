import type { DecodedUser } from "../auth.d.ts";
declare global {
    namespace Express {
        interface Request {
            user: DecodedUser;
        }
    }
}
