"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { api } from "@/tools/api";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    riskTolerance: null,
    monthlyIncome: "",
    investmentHorizon: null,
    investmentExperience: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getUserInfo = () => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      const response = await api.get(`/profiles/${userId}`);
      setProfileData(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erro ao buscar perfil do usuário"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo?.id) {
      fetchUserProfile(userInfo.id);
    }
  }, [userInfo]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Seu Perfil de Investimentos
      </h1>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Informações Salvas no Perfil
        </h2>

        {isLoading ? (
          <p>Carregando dados do perfil...</p>
        ) : (
          <table className="w-full border border-gray-300 rounded text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Campo</th>
                <th className="px-4 py-2 border-b">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">Tolerância ao Risco</td>
                <td className="px-4 py-2 border-b">
                  {profileData.risk_tolerance === 1
                    ? "Baixa"
                    : profileData.risk_tolerance === 2
                    ? "Média"
                    : profileData.risk_tolerance === 3
                    ? "Alta"
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">Renda Mensal</td>
                <td className="px-4 py-2 border-b">
                  {profileData.monthly_income !== undefined
                    ? `R$ ${Number(profileData.monthly_income).toLocaleString(
                        "pt-BR"
                      )}`
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">
                  Horizonte de Investimento
                </td>
                <td className="px-4 py-2 border-b">
                  {profileData.investment_horizon === 1
                    ? "Curto Prazo"
                    : profileData.investment_horizon === 2
                    ? "Médio Prazo"
                    : profileData.investment_horizon === 3
                    ? "Longo Prazo"
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Experiência em Investimentos</td>
                <td className="px-4 py-2">
                  {profileData.investment_experience === 1
                    ? "Iniciante"
                    : profileData.investment_experience === 2
                    ? "Intermediário"
                    : profileData.investment_experience === 3
                    ? "Avançado"
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
