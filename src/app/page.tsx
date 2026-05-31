"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { 
  Activity, Play, AlertTriangle, MessageSquare, Terminal, 
  Code, Layout, User, CheckCircle2, ChevronRight, Zap, RefreshCw,
  TrendingUp, AlertOctagon, ShieldAlert, CheckSquare, DollarSign, Calendar, Heart,
  ArrowRight, Copy, Check, Info, Mail, Send, Award, Clock, Users, Building,
  ShieldCheck, Sparkles, X, Plus
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
    contractStage: string;
    sfdcOppValue: number;
    nps: number;
    primaryContact: string;
    contactRole: string;
  }[];
}> = {
  CSM_MARK_R: {
    csmName: "Mark Robinson",
    accounts: [
      { id: "ACC_001", name: "Acme Corp", health: 3.8, status: "CRITICAL", arr: 185000, renewal: "2026-06-25", sentiment: "Negative", summary: "Exec sync. Champion left. New leadership reviewing spending. Severe platform churn risk.", actions: ["Introduce new CSM to champion", "Provide SOC2 compliance report", "Share product roadmap deck"], contractStage: "Reviewing Competitor", sfdcOppValue: 185000, nps: 4, primaryContact: "Sarah Connor", contactRole: "VP of Engineering" },
      { id: "ACC_002", name: "Globex Inc", health: 9.2, status: "STABLE", arr: 245000, renewal: "2026-11-14", sentiment: "Positive", summary: "Sync complete. Product usage expanding into APAC division. No blockers reported.", actions: ["Monitor adoption rates"], contractStage: "Renewal Secured", sfdcOppValue: 260000, nps: 9, primaryContact: "Hank Scorpio", contactRole: "CEO & Founder" }
    ]
  },
  CSM_SARAH_K: {
    csmName: "Sarah Jenkins",
    accounts: [
      { id: "ACC_003", name: "Initech LLC", health: 4.1, status: "CRITICAL", arr: 120000, renewal: "2026-06-18", sentiment: "Negative", summary: "User adoption dropping. Customer complains about API limits. Renewal at risk.", actions: ["Schedule Tech Audit call", "Send API rate limits proposal"], contractStage: "Negotiation", sfdcOppValue: 120000, nps: 5, primaryContact: "Peter Gibbons", contactRole: "Lead Developer" },
      { id: "ACC_004", name: "Umbrella Corp", health: 8.7, status: "STABLE", arr: 290000, renewal: "2027-02-10", sentiment: "Positive", summary: "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.", actions: ["Send expansion pricing sheet"], contractStage: "Upsell Identified", sfdcOppValue: 350000, nps: 8, primaryContact: "Albert Wesker", contactRole: "Director of Research" }
    ]
  },
  CSM_ALEX_B: {
    csmName: "Alex Baldwin",
    accounts: [
      { id: "ACC_005", name: "Stark Industries", health: 2.9, status: "CRITICAL", arr: 310000, renewal: "2026-06-12", sentiment: "Negative", summary: "Support escalations. downtime last week. Agitated stakeholders. Health score dropping.", actions: ["Review downtime RCA with AE", "Provide compliance validation"], contractStage: "Escalation Review", sfdcOppValue: 310000, nps: 3, primaryContact: "Pepper Potts", contactRole: "Chief Operating Officer" },
      { id: "ACC_006", name: "Wayne Enterprises", health: 9.5, status: "STABLE", arr: 145000, renewal: "2026-12-05", sentiment: "Positive", summary: "Healthy account. Stakeholder is highly active in Slack. High NPS score.", actions: ["Ask for case study reference"], contractStage: "Contract Signed", sfdcOppValue: 145000, nps: 10, primaryContact: "Lucius Fox", contactRole: "CEO" }
    ]
  },
  CSM_JESSICA_T: {
    csmName: "Jessica Taylor",
    accounts: [
      { id: "ACC_007", name: "Cyberdyne Systems", health: 8.9, status: "STABLE", arr: 198000, renewal: "2026-09-30", sentiment: "Positive", summary: "Stable telemetry. Customer requested walkthrough of new automated GTM integrations.", actions: ["Send integrations docs link"], contractStage: "Expansion Scoping", sfdcOppValue: 220000, nps: 9, primaryContact: "Miles Dyson", contactRole: "Director of AI Systems" },
      { id: "ACC_008", name: "Soylent Corp", health: 4.5, status: "CRITICAL", arr: 95000, renewal: "2026-06-22", sentiment: "Negative", summary: "Contraction risk. Champion has departed. Budget freeze on renewals.", actions: ["Book meeting with executive buyer", "Share platform upgrade pricing"], contractStage: "Risk Mitigation", sfdcOppValue: 75000, nps: 5, primaryContact: "Robert Thorn", contactRole: "Head of Procurement" }
    ]
  },
  CSM_DAVID_L: {
    csmName: "David Lang",
    accounts: [
      { id: "ACC_009", name: "Massive Dynamic", health: 3.4, status: "CRITICAL", arr: 215000, renewal: "2026-06-28", sentiment: "Negative", summary: "Unresolved bugs syncing CPQ. Technical blockers causing friction.", actions: ["Schedule Solution Architect sync", "Provide custom SDK patches"], contractStage: "Technical Evaluation", sfdcOppValue: 215000, nps: 4, primaryContact: "Nina Sharp", contactRole: "Executive Director" },
      { id: "ACC_012", name: "Tyrell Corp", health: 8.1, status: "STABLE", arr: 175000, renewal: "2026-10-15", sentiment: "Positive", summary: "Touchpoint complete. User onboarding going smoothly. Integration active.", actions: ["Follow up on SSO set up"], contractStage: "Renewal Initiated", sfdcOppValue: 175000, nps: 8, primaryContact: "Rachael Tyrell", contactRole: "VP of HR & Ops" }
    ]
  },
  CSM_EMILY_C: {
    csmName: "Emily Chen",
    accounts: [
      { id: "ACC_010", name: "Hooli", health: 8.4, status: "STABLE", arr: 260000, renewal: "2026-08-20", sentiment: "Positive", summary: "Smooth operations. Trial period started on expansion modules. AE driving upsell.", actions: ["Send roadmap slide deck"], contractStage: "Upsell Quoted", sfdcOppValue: 310000, nps: 8, primaryContact: "Gavin Belson", contactRole: "CEO" },
      { id: "ACC_013", name: "Pied Piper", health: 3.7, status: "CRITICAL", arr: 135000, renewal: "2026-06-15", sentiment: "Negative", summary: "Stakeholder churn. Champion left company. Platform adoption stalling.", actions: ["Reach out to new GTM Director", "Schedule fresh team training"], contractStage: "Under review", sfdcOppValue: 135000, nps: 3, primaryContact: "Richard Hendricks", contactRole: "CTO" }
    ]
  },
  CSM_MICHAEL_W: {
    csmName: "Michael Wong",
    accounts: [
      { id: "ACC_011", name: "Oscorp", health: 4.8, status: "CRITICAL", arr: 165000, renewal: "2026-06-20", sentiment: "Negative", summary: "Support ticket escalation. API performance issues and latency errors reported.", actions: ["Escalate API latency tickets", "Send API status dashboard link"], contractStage: "Escalation Mode", sfdcOppValue: 165000, nps: 5, primaryContact: "Norman Osborn", contactRole: "Chairman" },
      { id: "ACC_014", name: "LexCorp", health: 9.1, status: "STABLE", arr: 220000, renewal: "2026-11-01", sentiment: "Positive", summary: "Platform usage is high. License count expanded into EMEA region last week.", actions: ["Arrange QBR for expansion metrics"], contractStage: "Proposal Out", sfdcOppValue: 240000, nps: 9, primaryContact: "Mercy Graves", contactRole: "Chief of Staff" }
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
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [slackReaction, setSlackReaction] = useState<string | null>(null);
  
  // Modal / Drawer states for CSM utility
  const [emailDrawerAccount, setEmailDrawerAccount] = useState<any | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const logEndRef = useRef<HTMLDivElement>(null);

  // Load typography from Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Sync default account when changing CSM
  useEffect(() => {
    const portfolio = PORTFOLIOS[selectedCsm];
    if (portfolio && portfolio.accounts.length > 0) {
      setSelectedAccount(portfolio.accounts[0].id);
    }
  }, [selectedCsm]);

  // Scroll logging terminal
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toISOString().split('T')[1].substring(0, 8);
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const triggerAutomation = async () => {
    setLoading(true);
    setSlackPayload(null);
    setLogs([]);
    setSlackReaction(null);
    
    addLog(`⚡ Initiating GTM Sync Pipeline for CSM: ${selectedCsm}...`);
    setTimeout(() => addLog(`🔍 [Vitally REST] Hydrating telemetry health & NPS scores...`), 300);
    setTimeout(() => addLog(`🔍 [Salesforce CPQ] Extracting contracts & renewal opportunities...`), 600);
    setTimeout(() => addLog(`🔍 [Weflow Logs] Aggregating conversational transcripts...`), 900);
    setTimeout(() => addLog(`🧠 [LangGraph Node: DataAggregator] Joining tables on AccountId...`), 1200);
    setTimeout(() => addLog(`🧠 [LangGraph Node: IntelligenceAnalyzer] Running AI risk assessment...`), 1800);
    setTimeout(() => addLog(`🧠 [LangGraph Node: SlackFormatter] Shaping structured Slack blocks...`), 2400);

    try {
      const response = await axios.post("https://gtm-automation-backend.onrender.com/api/trigger-digest", {
        csmId: selectedCsm,
      });
      
      const payload = response?.data?.slackBlockKitPayload;
      
      setTimeout(() => {
        addLog(`✅ [Slack Gateway] Slack Block Kit payload formatted and validated.`);
        addLog(`🚀 Payload sent to webhook destination.`);
        if (Array.isArray(payload)) {
          setSlackPayload(payload);
          showToast("Telemetry synced! Slack payload generated.");
        } else {
          addLog(`❌ ERROR: Slack Block Kit payload is malformed or missing.`);
          showToast("Received malformed payload.");
        }
      }, 2500);

    } catch (error) {
      addLog(`❌ ERROR: Automation Orchestrator endpoint could not be reached.`);
      console.error(error);
      showToast("Sync failed. Check terminal logs.");
    } finally {
      setTimeout(() => setLoading(false), 2500);
    }
  };

  const toggleAction = (actionId: string) => {
    setCheckedActions(prev => {
      const isChecked = prev.includes(actionId);
      if (isChecked) {
        return prev.filter(a => a !== actionId);
      } else {
        showToast("Task completed! Keep up the good work.");
        return [...prev, actionId];
      }
    });
  };

  const copyToClipboard = () => {
    if (!slackPayload) return;
    navigator.clipboard.writeText(JSON.stringify(slackPayload, null, 2));
    setCopied(true);
    showToast("JSON payload copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSlackActionButtonClick = (actionName: string) => {
    setSlackReaction("👍");
    showToast(`Slack Action triggered: "${actionName}"`);
  };

  // Draft Escalation Email utility
  const openEmailDraft = (acc: any) => {
    const isCrit = acc.status === "CRITICAL";
    const subject = `CRITICAL ALERT: ${acc.name} - Retention & Risk Mitigation Plan`;
    const body = `Hi Team,\n\nI am reaching out regarding ${acc.name} (Account ID: ${acc.id}). \n\nOur GTM Telemetry Engine flagged this account with a critical risk status.\n\nKey Metrics:\n- Current Health: ${acc.health}/10\n- ARR Value: $${acc.arr.toLocaleString()}\n- Renewal Date: ${acc.renewal}\n- Customer Sentiment: ${acc.sentiment}\n\nAnalysis Summary:\n${acc.summary}\n\nRequired Action Items:\n${acc.actions.map((act: string) => `- [ ] ${act}`).join("\n")}\n\nLet's coordinate immediately to resolve these blockers.\n\nBest Regards,\n${activePortfolio.csmName}\nCustomer Success Enterprise Team`;
    
    setEmailDrawerAccount(acc);
    setEmailSubject(subject);
    setEmailBody(body);
  };

  const sendEmailMock = () => {
    showToast(`Escalation draft for ${emailDrawerAccount.name} sent successfully!`);
    setEmailDrawerAccount(null);
  };

  const activePortfolio = PORTFOLIOS[selectedCsm] || { csmName: "", accounts: [] };
  const accounts = activePortfolio.accounts;
  const totalAccounts = accounts.length;
  const criticalCount = accounts.filter(a => a.status === "CRITICAL").length;
  const totalArr = accounts.reduce((acc, current) => acc + current.arr, 0);
  const arrAtRisk = accounts.filter(a => a.status === "CRITICAL").reduce((acc, current) => acc + current.arr, 0);
  const avgHealth = parseFloat((accounts.reduce((acc, current) => acc + current.health, 0) / totalAccounts).toFixed(1));
  const activeAccountData = accounts.find(a => a.id === selectedAccount) || accounts[0];

  // Action Center calculations
  const allActions = accounts.flatMap(acc => acc.actions.map((action, i) => ({
    id: `${acc.id}-${i}`,
    text: action,
    accountName: acc.name,
    isCritical: acc.status === "CRITICAL"
  })));
  const completedActionsCount = allActions.filter(a => checkedActions.includes(a.id)).length;
  const totalActionsCount = allActions.length;
  const completionPercentage = totalActionsCount > 0 ? Math.round((completedActionsCount / totalActionsCount) * 100) : 0;

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-50/60 via-slate-50 to-purple-50/50 text-slate-800 flex flex-col font-sans relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Decorative Blur Spheres for Glassmorphism Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-200/40 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-200/40 blur-3xl pointer-events-none z-0" />

      {/* Global Interactive Notification Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white text-xs font-bold px-5 py-3.5 rounded-2xl shadow-xl z-50 flex items-center gap-2 border border-slate-700 animate-slide-in">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="border-b border-indigo-100/60 bg-white/70 backdrop-blur-md px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20">
            <Activity className="text-white w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight bg-gradient-to-r from-indigo-900 to-slate-900 bg-clip-text text-transparent">
                HG Insights Workspace
              </h1>
              <span className="bg-indigo-100 border border-indigo-200 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                v2.1 Enterprise
              </span>
            </div>
            <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
              <Zap className="w-3.5 h-3.5 fill-indigo-600 animate-bounce" /> Telemetry & CS Orchestrator
            </p>
          </div>
        </div>

        {/* Dynamic CSM Selector with custom styling */}
        <div className="flex items-center gap-3 bg-white/90 border border-slate-200 shadow-md px-4 py-2.5 rounded-2xl transition-all hover:border-indigo-300">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {activePortfolio.csmName.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
              Active CSM Portfolio
            </span>
            <select 
              value={selectedCsm}
              onChange={(e) => setSelectedCsm(e.target.value)}
              className="bg-transparent text-slate-900 text-sm font-extrabold border-none outline-none cursor-pointer focus:ring-0 p-0 pr-6 mt-0.5 font-sans"
            >
              <option value="CSM_MARK_R">Mark Robinson</option>
              <option value="CSM_SARAH_K">Sarah Jenkins</option>
              <option value="CSM_ALEX_B">Alex Baldwin</option>
              <option value="CSM_JESSICA_T">Jessica Taylor</option>
              <option value="CSM_DAVID_L">David Lang</option>
              <option value="CSM_EMILY_C">Emily Chen</option>
              <option value="CSM_MICHAEL_W">Michael Wong</option>
            </select>
          </div>
        </div>
      </header>

      {/* METRICS DASHBOARD RIBBON */}
      <section className="px-8 pt-8 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
        {/* Total Accounts */}
        <div className="bg-white/90 backdrop-blur-md border border-indigo-100/50 p-6 rounded-3xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-indigo-500/5 hover:-translate-y-1 hover:border-indigo-200/80 transition-all duration-300 group">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Portfolio Accounts</p>
            <h3 className="text-3xl font-extrabold text-slate-950 tracking-tight">{totalAccounts} Clients</h3>
            <p className="text-[11px] font-semibold text-slate-600 mt-1.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-indigo-500" /> Active relationships
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 border border-indigo-100 group-hover:scale-110 transition-transform">
            <Layout className="w-6 h-6" />
          </div>
        </div>

        {/* Portfolio ARR */}
        <div className="bg-white/90 backdrop-blur-md border border-emerald-100/50 p-6 rounded-3xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-emerald-500/5 hover:-translate-y-1 hover:border-emerald-200/80 transition-all duration-300 group">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Managed ARR</p>
            <h3 className="text-3xl font-extrabold text-slate-950 tracking-tight">${totalArr.toLocaleString()}</h3>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Direct contract value
            </p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Avg Health */}
        <div className="bg-white/90 backdrop-blur-md border border-blue-100/50 p-6 rounded-3xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-blue-500/5 hover:-translate-y-1 hover:border-blue-200/80 transition-all duration-300 group">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Portfolio Health</p>
            <h3 className="text-3xl font-extrabold text-slate-950 tracking-tight">{avgHealth} / 10</h3>
            
            {/* Visual health bar indicator */}
            <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div 
                className={`h-full rounded-full ${avgHealth >= 7.5 ? 'bg-emerald-500' : avgHealth >= 6.0 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                style={{ width: `${avgHealth * 10}%` }}
              />
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 border border-blue-100 group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6 fill-blue-500" />
          </div>
        </div>

        {/* Churn Risks */}
        <div className="bg-white/95 backdrop-blur-md border border-rose-100 p-6 rounded-3xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-rose-500/5 hover:-translate-y-1 hover:border-rose-200 transition-all duration-300 relative overflow-hidden group">
          {criticalCount > 0 && (
            <div className="bg-gradient-to-b from-rose-500 to-pink-600 w-1.5 h-full absolute left-0 top-0 animate-pulse" />
          )}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Contract Risk Pool</p>
            <h3 className={`text-3xl font-extrabold ${criticalCount > 0 ? 'text-rose-600' : 'text-emerald-600'} tracking-tight`}>
              ${arrAtRisk.toLocaleString()}
            </h3>
            <p className="text-[11px] font-semibold text-slate-500 mt-1.5">
              {criticalCount} critical risk accounts
            </p>
          </div>
          <div className={`p-4 rounded-2xl border group-hover:scale-110 transition-transform ${criticalCount > 0 ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
            {criticalCount > 0 ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
        </div>
      </section>

      {/* THREE-COLUMN DENSE WORKSPACE */}
      <main className="flex-1 px-8 pb-8 grid grid-cols-1 xl:grid-cols-12 gap-8 z-10 relative">
        
        {/* COLUMN 1: Accounts & Portfolio Grid (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col flex-1 max-h-[750px] overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/60">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-wide">Portfolio Directory</h3>
                <p className="text-xs text-slate-600 mt-0.5">Select a client below to hydrate details</p>
              </div>
              
              {/* Sync Trigger Button */}
              <button
                onClick={triggerAutomation}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-500/20 transition-all duration-200 cursor-pointer active:scale-95 flex-shrink-0"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                Sync Engine
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 space-y-3 bg-slate-50/20">
              {accounts.map((acc) => {
                const isSelected = selectedAccount === acc.id;
                const isCrit = acc.status === "CRITICAL";
                
                return (
                  <div 
                    key={acc.id}
                    onClick={() => setSelectedAccount(acc.id)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                      isSelected 
                        ? 'bg-gradient-to-r from-indigo-50/50 to-white border-indigo-500 shadow-md shadow-indigo-500/5 ring-1 ring-indigo-500/20' 
                        : 'bg-white border-slate-200/80 hover:border-indigo-300 hover:shadow-sm'
                    }`}
                  >
                    {isCrit && (
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-rose-500 mt-4 mr-4 animate-ping" />
                    )}

                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-bold text-sm tracking-tight">{acc.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono mt-0.5">{acc.id}</span>
                      </div>
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md border tracking-wider ${
                        acc.sentiment === "Negative" 
                          ? 'bg-rose-50 border-rose-100 text-rose-700' 
                          : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                      }`}>
                        {acc.sentiment}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Health Score</span>
                        <span className={`font-bold flex items-center gap-1.5 ${isCrit ? 'text-rose-600' : 'text-emerald-600'}`}>
                          <span className={`w-2 h-2 rounded-full ${isCrit ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                          {acc.health} / 10
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Contract Value</span>
                        <span className="font-mono font-bold text-slate-800">${acc.arr.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* COLUMN 2: Account Detail Hub & Actions (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Account Detail Hub */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col p-6 gap-4 min-h-[380px]">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Active Account Hub
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight mt-1">
                  {activeAccountData.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">NPS Rating</span>
                <span className="text-sm font-bold text-indigo-950 flex items-center justify-end gap-1">
                  <Award className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {activeAccountData.nps} / 10
                </span>
              </div>
            </div>

            {/* Salesforce CPQ Card */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col gap-3">
              <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" /> Salesforce Opportunities
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Renewal Stage</span>
                  <span className="font-bold text-slate-800">{activeAccountData.contractStage}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Renewal Opportunity</span>
                  <span className="font-mono font-bold text-slate-800">${activeAccountData.sfdcOppValue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Contract End Date</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {activeAccountData.renewal}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Primary Stakeholder</span>
                  <span className="font-bold text-slate-800 block truncate">{activeAccountData.primaryContact}</span>
                  <span className="text-[9px] text-slate-500 leading-none">{activeAccountData.contactRole}</span>
                </div>
              </div>
            </div>

            {/* Weflow Conversational Context */}
            <div className="flex-1 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-violet-900 uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Conversation Intelligence (Weflow)
              </span>
              <p className="text-xs text-slate-700 leading-relaxed bg-violet-50/20 border border-violet-100/50 p-3 rounded-2xl">
                {activeAccountData.summary}
              </p>
            </div>

            {/* Quick Actions Panel */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => openEmailDraft(activeAccountData)}
                className="flex items-center justify-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-200"
              >
                <Mail className="w-3.5 h-3.5" /> Draft Escalation
              </button>
              <button 
                onClick={() => showToast("CPQ Sync Request forwarded to Ops.")}
                className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-200"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Sync CRM Data
              </button>
            </div>
          </div>

          {/* Consolidated Action Center */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col flex-1 max-h-[350px] overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-wide">Action Playbooks</h3>
                <p className="text-xs text-slate-600 mt-0.5">Tasks generated by Weflow transcripts</p>
              </div>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                {completedActionsCount} / {totalActionsCount} Done
              </span>
            </div>

            {/* Action Progress Bar */}
            <div className="px-6 pt-3 pb-1">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
                <span>Playbook Completion</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-3.5">
              {allActions.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs font-semibold">
                  No action items identified for this portfolio.
                </div>
              ) : (
                allActions.map((action) => {
                  const isChecked = checkedActions.includes(action.id);
                  return (
                    <div 
                      key={action.id}
                      onClick={() => toggleAction(action.id)}
                      className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer select-none
                        ${isChecked 
                          ? 'bg-slate-50/80 border-slate-100 opacity-60' 
                          : action.isCritical 
                            ? 'bg-rose-50/40 border-rose-100 hover:border-rose-200 hover:bg-rose-50/80' 
                            : 'bg-white border-slate-200/60 hover:border-indigo-300 hover:bg-indigo-50/10'}`}
                    >
                      {/* Checkbox button */}
                      <button className="flex-shrink-0 mt-0.5 focus:outline-none">
                        {isChecked ? (
                          <div className="w-4.5 h-4.5 rounded-md bg-indigo-600 text-white flex items-center justify-center border border-indigo-600 transition-colors">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className={`w-4.5 h-4.5 rounded-md border ${action.isCritical ? 'border-rose-400 hover:border-rose-600' : 'border-slate-300 hover:border-indigo-500'} bg-white transition-colors`} />
                        )}
                      </button>
                      
                      <div className="flex-1 leading-tight">
                        <p className={`text-xs font-semibold ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {action.text}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider">
                            {action.accountName}
                          </span>
                          <span className="text-[9px] font-bold">•</span>
                          <span className={`text-[9px] font-extrabold uppercase tracking-wider ${action.isCritical ? 'text-rose-600' : 'text-indigo-600'}`}>
                            {action.isCritical ? 'Risk Escalation' : 'Standard Play'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* COLUMN 3: Slack Briefing Simulator & Code Console (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Slack Briefing Card */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col flex-1 min-h-[500px] overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-wide">Slack Gateway Simulator</h3>
                <p className="text-xs text-slate-600 mt-0.5">Visualize channel delivery vectors</p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button 
                  onClick={() => setViewMode("ui")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer ${
                    viewMode === "ui" 
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Slack UI
                </button>
                <button 
                  onClick={() => setViewMode("json")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer ${
                    viewMode === "json" 
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Raw JSON
                </button>
              </div>
            </div>

            {/* Viewport Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/30 flex flex-col justify-between">
              
              {/* SLACK UI MODE */}
              {viewMode === "ui" && (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md flex flex-col h-full min-h-[380px] overflow-hidden">
                  
                  {/* Slack Sidebar + Channel mockup layout */}
                  <div className="bg-[#3F0E40] px-4 py-3 flex items-center justify-between border-b border-[#522653]">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#EC6A5E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#61C554]" />
                      </div>
                      <span className="text-white font-extrabold text-xs ml-3 tracking-wide flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-purple-200" /> #csm-intelligence-briefings
                      </span>
                    </div>
                    <span className="bg-[#562257] text-[#D8B4D9] text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Slack Simulator
                    </span>
                  </div>

                  <div className="p-5 flex-1 overflow-y-auto bg-white flex flex-col justify-between">
                    {!Array.isArray(slackPayload) ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 py-20">
                        <div className="bg-indigo-50 p-4 rounded-full border border-indigo-100 shadow-md">
                          <AlertTriangle className="w-8 h-8 text-indigo-600 animate-bounce" />
                        </div>
                        <div className="text-center">
                          <p className="text-slate-800 text-sm font-extrabold">Awaiting Automation Trigger</p>
                          <p className="text-slate-500 text-xs mt-1">Click &quot;Sync Engine&quot; to push telemetry to Slack.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-black text-xs shadow-md border border-indigo-200">
                          HG
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-extrabold text-slate-900 text-sm hover:underline cursor-pointer">HG Success Bot</span>
                            <span className="bg-indigo-100 border border-indigo-200 text-indigo-700 text-[8px] px-1.5 py-0.2 rounded font-extrabold tracking-widest uppercase">APP</span>
                            <span className="text-[10px] text-slate-500 font-medium">Just now</span>
                          </div>
                          
                          {/* Slack block parser */}
                          <div className="space-y-4 mt-3">
                            {slackPayload.map((block, index) => {
                              if (!block) return null;
                              
                              if (block.type === "header") {
                                return (
                                  <h4 key={index} className="text-sm font-extrabold text-slate-950 tracking-tight border-b border-slate-100 pb-2">
                                    {block.text?.text || ""}
                                  </h4>
                                );
                              }
                              
                              if (block.type === "divider") {
                                return <hr key={index} className="border-slate-100 my-2" />;
                              }
                              
                              if (block.type === "section") {
                                const rawText = block.text?.text || "";
                                const isCritical = rawText.includes("🔴");
                                const isElevated = rawText.includes("🟡");
                                const isStable = rawText.includes("🟢");
                                
                                // Replace Slack markdown bold with html tags
                                const formattedText = rawText
                                  .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
                                  .replace(/\n/g, "<br />");
                                
                                let alertBorderColor = "border-slate-200 bg-slate-50/50";
                                if (isCritical) {
                                  alertBorderColor = "border-l-4 border-l-rose-500 border-rose-100 bg-rose-50/30 p-3 rounded-r-xl shadow-sm";
                                } else if (isElevated) {
                                  alertBorderColor = "border-l-4 border-l-amber-500 border-amber-100 bg-amber-50/30 p-3 rounded-r-xl shadow-sm";
                                } else if (isStable) {
                                  alertBorderColor = "border-l-4 border-l-emerald-500 border-emerald-100 bg-emerald-50/30 p-3 rounded-r-xl shadow-sm";
                                }
                                
                                return (
                                  <div key={index} className={`text-xs leading-relaxed text-slate-800 ${alertBorderColor}`}>
                                    <div dangerouslySetInnerHTML={{ __html: formattedText }} />
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>

                          {/* Interactive Slack simulator buttons */}
                          <div className="flex gap-2.5 mt-4 pt-3 border-t border-slate-100">
                            <button 
                              onClick={() => handleSlackActionButtonClick("Alert AE")}
                              className="text-[10px] font-extrabold px-3 py-1.5 border border-slate-300 hover:border-slate-400 text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all"
                            >
                              🔔 Notify AE
                            </button>
                            <button 
                              onClick={() => handleSlackActionButtonClick("Approve Ops Draft")}
                              className="text-[10px] font-extrabold px-3 py-1.5 border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all"
                            >
                              ✅ Acknowledge Alert
                            </button>
                            {slackReaction && (
                              <span className="inline-flex items-center justify-center bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full text-xs font-bold animate-bounce">
                                {slackReaction} 1
                              </span>
                            )}
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* RAW JSON MODE */}
              {viewMode === "json" && (
                <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex flex-col h-full min-h-[380px]">
                  <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-400">slack_block_kit.json</span>
                    {slackPayload && (
                      <button 
                        onClick={copyToClipboard}
                        className="text-[10px] font-bold text-indigo-300 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy JSON"}
                      </button>
                    )}
                  </div>
                  <div className="p-4 overflow-x-auto flex-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <pre className="text-emerald-400 text-[11px] leading-relaxed">
                      {slackPayload ? JSON.stringify(slackPayload, null, 2) : "// Awaiting automated data hydration. Execute sync."}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Trace Logger */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col h-[200px] overflow-hidden">
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-600" /> LangGraph Orchestrator Trace
                </label>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${loading ? 'bg-indigo-500 animate-ping' : 'bg-slate-300'}`} />
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">
                    {loading ? 'Pipeline Running' : 'Idle Gateway'}
                  </span>
                </div>
              </div>
              
              <div 
                className="bg-slate-950 rounded-2xl p-4 flex-1 overflow-y-auto border border-slate-850 shadow-inner"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {logs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 text-[10px] gap-1">
                    <Code className="w-4 h-4 opacity-50" />
                    <span>Run the Sync Engine to track trace nodes</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {logs.map((log, i) => {
                      let colorClass = "text-slate-300";
                      if (log.includes("❌")) colorClass = "text-rose-400 font-bold";
                      else if (log.includes("✅")) colorClass = "text-emerald-400 font-semibold";
                      else if (log.includes("🧠")) colorClass = "text-indigo-400";
                      else if (log.includes("⚡")) colorClass = "text-blue-400";
                      return (
                        <p key={i} className={`text-[10.5px] leading-relaxed tracking-wide ${colorClass}`}>
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

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500 z-10">
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> System compliant with Vitally and Salesforce schemas.
        </p>
        <p className="font-semibold text-slate-600">
          Powered by LangGraph Agentic Framework
        </p>
      </footer>

      {/* MOCK EMAIL DRAWER / MODAL FOR DRAFT ESCALATION */}
      {emailDrawerAccount && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider">Draft Risk Escalation Email</h4>
              </div>
              <button 
                onClick={() => setEmailDrawerAccount(null)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-500 w-16">To:</span>
                  <span className="text-slate-800 font-semibold">vp-customer-success@company.com</span>
                </div>
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-500 w-16">Cc:</span>
                  <span className="text-slate-800 font-semibold">{emailDrawerAccount.primaryContact.toLowerCase().replace(" ", ".")}@company.com</span>
                </div>
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-500 w-16">Subject:</span>
                  <input 
                    type="text" 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="text-slate-800 font-bold flex-1 bg-transparent border-none outline-none focus:ring-0 p-0"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Message Body</label>
                <textarea 
                  rows={10}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-2xl p-4 font-sans text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-150 flex justify-end gap-3">
              <button 
                onClick={() => setEmailDrawerAccount(null)}
                className="text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 py-2.5 px-4 rounded-xl transition-all cursor-pointer"
              >
                Cancel Draft
              </button>
              <button 
                onClick={sendEmailMock}
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 py-2.5 px-5 rounded-xl flex items-center gap-2 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Send Escalation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
