import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Páginas públicas que não precisam de autenticação
  const publicPaths = ["/login"]

  // Se está tentando acessar uma página pública, permitir
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Se está na página inicial, permitir (será tratado pelo componente)
  if (pathname === "/") {
    return NextResponse.next()
  }

  // Verificar autenticação para rotas protegidas
  const authCookie = request.cookies.get("auth-storage")

  if (!authCookie) {
    // Se não há cookie de autenticação, redirecionar para login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Tentar parsear o cookie de autenticação
    const authData = JSON.parse(authCookie.value)
    const isAuthenticated = authData?.state?.isAuthenticated
    const userRank = Number.parseInt(authData?.state?.user?.rank || "1")

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Verificar permissões baseadas em rank para rotas específicas
    const protectedRoutes = {
      "/rh": 3, // RH precisa de rank 3+
      "/relatorios": 2, // Relatórios precisam de rank 2+
      "/folha": 4, // Folha precisa de rank 4+
      "/configuracoes": 4, // Configurações precisam de rank 4+
    }

    // Verificar se a rota atual requer permissões especiais
    for (const [route, requiredRank] of Object.entries(protectedRoutes)) {
      if (pathname.startsWith(route) && userRank < requiredRank) {
        // Usuário não tem permissão suficiente, redirecionar para dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
  } catch (error) {
    // Se houver erro ao parsear o cookie, redirecionar para login
    console.error("Erro ao verificar autenticação:", error)
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Para outras páginas, permitir acesso
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
