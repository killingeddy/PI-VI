"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Home,
  LineChart,
  LogOut,
  Menu,
  PieChart,
  Settings,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/transactions",
      label: "Transações",
      icon: CreditCard,
      active: pathname === "/dashboard/transactions",
    },
    {
      href: "/dashboard/investments",
      label: "Investimentos",
      icon: LineChart,
      active: pathname === "/dashboard/investments",
    },
    {
      href: "/dashboard/analysis",
      label: "Análises",
      icon: PieChart,
      active: pathname === "/dashboard/analysis",
    },
    {
      href: "/dashboard/profile",
      label: "Perfil",
      icon: User,
      active: pathname === "/dashboard/profile",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <div className="flex items-center border-b p-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <BarChart3 className="h-6 w-6" />
                <span className="text-lg font-bold">InvestTrack</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <nav className="grid gap-2 p-4 text-lg font-medium">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    route.active ? "bg-muted" : "hover:bg-muted"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold text-[var(--color-teal-0)]">
          <BarChart3 className="h-6 w-6" />
          <span className="text-lg font-bold hidden md:inline-block text-[var(--color-teal-0)]">
            Projeto Interdisciplinar
          </span>
        </Link>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  route.active ? "bg-muted" : "hover:bg-muted"
                }`}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
