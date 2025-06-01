import { ArrowUpDown, ChevronDown, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InvestmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-teal-0)]">
          Investment Portfolio
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1 text-[var(--color-teal-1)]">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="text-[var(--color-teal-4)]">All Assets</TabsTrigger>
          <TabsTrigger value="stocks" className="text-[var(--color-teal-4)]">Stocks</TabsTrigger>
          <TabsTrigger value="bonds" className="text-[var(--color-teal-4)]">Bonds</TabsTrigger>
          <TabsTrigger value="crypto" className="text-[var(--color-teal-4)]">Crypto</TabsTrigger>
          <TabsTrigger value="real-estate" className="text-[var(--color-teal-4)]">Real Estate</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between text-[var(--color-teal-1)]">
                <CardTitle>Your Investments</CardTitle>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search assets..."
                    className="h-8 w-[150px] lg:w-[250px]"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <span>Sort</span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-[var(--color-teal-2)]">Name (A-Z)</DropdownMenuItem>
                      <DropdownMenuItem className="text-[var(--color-teal-2)]">Name (Z-A)</DropdownMenuItem>
                      <DropdownMenuItem className="text-[var(--color-teal-2)]">Value (High-Low)</DropdownMenuItem>
                      <DropdownMenuItem className="text-[var(--color-teal-2)]">Value (Low-High)</DropdownMenuItem>
                      <DropdownMenuItem className="text-[var(--color-teal-2)]">
                        Performance (Best-Worst)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[var(--color-teal-2)]">
                        Performance (Worst-Best)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardDescription>
                A comprehensive view of all your investment assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Shares/Units</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center justify-end">
                        Performance
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">AAPL</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Apple Inc.</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Stock</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">10</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$199.90</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$1,999.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +15.4%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">MSFT</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Microsoft Corporation</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Stock</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">8</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$312.50</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$2,500.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +8.2%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">TSLA</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Tesla, Inc.</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Stock</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">5</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$640.00</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$3,200.00</TableCell>
                    <TableCell className="text-right text-red-500">
                      -3.1%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">BTC</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Bitcoin</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Crypto</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">0.05</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$60,000.00</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$3,000.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +22.5%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">VGSH</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Vanguard Short-Term Treasury ETF</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Bond</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">20</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$58.15</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$1,163.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +1.2%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">VNQ</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Vanguard Real Estate ETF</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Real Estate</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">12</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$85.75</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$1,029.00</TableCell>
                    <TableCell className="text-right text-red-500">
                      -2.8%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[var(--color-teal-1)]">Stocks</CardTitle>
              <CardDescription>Your stock investments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead >Name</TableHead>
                    <TableHead className="text-right">Shares</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">AAPL</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Apple Inc.</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">10</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$199.90</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$1,999.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +15.4%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">MSFT</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Microsoft Corporation</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">8</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$312.50</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$2,500.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +8.2%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">TSLA</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Tesla, Inc.</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">5</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$640.00</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$3,200.00</TableCell>
                    <TableCell className="text-right text-red-500">
                      -3.1%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bonds">
          <Card>
            <CardHeader>
              <CardTitle className="text-[var(--color-teal-1)]">Bonds</CardTitle>
              <CardDescription>Your bond investments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">VGSH</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Vanguard Short-Term Treasury ETF</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">20</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$58.15</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$1,163.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +1.2%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle className="text-[var(--color-teal-1)]">Cryptocurrency</CardTitle>
              <CardDescription>Your cryptocurrency investments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">BTC</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Bitcoin</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">0.05</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$60,000.00</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$3,000.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +22.5%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="real-estate">
          <Card>
            <CardHeader>
              <CardTitle className="text-[var(--color-teal-1)]">Real Estate</CardTitle>
              <CardDescription>Your real estate investments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--color-teal-1)]">VNQ</TableCell>
                    <TableCell className="text-[var(--color-teal-1)]">Vanguard Real Estate ETF</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">12</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$85.75</TableCell>
                    <TableCell className="text-right text-[var(--color-teal-1)]">$1,029.00</TableCell>
                    <TableCell className="text-right text-red-500">
                      -2.8%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
