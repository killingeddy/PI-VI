"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/tools/api";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Pencil, Trash, X } from "lucide-react";

function getUserInfo() {
  if (typeof window === "undefined") return null;
  const storedUserInfo = localStorage.getItem("userInfo");
  if (!storedUserInfo) return null;
  try {
    return JSON.parse(storedUserInfo);
  } catch (error) {
    console.error("Erro ao analisar userInfo:", error);
    return null;
  }
}

export default function InvestmentsPage() {
  const [stocks, setStocks] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingStockId, setEditingStockId] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    getPortfolioStocks();
    getPortfolioSummary();
  }, []);

  const getPortfolioStocks = async () => {
    setLoading(true);
    const userInfo = getUserInfo();
    if (!userInfo?.id) {
      toast.error("Usuário não encontrado");
      setStocks([]);
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(`/portfolios/${userInfo.id}/stocks`);
      setStocks(response.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erro ao buscar sua carteira"
      );
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const getPortfolioSummary = async () => {
    const userInfo = getUserInfo();
    if (!userInfo?.id) return;
    try {
      const response = await api.get(`/portfolios/${userInfo.id}`);
      setSummary(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar resumo da carteira:", error);
    }
  };


  const onSubmit = async (data) => {
    const userInfo = getUserInfo();
    if (!userInfo?.id) {
      toast.error("Usuário não identificado");
      return;
    }

    try {
      if (editingStockId) {
        await api.put(
          `/portfolios/${userInfo.id}/stocks/${editingStockId}`,
          data
        );
        toast.success("Ação atualizada com sucesso!");
      } else {
        await api.post(`/portfolios/${userInfo.id}/stocks`, data);
        toast.success("Ação adicionada com sucesso!");
      }
      reset();
      setEditingStockId(null);
      getPortfolioStocks();
      getPortfolioSummary();
    } catch (error) {
      toast.error("Erro ao salvar ação");
    }
  };

  // const handleEdit = (stock) => {
  //   setEditingStockId(stock.id);
  //   setValue("stockId", stock.stockId);
  //   setValue("symbol", stock.symbol);
  //   setValue("quantity", stock.quantity);
  //   setValue("purchasePrice", stock.purchasePrice);

  //   const formatDate = (dateString) => {
  //     if (!dateString) return "";
  //     const date = new Date(dateString);
  //     return date.toISOString().split("T")[0];
  //   };

  //   setValue("purchaseDate", formatDate(stock.purchaseDate));
  // };

  const handleCancelEdit = () => {
    setEditingStockId(null);
    reset();
  };

  const handleDelete = async (id) => {
    const userInfo = getUserInfo();
    if (!userInfo?.id) return;

    try {
      await api.delete(`/portfolios/${userInfo.id}/stocks/${id}`);
      toast.success("Ação removida com sucesso!");
      getPortfolioStocks();
      getPortfolioSummary();
    } catch (error) {
      toast.error("Erro ao remover ação");
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderCustomLabel = ({ name, percent }) => {
  return `${name}: ${(percent * 100).toFixed(2)}%`;
};


  const renderCustomLegend = (props) => {
  const { payload } = props;
  return (
    <ul>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} style={{ color: entry.color }}>
          {`${entry.value} - ${Number(entry.payload.value).toFixed(2)}`}
        </li>
      ))}
    </ul>
  );
};



  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-muted/40 items-center">
      <h1 className="text-3xl font-bold text-primary">
        Carteira de Investimentos
      </h1>
      {summary && (
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
          <Card className="flex-1 bg-transparent shadow-none border-none w-full">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Resumo dos Investimentos
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 w-full">
              <p className="text-xl bg-white p-4 rounded-lg shadow-sm text-[#31690f]">
                <strong>Total Investido:</strong> R${" "}
                {summary.totalInvested.toFixed(2)}
              </p>
              <div className="w-full flex-row flex justify-between items-center">
                <p className="text-lg bg-white p-4 w-[49%] rounded-lg shadow-sm text-[#9e8b11]">
                  <strong>Valor Atual:</strong> R${" "}
                  {summary.totalCurrentValue.toFixed(2)}
                </p>
                <p className="text-lg bg-white p-4 w-[49%] rounded-lg shadow-sm text-[#78150c]">
                  <strong>Prejuízo:</strong> R${" "}
                  {summary.profitLoss.toFixed(2)}
                </p>
              </div>
              <div className="w-full flex-row flex justify-between items-center flex-wrap">
                <p className="text-base bg-white p-2 rounded-lg w-[49%] shadow-sm text-[#0f3169]">
                  <strong>Rentabilidade:</strong>{" "}
                  {summary.profitPercentage.toFixed(2)}%
                </p>
                <p className="text-base bg-white p-2 rounded-lg w-[49%] shadow-sm text-[#0f3169]">
                  <strong>Quantidade de Ações:</strong> {summary.stockCount}
                </p>
              </div>
              <div className="w-full flex-row flex justify-between items-center flex-wrap">
                <p className="text-base bg-white p-2 rounded-lg w-[49%] shadow-sm text-[#0f3169]">
                  <strong>Risco Médio:</strong>{" "}
                  {summary.averageRiskLevel.toFixed(2)}
                </p>
                <p className="text-base bg-white p-2 rounded-lg w-[49%] shadow-sm text-[#0f3169]">
                  <strong>Beta Médio:</strong> {summary.averageBeta.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 justify-center items-center">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Distribuição de Risco
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart width={400} height={340}>
                <Pie 
                  data={Object.entries(summary.riskDistribution).map(
                    ([name, value]) => ({ name, value })
                  )}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={renderCustomLabel}
                >
                  {Object.keys(summary.riskDistribution).map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => Number(value).toFixed(2)}/>
                <Legend content={renderCustomLegend}/>
              </PieChart>
            </CardContent>
          </Card>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Carregando ações...</p>
      ) : stocks.length === 0 ? (
        <p className="text-muted-foreground">
          Você ainda não possui ações na carteira.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {stocks.map((stock, index) => (
            <Card
              key={index}
              className="shadow-sm hover:shadow-md transition relative"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(stock.id)}
                >
                  <Trash size={16} className="text-red-500" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-primary">
                  {stock.company_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>
                  <strong>Símbolo da Ação:</strong> {stock.symbol}
                </p>
                <p>
                  <strong>Quantidade:</strong> {stock.quantity}
                </p>
                <p>
                  <strong>Preço de Compra:</strong> R${" "}
                  {Number(stock.purchase_price).toFixed(2)}
                </p>
                <p>
                  <strong>Data de Compra:</strong>{" "}
                  {new Date(stock.purchase_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Categoria de risco:</strong> {stock.risk_category}
                </p>
                <p>
                  <strong>Volatilidade:</strong>{" "}
                  {parseFloat(stock.volatility).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-sm space-y-4 w-full max-w-[1152px]"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary">
            {editingStockId ? "Editar ação" : "Adicionar nova ação"}
          </h2>
          {editingStockId && (
            <Button
              type="button"
              variant="ghost"
              className="text-destructive"
              onClick={handleCancelEdit}
            >
              <X size={18} className="mr-1" />
              Cancelar
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-2" htmlFor="stockId">ID da Ação</Label>
            <Input id="stockId" {...register("stockId", { required: true })} />
          </div>
          <div>
            <Label className="mb-2" htmlFor="symbol">Símbolo</Label>
            <Input id="symbol" {...register("symbol", { required: true })} />
          </div>
          <div>
            <Label className="mb-2" htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", { required: true, min: 1 })}
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="purchasePrice">Preço de Compra</Label>
            <Input
              id="purchasePrice"
              type="number"
              step="0.01"
              {...register("purchasePrice", { required: true })}
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="purchaseDate">Data de Compra</Label>
            <Input
              id="purchaseDate"
              type="date"
              {...register("purchaseDate", { required: true })}
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-4">
          {editingStockId ? "Salvar Edição" : "Adicionar Ação"}
        </Button>
      </form>
    </div>
  );
}
