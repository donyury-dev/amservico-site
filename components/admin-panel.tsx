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
import { Download, Save, Upload, Lock, Eye, EyeOff, LogOut } from "lucide-react";
import { commitJsonToRepo } from "@/lib/github";
import { TextField, ImageField, ColorField, ListField } from "@/components/admin-fields";

export function AdminPanel() {
  const { isAuthenticated, logout, changePassword } = useAdminAuth();
  const [content, setContent] = useState<Record<string, any> | null>(null);
  const [themes, setThemes] = useState<Record<string, any> | null>(null);
  const [token, setToken] = useState("");
  const [ownerRepo, setOwnerRepo] = useState("");
  const [status, setStatus] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [advanced, setAdvanced] = useState(false);

  // Password change
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  useEffect(() => {
    fetch("/data/site-content.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setContent)
      .catch((err) => setStatus(`Erro ao carregar site-content.json: ${err.message}`));

    fetch("/data/themes.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setThemes)
      .catch((err) => setStatus(`Erro ao carregar themes.json: ${err.message}`));

    const savedToken = localStorage.getItem("am_github_token");
    const savedRepo = localStorage.getItem("am_github_repo");
    if (savedToken) setToken(savedToken);
    if (savedRepo) setOwnerRepo(savedRepo);
  }, []);

  if (!isAuthenticated) return <AdminLogin />;
  if (!content || !themes) return <div className="p-8">Carregando dados...</div>;

  const update = (path: string, value: any) => {
    setContent((prev) => {
      if (!prev) return prev;
      const next = { ...prev };
      const keys = path.split(".");
      let target: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (Array.isArray(target[keys[i]])) {
          target[keys[i]] = [...target[keys[i]]];
        } else {
          target[keys[i]] = { ...target[keys[i]] };
        }
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateArrayItem = (path: string, index: number, key: string, value: any) => {
    setContent((prev) => {
      if (!prev) return prev;
      const next = { ...prev };
      const keys = path.split(".");
      let target: any = next;
      for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(target[keys[i]])) {
          target[keys[i]] = [...target[keys[i]]];
          if (i === keys.length - 1) {
            target[keys[i]][index] = { ...target[keys[i]][index], [key]: value };
          }
        } else {
          target[keys[i]] = { ...target[keys[i]] };
        }
        target = target[keys[i]];
      }
      return next;
    });
  };

  const saveToken = () => {
    localStorage.setItem("am_github_token", token);
    localStorage.setItem("am_github_repo", ownerRepo);
    setStatus("Token e repositório salvos no navegador.");
  };

  const handleChangePassword = async () => {
    if (!currentPwd || !newPwd || !confirmPwd) {
      setStatus("Preencha todos os campos da senha.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setStatus("Nova senha e confirmação não conferem.");
      return;
    }
    const ok = await changePassword(currentPwd, newPwd);
    if (ok) {
      setStatus("Senha alterada com sucesso.");
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
    } else {
      setStatus("Senha atual incorreta.");
    }
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
          <Button variant="outline" size="sm" onClick={() => setAdvanced(!advanced)}>
            {advanced ? "Modo Simples" : "Modo Avançado (JSON)"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => downloadJson(content, "site-content.json")}>
            <Download className="w-4 h-4 mr-1" /> Baixar JSON
          </Button>
          <Button size="sm" onClick={publish}>
            <Upload className="w-4 h-4 mr-1" /> Publicar no Site
          </Button>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-1" /> Sair
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Configuração do GitHub</CardTitle>
            <CardDescription>
              Preencha uma vez para habilitar o botão "Publicar no Site".
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
                <Input id="current" type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">Nova senha</Label>
                <Input id="new" type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirmar nova senha</Label>
                <Input id="confirm" type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
              </div>
            </div>
            <Button variant="outline" onClick={handleChangePassword}>
              <Lock className="w-4 h-4 mr-1" /> Alterar senha
            </Button>
          </CardContent>
        </Card>

        {status && (
          <div className="mb-4 p-3 rounded-lg bg-slate-100 text-sm text-slate-700">{status}</div>
        )}

        {advanced ? (
          <JsonEditorPanel content={content} themes={themes} setContent={setContent} setThemes={setThemes} />
        ) : (
          <Tabs defaultValue="empresa">
            <TabsList className="flex-wrap h-auto gap-2 mb-6">
              {["empresa", "hero", "servicos", "quem-somos", "contato", "temas"].map((t) => (
                <TabsTrigger key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="empresa">
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Empresa</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <TextField label="Nome fantasia" value={content.company?.name} onChange={(v) => update("company.name", v)} />
                  <TextField label="Razão social" value={content.company?.fullName} onChange={(v) => update("company.fullName", v)} />
                  <TextField label="CNPJ" value={content.company?.cnpj} onChange={(v) => update("company.cnpj", v)} />
                  <TextField label="E-mail" value={content.company?.email} onChange={(v) => update("company.email", v)} />
                  <TextField label="WhatsApp" value={content.company?.whatsapp} onChange={(v) => update("company.whatsapp", v)} />
                  <TextField label="Cidade/UF" value={content.company?.address?.full} onChange={(v) => update("company.address.full", v)} />
                  <TextField label="CREA" value={content.company?.crea} onChange={(v) => update("company.crea", v)} />
                  <TextField label="Responsável técnico" value={content.company?.technicalResponsible} onChange={(v) => update("company.technicalResponsible", v)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hero">
              <Card>
                <CardHeader>
                  <CardTitle>Banner Principal (Hero)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TextField label="Badge" value={content.hero?.badge} onChange={(v) => update("hero.badge", v)} />
                  <TextField label="Título" value={content.hero?.title} onChange={(v) => update("hero.title", v)} rows={2} />
                  <TextField label="Subtítulo" value={content.hero?.subtitle} onChange={(v) => update("hero.subtitle", v)} rows={3} />
                  <TextField label="Texto botão principal" value={content.hero?.primaryCta} onChange={(v) => update("hero.primaryCta", v)} />
                  <TextField label="Texto botão secundário" value={content.hero?.secondaryCta} onChange={(v) => update("hero.secondaryCta", v)} />
                  <ImageField label="Imagem 1" value={content.hero?.images?.[0]?.src} onChange={(v) => updateArrayItem("hero.images", 0, "src", v)} />
                  <ImageField label="Imagem 2" value={content.hero?.images?.[1]?.src} onChange={(v) => updateArrayItem("hero.images", 1, "src", v)} />
                  <ImageField label="Imagem 3" value={content.hero?.images?.[2]?.src} onChange={(v) => updateArrayItem("hero.images", 2, "src", v)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="servicos">
              <Card>
                <CardHeader>
                  <CardTitle>Textos da Seção Serviços</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TextField label="Título da seção" value={content.services?.title} onChange={(v) => update("services.title", v)} />
                  <TextField label="Headline" value={content.services?.subtitle} onChange={(v) => update("services.subtitle", v)} />
                  <TextField label="Descrição" value={content.services?.description} onChange={(v) => update("services.description", v)} rows={2} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quem-somos">
              <Card>
                <CardHeader>
                  <CardTitle>Quem Somos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TextField label="Headline" value={content.about?.headline} onChange={(v) => update("about.headline", v)} />
                  <TextField label="Descrição" value={content.about?.description} onChange={(v) => update("about.description", v)} rows={2} />
                  <ImageField label="Imagem" value={content.about?.image} onChange={(v) => update("about.image", v)} />
                  <ListField label="Destaques (lista)" values={content.about?.bullets} onChange={(v) => update("about.bullets", v)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contato">
              <Card>
                <CardHeader>
                  <CardTitle>Contato</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <TextField label="Título" value={content.contact?.headline} onChange={(v) => update("contact.headline", v)} />
                  <TextField label="E-mail" value={content.contact?.contactInfo?.items?.[1]?.value} onChange={(v) => update("contact.contactInfo.items.1.value", v)} />
                  <TextField label="WhatsApp" value={content.contact?.contactInfo?.items?.[0]?.value} onChange={(v) => update("contact.contactInfo.items.0.value", v)} />
                  <TextField label="Endereço" value={content.contact?.contactInfo?.items?.[2]?.value} onChange={(v) => update("contact.contactInfo.items.2.value", v)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="temas">
              <Card>
                <CardHeader>
                  <CardTitle>Tema Padrão</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <ColorField label="Cor primária" value={themes.default?.colors?.primary} onChange={(v) => setThemes({ ...themes, default: { ...themes.default, colors: { ...themes.default.colors, primary: v } } })} />
                  <ColorField label="Cor primária escura" value={themes.default?.colors?.primaryDark} onChange={(v) => setThemes({ ...themes, default: { ...themes.default, colors: { ...themes.default.colors, primaryDark: v } } })} />
                  <ColorField label="Cor secundária" value={themes.default?.colors?.secondary} onChange={(v) => setThemes({ ...themes, default: { ...themes.default, colors: { ...themes.default.colors, secondary: v } } })} />
                  <ColorField label="Cor de destaque" value={themes.default?.colors?.accent} onChange={(v) => setThemes({ ...themes, default: { ...themes.default, colors: { ...themes.default.colors, accent: v } } })} />
                </CardContent>
              </Card>

              {themes.themes?.map((t: any, idx: number) => (
                <Card key={idx} className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Tema Comemorativo: {t.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    <TextField label="Nome" value={t.name} onChange={(v) => {
                      const next = { ...themes };
                      next.themes[idx].name = v;
                      setThemes(next);
                    }} />
                    <TextField label="Data início (MM-DD)" value={t.startDate} onChange={(v) => {
                      const next = { ...themes };
                      next.themes[idx].startDate = v;
                      setThemes(next);
                    }} />
                    <TextField label="Data fim (MM-DD)" value={t.endDate} onChange={(v) => {
                      const next = { ...themes };
                      next.themes[idx].endDate = v;
                      setThemes(next);
                    }} />
                    <ColorField label="Cor primária" value={t.colors?.primary} onChange={(v) => {
                      const next = { ...themes };
                      next.themes[idx].colors = { ...next.themes[idx].colors, primary: v };
                      setThemes(next);
                    }} />
                    <ColorField label="Cor secundária" value={t.colors?.secondary} onChange={(v) => {
                      const next = { ...themes };
                      next.themes[idx].colors = { ...next.themes[idx].colors, secondary: v };
                      setThemes(next);
                    }} />
                    <ColorField label="Cor de destaque" value={t.colors?.accent} onChange={(v) => {
                      const next = { ...themes };
                      next.themes[idx].colors = { ...next.themes[idx].colors, accent: v };
                      setThemes(next);
                    }} />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

function JsonEditorPanel({
  content,
  themes,
  setContent,
  setThemes,
}: {
  content: Record<string, any>;
  themes: Record<string, any>;
  setContent: (v: Record<string, any>) => void;
  setThemes: (v: Record<string, any>) => void;
}) {
  const [contentText, setContentText] = useState(JSON.stringify(content, null, 2));
  const [themesText, setThemesText] = useState(JSON.stringify(themes, null, 2));
  const [error, setError] = useState("");

  const apply = () => {
    try {
      setContent(JSON.parse(contentText));
      setThemes(JSON.parse(themesText));
      setError("");
    } catch {
      setError("JSON inválido");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={apply}>Aplicar JSON</Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <textarea
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
          className="w-full min-h-[500px] font-mono text-sm p-4 rounded-lg border border-slate-200"
        />
        <textarea
          value={themesText}
          onChange={(e) => setThemesText(e.target.value)}
          className="w-full min-h-[500px] font-mono text-sm p-4 rounded-lg border border-slate-200"
        />
      </div>
    </div>
  );
}
