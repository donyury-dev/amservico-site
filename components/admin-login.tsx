"use client";

import { useState } from "react";
import { useAdminAuth } from "@/components/admin-auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

export function AdminLogin() {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-slate-700" />
          </div>
          <CardTitle className="text-xl">Área Administrativa</CardTitle>
          <p className="text-sm text-slate-500">Digite a senha para editar o conteúdo do site.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Senha"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">Senha incorreta. Tente novamente.</p>
            )}
            <Button type="submit" className="w-full">
              Acessar Painel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

