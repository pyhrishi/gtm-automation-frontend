"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { 
  Activity, Play, AlertTriangle, MessageSquare, Terminal, 
  Code, Layout, User, CheckCircle2, ChevronRight, Zap, RefreshCw,
  TrendingUp, AlertOctagon, ShieldAlert, CheckSquare, DollarSign, Calendar, Heart
} from "lucide-react";

// Portfolio database corresponding exactly to backend/generate_mock_data.py
const PORTFOLIOS: Record<string, {
  csmName: string;
  accounts: {
    id: string;
    name: string;
    health: number;
    status: "CRITICAL" | "STABLE";
    arr: number;
    renewal: string;
    sentiment: "Negative" | "Positive";
    summary: string;
    actions: string[];
  }[];
}> = {
  CSM_MARK_R: {
    csmName: "Mark Robinson",
    accounts: [
      { id: "ACC_001", name: "Acme Corp", health: 3.8, status: "CRITICAL", arr: 185000, renewal: "2026-06-25", sentiment: "Negative", summary: "Exec sync. Champion left. New leadership reviewing spending. Severe platform churn risk.", actions: ["Introduce new CSM to champion", "Provide SOC2 compliance report", "Share product roadmap deck"] },
      { id: "ACC_002", name: "Globex Inc", health: 9.2, status: "STABLE", arr: 245000, renewal: "2026-11-14", sentiment: "Positive", summary: "Sync complete. Product usage expanding into APAC division. No blockers reported.", actions: ["Monitor adoption rates"] }
    ]
  },
  CSM_SARAH_K: {
    csmName: "Sarah Jenkins",
    accounts: [
      { id: "ACC_003", name: "Initech LLC", health: 4.1, status: "CRITICAL", arr: 120000, renewal: "2026-06-18", sentiment: "Negative", summary: "User adoption dropping. Customer complains about API limits. Renewal at risk.", actions: ["Schedule Tech Audit call", "Send API rate limits proposal"] },
      { id: "ACC_004", name: "Umbrella Corp", health: 8.7, status: "STABLE", arr: 290000, renewal: "2027-02-10", sentiment: "Positive", summary: "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.", actions: ["Send expansion pricing sheet"] }
    ]
  },
  CSM_ALEX_B: {
    csmName: "Alex Baldwin",
    accounts: [
      { id: "ACC_005", name: "Stark Industries", health: 2.9, status: "CRITICAL", arr: 310000, renewal: "2026-06-12", sentiment: "Negative", summary: "Support escalations. downtime last week. Agitated stakeholders. Health score dropping.", actions: ["Review downtime RCA with AE", "Provide compliance validation"] },
      { id: "ACC_006", name: "Wayne Enterprises", health: 9.5, status: "STABLE", arr: 145000, renewal: "2026-12-05", sentiment: "Positive", summary: "Healthy account. Stakeholder is highly active in Slack. High NPS score.", actions: ["Ask for case study reference"] }
    ]
  },
  CSM_JESSICA_T: {
    csmName: "Jessica Taylor",
    accounts: [
      { id: "ACC_007", name: "Cyberdyne Systems", health: 8.9, status: "STABLE", arr: 198000, renewal: "2026-09-30", sentiment: "Positive", summary: "Stable telemetry. Customer requested walkthrough of new automated GTM integrations.", actions: ["Send integrations docs link"] },
      { id: "ACC_008", name: "Soylent Corp", health: 4.5, status: "CRITICAL", arr: 95000, renewal: "2026-06-22", sentiment: "Negative", summary: "Contraction risk. Champion has departed. Budget freeze on renewals.", actions: ["Book meeting with executive buyer", "Share platform upgrade pricing"] }
    ]
  },
  CSM_DAVID_L: {
    csmName: "David Lang",
    accounts: [
      { id: "ACC_009", name: "Massive Dynamic", health: 3.4, status: "CRITICAL", arr: 215000, renewal: "2026-06-28", sentiment: "Negative", summary: "Unresolved bugs syncing CPQ. Technical blockers causing friction.", actions: ["Schedule Solution Architect sync", "Provide custom SDK patches"] },
      { id: "ACC_012", name: "Tyrell Corp", health: 8.1, status: "STABLE", arr: 175000, renewal: "2026-10-15", sentiment: "Positive", summary: "Touchpoint complete. User onboarding going smoothly. Integration active.", actions: ["Follow up on SSO set up"] }
    ]
  },
  CSM_EMILY_C: {
    csmName: "Emily Chen",
    accounts: [
      { id: "ACC_010", name: "Hooli", health: 8.4, status: "STABLE", arr: 260000, renewal: "2026-08-20", sentiment: "Positive", summary: "Smooth operations. Trial period started on expansion modules. AE driving upsell.", actions: ["Send roadmap slide deck"] },
      { id: "ACC_013", name: "Pied Piper", health: 3.7, status: "CRITICAL", arr: 135000, renewal: "2026-06-15", sentiment: "Negative", summary: "Stakeholder churn. Champion left company. Platform adoption stalling.", actions: ["Reach out to new GTM Director", "Schedule fresh team training"] }
    ]
  },
  CSM_MICHAEL_W: {
    csmName: "Michael Wong",
    accounts: [
      { id: "ACC_011", name: "Oscorp", health: 4.8, status: "CRITICAL", arr: 165000, renewal: "2026-06-20", sentiment: "Negative", summary: "Support ticket escalation. API performance issues and latency errors reported.", actions: ["Escalate API latency tickets", "Send API status dashboard link"] },
      { id: "ACC_014", name: "LexCorp", health: 9.1, status: "STABLE", arr: 220000, renewal: "2026-11-01", sentiment: "Positive", summary: "Platform usage is high. License count expanded into EMEA region last week.", actions: ["Arrange QBR for expansion metrics"] }
    ]
  }
};

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [slackPayload, setSlackPayload] = useState<any[] | null>(null);
  const [selectedCsm, setSelectedCsm] = useState("CSM_MARK_R");
  const [selectedAccount, setSelectedAccount] = useState<string>("ACC_001");
  const [viewMode, setViewMode] = useState<"ui" | "json">("ui");
  const [logs, setLogs] = useState<string[]>([]);
  const [checkedActions, setCheckedActions] = useState<string[]>([]);
  
  const logEndRef = useRef<HTMLDivElement>(null);

  // Dynamically load font styles
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Set default account when changing CSM
  useEffect(() => {
    const portfolio = PORTFOLIOS[selectedCsm];
    if (portfolio && portfolio.accounts.length > 0) {
      setSelectedAccount(portfolio.accounts[0].id);
    }
  }, [selectedCsm]);

  // Auto-scroll log traces
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toISOString().split('T')[1].substring(0, 8);
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  };

  const triggerAutomation = async () => {
    setLoading(true);
    setSlackPayload(null);
    setLogs([]);
    
    addLog(`⚡ Initiating GTM Sync Cron Job for ${selectedCsm}...`);
    setTimeout(() => addLog(`🔍 Hydrating portfolio data from Vitally REST API...`), 400);
    setTimeout(() => addLog(`🔍 Extracting commercial timelines from Salesforce CPQ...`), 800);
    setTimeout(() => addLog(`🔍 Fetching Weflow conversation transcripts...`), 1200);
    setTimeout(() => addLog(`🧠 LangGraph Node [DataAggregator]: Executing Relational Join...`), 1600);
    setTimeout(() => addLog(`🧠 LangGraph Node [IntelligenceAnalyzer]: OpenAI evaluating compound risks...`), 2400);

    try {
      const response = await axios.post("https://gtm-automation-backend.onrender.com/api/trigger-digest", {
        csmId: selectedCsm,
      });
      
      addLog(`✅ LangGraph Node [SlackFormatter]: Structured JSON payload verified.`);
      addLog(`🚀 Pushing payload to Slack Block Kit Gateway.`);
      
      setSlackPayload(response.data.slackBlockKitPayload);
    } catch (error) {
      addLog(`❌ ERROR: Failed to reach orchestration endpoint.`);
      console.error(error);
    }
    setLoading(false);
  };

  const toggleAction = (actionId: string) => {
    setCheckedActions(prev => 
      prev.includes(actionId) ? prev.filter(a => a !== actionId) : [...prev, actionId]
    );
  };

  // Compute portfolio stats
  const activePortfolio = PORTFOLIOS[selectedCsm] || { csmName: "", accounts: [] };
  const accounts = activePortfolio.accounts;
  const totalAccounts = accounts.length;
  const criticalCount = accounts.filter(a => a.status === "CRITICAL").length;
  const totalArr = accounts.reduce((acc, current) => acc + current.arr, 0);
  const avgHealth = parseFloat((accounts.reduce((acc, current) => acc + current.health, 0) / totalAccounts).toFixed(1));
  const activeAccountData = accounts.find(a => a.id === selectedAccount) || accounts[0];

  return (
    <div 
      className="min-h-screen bg-[#090D1A] text-slate-100 flex flex-col font-sans overflow-y-auto"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* GLOWS */}
      <div className="bg-blue-600/10 blur-[180px] w-[500px] h-[500px] absolute top-[-100px] left-[-100px] rounded-full pointer-events-none z-0" />
      <div className="bg-violet-600/10 blur-[180px] w-[500px] h-[500px] absolute bottom-[-100px] right-[-100px] rounded-full pointer-events-none z-0" />

      {/* TOP HEADER */}
      <header className="border-b border-white/5 bg-[#0E1325]/45 backdrop-blur-xl px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-10 shadow-lg relative">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <Activity className="text-white w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight">HG Insights Workspace</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> CSM Portfolio Intelligence & Delivery
            </p>
          </div>
        </div>

        {/* Dynamic CSM Portfolio Selection */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl shadow-inner backdrop-blur-md">
          <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1"><User className="w-3.5 h-3.5 text-blue-400" /> Active CSM:</span>
          <select 
            value={selectedCsm}
            onChange={(e) => setSelectedCsm(e.target.value)}
            className="bg-transparent text-white text-sm font-semibold border-none outline-none cursor-pointer focus:ring-0"
          >
            <option value="CSM_MARK_R" className="bg-[#111827]">Mark Robinson (CSM_MARK_R)</option>
            <option value="CSM_SARAH_K" className="bg-[#111827]">Sarah Jenkins (CSM_SARAH_K)</option>
            <option value="CSM_ALEX_B" className="bg-[#111827]">Alex Baldwin (CSM_ALEX_B)</option>
            <option value="CSM_JESSICA_T" className="bg-[#111827]">Jessica Taylor (CSM_JESSICA_T)</option>
            <option value="CSM_DAVID_L" className="bg-[#111827]">David Lang (CSM_DAVID_L)</option>
            <option value="CSM_EMILY_C" className="bg-[#111827]">Emily Chen (CSM_EMILY_C)</option>
            <option value="CSM_MICHAEL_W" className="bg-[#111827]">Michael Wong (CSM_MICHAEL_W)</option>
          </select>
        </div>
      </header>

      {/* METRICS DASHBOARD */}
      <section className="px-8 pt-8 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 z-10 relative">
        {/* Total Accounts */}
        <div className="bg-[#12182D]/70 border border-white/5 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Portfolio Size</p>
            <h3 className="text-2xl font-extrabold text-white">{totalAccounts} Accounts</h3>
            <p className="text-[10px] text-slate-500 mt-1">Assigned Enterprise Contracts</p>
          </div>
          <div className="bg-blue-500/10 p-3.5 rounded-xl border border-blue-500/20 text-blue-400">
            <Layout className="w-6 h-6" />
          </div>
        </div>

        {/* Portfolio ARR */}
        <div className="bg-[#12182D]/70 border border-white/5 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Portfolio ARR</p>
            <h3 className="text-2xl font-extrabold text-emerald-400">${(totalArr / 1000).toFixed(0)}k</h3>
            <p className="text-[10px] text-slate-500 mt-1">Contract value currently managed</p>
          </div>
          <div className="bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20 text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Avg Health */}
        <div className="bg-[#12182D]/70 border border-white/5 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Average Health</p>
            <h3 className={`text-2xl font-extrabold ${avgHealth >= 7.0 ? 'text-emerald-400' : avgHealth >= 5.0 ? 'text-amber-400' : 'text-rose-400'}`}>{avgHealth} / 10</h3>
            <p className="text-[10px] text-slate-500 mt-1">Portfolio wellness coefficient</p>
          </div>
          <div className="bg-indigo-500/10 p-3.5 rounded-xl border border-indigo-500/20 text-indigo-400">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        {/* Churn Risks */}
        <div className="bg-[#12182D]/70 border border-white/5 p-5 rounded-2xl flex items-center justify-between shadow-xl relative overflow-hidden group">
          {criticalCount > 0 && (
            <div className="bg-rose-600 w-1.5 h-full absolute left-0 top-0 animate-pulse" />
          )}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Critical Churn Risks</p>
            <h3 className={`text-2xl font-extrabold ${criticalCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{criticalCount} Accounts</h3>
            <p className="text-[10px] text-slate-500 mt-1">Health &lt; 6.0 + escalation transcripts</p>
          </div>
          <div className={`p-3.5 rounded-xl border ${criticalCount > 0 ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
            {criticalCount > 0 ? <ShieldAlert className="w-6 h-6 animate-bounce" /> : <CheckCircle2 className="w-6 h-6" />}
          </div>
        </div>
      </section>

      {/* WORKSPACE CONTENT BODY */}
      <main className="flex-1 px-8 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 relative overflow-hidden">
        
        {/* LEFT WORKSPACE PANELS (5 Cols): Account roster & Actions Checklist */}
        <div className="lg:col-span-7 flex flex-col gap-6 overflow-hidden">
          
          {/* 1. Account Roster Panel */}
          <div className="bg-[#111827]/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl flex flex-col flex-1 max-h-[400px] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#0E1423]/60">
              <div>
                <h3 className="font-bold text-white tracking-wide">Account Portfolio Grid</h3>
                <p className="text-xs text-slate-500">Relational telemetry joined from Vitally, Salesforce, and Weflow</p>
              </div>
              
              {/* Trigger Engine Button */}
              <button
                onClick={triggerAutomation}
                disabled={loading}
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                Sync Engine
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-900/40">
                    <th className="py-3 px-6">Account Name</th>
                    <th className="py-3 px-4">Health</th>
                    <th className="py-3 px-4">ARR</th>
                    <th className="py-3 px-4">Renewal Date</th>
                    <th className="py-3 px-4 text-center">Sentiment</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {accounts.map((acc) => {
                    const isSelected = selectedAccount === acc.id;
                    const isCrit = acc.status === "CRITICAL";
                    
                    return (
                      <tr 
                        key={acc.id}
                        onClick={() => setSelectedAccount(acc.id)}
                        className={`cursor-pointer transition-colors text-sm hover:bg-white/5 ${isSelected ? 'bg-blue-600/10 border-l-2 border-blue-500' : ''}`}
                      >
                        <td className="py-3.5 px-6 font-semibold">
                          <div className="flex flex-col">
                            <span className="text-white">{acc.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{acc.id}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold">
                          <span className={`flex items-center gap-1.5 ${isCrit ? 'text-rose-400' : 'text-emerald-400'}`}>
                            <span className={`w-2 h-2 rounded-full ${isCrit ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                            {acc.health}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-medium">${(acc.arr / 1000).toFixed(0)}k</td>
                        <td className="py-3.5 px-4 font-medium text-slate-400">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 opacity-60" /> {acc.renewal}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${acc.sentiment === "Negative" ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                            {acc.sentiment}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Action Items Checklist Center */}
          <div className="bg-[#111827]/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl flex flex-col flex-1 min-h-[220px] max-h-[300px] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 bg-[#0E1423]/60 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white tracking-wide">Consolidated Action Center</h3>
                <p className="text-xs text-slate-500">Transcripts parsed tasks from Weflow conversational logs</p>
              </div>
              <span className="bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase">
                Inbox
              </span>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-3">
              {accounts.map(acc => {
                const isCrit = acc.status === "CRITICAL";
                return acc.actions.map((action, i) => {
                  const actionId = `${acc.id}-${i}`;
                  const isChecked = checkedActions.includes(actionId);
                  
                  return (
                    <div 
                      key={actionId}
                      onClick={() => toggleAction(actionId)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none
                        ${isChecked 
                          ? 'bg-slate-900/40 border-white/5 opacity-55' 
                          : isCrit 
                            ? 'bg-rose-500/5 border-rose-500/10 hover:border-rose-500/20' 
                            : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                    >
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="mt-0.5 h-4.5 w-4.5 rounded border-white/10 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                      <div className="flex-1 leading-tight">
                        <p className={`text-sm ${isChecked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {action}
                        </p>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 block">
                          {acc.name} • {isCrit ? 'CRITICAL RISK' : 'ADOPTION ENHANCEMENT'}
                        </span>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </div>

        {/* RIGHT WORKSPACE PANELS (5 Cols): Slack Simulator / JSON view + Terminal */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-hidden">
          
          {/* Slack UI or JSON Block Kit Simulator */}
          <div className="bg-[#121625]/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/5 flex flex-col flex-1 min-h-[460px] overflow-hidden">
            
            {/* Simulator Header */}
            <div className="px-6 py-4 border-b border-white/5 bg-[#0E1423]/60 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white tracking-wide">Delivery Vector Verification</h3>
                <p className="text-xs text-slate-500">Simulate Slack formatting outcomes</p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setViewMode("ui")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer ${viewMode === "ui" ? "bg-[#1F2937] text-blue-400 border border-white/5 shadow-md" : "text-slate-400 hover:text-slate-200"}`}
                >
                  Slack UI
                </button>
                <button 
                  onClick={() => setViewMode("json")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer ${viewMode === "json" ? "bg-[#1F2937] text-blue-400 border border-white/5 shadow-md" : "text-slate-400 hover:text-slate-200"}`}
                >
                  Raw JSON
                </button>
              </div>
            </div>

            {/* Viewport Content */}
            <div className="flex-1 overflow-y-auto p-5">
              
              {/* SLACK UI MODE */}
              {viewMode === "ui" && (
                <div className="bg-[#1E2235]/40 rounded-xl overflow-hidden border border-white/5 shadow-2xl flex flex-col h-full min-h-[360px]">
                  {/* Slack aubergine head banner */}
                  <div className="bg-[#3F0E40] px-4 py-2.5 flex items-center gap-3 border-b border-black/20">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <h4 className="text-white/80 font-bold text-xs ml-2 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-white/50" /> #csm-intelligence-briefings
                    </h4>
                  </div>

                  <div className="p-5 flex-1 overflow-y-auto bg-slate-900/10">
                    {!slackPayload ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4 mt-20 mb-20">
                        <div className="bg-slate-900/60 p-4.5 rounded-full border border-white/5 shadow-lg">
                          <AlertTriangle className="w-8 h-8 opacity-25 text-yellow-500 animate-pulse" />
                        </div>
                        <p className="text-slate-400 text-xs font-semibold">Awaiting automated payload delivery...</p>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="w-8.5 h-8.5 rounded bg-gradient-to-tr from-blue-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-extrabold text-[12px] shadow-md shadow-blue-500/10">
                          HG
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1.5">
                            <span className="font-bold text-white text-xs hover:underline cursor-pointer">HG Success Bot</span>
                            <span className="bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[8px] px-1.5 py-0.2 rounded font-extrabold tracking-widest uppercase">APP</span>
                            <span className="text-[10px] text-slate-500">8:45 AM</span>
                          </div>
                          
                          {/* Rendering the Slack blocks inside simulated Slack */}
                          <div className="space-y-3.5 mt-3">
                            {slackPayload.map((block, index) => {
                              if (block.type === "header") {
                                return (
                                  <h2 key={index} className="text-sm font-extrabold text-white mb-3 tracking-tight">
                                    {block.text.text}
                                  </h2>
                                );
                              }
                              
                              if (block.type === "divider") {
                                return <hr key={index} className="border-white/5 my-3" />;
                              }
                              
                              if (block.type === "section") {
                                const formattedText = block.text.text
                                  .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
                                  .replace(/\n/g, "<br />");
                                
                                const isCritical = block.text.text.includes("🔴");
                                const isElevated = block.text.text.includes("🟡");
                                const isStable = block.text.text.includes("🟢");
                                
                                // Beautiful, high-end risk highlight boxes
                                let cardStyle = "text-slate-300";
                                if (isCritical) {
                                  cardStyle = "border-l-4 border-rose-500 bg-rose-500/5 p-4 rounded-r-xl border border-white/5 shadow-[0_0_10px_rgba(244,63,94,0.02)]";
                                } else if (isElevated) {
                                  cardStyle = "border-l-4 border-amber-500 bg-amber-500/5 p-4 rounded-r-xl border border-white/5 shadow-[0_0_10px_rgba(245,158,11,0.02)]";
                                } else if (isStable) {
                                  cardStyle = "border-l-4 border-emerald-500 bg-emerald-500/5 p-4 rounded-r-xl border border-white/5 shadow-[0_0_10px_rgba(16,185,129,0.02)]";
                                }
                                
                                return (
                                  <div key={index} className={`text-[12px] leading-relaxed tracking-wide ${cardStyle} mb-2`}>
                                    <div dangerouslySetInnerHTML={{ __html: formattedText }} />
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* RAW JSON MODE */}
              {viewMode === "json" && (
                <div className="bg-black/55 rounded-xl overflow-hidden border border-white/5 shadow-2xl flex flex-col h-full min-h-[360px]">
                  <div className="bg-[#111827]/60 px-4 py-2 border-b border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-400">payload.json</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Block Kit Validated
                    </span>
                  </div>
                  <div className="p-4 overflow-x-auto flex-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <pre className="text-emerald-400 text-[10px] leading-relaxed">
                      {slackPayload ? JSON.stringify(slackPayload, null, 2) : "// Awaiting payload..."}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Neon Terminal Logger (Docked inside Simulator Card) */}
            <div className="px-6 py-4 border-t border-white/5 bg-[#0E1423]/60 flex flex-col h-[180px] overflow-hidden">
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-violet-400" /> LangGraph Execution Trace
              </label>
              <div 
                className="bg-black/60 rounded-xl p-3 flex-1 overflow-y-auto border border-white/5"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {logs.length === 0 ? (
                  <p className="text-slate-600 text-[10px] text-center mt-3">Awaiting execution trigger...</p>
                ) : (
                  <div className="space-y-2">
                    {logs.map((log, i) => {
                      let colorClass = "text-slate-400";
                      if (log.includes("❌")) colorClass = "text-rose-400 font-bold";
                      else if (log.includes("✅")) colorClass = "text-emerald-400 font-semibold";
                      else if (log.includes("🧠")) colorClass = "text-violet-400";
                      else if (log.includes("⚡")) colorClass = "text-blue-400";
                      return (
                        <p key={i} className={`text-[10px] leading-relaxed tracking-wide ${colorClass}`}>
                          {log}
                        </p>
                      );
                    })}
                    <div ref={logEndRef} />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
