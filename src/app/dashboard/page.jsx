import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CreditCard,
  DollarSign,
  LineChart,
  PlusCircle,
  PieChart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Adicionar Transação</span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList>
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="analises">Análises</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="geral" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Saldo Total
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 2.231,89</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center gap-1">
                    <ArrowUpIcon className="h-3 w-3" />
                    +20.1%
                  </span>{" "}
                  desde o último mês
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Investimentos
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 234,59</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center gap-1">
                    <ArrowUpIcon className="h-3 w-3" />
                    +4.3%
                  </span>{" "}
                  desde a última semana
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dinheiro</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 4.395,00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 flex items-center gap-1">
                    <ArrowDownIcon className="h-3 w-3" />
                    -3.2%
                  </span>{" "}
                  desde o último mês
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Investimentos Totais
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center gap-1">
                    <ArrowUpIcon className="h-3 w-3" />
                    +2
                  </span>{" "}
                  desde o último mês
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Performance do Investimento</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Performance Chart
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Últimas Transações</CardTitle>
                <CardDescription>
                  Você realizou 3 transações recentemente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      <ArrowUpIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Conta de energia
                      </p>
                      <p className="text-sm text-muted-foreground">
                        12 de Março de 2025
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-red-500">
                      -R$ 115,17
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      <ArrowDownIcon className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Aluguel
                      </p>
                      <p className="text-sm text-muted-foreground">
                        10 de Março de 2025
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-red-500">
                      -$2,500.00
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      <ArrowUpIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Salário
                      </p>
                      <p className="text-sm text-muted-foreground">
                        8 de Março de 2025
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-green-500">
                      +$3,200.00
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="/dashboard/transactions"
                  className="text-sm text-primary flex items-center"
                >
                  Ver todas as transações
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analises" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  Investimento em Ações
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Asset Allocation Chart
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  Gastos por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                      <span className="text-sm">
                        Alimentação
                      </span>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      <span className="text-sm">
                        Transporte
                      </span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">
                        Lazer
                      </span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                      <span className="text-sm">
                        Crypto
                      </span>
                    </div>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                      <span className="text-sm">
                        Outros
                      </span>
                    </div>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Mensais</CardTitle>
              <CardDescription>
                Visualize e baixe os relatórios mensais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">
                      Relatório de Março de 2025
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Gerado em 1 de Abril de 2025
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">
                      Relatório de Fevereiro de 2025
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Gerado em 1 de Março de 2025
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">
                      Relatório de Janeiro de 2025
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Gerado em 1 de Fevereiro de 2025
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
