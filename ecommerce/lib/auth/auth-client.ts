import { createAuthClient } from 'better-auth/client';

function serverBaseUrl(): string {
    return (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(
        /\/+$/,
        ''
    )
}

function createConfigureClient(baseUrl: string) {
    return createAuthClient({
        baseUrl,
        basePath: '/api/auth'
    })
};

type AuthClient = ReturnType<typeof createConfigureClient>;

let browserClient: AuthClient | null = null;
let browserOrigin: string | null = null;

export function getAuthClient(): AuthClient {
    if(typeof window !== 'undefined') {
        const origin = window.location.origin;

        if(!browserClient || browserOrigin !== origin) {
            browserClient = createConfigureClient(origin);
            browserOrigin = origin;
        }
        return browserClient;
    }

    return createConfigureClient(serverBaseUrl());
}