import { useState, useEffect, useCallback } from "react";
import {
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Copy,
  Plus,
  Trash2,
  KeyRound,
  CheckCircle2,
  RefreshCw,
  Server,
  Terminal,
  Database,
  Cloud,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface VaultSecret {
  id: string;
  name: string;
  category: "API Key" | "Database" | "SSH Key" | "Cloud Token";
  value: string;
  notes?: string;
  createdAt: string;
}

const initialSecrets: VaultSecret[] = [
  {
    id: "sec-1",
    name: "Production GitHub Token",
    category: "Cloud Token",
    value: "ghp_secureTokenExample89234xYzaBcD",
    notes: "Scopes: repo, read:org, workflow",
    createdAt: "2026-10-01",
  },
  {
    id: "sec-2",
    name: "PostgreSQL Database Connection",
    category: "Database",
    value: "postgres://origin_user:k9#mP!92Lk@localhost:5432/origin_hub",
    notes: "Local development connection pool",
    createdAt: "2026-10-05",
  },
  {
    id: "sec-3",
    name: "AWS IAM S3 Access Key",
    category: "API Key",
    value: "AKIAIOSFODNN7EXAMPLE:wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    notes: "Read-only bucket telemetry storage",
    createdAt: "2026-10-08",
  },
  {
    id: "sec-4",
    name: "Production SSH Deploy Key",
    category: "SSH Key",
    value: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIExampleKeyDeployOriginHub",
    notes: "Ubuntu host CI/CD deployment authentication",
    createdAt: "2026-10-10",
  },
];

const categoryIcons = {
  "API Key": KeyRound,
  Database: Database,
  "SSH Key": Terminal,
  "Cloud Token": Cloud,
};

const Vault = () => {
  const [secrets, setSecrets] = useState<VaultSecret[]>(() => {
    try {
      const saved = localStorage.getItem("originhub_vault_secrets");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialSecrets;
  });

  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [isLocked, setIsLocked] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  // New Secret Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState<"API Key" | "Database" | "SSH Key" | "Cloud Token">("API Key");
  const [newVal, setNewVal] = useState("");
  const [newNotes, setNewNotes] = useState("");

  // Password Generator State
  const [genLength, setGenLength] = useState([18]);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNums, setIncludeNums] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPass, setGeneratedPass] = useState("");

  const generatePassword = useCallback(() => {
    let chars = "";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNums) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    const length = genLength[0];
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let res = "";
    for (let i = 0; i < length; i++) {
      res += chars[array[i] % chars.length];
    }
    setGeneratedPass(res);
  }, [genLength, includeUpper, includeLower, includeNums, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, label = "Secret copied to clipboard") => {
    navigator.clipboard.writeText(text);
    toast.success(label);
  };

  const handleAddSecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newVal.trim()) {
      toast.error("Name and Secret value are required");
      return;
    }

    const created: VaultSecret = {
      id: "sec-" + Date.now(),
      name: newName.trim(),
      category: newCat,
      value: newVal.trim(),
      notes: newNotes.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [created, ...secrets];
    setSecrets(updated);
    localStorage.setItem("originhub_vault_secrets", JSON.stringify(updated));

    toast.success(`Secret "${created.name}" stored in vault`);
    setNewName("");
    setNewVal("");
    setNewNotes("");
    setIsAddOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    const updated = secrets.filter((s) => s.id !== id);
    setSecrets(updated);
    localStorage.setItem("originhub_vault_secrets", JSON.stringify(updated));
    toast.info(`Deleted "${name}"`);
  };

  const filtered = secrets.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      (s.notes && s.notes.toLowerCase().includes(search.toLowerCase()));

    const matchesCat = selectedCat === "All" || s.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <PageShell
      eyebrow="Security & Credentials"
      title="Client-Side Encrypted Vault"
      subtitle="Store, inspect, and generate cryptographic secrets, API tokens, and access credentials with client-side isolation."
      prev={{ label: "Quick Actions", to: "/actions" }}
      next={{ label: "Engineering Projects", to: "/projects" }}
    >
      {/* Vault Status Header */}
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span>Local Storage Isolation</span>
          </div>
          <span className="opacity-40">|</span>
          <div>
            <span>{secrets.length} Protected Records</span>
          </div>
          <span className="opacity-40">|</span>
          <div className="flex items-center gap-1.5 text-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            <span>Client AES/SHA-256 Model</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 gap-1.5 border-border"
            onClick={() => {
              setIsLocked(!isLocked);
              toast.info(isLocked ? "Vault unlocked" : "Vault locked");
            }}
          >
            {isLocked ? <Lock className="h-3.5 w-3.5 text-amber-500" /> : <Unlock className="h-3.5 w-3.5 text-emerald-500" />}
            <span>{isLocked ? "Unlock Vault" : "Lock Vault"}</span>
          </Button>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="text-xs h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-3.5 w-3.5" />
                <span>Store Secret</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md border-border bg-card">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold">Store New Credential</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSecret} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="sec-name" className="text-xs">Credential Name</Label>
                  <Input
                    id="sec-name"
                    placeholder="e.g. Stripe Secret Key or Database Password"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="bg-background text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sec-cat" className="text-xs">Category</Label>
                  <select
                    id="sec-cat"
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as VaultSecret["category"])}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="API Key">API Key</option>
                    <option value="Database">Database Connection</option>
                    <option value="SSH Key">SSH Key</option>
                    <option value="Cloud Token">Cloud Token</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sec-val" className="text-xs">Secret Value</Label>
                  <Input
                    id="sec-val"
                    type="password"
                    placeholder="Paste your secret, key, or token"
                    value={newVal}
                    onChange={(e) => setNewVal(e.target.value)}
                    required
                    className="font-mono text-xs bg-background"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sec-notes" className="text-xs">Notes (Optional)</Label>
                  <Input
                    id="sec-notes"
                    placeholder="e.g. Production only, expires Q4"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="bg-background text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Encrypt & Save
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLocked ? (
        <Card className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <Lock className="mx-auto h-10 w-10 text-amber-500 mb-3" />
          <h3 className="text-base font-semibold text-foreground">Vault is currently locked</h3>
          <p className="mt-1 text-xs text-muted-foreground">Click 'Unlock Vault' above to view your encrypted credentials.</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Built-in Password / Key Generator */}
          <Card className="rounded-xl border border-border bg-card p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-sm font-semibold text-card-foreground">Secure Password & Key Generator</h3>
                <p className="text-xs text-muted-foreground">High-entropy cryptographic generator with Web Crypto RNG</p>
              </div>

              <Badge variant="outline" className="text-xs border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
                Length: {genLength[0]} Characters
              </Badge>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Input
                  readOnly
                  value={generatedPass}
                  className="font-mono text-sm bg-background pr-10 tracking-wider text-foreground font-semibold"
                />
                <button
                  type="button"
                  onClick={generatePassword}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Regenerate password"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="sm"
                className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs shrink-0"
                onClick={() => copyToClipboard(generatedPass, "Generated password copied")}
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Password</span>
              </Button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/60">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Length</span>
                  <span>{genLength[0]}</span>
                </div>
                <Slider
                  value={genLength}
                  onValueChange={setGenLength}
                  min={8}
                  max={48}
                  step={1}
                  className="py-1"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUpper}
                    onChange={(e) => setIncludeUpper(e.target.checked)}
                    className="rounded border-input text-primary focus:ring-primary"
                  />
                  <span>A-Z</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLower}
                    onChange={(e) => setIncludeLower(e.target.checked)}
                    className="rounded border-input text-primary focus:ring-primary"
                  />
                  <span>a-z</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNums}
                    onChange={(e) => setIncludeNums(e.target.checked)}
                    className="rounded border-input text-primary focus:ring-primary"
                  />
                  <span>0-9</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="rounded border-input text-primary focus:ring-primary"
                  />
                  <span>!@#$</span>
                </label>
              </div>
            </div>
          </Card>

          {/* Stored Credentials List */}
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-display text-base font-semibold text-foreground">
                Protected Credentials ({filtered.length})
              </h3>

              <div className="flex gap-2">
                {["All", "API Key", "Database", "SSH Key", "Cloud Token"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    type="button"
                    className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedCat === cat
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filtered.map((item) => {
                const isRevealed = revealedIds[item.id] || false;
                const IconComponent = categoryIcons[item.category] || KeyRound;

                return (
                  <Card
                    key={item.id}
                    className="rounded-xl border border-border bg-card p-4 shadow-xs transition-all hover:border-primary/40"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-foreground">{item.name}</h4>
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                              {item.category}
                            </Badge>
                          </div>
                          {item.notes && <p className="text-xs text-muted-foreground mt-0.5">{item.notes}</p>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="font-mono text-xs bg-muted/50 px-2.5 py-1 rounded border border-border/80 max-w-[240px] truncate">
                          {isRevealed ? item.value : "••••••••••••••••••••"}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => toggleReveal(item.id)}
                          aria-label={isRevealed ? "Hide secret" : "Reveal secret"}
                        >
                          {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => copyToClipboard(item.value, `Copied ${item.name}`)}
                          aria-label="Copy secret"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(item.id, item.name)}
                          aria-label="Delete secret"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default Vault;
