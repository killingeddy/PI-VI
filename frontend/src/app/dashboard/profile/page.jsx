import { LineChart, PieChart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-teal-0)]">
          Investment Profile
        </h1>
      </div>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="text-[var(--color-teal-4)]">Risk Profile</TabsTrigger>
          <TabsTrigger value="goals" className="text-[var(--color-teal-4)]">Investment Goals</TabsTrigger>
          <TabsTrigger value="preferences" className="text-[var(--color-teal-4)]">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-2 text-[var(--color-teal-1)]">
              <CardHeader>
                <CardTitle>Your Risk Profile</CardTitle>
                <CardDescription>
                  Based on your answers, your investment profile is:
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 text-[var(--color-teal-2)]">
                <div className="flex items-center justify-center py-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[var(--color-teal-1)]">
                      Moderate Growth
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      You have a balanced approach to risk and return
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Risk Tolerance</span>
                      <span className="text-sm font-medium">Moderate</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[60%] rounded-full bg-[var(--color-teal-3)]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Time Horizon</span>
                      <span className="text-sm font-medium">5-10 years</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[70%] rounded-full bg-[var(--color-teal-3)]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Financial Knowledge</span>
                      <span className="text-sm font-medium">Intermediate</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[65%] rounded-full bg-[var(--color-teal-3)]"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Retake Assessment
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-2 text-[var(--color-teal-1)]">
              <CardHeader>
                <CardTitle>Recommended Asset Allocation</CardTitle>
                <CardDescription>
                  Based on your risk profile, we recommend the following
                  allocation:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center mb-4">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Asset Allocation Chart
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Stocks</span>
                    </div>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Bonds</span>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Alternative Investments</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                      <span className="text-sm">Cash</span>
                    </div>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="text-[var(--color-teal-1)]">
            <CardHeader>
              <CardTitle>Risk Assessment Questionnaire</CardTitle>
              <CardDescription>
                Your answers to our risk assessment questionnaire
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[var(--color-teal-2)]">
              <div>
                <h3 className="font-medium mb-2">
                  1. How long do you plan to invest your money before you need
                  it?
                </h3>
                <RadioGroup defaultValue="5-10">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0-2" id="r1-1" className="checked:bg-[var(--color-teal-2)]"/>
                    <Label htmlFor="r1-1">0-2 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-5" id="r1-2" className="checked:bg-[var(--color-teal-2)]"/>
                    <Label htmlFor="r1-2">3-5 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5-10" id="r1-3" className="checked:bg-[var(--color-teal-2)]"/>
                    <Label htmlFor="r1-3">5-10 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10+" id="r1-4" className="checked:bg-[var(--color-teal-2)]"/>
                    <Label htmlFor="r1-4">10+ years</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">
                  2. How would you react if your investments lost 20% in a year?
                </h3>
                <RadioGroup defaultValue="concerned">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sell" id="r2-1" />
                    <Label htmlFor="r2-1">
                      Sell everything to prevent further losses
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="concerned" id="r2-2" />
                    <Label htmlFor="r2-2">
                      Be concerned but make no changes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="opportunity" id="r2-3" />
                    <Label htmlFor="r2-3">
                      See it as an opportunity to invest more
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">
                  3. What is your primary investment goal?
                </h3>
                <RadioGroup defaultValue="growth">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="preserve" id="r3-1" />
                    <Label htmlFor="r3-1">
                      Preserve capital with minimal risk
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="income" id="r3-2" />
                    <Label htmlFor="r3-2">Generate income</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="growth" id="r3-3" />
                    <Label htmlFor="r3-3">Achieve moderate growth</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aggressive" id="r3-4" />
                    <Label htmlFor="r3-4">
                      Maximize growth with higher risk
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Update Answers</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="goals" className="space-y-4">
          <Card className="text-[var(--color-teal-1)]">
            <CardHeader>
              <CardTitle>Investment Goals</CardTitle>
              <CardDescription>
                Track your progress toward your financial goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Retirement</h3>
                    <span className="text-sm font-medium">
                      $500,000 / $1,200,000
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[42%] rounded-full bg-[var(--color-teal-3)]"></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      42% complete
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Target date: 2045
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Home Purchase</h3>
                    <span className="text-sm font-medium">
                      $75,000 / $100,000
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[75%] rounded-full bg-[var(--color-teal-3)]"></div>
                    <div className="h-full w-[75%] rounded-full "></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      75% complete
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Target date: 2026
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Education Fund</h3>
                    <span className="text-sm font-medium">
                      $25,000 / $150,000
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[75%] rounded-full bg-[var(--color-teal-3)]"></div>
                    <div className="h-full w-[17%] rounded-full "></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      17% complete
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Target date: 2035
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[var(--color-teal-1)]">Add New Goal</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="text-[var(--color-teal-1)]">
              <CardTitle>Goal Projections</CardTitle>
              <CardDescription>
                Projected growth of your investments toward your goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                <LineChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Goal Projection Chart
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences" className="space-y-4">
          <Card className="text-[var(--color-teal-1)]">
            <CardHeader>
              <CardTitle>Investment Preferences</CardTitle>
              <CardDescription>
                Your preferences help us tailor investment recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-[var(--color-teal-2)]">
                <h3 className="font-medium mb-2">Preferred Investment Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="stocks"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="stocks">Stocks</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="bonds"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="bonds">Bonds</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="etfs"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="etfs">ETFs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="mutual-funds"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="mutual-funds">Mutual Funds</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="real-estate"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="real-estate">Real Estate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="crypto"
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="crypto">Cryptocurrency</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="text-[var(--color-teal-2)]">
                <h3 className="font-medium mb-2">ESG Preferences</h3>
                <RadioGroup defaultValue="moderate">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="esg-1" />
                    <Label htmlFor="esg-1">No ESG preference</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="esg-2" />
                    <Label htmlFor="esg-2">Moderate ESG focus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="strict" id="esg-3" />
                    <Label htmlFor="esg-3">Strict ESG criteria</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div className="text-[var(--color-teal-2)]">
                <h3 className="font-medium mb-2">Sector Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="technology"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="technology">Technology</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="healthcare"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="healthcare">Healthcare</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="finance"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="finance">Finance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="consumer"
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="consumer">Consumer Goods</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="energy"
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="energy">Energy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="utilities"
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="utilities">Utilities</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[var(--color-teal-1)]">Save Preferences</Button>
            </CardFooter>
          </Card>
          <Card className="text-[var(--color-teal-1)]">
            <CardHeader>
              <CardTitle>Investment Strategy</CardTitle>
              <CardDescription>
                Your current investment strategy settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-[var(--color-teal-2)]">
                <div>
                  <h3 className="font-medium mb-2">Rebalancing Frequency</h3>
                  <RadioGroup defaultValue="quarterly">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="rebalance-1" />
                      <Label htmlFor="rebalance-1">Monthly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quarterly" id="rebalance-2" />
                      <Label htmlFor="rebalance-2">Quarterly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="annually" id="rebalance-3" />
                      <Label htmlFor="rebalance-3">Annually</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Dividend Reinvestment</h3>
                  <RadioGroup defaultValue="reinvest">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reinvest" id="dividend-1" />
                      <Label htmlFor="dividend-1">
                        Automatically reinvest all dividends
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="dividend-2" />
                      <Label htmlFor="dividend-2">
                        Receive dividends as cash
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[var(--color-teal-1)]">Update Strategy</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
