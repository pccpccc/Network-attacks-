const express = require('express');
const os = require('os'); // 引入 OS 模組
const app = express();

// 優先讀取環境變數，如果沒有則自動抓取 Pod 的 Hostname (Pod 名稱)
const podName = process.env.INSTANCE_ID || os.hostname();
const port = 8080;

app.get('/', (req, res) => {
  const serverTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }) + ' UTC';
  const message = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Kubernetes Demo Page</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "primary": "#f5f5f7",
        "secondary": "#a1a1a6",
        "background": "#000000",
        "surface": "#1c1c1e",
        "border-dim": "rgba(255,255,255,0.1)",
      },
      fontFamily: {
        "sans": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        "mono": ["SF Mono", "Menlo", "Monaco", "Courier New", "monospace"],
      },
    },
  },
}
</script>
<style>
body {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
</head>
<body class="bg-background text-primary antialiased selection:bg-white selection:text-black">
<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
<header class="sticky top-0 z-50 w-full backdrop-blur-md bg-black/70 border-b border-border-dim">
<div class="mx-auto flex h-14 max-w-[980px] items-center justify-between px-4 md:px-6">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-xl text-white">dns</span>
<span class="text-sm font-semibold tracking-tight text-white">K8s Demo</span>
</div>
<nav class="hidden md:flex items-center gap-8 text-[12px] font-medium text-secondary">
<a class="hover:text-primary transition-colors" href="#">GitHub</a>
<a class="hover:text-primary transition-colors" href="#">Documentation</a>
</nav>
</div>
</header>
<main class="flex flex-col items-center w-full grow">
<section class="w-full max-w-[980px] px-4 md:px-6 py-16 md:py-24 flex flex-col items-center text-center">
<div class="inline-flex items-center gap-3 mb-8 px-3 py-1.5 rounded-full bg-surface border border-border-dim text-[11px] font-medium text-secondary tracking-wide uppercase">
<span>v1.0.4 Stable</span>
<span class="w-px h-3 bg-white/10"></span>
<span class="text-green-400 flex items-center gap-1.5">
<span class="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.4)]"></span> Healthy
</span>
</div>
<h1 class="text-4xl md:text-6xl font-semibold tracking-tighter text-primary mb-6 leading-[1.1]">
Load Balancing Visualizer
</h1>
<p class="text-lg md:text-[21px] text-secondary max-w-[640px] leading-relaxed font-normal tracking-tight">
Experience Kubernetes in action. Watch real-time traffic routing and self-healing capabilities on a live cluster.
</p>
</section>
<section class="w-full max-w-[980px] px-4 md:px-6 pb-24">
<div class="flex flex-col items-start w-full mb-6 px-2">
<h3 class="text-[19px] font-semibold tracking-tight text-primary">Live Response Data</h3>
</div>
<div class="flex flex-col md:flex-row gap-6 w-full">
<div class="flex-1 rounded-3xl bg-surface p-8 ring-1 ring-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden group transition-all duration-300 hover:ring-white/20">
<div class="absolute top-6 right-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
<span class="material-symbols-outlined text-7xl text-white">dns</span>
</div>
<p class="text-[10px] font-bold uppercase tracking-widest text-secondary mb-3">Hello from Pod</p>
<p class="text-3xl md:text-4xl font-semibold tracking-tight font-mono text-primary break-all">${podName}</p>
<div class="mt-5 flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[11px] font-medium border border-green-500/20">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
</span>
Status: Active
</div>
</div>
<div class="flex-1 rounded-3xl bg-surface p-8 ring-1 ring-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden group transition-all duration-300 hover:ring-white/20">
<div class="absolute top-6 right-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
<span class="material-symbols-outlined text-7xl text-white">schedule</span>
</div>
<p class="text-[10px] font-bold uppercase tracking-widest text-secondary mb-3">Server Time</p>
<p class="text-3xl md:text-4xl font-semibold tracking-tight font-mono text-primary">${serverTime}</p>
<div class="mt-5 flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-medium border border-blue-500/20">
<span class="material-symbols-outlined text-[14px]">sync</span>
NTP Synced
</div>
</div>
</div>
</section>
<section class="w-full bg-[#0a0a0a] border-y border-border-dim py-24">
<div class="max-w-[980px] mx-auto px-4 md:px-6 flex flex-col items-center text-center">
<h2 class="text-4xl font-semibold tracking-tight mb-4 text-primary">Control the Cluster</h2>
<p class="text-secondary text-lg max-w-[580px] mb-12 leading-relaxed font-normal">
Interact directly with the backend. Refresh to trigger the load balancer and see traffic distribution across pods.
</p>
<div class="flex flex-col sm:flex-row gap-5 w-full justify-center max-w-lg">
<button onclick="location.reload()" class="group relative flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-white text-black text-[15px] font-medium hover:bg-gray-200 transition-all active:scale-[0.98]">
<span class="material-symbols-outlined text-[20px] transition-transform duration-500 group-hover:rotate-180">refresh</span>
Refresh Connection
</button>
</div>
</div>
</section>
<section class="w-full max-w-[980px] px-4 md:px-6 py-24">
<div class="mb-12">
<h2 class="text-3xl font-semibold tracking-tight text-primary">How it works</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12">
<div class="flex flex-col gap-4">
<div class="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-2 border border-white/5">
<span class="material-symbols-outlined text-primary">compare_arrows</span>
</div>
<h3 class="text-lg font-semibold text-primary tracking-tight">Load Balancing</h3>
<p class="text-[15px] text-secondary leading-relaxed font-normal">
Traffic is intelligently distributed across healthy pods, ensuring optimal resource utilization and preventing bottlenecks.
</p>
</div>
<div class="flex flex-col gap-4">
<div class="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-2 border border-white/5">
<span class="material-symbols-outlined text-primary">healing</span>
</div>
<h3 class="text-lg font-semibold text-primary tracking-tight">Self-Healing</h3>
<p class="text-[15px] text-secondary leading-relaxed font-normal">
If a pod crashes, Kubernetes instantly detects the failure and automatically replaces the instance to maintain service availability.
</p>
</div>
<div class="flex flex-col gap-4">
<div class="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-2 border border-white/5">
<span class="material-symbols-outlined text-primary">hub</span>
</div>
<h3 class="text-lg font-semibold text-primary tracking-tight">Scalability</h3>
<p class="text-[15px] text-secondary leading-relaxed font-normal">
The architecture supports horizontal scaling, allowing new pods to be added seamlessly to handle increased load.
</p>
</div>
</div>
</section>
</main>
<footer class="w-full border-t border-border-dim py-12 bg-background">
<div class="max-w-[980px] mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
<p class="text-[11px] text-secondary font-medium">© 2023 Kubernetes Demo. Built for educational purposes.</p>
<div class="flex gap-6 text-[11px] text-secondary font-medium">
<a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="hover:text-primary transition-colors" href="#">Terms of Use</a>
</div>
</div>
</footer>
</div>
</body></html>`;
  
  console.log(`[LOG] Request served by Pod: ${podName}`); 
  res.status(200).send(message);
});

app.listen(port, '0.0.0.0', () => { // <--- 加入 '0.0.0.0' 確保對外開放
  console.log(`Server is running on Pod: ${podName}, port: ${port}`);
});