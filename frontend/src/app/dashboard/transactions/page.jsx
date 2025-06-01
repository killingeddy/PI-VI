import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  Filter,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-teal-0)]">Transações</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1 bg-[var(--color-teal-1)]">
            <Plus className="h-3.5 w-3.5" />
            <span>Adicionar Transações</span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-[var(--color-teal-1)]">Histórico de transações</CardTitle>
          <CardDescription>
            Aqui você pode visualizar todas as transações realizadas na sua
            conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="grid w-full sm:max-w-sm items-center gap-1.5">
                <Input
                  type="text"
                  placeholder="Procurar..."
                  className="h-8"
                  prefix={
                    <Search className="h-3.5 w-3.5 text-muted-foreground" />
                  }
                />
              </div>
              <div className="grid w-full sm:max-w-sm items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-[180px]">
                      <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="buy">Compras</SelectItem>
                      <SelectItem value="sell">Vendas</SelectItem>
                      <SelectItem value="dividend">Dividendos</SelectItem>
                      <SelectItem value="deposit">Depósitos</SelectItem>
                      <SelectItem value="withdrawal">Retiradas</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-[var(--color-teal-1)]">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span>Mar 1, 2025 - Mar 31</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-[var(--color-teal-1)]">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filtro</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">Mar 15, 2025</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                          <ArrowUpIcon className="h-3 w-3 text-green-500" />
                        </div>
                        <span>Compra</span>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">1</TableCell>
                    <TableCell className="text-right">R$ 199,90</TableCell>
                    <TableCell className="text-right font-medium text-[var(--color-teal-3)]">
                      R$ 199,90
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">Mar 12, 2025</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                          <ArrowDownIcon className="h-3 w-3 text-blue-500" />
                        </div>
                        <span>Depósitos</span>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>Transferência bancária</TableCell>
                    <TableCell className="text-right">-</TableCell>
                    <TableCell className="text-right">-</TableCell>
                    <TableCell className="text-right font-medium text-[var(--color-teal-3)]">
                      R$ 5.000,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">Mar 10, 2025</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                          <ArrowDownIcon className="h-3 w-3 text-red-500" />
                        </div>
                        <span>Venda</span>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">8</TableCell>
                    <TableCell className="text-right">R$ 312,50</TableCell>
                    <TableCell className="text-right font-medium text-[var(--color-teal-3)]">
                      R$ 2.500,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">Mar 8, 2025</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                          <ArrowUpIcon className="h-3 w-3 text-green-500" />
                        </div>
                        <span>Compra</span>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">5</TableCell>
                    <TableCell className="text-right">R$ 640,00</TableCell>
                    <TableCell className="text-right font-medium text-[var(--color-teal-3)]">
                      R$ 3.200,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">Mar 5, 2025</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                          <ArrowDownIcon className="h-3 w-3 text-purple-500" />
                        </div>
                        <span>Dividendo</span>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">-</TableCell>
                    <TableCell className="text-right">-</TableCell>
                    <TableCell className="text-right font-medium text-[var(--color-teal-3)]">
                      R$ 45,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">Mar 1, 2025</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                          <ArrowUpIcon className="h-3 w-3 text-green-500" />
                        </div>
                        <span>Compra</span>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">0.05</TableCell>
                    <TableCell className="text-right">R$ 60.000,00</TableCell>
                    <TableCell className="text-right font-medium text-[var(--color-teal-3)]">
                      R$ 3.000,00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando <strong>6</strong> de <strong>24</strong> transações
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
