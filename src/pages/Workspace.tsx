import { useState, useEffect, useMemo } from "react";
import {
  Layers,
  Search,
  Plus,
  ExternalLink,
  Trash2,
  Clock,
  CheckCircle2,
  Bookmark,
  Terminal,
  Cpu,
  Shield,
  FolderGit2,
  Code2,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ToolItem {
  id: string;
  title: string;
  category: "Engineering" | "Systems" | "Security" | "Productivity";
  desc: string;
  url: string;
  tags: string[];
  isCustom?: boolean;
}

const defaultTools: ToolItem[] = [
  {
    id: "github",
    title: "GitHub Repositories",
    category: "Engineering",
    desc: "Source control, continuous integration pipelines, pull requests, and automated deployments.",
    url: "https://github.com/Vignesh-Ambati",
    tags: ["Git", "CI/CD", "Open Source"],
  },
  {
    id: "leetcode",
    title: "LeetCode Workspace",
    category: "Engineering",
    desc: "Problem solving, data structure optimization, dynamic programming, and algorithm practice.",
    url: "https://leetcode.com",
    tags: ["Algorithms", "C++", "Python"],
  },
  {
    id: "nmea-analyzer",
    title: "NMEA GPS Analyzer",
    category: "Systems",
    desc: "Real-time navigation sentence stream parser and coordinate verification utility.",
    url: "/projects",
    tags: ["Protocols", "GPS", "Parser"],
  },
  {
    id: "linux-docs",
    title: "Linux Man Pages & Kernel Docs",
    category: "Systems",
    desc: "System call definitions, POSIX thread specifications, network socket APIs, and memory management.",
    url: "https://man7.org/linux/man-pages/",
    tags: ["POSIX", "Kernel", "C"],
  },
  {
    id: "wireshark",
    title: "Packet & Protocol Specs",
    category: "Systems",
    desc: "ARINC 615A/665, Ethernet, TCP/UDP packet formats, dissecting rules, and network debugging.",
    url: "https://www.wireshark.org/docs/",
    tags: ["Networking", "ARINC", "Packets"],
  },
  {
    id: "cyberchef",
    title: "CyberChef Data Transform",
    category: "Security",
    desc: "Cryptographic operations, hex dumps, decompression, Base64 pipelines, and data decoding.",
    url: "https://gchq.github.io/CyberChef/",
    tags: ["Cryptography", "Hex", "Encoding"],
  },
  {
    id: "regex101",
    title: "Regex101 Debugger",
    category: "Productivity",
    desc: "Interactive regular expression testing, regex syntax breakdowns, and test string matching.",
    url: "https://regex101.com",
    tags: ["Regex", "Parsing", "Utilities"],
  },
  {
    id: "devdocs",
    title: "DevDocs API Reference",
    category: "Productivity",
    desc: "Unified offline-capable API documentation library for C, Python, TypeScript, React, and Linux.",
    url: "https://devdocs.io",
    tags: ["Docs", "TypeScript", "React"],
  },
];

const categoryIcons = {
  Engineering: Code2,
  Systems: Cpu,
  Security: Shield,
  Productivity: Terminal,
};

const WorkSpace = () => {
  const [tools, setTools] = useState<ToolItem[]>(() => {
    try {
      const saved = localStorage.getItem("originhub_custom_tools");
      if (saved) {
        return [...defaultTools, ...JSON.parse(saved)];
      }
    } catch (e) {
      console.error("Failed to load saved tools", e);
    }
    return defaultTools;
  });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // New tool form state
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState<"Engineering" | "Systems" | "Security" | "Productivity">("Engineering");
  const [newDesc, setNewDesc] = useState("");
  const [newTag, setNewTag] = useState("");

  // Live clock
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }) +
          " UTC" +
          (now.getTimezoneOffset() <= 0 ? "+" : "-") +
          Math.abs(now.getTimezoneOffset() / 60)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) {
      toast.error("Please provide both a title and URL.");
      return;
    }

    let formattedUrl = newUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://") && !formattedUrl.startsWith("/")) {
      formattedUrl = "https://" + formattedUrl;
    }

    const createdTool: ToolItem = {
      id: "custom-" + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      desc: newDesc.trim() || "Custom link added to workspace",
      url: formattedUrl,
      tags: newTag ? newTag.split(",").map((t) => t.trim()).filter(Boolean) : ["Custom"],
      isCustom: true,
    };

    const updated = [...tools, createdTool];
    setTools(updated);

    // Save only custom tools to localStorage
    const customList = updated.filter((t) => t.isCustom);
    localStorage.setItem("originhub_custom_tools", JSON.stringify(customList));

    toast.success(`Added "${createdTool.title}" to your workspace.`);
    setNewTitle("");
    setNewUrl("");
    setNewDesc("");
    setNewTag("");
    setIsDialogOpen(false);
  };

  const handleDeleteTool = (id: string, title: string) => {
    const updated = tools.filter((t) => t.id !== id);
    setTools(updated);
    const customList = updated.filter((t) => t.isCustom);
    localStorage.setItem("originhub_custom_tools", JSON.stringify(customList));
    toast.info(`Removed "${title}" from workspace.`);
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(search.toLowerCase()) ||
        tool.desc.toLowerCase().includes(search.toLowerCase()) ||
        tool.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCat = selectedCategory === "All" || tool.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [tools, search, selectedCategory]);

  const categories = ["All", "Engineering", "Systems", "Security", "Productivity"];

  return (
    <PageShell
      eyebrow="Workspace Dashboard"
      title="Unified Developer Workspace"
      subtitle="Your centralized control layer for daily engineering tools, protocol documentation, and custom operational links."
      prev={{ label: "Home", to: "/" }}
      next={{ label: "Quick Actions", to: "/actions" }}
    >
      {/* Workspace Status Bar */}
      <div className="mb-8 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 text-xs sm:flex-row sm:items-center sm:justify-between shadow-xs">
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1.5 text-foreground font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Operational</span>
          </div>
          <span className="opacity-40">|</span>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>{currentTime || "Synchronizing..."}</span>
          </div>
          <span className="opacity-40">|</span>
          <div className="flex items-center gap-1.5">
            <Bookmark className="h-3.5 w-3.5 text-accent" />
            <span>{tools.length} Tools Configured</span>
          </div>
        </div>

        {/* Add custom tool dialog button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Add Tool / Link</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md border-border bg-card">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">Add Custom Workspace Tool</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTool} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="tool-title" className="text-xs">Tool Name</Label>
                <Input
                  id="tool-title"
                  placeholder="e.g. AWS Console or Internal Wiki"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-background text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tool-url" className="text-xs">Target URL</Label>
                <Input
                  id="tool-url"
                  placeholder="https://..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="bg-background text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="tool-cat" className="text-xs">Category</Label>
                  <select
                    id="tool-cat"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ToolItem["category"])}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Systems">Systems</option>
                    <option value="Security">Security</option>
                    <option value="Productivity">Productivity</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="tool-tags" className="text-xs">Tags (comma separated)</Label>
                  <Input
                    id="tool-tags"
                    placeholder="API, Cloud, Linux"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="bg-background text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tool-desc" className="text-xs">Brief Description</Label>
                <Input
                  id="tool-desc"
                  placeholder="Short note on what this tool is used for"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="bg-background text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Save to Workspace
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tools, tags, protocols..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card text-xs sm:text-sm border-border"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => {
          const IconComponent = categoryIcons[tool.category] || Layers;

          return (
            <Card
              key={tool.id}
              className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  {tool.isCustom && (
                    <button
                      type="button"
                      onClick={() => handleDeleteTool(tool.id, tool.title)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      aria-label={`Delete ${tool.title}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={tool.url}
                  target={tool.url.startsWith("http") ? "_blank" : undefined}
                  rel={tool.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <span>Launch</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
          <Layers className="mx-auto h-8 w-8 opacity-40 mb-2" />
          <p className="text-sm font-medium">No tools found matching "{search}"</p>
          <p className="text-xs mt-1">Try another keyword or add a new custom link above.</p>
        </div>
      )}
    </PageShell>
  );
};

export default WorkSpace;
