"use client";
import { HiOutlineLogout } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { api } from "@/tools/api";
import Link from "next/link";
import moment from "moment";
import React from "react";

export default function Home() {
  const [stocks, setStocks] = React.useState([]);

  const [userInfo, setUserInfo] = React.useState({});

  const getStocks = async () => {
    await api
      .get("/stocks", {
        params: {
          limit: 25,
        },
      })
      .then((response) => {
        setStocks(response.data.data);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Erro ao buscar ações disponíveis"
        );
      });
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getUserInfo = async () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
    } else {
      setUserInfo({});
    }
  };

  React.useEffect(() => {
    getStocks();
    getUserInfo();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky px-5 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block text-primary">Finara</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            {userInfo?.id ? (
              <div>
                <span>Olá, {userInfo.name}!</span>
                <Link href="/shares" className="px-4">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium bg-primary text-white"
                  >
                    Acessar Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <nav className="flex items-center">
                <Link href="/login" className="px-4">
                  <Button variant="ghost" className="text-sm font-medium">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="text-sm font-medium">Cadastrar-se</Button>
                </Link>
              </nav>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-16">
          <div className=" px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  Controle suas finanças e investimentos em um só lugar
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Acompanhe seus investimentos, controle suas finanças e tome
                  decisões mais inteligentes com a nossa plataforma de gestão de
                  investimentos
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-14 bg-muted">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-primary">
                  Ações Disponíveis
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Explore as ações disponíveis para investimento
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
                {stocks?.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="w-full max-w-md p-4 bg-white rounded-lg shadow-md flex flex-col items-start"
                  >
                    <h3 className="text-xl font-semibold">{stock.symbol}</h3>
                    <p className="text-sm text-muted-foreground">
                      Preço Atual: R${" "}
                      {formatPrice(parseFloat(stock.latest_price).toFixed(2))}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Última Atualização:{" "}
                      {moment(stock.price_date).format("DD/MM/YYYY")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Categoria de Risco: {stock.risk_category}
                    </p>
                  </div>
                ))}
              </div>
              {userInfo?.id ? (
                <Link href="/shares">
                  <Button className="mt-6">Acessar Dashboard e Ver Mais Ações</Button>
                </Link>
              ) : (
                <p className="mt-6 text-muted-foreground">
                  Faça login ou cadastre-se para acessar o dashboard e gerenciar
                  seus investimentos.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 px-5 md:py-8">
        <div className=" flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © Projeto Interdisciplinar 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
