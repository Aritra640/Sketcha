import { auth } from "@repo/db_auth_service"; 
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
