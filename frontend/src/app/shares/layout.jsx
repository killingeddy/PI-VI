"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  WalletMinimal,
  BarChart3,
  Home,
  LogOut,
  Menu,
  List,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  const routes = [
    {
      href: "/shares",
      label: "Início",
      icon: Home,
      active: pathname === "/shares",
    },
    {
      href: "/shares/wallet",
      label: "Carteira",
      icon: WalletMinimal,
      active: pathname === "/shares/wallet",
    },
    {
      href: "/shares/reccomendations",
      label: "Recomendações",
      icon: List,
      active: pathname === "/shares/reccomendations",
    },
    {
      href: "/shares/profile",
      label: "Perfil",
      icon: User,
      active: pathname === "/shares/profile",
    },
  ];

  const getUserInfo = async () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
    } else {
      setUserInfo({});
    }
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
        <h4 className="flex items-center gap-2 border-b p-4 text-lg font-semibold">
          Olá, {userInfo?.name || "Usuário"}!
        </h4>
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
