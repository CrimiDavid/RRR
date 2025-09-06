"use client"
import {authClient} from "@/lib/auth-client";

export const useSession = () => {
    const {
        data: session,
        isPending, //loading state
        error, //error object
    } = authClient.useSession()

    return {session, isPending, error}
}