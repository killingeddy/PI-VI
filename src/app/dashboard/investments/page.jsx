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
        <h1 className="text-3xl font-bold tracking-tight">
          Investment Portfolio
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Assets</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="bonds">Bonds</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
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
                      <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                      <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                      <DropdownMenuItem>Value (High-Low)</DropdownMenuItem>
                      <DropdownMenuItem>Value (Low-High)</DropdownMenuItem>
                      <DropdownMenuItem>
                        Performance (Best-Worst)
                      </DropdownMenuItem>
                      <DropdownMenuItem>
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
                    <TableCell className="font-medium">AAPL</TableCell>
                    <TableCell>Apple Inc.</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell className="text-right">10</TableCell>
                    <TableCell className="text-right">$199.90</TableCell>
                    <TableCell className="text-right">$1,999.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +15.4%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">MSFT</TableCell>
                    <TableCell>Microsoft Corporation</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell className="text-right">8</TableCell>
                    <TableCell className="text-right">$312.50</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +8.2%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TSLA</TableCell>
                    <TableCell>Tesla, Inc.</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell className="text-right">5</TableCell>
                    <TableCell className="text-right">$640.00</TableCell>
                    <TableCell className="text-right">$3,200.00</TableCell>
                    <TableCell className="text-right text-red-500">
                      -3.1%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">BTC</TableCell>
                    <TableCell>Bitcoin</TableCell>
                    <TableCell>Crypto</TableCell>
                    <TableCell className="text-right">0.05</TableCell>
                    <TableCell className="text-right">$60,000.00</TableCell>
                    <TableCell className="text-right">$3,000.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +22.5%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">VGSH</TableCell>
                    <TableCell>Vanguard Short-Term Treasury ETF</TableCell>
                    <TableCell>Bond</TableCell>
                    <TableCell className="text-right">20</TableCell>
                    <TableCell className="text-right">$58.15</TableCell>
                    <TableCell className="text-right">$1,163.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +1.2%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">VNQ</TableCell>
                    <TableCell>Vanguard Real Estate ETF</TableCell>
                    <TableCell>Real Estate</TableCell>
                    <TableCell className="text-right">12</TableCell>
                    <TableCell className="text-right">$85.75</TableCell>
                    <TableCell className="text-right">$1,029.00</TableCell>
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
              <CardTitle>Stocks</CardTitle>
              <CardDescription>Your stock investments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Shares</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">AAPL</TableCell>
                    <TableCell>Apple Inc.</TableCell>
                    <TableCell className="text-right">10</TableCell>
                    <TableCell className="text-right">$199.90</TableCell>
                    <TableCell className="text-right">$1,999.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +15.4%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">MSFT</TableCell>
                    <TableCell>Microsoft Corporation</TableCell>
                    <TableCell className="text-right">8</TableCell>
                    <TableCell className="text-right">$312.50</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                    <TableCell className="text-right text-green-500">
                      +8.2%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TSLA</TableCell>
                    <TableCell>Tesla, Inc.</TableCell>
                    <TableCell className="text-right">5</TableCell>
                    <TableCell className="text-right">$640.00</TableCell>
                    <TableCell className="text-right">$3,200.00</TableCell>
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
              <CardTitle>Bonds</CardTitle>
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
                    <TableCell className="font-medium">VGSH</TableCell>
                    <TableCell>Vanguard Short-Term Treasury ETF</TableCell>
                    <TableCell className="text-right">20</TableCell>
                    <TableCell className="text-right">$58.15</TableCell>
                    <TableCell className="text-right">$1,163.00</TableCell>
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
              <CardTitle>Cryptocurrency</CardTitle>
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
                    <TableCell className="font-medium">BTC</TableCell>
                    <TableCell>Bitcoin</TableCell>
                    <TableCell className="text-right">0.05</TableCell>
                    <TableCell className="text-right">$60,000.00</TableCell>
                    <TableCell className="text-right">$3,000.00</TableCell>
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
              <CardTitle>Real Estate</CardTitle>
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
                    <TableCell className="font-medium">VNQ</TableCell>
                    <TableCell>Vanguard Real Estate ETF</TableCell>
                    <TableCell className="text-right">12</TableCell>
                    <TableCell className="text-right">$85.75</TableCell>
                    <TableCell className="text-right">$1,029.00</TableCell>
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
