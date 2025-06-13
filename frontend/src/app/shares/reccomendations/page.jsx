"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/tools/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

// Função local para pegar o userInfo do localStorage
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


export default function RecommendationsPage() {
  const [primary, setPrimary] = useState([]);
  const [secondary, setSecondary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
  const userInfo = getUserInfo();
  if (!userInfo || !userInfo.id) {
    toast.error("Usuário não identificado.");
    return;
  }

  setLoading(true);
  try {
    const response = await api.get(`/recommendations/${userInfo.id}`);
    const recommendations = response.data.data.recommendations;

    setPrimary(recommendations.primary || []);
    setSecondary(recommendations.secondary || []);
  } catch (error) {
    toast.error("Erro ao buscar recomendações");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const renderStockCard = (stock) => (
    <Card key={stock.id} className="shadow-sm hover:shadow-md transition">
      <CardHeader>
        <CardTitle className="text-lg text-primary">
          {stock.symbol} - {stock.company_name}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-1">
        <p><strong>ID:</strong> {stock.id}</p>
        <p><strong>Categoria de risco:</strong> {stock.risk_category}</p>
        <p><strong>Nível de risco:</strong> {stock.risk_level}</p>
        <p><strong>Volatilidade:</strong> {stock.volatility}</p>
        <p><strong>Beta:</strong> {stock.beta}</p>
        <p><strong>Peso da recomendação:</strong> {stock.recommendation_weight}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-muted/40">
      <h1 className="text-3xl font-bold text-primary">
        Recomendações de Investimento
      </h1>

      {loading ? (
        <p className="text-muted-foreground">Carregando recomendações...</p>
      ) : (
        <>
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Recomendações Primárias</h2>
            {primary.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {primary.map(renderStockCard)}
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhuma recomendação primária disponível.</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-yellow-700">Recomendações Secundárias</h2>
            {secondary.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {secondary.map(renderStockCard)}
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhuma recomendação secundária disponível.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
