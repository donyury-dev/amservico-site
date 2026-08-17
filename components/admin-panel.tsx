"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/components/admin-auth-provider";
import { AdminLogin } from "@/components/admin-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Save, Upload, Lock, Eye, EyeOff } from "lucide-react";
import { commitJsonToRepo } from "@/lib/github";

const TAB_KEYS = [
  "company",
  "hero",
  "services",
  "about",
  "clinicalEngineering",
  "lifeSupport",
  "diagnosticImaging",
  "infrastructure",
  "electricalPanels",
  "maintenanceServices",
  "cases",
  "differentials",
  "contact",
  "footer",
  "ctaBanner",
  "themes",
];

const TAB_LABELS: Record<string, string> = {
  company: "Empresa",
  hero: "Hero",
  services: "Serviços",
  about: "Quem Somos",
  clinicalEngineering: "Eng. Clínica",
  lifeSupport: "Suporte à Vida",
  diagnosticImaging: "Diagnóstico",
  infrastructure: "Adequação",
  electricalPanels: "Quadros",
  maintenanceServices: "Manutenções",
  cases: "Cases",
  differentials: "Diferenciais",
  contact: "Contato",
  footer: "Rodapé",
  ctaBanner: "Banner CTA",
  themes: "Temas",
};

export function AdminPanel() {
  const { isAuthenticated } = useAdminAuth();
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [themes, setThemes] = useState<Record<string, unknown> | null>(null);
  const [token, setToken] = useState("");
  const [ownerRepo, setOwnerRepo] = useState("");
  const [status, setStatus] = useState("");
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    fetch("/data/site-content.json")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setStatus("Erro ao carregar site-content.json"));

    fetch("/data/themes.json")
      .then((r) => r.json())
      .then(setThemes)
      .catch(() => setStatus("Erro ao carregar themes.json"));

    const savedToken = localStorage.getItem("am_github_token");
    const savedRepo = localStorage.getItem("am_github_repo");
    if (savedToken) setToken(savedToken);
    if (savedRepo) setOwnerRepo(savedRepo);
  }, []);

  if (!isAuthenticated) return <AdminLogin />;
  if (!content || !themes) return <div className="p-8">Carregando...</div>;

  const saveToken = () => {
    localStorage.setItem("am_github_token", token);
    localStorage.setItem("am_github_repo", ownerRepo);
    setStatus("Token e repositório salvos no navegador.");
  };

  const downloadJson = (data: unknown, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const publish = async () => {
    if (!token || !ownerRepo) {
      setStatus("Configure o token e o repositório antes de publicar.");
      return;
    }
    const [owner, repo] = ownerRepo.split("/");
    if (!owner || !repo) {
      setStatus("Formato do repositório inválido. Use dono/repo.");
      return;
    }
    setStatus("Publicando...");
    try {
      await commitJsonToRepo({
        owner,
        repo,
        token,
        path: "data/site-content.json",
        content,
        message: "Atualiza site-content.json via painel admin",
      });
      await commitJsonToRepo({
        owner,
        repo,
        token,
        path: "data/themes.json",
        content: themes,
        message: "Atualiza themes.json via painel admin",
      });
      setStatus("Publicado com sucesso! Aguarde o deploy da Vercel (1-2 min).");
    } catch (err) {
      setStatus(`Erro ao publicar: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const updateContent = (key: string, value: unknown) => {
    setContent((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const renderEditor = (key: string, data: unknown, onChange: (v: unknown) => void) => {
    return <JsonEditor key={key} data={data} onChange={onChange} />;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary,#1E88E5)] flex items-center justify-center font-bold">AM</div>
          <div>
            <h1 className="font-bold">Painel de Edição do Site</h1>
            <p className="text-xs text-slate-400">AM Serviço e Manutenção</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => downloadJson(content, "site-content.json")}>
            <Download className="w-4 h-4 mr-1" /> Baixar JSON
          </Button>
          <Button variant="outline" size="sm" onClick={() => downloadJson(themes, "themes.json")}>
            <Download className="w-4 h-4 mr-1" /> Baixar Temas
          </Button>
          <Button size="sm" onClick={publish}>
            <Upload className="w-4 h-4 mr-1" /> Publicar no Site
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Como funciona</CardTitle>
            <CardDescription>
              Faça as alterações abaixo e clique em "Publicar no Site" para atualizar automaticamente.
              Você precisa configurar um token do GitHub abaixo (apenas uma vez).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="token">Token de acesso do GitHub</Label>
                <div className="flex gap-2">
                  <Input
                    id="token"
                    type={showToken ? "text" : "password"}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ghp_..."
                  />
                  <Button variant="outline" size="icon" onClick={() => setShowToken(!showToken)}>
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="repo">Repositório (dono/repo)</Label>
                <Input
                  id="repo"
                  value={ownerRepo}
                  onChange={(e) => setOwnerRepo(e.target.value)}
                  placeholder="ex: usuario/amservico-site"
                />
              </div>
            </div>
            <Button onClick={saveToken} variant="secondary">
              <Save className="w-4 h-4 mr-1" /> Salvar Token no Site
            </Button>
            <p className="text-xs text-slate-600">
              Para criar um token, vá em GitHub, Settings, Developer settings, Personal access tokens, Tokens (classic), Generate new token, e marque a permissão repo.
            </p>
            <Separator />
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current">Senha atual</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">Nova senha</Label>
                <Input id="new" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirmar nova senha</Label>
                <Input id="confirm" type="password" />
              </div>
            </div>
            <Button variant="outline" onClick={() => setStatus("Alteração de senha ainda não implementada nesta versão.")}>
              <Lock className="w-4 h-4 mr-1" /> Alterar senha
            </Button>
          </CardContent>
        </Card>

        {status && (
          <div className="mb-4 p-3 rounded-lg bg-slate-100 text-sm text-slate-700">{status}</div>
        )}

        <Tabs defaultValue="hero">
          <TabsList className="flex-wrap h-auto gap-2 mb-6">
            {TAB_KEYS.map((key) => (
              <TabsTrigger key={key} value={key}>{TAB_LABELS[key]}</TabsTrigger>
            ))}
          </TabsList>

          {TAB_KEYS.map((key) => (
            <TabsContent key={key} value={key}>
              <Card>
                <CardHeader>
                  <CardTitle>{TAB_LABELS[key]}</CardTitle>
                </CardHeader>
                <CardContent>
                  {key === "themes"
                    ? renderEditor(key, themes, (v) => setThemes(v as Record<string, unknown>))
                    : renderEditor(key, content[key], (v) => updateContent(key, v))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function JsonEditor({ data, onChange }: { data: unknown; onChange: (v: unknown) => void }) {
  const [text, setText] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState("");

  const handleChange = (value: string) => {
    setText(value);
    try {
      const parsed = JSON.parse(value);
      setError("");
      onChange(parsed);
    } catch {
      setError("JSON inválido");
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full min-h-[500px] font-mono text-sm p-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary,#1E88E5)]"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
