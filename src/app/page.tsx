"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { 
  Activity, Play, AlertTriangle, MessageSquare, Terminal, 
  Code, Layout, User, CheckCircle2, ChevronRight, Zap, RefreshCw 
} from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [slackPayload, setSlackPayload] = useState<any[] | null>(null);
  const [selectedCsm, setSelectedCsm] = useState("CSM_MARK_R");
  const [viewMode, setViewMode] = useState<"ui" | "json">("ui");
  const [logs, setLogs] = useState<string[]>([]);
  const [ackedBlocks, setAckedBlocks] = useState<number[]>([]);
  
  const logEndRef = useRef<HTMLDivElement>(null);

  // Dynamically load premium fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Auto-scroll the terminal logs
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
    setAckedBlocks([]);
    setLogs([]);
    
    addLog(`⚡ Initiating Cron Job for ${selectedCsm}...`);
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

  const handleAcknowledge = (index: number) => {
    setAckedBlocks(prev => [...prev, index]);
  };

  return (
    <div 
      className="min-h-screen bg-[#0B0F19] text-white flex flex-col md:flex-row overflow-hidden relative"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* BACKGROUND MESH GLOWS */}
      <div className="bg-violet-600/10 blur-[150px] w-[350px] h-[350px] absolute top-[-50px] left-[-50px] rounded-full pointer-events-none" />
      <div className="bg-blue-600/10 blur-[150px] w-[350px] h-[350px] absolute bottom-[-50px] right-[-50px] rounded-full pointer-events-none" />

      {/* LEFT PANEL: RevOps Command Center */}
      <div className="w-full md:w-[420px] border-r border-white/5 bg-[#111827]/40 backdrop-blur-xl p-8 flex flex-col shadow-2xl z-10 overflow-y-auto">
        <div>
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 mb-8 group">
            <div className="bg-gradient-to-tr from-blue-600 to-violet-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Activity className="text-white w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">HG Insights</h1>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" /> Orchestration Engine v1.0
              </p>
            </div>
          </div>
          
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">GTM Control Panel</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Orchestrates multi-system customer success, commercial, and conversational logs using Pydantic validation schemas.
          </p>

          {/* Config Card */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-6 shadow-inner backdrop-blur-md">
            <label className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" /> Target Portfolio (CSM)
            </label>
            <select 
              value={selectedCsm}
              onChange={(e) => setSelectedCsm(e.target.value)}
              className="w-full bg-[#1F2937]/80 border border-white/10 hover:border-white/20 text-white text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 font-medium shadow-md transition-all cursor-pointer outline-none"
            >
              <option value="CSM_MARK_R">CSM_MARK_R (Portfolio A - 15 Accounts)</option>
              <option value="CSM_SARAH_K">CSM_SARAH_K (Portfolio B - 18 Accounts)</option>
              <option value="CSM_ALEX_B">CSM_ALEX_B (Portfolio C - 16 Accounts)</option>
              <option value="CSM_JESSICA_T">CSM_JESSICA_T (Portfolio D - 20 Accounts)</option>
              <option value="CSM_DAVID_L">CSM_DAVID_L (Portfolio E - 15 Accounts)</option>
              <option value="CSM_EMILY_C">CSM_EMILY_C (Portfolio F - 17 Accounts)</option>
              <option value="CSM_MICHAEL_W">CSM_MICHAEL_W (Portfolio G - 19 Accounts)</option>
            </select>
          </div>

          {/* Trigger Button */}
          <button
            onClick={triggerAutomation}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 disabled:from-blue-800 disabled:to-violet-800 disabled:opacity-55 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2 font-semibold">
                <RefreshCw className="w-5 h-5 animate-spin" /> Compiling State Graph...
              </span>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" /> Execute Pipeline Sync
              </>
            )}
          </button>
        </div>

        {/* Live Execution Terminal */}
        <div className="mt-8 flex-1 flex flex-col">
          <label className="text-xs font-bold text-slate-400 uppercase mb-3.5 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-violet-400" /> LangGraph Execution Trace
          </label>
          <div 
            className="bg-black/55 rounded-2xl p-5 flex-1 max-h-[320px] overflow-y-auto border border-white/5 shadow-inner"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {logs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 text-xs py-8">
                <Terminal className="w-8 h-8 opacity-25 mb-2" />
                <p>Awaiting trigger... System Idle</p>
              </div>
            ) : (
              <div className="space-y-3">
                {logs.map((log, i) => {
                  let colorClass = "text-slate-300";
                  if (log.includes("❌")) colorClass = "text-rose-400 font-bold";
                  else if (log.includes("✅")) colorClass = "text-emerald-400 font-semibold";
                  else if (log.includes("🧠")) colorClass = "text-violet-400 font-medium";
                  else if (log.includes("⚡")) colorClass = "text-blue-400 font-semibold";
                  return (
                    <p key={i} className={`text-[11px] leading-relaxed tracking-wide ${colorClass}`}>
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

      {/* RIGHT PANEL: Slack Simulator & Payload Viewer */}
      <div className="flex-1 bg-[#101420] flex flex-col h-screen overflow-hidden z-0">
        
        {/* Navigation / Toggle Header */}
        <div className="bg-[#111827]/30 border-b border-white/5 px-8 py-5 flex justify-between items-center shadow-lg">
          <div>
            <h2 className="font-bold text-white tracking-wide">Delivery Vector Validation</h2>
            <p className="text-xs text-slate-500">Inspect the visual presentation of the Block Kit payload</p>
          </div>
          <div className="flex bg-slate-900/60 p-1.5 rounded-xl border border-white/5">
            <button 
              onClick={() => setViewMode("ui")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${viewMode === "ui" ? "bg-[#1F2937] text-blue-400 shadow-lg border border-white/5" : "text-slate-400 hover:text-slate-200"}`}
            >
              <Layout className="w-4 h-4" /> Slack UI
            </button>
            <button 
              onClick={() => setViewMode("json")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${viewMode === "json" ? "bg-[#1F2937] text-blue-400 shadow-lg border border-white/5" : "text-slate-400 hover:text-slate-200"}`}
            >
              <Code className="w-4 h-4" /> Raw JSON
            </button>
          </div>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto flex justify-center">
          
          {/* SLACK UI MODE */}
          {viewMode === "ui" && (
            <div className="w-full max-w-3xl bg-[#1E2235]/40 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/5 flex flex-col h-fit">
              {/* Slack Header */}
              <div className="bg-[#3F0E40] px-6 py-4 flex items-center gap-3 border-b border-black/20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EC6A5E]" />
                  <div className="w-3 h-3 rounded-full bg-[#F4BF4F]" />
                  <div className="w-3 h-3 rounded-full bg-[#61C554]" />
                </div>
                <h3 className="text-white font-bold text-sm ml-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-white/70" /> #csm-intelligence-briefings
                </h3>
              </div>

              {/* Slack Body */}
              <div className="p-6 md:p-8">
                {!slackPayload ? (
                  <div className="flex flex-col items-center justify-center text-slate-500 gap-4 mt-24 mb-24">
                    <div className="bg-slate-900/60 p-5 rounded-full border border-white/5 shadow-lg">
                      <AlertTriangle className="w-10 h-10 opacity-30 text-yellow-500 animate-pulse" />
                    </div>
                    <p className="text-slate-400 font-medium">Awaiting automated payload delivery...</p>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    {/* Bot Avatar */}
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-blue-500/10">
                      HG
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2.5 mb-1.5">
                        <span className="font-bold text-white hover:underline cursor-pointer">HG Success Bot</span>
                        <span className="bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[9px] px-2 py-0.5 rounded font-extrabold tracking-widest uppercase">APP</span>
                        <span className="text-[11px] text-slate-500">8:45 AM</span>
                      </div>
                      
                      {/* Slack Block Kit Payload Renderer */}
                      <div className="space-y-4 mt-4">
                        {slackPayload.map((block, index) => {
                          if (block.type === "header") {
                            return (
                              <h2 key={index} className="text-lg font-extrabold text-white mb-4 tracking-tight flex items-center gap-2">
                                {block.text.text}
                              </h2>
                            );
                          }
                          
                          if (block.type === "divider") {
                            return <hr key={index} className="border-white/5 my-4" />;
                          }
                          
                          if (block.type === "section") {
                            const formattedText = block.text.text
                              .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
                              .replace(/\n/g, "<br />");
                            
                            const isCritical = block.text.text.includes("🔴");
                            const isElevated = block.text.text.includes("🟡");
                            const isStable = block.text.text.includes("🟢");
                            const isAcked = ackedBlocks.includes(index);
                            
                            // Style the cards based on their risk level
                            let cardStyle = "text-slate-300";
                            if (isCritical) {
                              cardStyle = "border-l-4 border-rose-500 bg-rose-500/5 hover:bg-rose-500/10 p-5 rounded-r-2xl border border-white/5 transition-all shadow-[0_0_15px_rgba(244,63,94,0.05)]";
                            } else if (isElevated) {
                              cardStyle = "border-l-4 border-amber-500 bg-amber-500/5 hover:bg-amber-500/10 p-5 rounded-r-2xl border border-white/5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.05)]";
                            } else if (isStable) {
                              cardStyle = "border-l-4 border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10 p-5 rounded-r-2xl border border-white/5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.05)]";
                            }
                            
                            return (
                              <div key={index} className={`text-[14px] leading-relaxed tracking-wide ${cardStyle} mb-3 group`}>
                                <div dangerouslySetInnerHTML={{ __html: formattedText }} />
                                
                                {/* Simulated Slack Interactivity */}
                                {block.text.text.includes("Required Actions") && (
                                  <div className="mt-4 flex gap-2.5">
                                    <button 
                                      onClick={() => handleAcknowledge(index)}
                                      disabled={isAcked}
                                      className={`text-xs font-bold px-4 py-2 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm
                                        ${isAcked 
                                          ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400 shadow-emerald-500/5' 
                                          : 'bg-[#1F2937] border-white/10 text-white hover:bg-[#2D3748] hover:border-white/20'}`}
                                    >
                                      {isAcked ? <><CheckCircle2 className="w-3.5 h-3.5"/> Logged to Salesforce</> : "Log to Salesforce"}
                                    </button>
                                    {!isAcked && (
                                      <button className="text-xs font-bold px-4 py-2 rounded-lg border border-white/10 bg-[#1F2937] text-white hover:bg-[#2D3748] hover:border-white/20 transition-all cursor-pointer shadow-sm">
                                        Acknowledge Risk
                                      </button>
                                    )}
                                  </div>
                                )}
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
            <div className="w-full max-w-4xl bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/5 flex flex-col h-fit">
              <div className="bg-[#111827]/60 px-5 py-3.5 border-b border-white/5 flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">payload.json</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Validated Block Kit Schema
                </span>
              </div>
              <div className="p-6 overflow-x-auto" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <pre className="text-emerald-400 text-[11px] leading-relaxed">
                  {slackPayload ? JSON.stringify(slackPayload, null, 2) : "// Awaiting payload..."}
                </pre>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
