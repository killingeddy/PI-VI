"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { api } from "@/tools/api";
import ClientOnly from "@/components/ClientOnly";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    riskTolerance: null,
    monthlyIncome: "",
    investmentHorizon: null,
    investmentExperience: null,
  });

  const [userInfo, setUserInfo] = useState({});

  const [profileData, setProfileData] = React.useState(null);

const fetchUserProfile = async (userId) => {
  try {
    const response = await api.get(`/profiles/${userId}`);
    setProfileData(response.data.data);
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Erro ao buscar perfil do usuário"
    );
  }
};

  const getUserInfo = () => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  };

  React.useEffect(() => {
  const user = localStorage.getItem("userInfo");
  if (user) {
  const parsedUser = JSON.parse(user);

  if (parsedUser?.user?.id) {
    setUserInfo(parsedUser);
    fetchUserProfile(parsedUser.user.id); // Só chama se existir
  } else {
    console.warn("Usuário inválido ou incompleto:", parsedUser);
  }
} else {
  console.warn("Nenhum userInfo encontrado no localStorage.");
}

}, []);


  const getProfile = async () => {
    try {
      const response = await api.get(`/profiles/${userInfo.id}`);
      const data = response.data.data;

      setFormData({
        riskTolerance: data.risk_tolerance,
        monthlyIncome: data.monthly_income,
        investmentHorizon: data.investment_horizon,
        investmentExperience: data.investment_experience,
      });
    } catch (error) {
      toast.error("Erro ao carregar perfil do usuário");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/profiles/${userInfo.id}`, {
        risk_tolerance: formData.riskTolerance,
        monthly_income: formData.monthlyIncome,
        investment_horizon: formData.investmentHorizon,
        investment_experience: formData.investmentExperience,
      });
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo.id) {
      getProfile();
    }
  }, [userInfo]);

  const riskOptions = [
    { value: 1, label: "Baixa" },
    { value: 2, label: "Média" },
    { value: 3, label: "Alta" },
  ];

  const horizonOptions = [
    { value: 1, label: "Curto Prazo" },
    { value: 2, label: "Médio Prazo" },
    { value: 3, label: "Longo Prazo" },
  ];

  const experienceOptions = [
    { value: 1, label: "Iniciante" },
    { value: 2, label: "Intermediário" },
    { value: 3, label: "Avançado" },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Seu Perfil de Investimentos
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="riskTolerance" className="block font-medium mb-1">
            Tolerância ao Risco
          </label>
          <ClientOnly>
          <Select
            id="riskTolerance"
            name="riskTolerance"
            options={riskOptions}
            isClearable
            classNamePrefix="react-select"
            value={
              formData.riskTolerance
                ? riskOptions.find((o) => o.value === formData.riskTolerance)
                : null
            }
            onChange={(option) =>
              setFormData({ ...formData, riskTolerance: option?.value || null })
            }
          />
          </ClientOnly>
        </div>

        <div>
          <label htmlFor="monthlyIncome" className="block font-medium mb-1">
            Renda Mensal
          </label>
          <input
            type="number"
            id="monthlyIncome"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.monthlyIncome}
            onChange={(e) =>
              setFormData({ ...formData, monthlyIncome: e.target.value })
            }
            placeholder="Digite sua renda mensal"
          />
        </div>

        <div>
          <label htmlFor="investmentHorizon" className="block font-medium mb-1">
            Horizonte de Investimento
          </label>
          <ClientOnly>
          <Select
            id="investmentHorizon"
            name="investmentHorizon"
            options={horizonOptions}
            isClearable
            classNamePrefix="react-select"
            value={
              formData.investmentHorizon
                ? horizonOptions.find((o) => o.value === formData.investmentHorizon)
                : null
            }
            onChange={(option) =>
              setFormData({
                ...formData,
                investmentHorizon: option?.value || null,
              })
            }
          />
          </ClientOnly>
        </div>

        <div>
          <label htmlFor="investmentExperience" className="block font-medium mb-1">
            Experiência em Investimentos
          </label>
          <ClientOnly>
          <Select
            id="investmentExperience"
            name="investmentExperience"
            options={experienceOptions}
            isClearable
            classNamePrefix="react-select"
            value={
              formData.investmentExperience
                ? experienceOptions.find(
                    (o) => o.value === formData.investmentExperience
                  )
                : null
            }
            onChange={(option) =>
              setFormData({
                ...formData,
                investmentExperience: option?.value || null,
              })
            }
          />
          </ClientOnly>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
        >
          Salvar Perfil
        </button>

      </form>

      {profileData && (
  <div className="mt-10">
    <h2 className="text-2xl font-semibold mb-4 text-primary">Informações Salvas no Perfil</h2>
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
            {profileData.monthly_income
              ? `R$ ${Number(profileData.monthly_income).toLocaleString("pt-BR")}`
              : "-"}
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">Horizonte de Investimento</td>
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
  </div>
)}
    </div>

    
  );
}
