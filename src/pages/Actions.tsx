import { useState, useEffect } from "react";
import {
  Zap,
  Copy,
  Check,
  RefreshCw,
  Binary,
  Code2,
  Clock,
  KeyRound,
  FileText,
  RotateCcw,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type TransformMode =
  | "base64-encode"
  | "base64-decode"
  | "url-encode"
  | "url-decode"
  | "hex-encode"
  | "hex-decode";

const Actions = () => {
  // 1. Base64 & Text Converter State
  const [textInput, setTextInput] = useState("Hello Origin-Hub");
  const [textOutput, setTextOutput] = useState("");
  const [transformMode, setTransformMode] = useState<TransformMode>("base64-encode");

  useEffect(() => {
    try {
      if (transformMode === "base64-encode") {
        setTextOutput(btoa(unescape(encodeURIComponent(textInput))));
      } else if (transformMode === "base64-decode") {
        setTextOutput(decodeURIComponent(escape(atob(textInput))));
      } else if (transformMode === "url-encode") {
        setTextOutput(encodeURIComponent(textInput));
      } else if (transformMode === "url-decode") {
        setTextOutput(decodeURIComponent(textInput));
      } else if (transformMode === "hex-encode") {
        setTextOutput(
          Array.from(new TextEncoder().encode(textInput))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(" ")
        );
      } else if (transformMode === "hex-decode") {
        const clean = textInput.replace(/\s+/g, "");
        const bytes = new Uint8Array(clean.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);
        setTextOutput(new TextDecoder().decode(bytes));
      }
    } catch {
      setTextOutput("Error: Invalid input for selected conversion");
    }
  }, [textInput, transformMode]);

  // 2. JSON Formatter State
  const [jsonInput, setJsonInput] = useState('{\n  "system": "Origin-Hub",\n  "status": "operational",\n  "version": "1.0.0"\n}');
  const [jsonOutput, setJsonOutput] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  const formatJson = (spaces = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, spaces));
      setJsonError(null);
      toast.success("JSON formatted successfully");
    } catch (err: unknown) {
      setJsonError(err instanceof Error ? err.message : "Invalid JSON syntax");
      toast.error("Invalid JSON syntax");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
      setJsonError(null);
      toast.success("JSON minified successfully");
    } catch (err: unknown) {
      setJsonError(err instanceof Error ? err.message : "Invalid JSON syntax");
      toast.error("Invalid JSON syntax");
    }
  };

  // 3. Epoch & Timestamp State
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [epochInput, setEpochInput] = useState(String(Math.floor(Date.now() / 1000)));
  const [epochResult, setEpochResult] = useState({ utc: "", local: "", rel: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const num = parseInt(epochInput, 10);
    if (!isNaN(num)) {
      const ms = num < 10000000000 ? num * 1000 : num;
      const d = new Date(ms);
      if (!isNaN(d.getTime())) {
        setEpochResult({
          utc: d.toUTCString(),
          local: d.toLocaleString(),
          rel: d.toISOString(),
        });
      }
    }
  }, [epochInput]);

  // 4. Hash & UUID State
  const [uuidList, setUuidList] = useState<string[]>([]);
  const [hashInput, setHashInput] = useState("Origin-Hub-Security");
  const [sha256Hash, setSha256Hash] = useState("");

  const generateUuids = (count = 1) => {
    const arr: string[] = [];
    for (let i = 0; i < count; i++) {
      arr.push(crypto.randomUUID());
    }
    setUuidList(arr);
    toast.success(`Generated ${count} UUID${count > 1 ? "s" : ""}`);
  };

  useEffect(() => {
    const calculateSha256 = async () => {
      if (!hashInput) {
        setSha256Hash("");
        return;
      }
      try {
        const msgBuffer = new TextEncoder().encode(hashInput);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        setSha256Hash(hashHex);
      } catch (e) {
        console.error("Hash calculation error", e);
      }
    };
    calculateSha256();
  }, [hashInput]);

  const copyToClipboard = (text: string, label = "Copied to clipboard") => {
    navigator.clipboard.writeText(text);
    toast.success(label);
  };

  return (
    <PageShell
      eyebrow="Execution Suite"
      title="Quick Actions & Utility Dispatch"
      subtitle="Interactive, instant developer tools to format data, encode protocols, inspect timestamps, and generate cryptographic identifiers."
      prev={{ label: "Workspace", to: "/workspace" }}
      next={{ label: "Secure Vault", to: "/vault" }}
    >
      <Tabs defaultValue="transforms" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-muted mb-6">
          <TabsTrigger value="transforms" className="text-xs">
            <Binary className="mr-1.5 h-3.5 w-3.5" /> Encoders
          </TabsTrigger>
          <TabsTrigger value="json" className="text-xs">
            <Code2 className="mr-1.5 h-3.5 w-3.5" /> JSON Tools
          </TabsTrigger>
          <TabsTrigger value="epoch" className="text-xs">
            <Clock className="mr-1.5 h-3.5 w-3.5" /> Timestamps
          </TabsTrigger>
          <TabsTrigger value="crypto" className="text-xs">
            <KeyRound className="mr-1.5 h-3.5 w-3.5" /> Hashes & UUID
          </TabsTrigger>
        </TabsList>

        {/* 1. Base64 & Encoding */}
        <TabsContent value="transforms">
          <Card className="rounded-xl border border-border bg-card p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-display text-base font-semibold text-card-foreground">Data Transformations</h3>
                <p className="text-xs text-muted-foreground">Base64, Hexadecimal, and URL encoding pipelines</p>
              </div>

              {/* Mode Selector */}
              <div className="flex flex-wrap gap-1">
                {[
                  { id: "base64-encode", label: "Base64 Encode" },
                  { id: "base64-decode", label: "Base64 Decode" },
                  { id: "url-encode", label: "URL Encode" },
                  { id: "url-decode", label: "URL Decode" },
                  { id: "hex-encode", label: "Hex Encode" },
                  { id: "hex-decode", label: "Hex Decode" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setTransformMode(m.id as TransformMode)}
                    className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                      transformMode === m.id
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="encode-in" className="text-xs font-medium">Input Buffer</Label>
                <Textarea
                  id="encode-in"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter raw text here..."
                  className="font-mono text-xs bg-background min-h-[140px]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="encode-out" className="text-xs font-medium">Transformed Output</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs gap-1"
                    onClick={() => copyToClipboard(textOutput)}
                  >
                    <Copy className="h-3 w-3" /> Copy
                  </Button>
                </div>
                <Textarea
                  id="encode-out"
                  readOnly
                  value={textOutput}
                  className="font-mono text-xs bg-muted/40 min-h-[140px]"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* 2. JSON Formatter */}
        <TabsContent value="json">
          <Card className="rounded-xl border border-border bg-card p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-display text-base font-semibold text-card-foreground">JSON Formatter & Validator</h3>
                <p className="text-xs text-muted-foreground">Prettify, validate, or compress JSON payloads</p>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => formatJson(2)} className="h-7 text-xs">
                  Format (2 Spaces)
                </Button>
                <Button size="sm" variant="outline" onClick={() => formatJson(4)} className="h-7 text-xs">
                  Format (4 Spaces)
                </Button>
                <Button size="sm" variant="outline" onClick={minifyJson} className="h-7 text-xs">
                  Minify
                </Button>
              </div>
            </div>

            {jsonError && (
              <div className="mb-3 rounded-lg border border-destructive/40 bg-destructive/10 p-2.5 text-xs text-destructive">
                Error: {jsonError}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="json-in" className="text-xs font-medium">Input JSON</Label>
                <Textarea
                  id="json-in"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="font-mono text-xs bg-background min-h-[180px]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="json-out" className="text-xs font-medium">Formatted Output</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs gap-1"
                    onClick={() => copyToClipboard(jsonOutput || jsonInput)}
                  >
                    <Copy className="h-3 w-3" /> Copy
                  </Button>
                </div>
                <Textarea
                  id="json-out"
                  readOnly
                  value={jsonOutput || "Click 'Format' to inspect formatted output"}
                  className="font-mono text-xs bg-muted/40 min-h-[180px]"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* 3. Timestamps & Epoch */}
        <TabsContent value="epoch">
          <Card className="rounded-xl border border-border bg-card p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-base font-semibold text-card-foreground">Epoch & Unix Timestamp Converter</h3>
                <p className="text-xs text-muted-foreground">Convert between epoch seconds, ISO timestamps, and human dates</p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono text-xs font-semibold">{currentEpoch}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(String(currentEpoch), "Current epoch copied")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="epoch-val" className="text-xs font-medium">Timestamp to Inspect (Seconds or Milliseconds)</Label>
                  <button
                    type="button"
                    onClick={() => setEpochInput(String(Math.floor(Date.now() / 1000)))}
                    className="text-[11px] text-primary hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" /> Set to Now
                  </button>
                </div>
                <Input
                  id="epoch-val"
                  value={epochInput}
                  onChange={(e) => setEpochInput(e.target.value)}
                  className="font-mono text-sm bg-background"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3 pt-2">
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">UTC Format</span>
                  <p className="mt-1 font-mono text-xs font-medium text-foreground">{epochResult.utc || "—"}</p>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Local Time</span>
                  <p className="mt-1 font-mono text-xs font-medium text-foreground">{epochResult.local || "—"}</p>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">ISO 8601</span>
                  <p className="mt-1 font-mono text-xs font-medium text-foreground truncate">{epochResult.rel || "—"}</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* 4. Crypto & UUID */}
        <TabsContent value="crypto">
          <div className="grid gap-6 md:grid-cols-2">
            {/* UUID Generator */}
            <Card className="rounded-xl border border-border bg-card p-6 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-sm font-semibold text-card-foreground">UUID v4 Generator</h3>
                <div className="flex gap-1.5">
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => generateUuids(1)}>
                    Generate 1
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => generateUuids(5)}>
                    Generate 5
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-3">
                Cryptographically secure RFC 4122 Version 4 random UUIDs.
              </p>

              {uuidList.length > 0 ? (
                <div className="space-y-1.5 font-mono text-xs">
                  {uuidList.map((id) => (
                    <div
                      key={id}
                      onClick={() => copyToClipboard(id)}
                      className="flex cursor-pointer items-center justify-between rounded border border-border bg-muted/40 p-2 hover:bg-muted"
                    >
                      <span>{id}</span>
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                  Click 'Generate' to create random UUIDs
                </div>
              )}
            </Card>

            {/* SHA-256 Calculator */}
            <Card className="rounded-xl border border-border bg-card p-6 shadow-xs">
              <h3 className="font-display text-sm font-semibold text-card-foreground mb-1">SHA-256 Checksum</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Compute one-way SHA-256 hash using native Web Crypto API.
              </p>

              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="hash-src" className="text-xs">Plaintext Message</Label>
                  <Input
                    id="hash-src"
                    value={hashInput}
                    onChange={(e) => setHashInput(e.target.value)}
                    className="font-mono text-xs bg-background"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hash-res" className="text-xs">Calculated Hash (Hex)</Label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(sha256Hash)}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" /> Copy Hash
                    </button>
                  </div>
                  <Input
                    id="hash-res"
                    readOnly
                    value={sha256Hash}
                    className="font-mono text-xs bg-muted/40 text-foreground"
                  />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
};

export default Actions;
