"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/tools/api";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    riskTolerance: null,
    monthlyIncome: "",
    investmentHorizon: null,
    investmentExperience: null,
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api
      .post("/auth/register", {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .then(async (response) => {
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.data.user)
        );
        await api
          .post(`/profiles/${response.data.data.user.id}`, {
            risk_tolerance: formData.riskTolerance,
            monthly_income: formData.monthlyIncome,
            investment_horizon: formData.investmentHorizon,
            investment_experience: formData.investmentExperience,
          })
          .then(() => {
            router.push("/shares");
          })
          .catch((error) => {
            console.error("Error creating profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Criar uma conta</CardTitle>
          <CardDescription>
            Entre com suas informações para criar uma conta
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nome completo"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Renda Mensal</Label>
              <Input
                id="monthlyIncome"
                name="monthlyIncome"
                type="number"
                placeholder="Renda mensal"
                required
                value={formData.monthlyIncome}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    monthlyIncome: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="riskTolerance">Tolerância ao Risco</Label>
              <Select
                id="riskTolerance"
                name="riskTolerance"
                options={[
                  { value: 1, label: "Baixa" },
                  { value: 2, label: "Média" },
                  { value: 3, label: "Alta" },
                ]}
                placeholder="Selecione a tolerância ao risco"
                isClearable
                onChange={(option) =>
                  setFormData({
                    ...formData,
                    riskTolerance: option ? option.value : null,
                  })
                }
                className="react-select-"
                classNamePrefix="react-select"
                value={
                  formData.riskTolerance
                    ? {
                        value: formData.riskTolerance,
                        label:
                          formData.riskTolerance === 1
                            ? "Baixa"
                            : formData.riskTolerance === 2
                            ? "Média"
                            : "Alta",
                      }
                    : null
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investmentHorizon">
                Horizonte de Investimento
              </Label>
              <Select
                id="investmentHorizon"
                name="investmentHorizon"
                options={[
                  { value: 1, label: "Curto Prazo" },
                  { value: 2, label: "Médio Prazo" },
                  { value: 3, label: "Longo Prazo" },
                ]}
                placeholder="Selecione o horizonte de investimento"
                isClearable
                onChange={(option) =>
                  setFormData({
                    ...formData,
                    investmentHorizon: option ? option.value : null,
                  })
                }
                className="react-select-"
                classNamePrefix="react-select"
                value={
                  formData.investmentHorizon
                    ? {
                        value: formData.investmentHorizon,
                        label:
                          formData.investmentHorizon === 1
                            ? "Curto Prazo"
                            : formData.investmentHorizon === 2
                            ? "Médio Prazo"
                            : "Longo Prazo",
                      }
                    : null
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investmentExperience">
                Experiência em Investimentos
              </Label>
              <Select
                id="investmentExperience"
                name="investmentExperience"
                options={[
                  { value: 1, label: "Iniciante" },
                  { value: 2, label: "Intermediário" },
                  { value: 3, label: "Avançado" },
                ]}
                placeholder="Selecione a experiência em investimentos"
                isClearable
                onChange={(option) =>
                  setFormData({
                    ...formData,
                    investmentExperience: option ? option.value : null,
                  })
                }
                className="react-select-"
                classNamePrefix="react-select"
                value={
                  formData.investmentExperience
                    ? {
                        value: formData.investmentExperience,
                        label:
                          formData.investmentExperience === 1
                            ? "Iniciante"
                            : formData.investmentExperience === 2
                            ? "Intermediário"
                            : "Avançado",
                      }
                    : null
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Criar conta
            </Button>
            <div className="text-center text-sm">
              Já possui um cadastro?{" "}
              <Link
                href="/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Entrar
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
