"use client";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { api } from "@/tools/api";
import Link from "next/link";
import moment from "moment";
import React from "react";

export default function DashboardPage() {
  const [stocks, setStocks] = React.useState([]);
  const [limit, setLimit] = React.useState(100);

  const getStocks = async () => {
    await api
      .get("/stocks", {
        params: {
          limit,
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

  React.useEffect(() => {
    getStocks();
  }, [limit]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Todas as ações</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
          {stocks?.map((stock) => (
            <div
              key={stock.symbol}
              className="w-full max-w-md p-4 bg-white rounded-lg shadow-md flex flex-col items-start"
            >
              <h3 className="text-xl font-semibold">{stock.symbol}</h3>
              <p className="text-sm text-muted-foreground">
                Id: {" "}
                {stock.id}
              </p>
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
        <Button className="mt-4" onClick={() => setLimit(limit + 100)}>
          Ver Mais Ações
        </Button>
      </div>
    </div>
  );
}
