"use client";

import React, { useState } from "react";
import axios from "axios";
import { Activity, Play, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [slackPayload, setSlackPayload] = useState<any[] | null>(null);
  const [status, setStatus] = useState<string>("IDLE");

  const triggerAutomation = async () => {
    setLoading(true);
    setStatus("EXECUTING ORCHESTRATION...");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/trigger-digest", {
        csmId: "CSM_MARK_R",
      });
      setSlackPayload(response.data.slackBlockKitPayload);
      setStatus("DELIVERY SUCCESSFUL");
    } catch (error) {
      console.error(error);
      setStatus("EXECUTION FAILED");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">
      
      {/* LEFT PANEL: RevOps Control Center */}
      <div className="w-full md:w-1/3 border-r border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm z-10">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Activity className="text-blue-600 w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tight">HG Insights</h1>
          </div>
          
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">GTM Automation Engine</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            This module orchestrates multi-system telemetry (Vitally, Salesforce CPQ, Weflow) into synthesized Slack intelligence briefings for Enterprise CSMs.
          </p>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Target CSM Parameter</h3>
            <div className="flex items-center justify-between bg-white px-4 py-2 border border-gray-200 rounded-lg">
              <span className="font-mono text-sm text-blue-600">CSM_MARK_R</span>
              <CheckCircle className="text-green-500 w-4 h-4" />
            </div>
          </div>

          <button
            onClick={triggerAutomation}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg pointer-events-auto cursor-pointer"
          >
            {loading ? (
              <span className="animate-pulse">Processing Telemetry...</span>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" /> Trigger Engine Sync
              </>
            )}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 flex items-center gap-2">
            Status: <span className={`font-mono font-medium ${status.includes('SUCCESS') ? 'text-green-500' : 'text-blue-500'}`}>{status}</span>
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: Slack Simulator */}
      <div className="w-full md:w-2/3 bg-gray-100 p-4 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Slack UI Header */}
          <div className="bg-[#3F0E40] px-6 py-4 flex items-center gap-3">
            <MessageSquare className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold">HG Success Bot <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded ml-2">APP</span></h3>
          </div>

          {/* Slack Message Body */}
          <div className="p-6 md:p-8 min-h-[500px]">
            {!slackPayload ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 mt-24">
                <AlertTriangle className="w-12 h-12 opacity-20" />
                <p>Awaiting automated payload delivery...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {slackPayload.map((block, index) => {
                  
                  // Render Block Kit: Header
                  if (block.type === "header") {
                    return (
                      <h2 key={index} className="text-xl font-bold text-gray-900 mb-2">
                        {block.text.text}
                      </h2>
                    );
                  }
                  
                  // Render Block Kit: Divider
                  if (block.type === "divider") {
                    return <hr key={index} className="border-gray-200 my-6" />;
                  }
                  
                  // Render Block Kit: Markdown Section
                  if (block.type === "section") {
                    // Quick and dirty markdown parser for Slack's specific mrkdwn format
                    const formattedText = block.text.text
                      .replace(/\*(.*?)\*/g, "<strong>$1</strong>") // Bold
                      .replace(/\n/g, "<br />"); // Line breaks
                    
                    return (
                      <div 
                        key={index} 
                        className="text-gray-700 leading-relaxed text-sm"
                        dangerouslySetInnerHTML={{ __html: formattedText }}
                      />
                    );
                  }
                  
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
