import authProxy from 'next-auth/middleware'

export default function proxy(req: any, ctx: any) {
    return authProxy(req, ctx)
}

export const config = {
    matcher: '/(.*)',
}
