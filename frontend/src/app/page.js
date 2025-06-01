import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky px-5 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block text-[var(--color-teal-0)]">
                Projeto Interdisciplinar
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
              <Link href="/login" className="px-4">
                <Button variant="ghost" className="text-sm font-medium text-[var(--color-teal-0)]">
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-sm font-medium bg-[var(--color-teal-1)]">Cadastrar-se</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[var(--color-teal-0)]">
                  Controle suas finanças e investimentos em um só lugar
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Acompanhe seus investimentos, controle suas finanças e tome
                  decisões mais inteligentes com a nossa plataforma de gestão
                  de investimentos
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button className="inline-flex h-10 items-center justify-center rounded-md px-8 bg-[var(--color-teal-1)]">
                      Cadastrar-se
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-14 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[var(--color-teal-1)]">
                  Recursos da plataforma
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tenha acesso a uma série de recursos para te ajudar a tomar
                  decisões mais inteligentes sobre seus investimentos
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-[var(--background)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#235c5b] text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-teal-3)]">
                  Controle de Investimentos
                </h3>
                <p className="text-center text-muted-foreground">
                  Monitore seus investimentos em tempo real com atualizações
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-[var(--background)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#235c5b] text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-teal-3)]">
                  Registro de Transações
                </h3>
                <p className="text-center text-muted-foreground">
                  Tenha um registro completo de todas as suas transações
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-[var(--background)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#235c5b] text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    
                  >
                    <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                    <line x1="2" y1="20" x2="2" y2="20" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-teal-3)]">
                  Análise de Desempenho
                </h3>
                <p className="text-center text-muted-foreground">
                  Analise o desempenho dos seus investimentos com gráficos
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 px-5 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm leading-loose text-[var(--color-teal-4)] md:text-left">
              © Projeto Interdisciplinar 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
