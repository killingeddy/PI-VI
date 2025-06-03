"use client";
import { toast } from "react-toastify";
import { api } from "@/tools/api";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Seu Perfil de Investimentos
        </h1>
      </div>
    </div>
  );
}
