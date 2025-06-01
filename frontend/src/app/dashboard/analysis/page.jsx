import { BarChart, LineChart, PieChart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalysisPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-teal-0)]">
          Investment Analysis
        </h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="1y">
            <SelectTrigger className="w-[180px] text-[var(--color-teal-1)]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m" className="text-[var(--color-teal-1)]">1 Month</SelectItem>
              <SelectItem value="3m" className="text-[var(--color-teal-1)]">3 Months</SelectItem>
              <SelectItem value="6m" className="text-[var(--color-teal-1)]">6 Months</SelectItem>
              <SelectItem value="1y" className="text-[var(--color-teal-1)]">1 Year</SelectItem>
              <SelectItem value="3y" className="text-[var(--color-teal-1)]">3 Years</SelectItem>
              <SelectItem value="5y" className="text-[var(--color-teal-1)]">5 Years</SelectItem>
              <SelectItem value="all" className="text-[var(--color-teal-1)]">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="text-[var(--color-teal-1)]">Export</Button>
        </div>
      </div>
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance" className="text-[var(--color-teal-4)]">Performance</TabsTrigger>
          <TabsTrigger value="allocation" className="text-[var(--color-teal-4)]">Allocation</TabsTrigger>
          <TabsTrigger value="comparison" className="text-[var(--color-teal-4)]">Comparison</TabsTrigger>
          <TabsTrigger value="risk" className="text-[var(--color-teal-4)]">Risk Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-[var(--color-teal-1)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Return
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+15.4%</div>
                <p className="text-xs text-muted-foreground">
                  +$6,120.00 in the last year
                </p>
              </CardContent>
            </Card>
            <Card className="text-[var(--color-teal-1)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Annualized Return
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+12.8%</div>
                <p className="text-xs text-muted-foreground">
                  vs. S&P 500: +10.2%
                </p>
              </CardContent>
            </Card>
            <Card className="text-[var(--color-teal-1)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Volatility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.2%</div>
                <p className="text-xs text-muted-foreground">
                  vs. S&P 500: 15.8%
                </p>
              </CardContent>
            </Card>
            <Card className="text-[var(--color-teal-1)]"> 
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sharpe Ratio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2</div>
                <p className="text-xs text-muted-foreground">
                  Good risk-adjusted return
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader className="text-[var(--color-teal-2)]">
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>
                Historical performance of your portfolio compared to benchmarks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted rounded-md flex items-center justify-center">
                <LineChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Performance Chart
                </span>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="text-[var(--color-teal-2)]">
                <CardTitle>Monthly Returns</CardTitle>
                <CardDescription>Monthly performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Monthly Returns Chart
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-[var(--color-teal-2)]">
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>
                  Assets with the highest contribution to returns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="font-medium text-[var(--color-teal-1)]">AAPL</div>
                    <div className="ml-auto font-medium text-green-500">
                      +4.2%
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium text-[var(--color-teal-1)]">BTC</div>
                    <div className="ml-auto font-medium text-green-500">
                      +3.8%
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium text-[var(--color-teal-1)]">MSFT</div>
                    <div className="ml-auto font-medium text-green-500">
                      +2.5%
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium text-[var(--color-teal-1)]">TSLA</div>
                    <div className="ml-auto font-medium text-green-500">
                      +1.9%
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium text-[var(--color-teal-1)]">VNQ</div>
                    <div className="ml-auto font-medium text-red-500">
                      -0.8%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="allocation" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="text-[var(--color-teal-2)]">
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>
                  Current distribution of your portfolio by asset class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Asset Allocation Chart
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Stocks</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Bonds</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Real Estate</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Crypto</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Cash</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-[var(--color-teal-2)]">
                <CardTitle>Sector Allocation</CardTitle>
                <CardDescription>
                  Distribution of your stock investments by sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Sector Allocation Chart
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Technology</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Healthcare</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Financial Services</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Consumer Discretionary</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Energy</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Other Sectors</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader className="text-[var(--color-teal-2)]">
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>
                Distribution of your investments by geographic region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                <PieChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Geographic Distribution Chart
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-[var(--color-teal-2)]">North America</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-teal-2)]">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-[var(--color-teal-2)]">Europe</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-teal-2)]">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-[var(--color-teal-2)]">Asia Pacific</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-teal-2)]">12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-[var(--color-teal-2)]">Emerging Markets</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-teal-2)]">5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-[var(--color-teal-2)]">Latin America</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-teal-2)]">2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                    <span className="text-sm text-[var(--color-teal-2)]">Other Regions</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-teal-2)]">1%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader className="text-[var(--color-teal-2)]">
              <CardTitle>Benchmark Comparison</CardTitle>
              <CardDescription>
                Performance of your portfolio compared to market benchmarks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted rounded-md flex items-center justify-center">
                <LineChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Benchmark Comparison Chart
                </span>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="text-sm text-[var(--color-teal-1)]">Your Portfolio</span>
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    +15.4%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-[var(--color-teal-1)]">S&P 500</span>
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    +10.2%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-[var(--color-teal-1)]">Nasdaq Composite</span>
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    +12.8%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-[var(--color-teal-1)]">
                      Dow Jones Industrial Average
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    +8.5%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-[var(--color-teal-1)]">
                      Bloomberg US Aggregate Bond Index
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    +2.1%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="text-[var(--color-teal-2)]">
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key performance metrics compared to benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-[var(--color-teal-3)]">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Annualized Return
                      </span>
                      <span className="text-sm font-medium">12.8%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[75%] rounded-full bg-[var(--color-teal-4)]"></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      vs. S&P 500: 10.2%
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">Sharpe Ratio</span>
                      <span className="text-sm font-medium">1.2</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[65%] rounded-full bg-[var(--color-teal-4)]"></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      vs. S&P 500: 1.0
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Maximum Drawdown
                      </span>
                      <span className="text-sm font-medium">-12.5%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[40%] rounded-full bg-[var(--color-teal-4)]"></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      vs. S&P 500: -15.2%
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">Beta</span>
                      <span className="text-sm font-medium">0.85</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[85%] rounded-full bg-[var(--color-teal-4)]"></div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      vs. S&P 500: 1.0
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-[var(--color-teal-2)]">
                <CardTitle>Peer Comparison</CardTitle>
                <CardDescription>
                  How your portfolio compares to similar investors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full bg-muted rounded-md flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Peer Comparison Chart
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-teal-1)]">Your Portfolio</span>
                    <span className="text-sm font-medium text-green-500">
                      +15.4%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-teal-1)]">Top 10% Investors</span>
                    <span className="text-sm font-medium text-green-500">
                      +18.2%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-teal-1)]">Average Investor</span>
                    <span className="text-sm font-medium text-green-500">
                      +9.8%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-teal-1)]">Bottom 10% Investors</span>
                    <span className="text-sm font-medium text-green-500">
                      +3.5%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="risk" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-[var(--color-teal-1)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Volatility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.2%</div>
                <p className="text-xs text-muted-foreground">
                  vs. S&P 500: 15.8%
                </p>
              </CardContent>
            </Card>
            <Card className="text-[var(--color-teal-1)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Beta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.85</div>
                <p className="text-xs text-muted-foreground">
                  Lower risk than market
                </p>
              </CardContent>
            </Card>
            <Card className="text-[var(--color-teal-1)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Max Drawdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">-12.5%</div>
                <p className="text-xs text-muted-foreground">Last 12 months</p>
              </CardContent>
            </Card>
            <Card className="text-[var(--color-teal-1)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Value at Risk (95%)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">-2.1%</div>
                <p className="text-xs text-muted-foreground">Daily VaR</p>
              </CardContent>
            </Card>
          </div>
          <Card className="text-[var(--color-teal-2)]">
            <CardHeader>
              <CardTitle>Risk Analysis</CardTitle>
              <CardDescription>
                Detailed risk metrics for your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted rounded-md flex items-center justify-center">
                <LineChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Risk Analysis Chart
                </span>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-[var(--color-teal-2)]">Risk Contribution</CardTitle>
                <CardDescription>
                  How each asset contributes to overall portfolio risk
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full bg-muted rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Risk Contribution Chart
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">TSLA</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">BTC</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">AAPL</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">MSFT</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                      <span className="text-sm text-[var(--color-teal-1)]">Other Assets</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-teal-1)]">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-[var(--color-teal-2)]">Stress Test Scenarios</CardTitle>
                <CardDescription>
                  How your portfolio might perform in different market scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--color-teal-1)]">
                        Market Crash (-30%)
                      </span>
                      <span className="text-sm font-medium text-red-500">
                        -22.5%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[75%] rounded-full bg-red-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--color-teal-1)]">
                        Tech Sector Decline (-20%)
                      </span>
                      <span className="text-sm font-medium text-red-500">
                        -15.2%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[76%] rounded-full bg-red-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--color-teal-1)]">
                        Interest Rate Hike (+1%)
                      </span>
                      <span className="text-sm font-medium text-red-500">
                        -5.8%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[29%] rounded-full bg-red-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--color-teal-1)]">
                        Inflation Surge (+3%)
                      </span>
                      <span className="text-sm font-medium text-red-500">
                        -8.2%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[41%] rounded-full bg-red-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--color-teal-1)]">Economic Boom</span>
                      <span className="text-sm font-medium text-green-500">
                        +12.5%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[62%] rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
