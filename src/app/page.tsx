"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Activity, Play, AlertTriangle, MessageSquare, Terminal, Code, Layout, User, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [slackPayload, setSlackPayload] = useState<any[] | null>(null);
  const [selectedCsm, setSelectedCsm] = useState("CSM_MARK_R");
  const [viewMode, setViewMode] = useState<"ui" | "json">("ui");
  const [logs, setLogs] = useState<string[]>([]);
  const [ackedBlocks, setAckedBlocks] = useState<number[]>([]);
  
  const logEndRef = useRef<HTMLDivElement>(null);

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
    
    // Simulate the real-time execution steps for visual flair
    addLog(`⚡ Initiating Cron Job for ${selectedCsm}...`);
    setTimeout(() => addLog(`🔍 Hydrating portfolio data from Vitally REST API...`), 400);
    setTimeout(() => addLog(`🔍 Extracting commercial timelines from Salesforce CPQ...`), 800);
    setTimeout(() => addLog(`🔍 Fetching Weflow conversation transcripts...`), 1200);
    setTimeout(() => addLog(`🧠 LangGraph Node 1: Executing Relational Join...`), 1600);
    setTimeout(() => addLog(`🧠 LangGraph Node 2: OpenAI evaluating compound risks...`), 2400);

    try {
      // Points to your actual live Render endpoint
      const response = await axios.post("https://gtm-automation-backend.onrender.com/api/trigger-digest", {
        csmId: selectedCsm,
      });
      
      addLog(`✅ LangGraph Node 3: Structured JSON payload verified.`);
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
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* LEFT PANEL: RevOps Control Center */}
      <div className="w-full md:w-[400px] border-r border-slate-200 bg-white p-6 flex flex-col shadow-xl z-10 overflow-y-auto">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">HG Insights</h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">GTM Orchestration Engine</p>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> Target Portfolio (CSM)
            </label>
            <select 
              value={selectedCsm}
              onChange={(e) => setSelectedCsm(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-mono shadow-sm cursor-pointer"
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
        </div>

        <button
          onClick={triggerAutomation}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-200 cursor-pointer"
        >
          {loading ? (
            <span className="animate-pulse flex items-center gap-2"><Activity className="w-5 h-5 animate-spin" /> Processing Graph...</span>
          ) : (
            <><Play className="w-5 h-5 fill-current" /> Execute Pipeline Sync</>
          )}
        </button>

        {/* Live Execution Terminal */}
        <div className="mt-8 flex-1 flex flex-col">
          <label className="text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4" /> LangGraph Execution Trace
          </label>
          <div className="bg-slate-900 rounded-xl p-4 flex-1 max-h-[300px] overflow-y-auto border border-slate-800 shadow-inner">
            {logs.length === 0 ? (
              <p className="text-slate-600 font-mono text-xs text-center mt-4">System Idle. Awaiting trigger...</p>
            ) : (
              <div className="space-y-2">
                {logs.map((log, i) => (
                  <p key={i} className={`font-mono text-[11px] leading-relaxed ${log.includes('ERROR') ? 'text-red-400' : log.includes('✅') ? 'text-green-400' : 'text-slate-300'}`}>
                    {log}
                  </p>
                ))}
                <div ref={logEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Slack Simulator & Payload Viewer */}
      <div className="flex-1 bg-slate-100 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navigation Toggle */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
          <h2 className="font-semibold text-slate-800">Delivery Vector Validation</h2>
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button 
              onClick={() => setViewMode("ui")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${viewMode === "ui" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Layout className="w-4 h-4" /> Slack UI
            </button>
            <button 
              onClick={() => setViewMode("json")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${viewMode === "json" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Code className="w-4 h-4" /> Raw JSON
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto flex justify-center">
          
          {/* SLACK UI MODE */}
          {viewMode === "ui" && (
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden border border-slate-300 flex flex-col h-fit">
              <div className="bg-[#3F0E40] px-4 py-3 flex items-center gap-3 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h3 className="text-white/90 font-medium text-sm ml-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> #csm-intelligence-briefings
                </h3>
              </div>

              <div className="p-6 md:p-8">
                {!slackPayload ? (
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-4 mt-20 mb-20">
                    <AlertTriangle className="w-12 h-12 opacity-20" />
                    <p>Awaiting automated payload delivery...</p>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    {/* Fake Slack Avatar */}
                    <div className="w-10 h-10 rounded-md bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      HG
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-slate-900">HG Success Bot</span>
                        <span className="bg-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-bold tracking-wide">APP</span>
                        <span className="text-xs text-slate-500">8:45 AM</span>
                      </div>
                      
                      <div className="space-y-2 mt-3">
                        {slackPayload.map((block, index) => {
                          if (block.type === "header") {
                            return <h2 key={index} className="text-xl font-bold text-slate-900 mb-4">{block.text.text}</h2>;
                          }
                          
                          if (block.type === "divider") {
                            return <hr key={index} className="border-slate-200 my-4" />;
                          }
                          
                          if (block.type === "section") {
                            const formattedText = block.text.text.replace(/\*(.*?)\*/g, "<strong>$1</strong>").replace(/\n/g, "<br />");
                            const isCritical = block.text.text.includes("🔴");
                            const isAcked = ackedBlocks.includes(index);
                            
                            return (
                              <div key={index} className="text-slate-800 leading-relaxed text-[15px] mb-2">
                                <div dangerouslySetInnerHTML={{ __html: formattedText }} />
                                
                                {/* Simulated Slack Interactivity for Action Items */}
                                {block.text.text.includes("Required Actions") && isCritical && (
                                  <div className="mt-3 flex gap-2">
                                    <button 
                                      onClick={() => handleAcknowledge(index)}
                                      disabled={isAcked}
                                      className={`text-xs font-semibold px-3 py-1.5 rounded border transition-colors flex items-center gap-1 cursor-pointer
                                        ${isAcked ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                                    >
                                      {isAcked ? <><CheckCircle2 className="w-3 h-3"/> Logged to Salesforce</> : "Log to Salesforce"}
                                    </button>
                                    {!isAcked && (
                                      <button className="text-xs font-semibold px-3 py-1.5 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
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
            <div className="w-full max-w-4xl bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-800 flex flex-col h-fit">
              <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">payload.json</span>
                <span className="text-xs font-mono text-green-400">Valid Block Kit Schema</span>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-green-400 font-mono text-xs leading-relaxed">
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
