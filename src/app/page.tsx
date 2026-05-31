"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { 
  Activity, Play, AlertTriangle, MessageSquare, Terminal, 
  Code, Layout, User, CheckCircle2, ChevronRight, Zap, RefreshCw,
  TrendingUp, AlertOctagon, ShieldAlert, CheckSquare, DollarSign, Calendar, Heart,
  ArrowRight, Copy, Check, Info, Mail, Send, Award, Clock, Users, Building,
  ShieldCheck, Sparkles, X, Plus, BookOpen, Database, Cpu, ArrowDown, Network
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
  "CSM_MARK_R": {
    "csmName": "Mark Robinson",
    "accounts": [
      {
        "id": "ACC_001",
        "name": "Boone, Kerr and Ryan",
        "health": 4.4,
        "status": "CRITICAL",
        "arr": 203463,
        "renewal": "2026-07-15",
        "sentiment": "Negative",
        "summary": "Support escalations. Downtime last week. Agitated stakeholders. Health score dropping.",
        "actions": [
          "Book meeting with executive buyer",
          "Share platform upgrade pricing"
        ],
        "contractStage": "Proposal Sent",
        "sfdcOppValue": 244155,
        "nps": -38,
        "primaryContact": "Chad Ramos",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_002",
        "name": "Mcdonald-Alvarado",
        "health": 8.7,
        "status": "STABLE",
        "arr": 128154,
        "renewal": "2026-10-17",
        "sentiment": "Positive",
        "summary": "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 131998,
        "nps": 68,
        "primaryContact": "Brian Juarez",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_003",
        "name": "Guzman LLC",
        "health": 8.5,
        "status": "STABLE",
        "arr": 132274,
        "renewal": "2027-01-10",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 149469,
        "nps": 90,
        "primaryContact": "Joshua Mcclure",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_004",
        "name": "Schwartz-Lewis",
        "health": 9.4,
        "status": "STABLE",
        "arr": 290134,
        "renewal": "2026-12-06",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 310443,
        "nps": 82,
        "primaryContact": "Robert Greer",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_005",
        "name": "Jones-Lee",
        "health": 8.0,
        "status": "STABLE",
        "arr": 170016,
        "renewal": "2026-11-23",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Ask for case study reference"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 170016,
        "nps": 69,
        "primaryContact": "Billy Mueller",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_006",
        "name": "Wallace PLC",
        "health": 3.4,
        "status": "CRITICAL",
        "arr": 193742,
        "renewal": "2026-06-20",
        "sentiment": "Negative",
        "summary": "Stakeholder churn. Champion left company. Platform adoption stalling.",
        "actions": [
          "Reach out to new GTM Director",
          "Schedule fresh team training"
        ],
        "contractStage": "Discovery",
        "sfdcOppValue": 209241,
        "nps": 2,
        "primaryContact": "Sarah Klein",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_007",
        "name": "Lee-Hartman",
        "health": 9.8,
        "status": "STABLE",
        "arr": 212074,
        "renewal": "2027-01-28",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 212074,
        "nps": 76,
        "primaryContact": "Tina Singh",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_008",
        "name": "Walsh Group",
        "health": 9.4,
        "status": "STABLE",
        "arr": 93136,
        "renewal": "2026-09-30",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 93136,
        "nps": 83,
        "primaryContact": "Susan Brown",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_009",
        "name": "Clark-Jordan",
        "health": 9.7,
        "status": "STABLE",
        "arr": 292864,
        "renewal": "2027-03-21",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 304578,
        "nps": 47,
        "primaryContact": "Lauren Smith",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_010",
        "name": "Lewis-Pearson",
        "health": 10.0,
        "status": "STABLE",
        "arr": 318231,
        "renewal": "2026-10-19",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 318231,
        "nps": 48,
        "primaryContact": "Mike Rice",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_011",
        "name": "Frazier, Ortega and Khan",
        "health": 4.3,
        "status": "CRITICAL",
        "arr": 127942,
        "renewal": "2026-07-10",
        "sentiment": "Negative",
        "summary": "Support escalations. Downtime last week. Agitated stakeholders. Health score dropping.",
        "actions": [
          "Schedule Tech Audit call",
          "Send API rate limits proposal"
        ],
        "contractStage": "Discovery",
        "sfdcOppValue": 153530,
        "nps": -28,
        "primaryContact": "Donna Bradley",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_012",
        "name": "Casey-Perez",
        "health": 8.9,
        "status": "STABLE",
        "arr": 142196,
        "renewal": "2026-10-27",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 153571,
        "nps": 67,
        "primaryContact": "Veronica Tran",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_013",
        "name": "Sullivan Ltd",
        "health": 9.7,
        "status": "STABLE",
        "arr": 296174,
        "renewal": "2027-03-15",
        "sentiment": "Positive",
        "summary": "Stable telemetry. Customer requested walkthrough of new automated GTM integrations.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 296174,
        "nps": 69,
        "primaryContact": "Anita Taylor",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_014",
        "name": "Smith-Marshall",
        "health": 9.1,
        "status": "STABLE",
        "arr": 80093,
        "renewal": "2026-12-18",
        "sentiment": "Positive",
        "summary": "Stable telemetry. Customer requested walkthrough of new automated GTM integrations.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 83296,
        "nps": 74,
        "primaryContact": "Samantha Wilson",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_015",
        "name": "Davis, Flynn and Watson",
        "health": 9.5,
        "status": "STABLE",
        "arr": 115735,
        "renewal": "2026-10-15",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 115735,
        "nps": 73,
        "primaryContact": "Jonathan Torres",
        "contactRole": "VP of Engineering"
      }
    ]
  },
  "CSM_SARAH_K": {
    "csmName": "Sarah Jenkins",
    "accounts": [
      {
        "id": "ACC_016",
        "name": "Smith-Elliott",
        "health": 2.6,
        "status": "CRITICAL",
        "arr": 216119,
        "renewal": "2026-06-23",
        "sentiment": "Negative",
        "summary": "Contraction risk. Champion has departed. Budget freeze on renewals.",
        "actions": [
          "Schedule Solution Architect sync",
          "Provide custom SDK patches"
        ],
        "contractStage": "Proposal Sent",
        "sfdcOppValue": 257181,
        "nps": 5,
        "primaryContact": "Christopher Coleman",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_017",
        "name": "Duke Group",
        "health": 8.6,
        "status": "STABLE",
        "arr": 141199,
        "renewal": "2026-12-15",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 159554,
        "nps": 83,
        "primaryContact": "Carolyn Shaffer",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_018",
        "name": "Ramirez and Sons",
        "health": 8.1,
        "status": "STABLE",
        "arr": 258333,
        "renewal": "2027-01-19",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 278999,
        "nps": 61,
        "primaryContact": "David Barnett",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_019",
        "name": "Cohen-Chandler",
        "health": 9.9,
        "status": "STABLE",
        "arr": 188250,
        "renewal": "2026-10-13",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 188250,
        "nps": 79,
        "primaryContact": "Frank Moore",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_020",
        "name": "Mosley-Carroll",
        "health": 9.0,
        "status": "STABLE",
        "arr": 84791,
        "renewal": "2027-03-10",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 84791,
        "nps": 91,
        "primaryContact": "Stephen Moore",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_021",
        "name": "Jimenez PLC",
        "health": 5.1,
        "status": "CRITICAL",
        "arr": 115371,
        "renewal": "2026-07-14",
        "sentiment": "Negative",
        "summary": "Support escalations. Downtime last week. Agitated stakeholders. Health score dropping.",
        "actions": [
          "Introduce new CSM to champion",
          "Provide SOC2 compliance report",
          "Share product roadmap deck"
        ],
        "contractStage": "Discovery",
        "sfdcOppValue": 139598,
        "nps": -29,
        "primaryContact": "Susan Sanchez",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_022",
        "name": "Oneill-White",
        "health": 8.7,
        "status": "STABLE",
        "arr": 344880,
        "renewal": "2027-02-12",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Send expansion pricing sheet"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 344880,
        "nps": 81,
        "primaryContact": "Erica Barton",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_023",
        "name": "Vega, Smith and Miller",
        "health": 9.5,
        "status": "STABLE",
        "arr": 198401,
        "renewal": "2027-03-18",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 198401,
        "nps": 77,
        "primaryContact": "Hayley Mercado",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_024",
        "name": "Johnston PLC",
        "health": 9.8,
        "status": "STABLE",
        "arr": 166570,
        "renewal": "2027-02-27",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 166570,
        "nps": 46,
        "primaryContact": "Emma Berry",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_025",
        "name": "Liu, Roberson and Wilson",
        "health": 9.8,
        "status": "STABLE",
        "arr": 198297,
        "renewal": "2026-10-27",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 198297,
        "nps": 47,
        "primaryContact": "Dustin Mays",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_026",
        "name": "Bishop, Jacobs and Murray",
        "health": 4.8,
        "status": "CRITICAL",
        "arr": 346207,
        "renewal": "2026-06-29",
        "sentiment": "Negative",
        "summary": "Stakeholder churn. Champion left company. Platform adoption stalling.",
        "actions": [
          "Escalate API latency tickets",
          "Send API status dashboard link"
        ],
        "contractStage": "Discovery",
        "sfdcOppValue": 377365,
        "nps": -43,
        "primaryContact": "Brooke Hendricks",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_027",
        "name": "Taylor, White and Sparks",
        "health": 9.3,
        "status": "STABLE",
        "arr": 266693,
        "renewal": "2026-11-06",
        "sentiment": "Positive",
        "summary": "Stable telemetry. Customer requested walkthrough of new automated GTM integrations.",
        "actions": [
          "Send expansion pricing sheet"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 285361,
        "nps": 64,
        "primaryContact": "Alexandra Rodriguez",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_028",
        "name": "Fitzpatrick, Kelley and Hester",
        "health": 8.8,
        "status": "STABLE",
        "arr": 195734,
        "renewal": "2026-11-10",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Send expansion pricing sheet"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 250539,
        "nps": 78,
        "primaryContact": "Stephen Russo",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_029",
        "name": "Miller and Sons",
        "health": 9.6,
        "status": "STABLE",
        "arr": 84208,
        "renewal": "2026-12-17",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 106944,
        "nps": 54,
        "primaryContact": "Jeremy Schaefer",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_030",
        "name": "Morgan-Jones",
        "health": 8.7,
        "status": "STABLE",
        "arr": 308707,
        "renewal": "2027-01-24",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Send expansion pricing sheet"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 314881,
        "nps": 90,
        "primaryContact": "Brian Perry",
        "contactRole": "VP of Operations"
      }
    ]
  },
  "CSM_ALEX_B": {
    "csmName": "Alex Baldwin",
    "accounts": [
      {
        "id": "ACC_031",
        "name": "Pierce, Lutz and Ford",
        "health": 3.7,
        "status": "CRITICAL",
        "arr": 86955,
        "renewal": "2026-06-13",
        "sentiment": "Negative",
        "summary": "User adoption dropping. Customer complains about API limits. Renewal at risk.",
        "actions": [
          "Book meeting with executive buyer",
          "Share platform upgrade pricing"
        ],
        "contractStage": "Negotiation",
        "sfdcOppValue": 88694,
        "nps": 4,
        "primaryContact": "Shelley Mcdowell",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_032",
        "name": "Ramirez LLC",
        "health": 9.7,
        "status": "STABLE",
        "arr": 264111,
        "renewal": "2026-11-15",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Ask for case study reference"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 327497,
        "nps": 86,
        "primaryContact": "Christopher Anderson",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_033",
        "name": "Ramirez and Sons",
        "health": 9.4,
        "status": "STABLE",
        "arr": 283413,
        "renewal": "2027-01-08",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Send expansion pricing sheet"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 283413,
        "nps": 58,
        "primaryContact": "Jennifer Nielsen",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_034",
        "name": "Owens-Coleman",
        "health": 9.8,
        "status": "STABLE",
        "arr": 220875,
        "renewal": "2026-10-10",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 220875,
        "nps": 73,
        "primaryContact": "Lisa Mcdaniel",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_035",
        "name": "Pollard, Santana and Flores",
        "health": 8.6,
        "status": "STABLE",
        "arr": 112518,
        "renewal": "2027-01-02",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 144023,
        "nps": 80,
        "primaryContact": "Steven Callahan",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_036",
        "name": "Ramirez and Sons",
        "health": 3.8,
        "status": "CRITICAL",
        "arr": 349312,
        "renewal": "2026-07-11",
        "sentiment": "Negative",
        "summary": "Support escalations. Downtime last week. Agitated stakeholders. Health score dropping.",
        "actions": [
          "Escalate API latency tickets",
          "Send API status dashboard link"
        ],
        "contractStage": "Discovery",
        "sfdcOppValue": 356298,
        "nps": -11,
        "primaryContact": "Rachel Thompson",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_037",
        "name": "Smith Group",
        "health": 9.7,
        "status": "STABLE",
        "arr": 313249,
        "renewal": "2026-10-18",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 313249,
        "nps": 50,
        "primaryContact": "Jacob Love",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_038",
        "name": "Ellis, Hudson and Brock",
        "health": 9.5,
        "status": "STABLE",
        "arr": 178079,
        "renewal": "2026-11-12",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Send expansion pricing sheet"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 178079,
        "nps": 88,
        "primaryContact": "Sean Mathews",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_039",
        "name": "Gibbs Group",
        "health": 9.6,
        "status": "STABLE",
        "arr": 229661,
        "renewal": "2027-02-11",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 229661,
        "nps": 50,
        "primaryContact": "Karen Hernandez",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_040",
        "name": "Gonzalez, Watkins and Stewart",
        "health": 9.1,
        "status": "STABLE",
        "arr": 128064,
        "renewal": "2027-03-24",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 128064,
        "nps": 86,
        "primaryContact": "Carrie Crawford",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_041",
        "name": "Giles LLC",
        "health": 4.5,
        "status": "CRITICAL",
        "arr": 125578,
        "renewal": "2026-07-12",
        "sentiment": "Negative",
        "summary": "Contraction risk. Champion has departed. Budget freeze on renewals.",
        "actions": [
          "Escalate API latency tickets",
          "Send API status dashboard link"
        ],
        "contractStage": "Proposal Sent",
        "sfdcOppValue": 133112,
        "nps": -20,
        "primaryContact": "Madison Young",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_042",
        "name": "Shelton-Shannon",
        "health": 8.3,
        "status": "STABLE",
        "arr": 124270,
        "renewal": "2026-10-18",
        "sentiment": "Positive",
        "summary": "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.",
        "actions": [
          "Ask for case study reference"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 124270,
        "nps": 91,
        "primaryContact": "Erica Fisher",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_043",
        "name": "Little-Mcgee",
        "health": 9.9,
        "status": "STABLE",
        "arr": 142669,
        "renewal": "2026-11-08",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 179762,
        "nps": 80,
        "primaryContact": "Michael Williams",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_044",
        "name": "Jones, Hernandez and Martinez",
        "health": 8.7,
        "status": "STABLE",
        "arr": 162779,
        "renewal": "2027-03-26",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 190451,
        "nps": 94,
        "primaryContact": "Katherine Owen",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_045",
        "name": "Martinez-Johnson",
        "health": 9.3,
        "status": "STABLE",
        "arr": 104760,
        "renewal": "2026-10-01",
        "sentiment": "Positive",
        "summary": "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 118378,
        "nps": 49,
        "primaryContact": "Kenneth Ponce",
        "contactRole": "Director of IT Ops"
      }
    ]
  },
  "CSM_JESSICA_T": {
    "csmName": "Jessica Taylor",
    "accounts": [
      {
        "id": "ACC_046",
        "name": "Harris, Lambert and Morrow",
        "health": 5.6,
        "status": "CRITICAL",
        "arr": 97112,
        "renewal": "2026-06-19",
        "sentiment": "Negative",
        "summary": "Support escalations. Downtime last week. Agitated stakeholders. Health score dropping.",
        "actions": [
          "Schedule Tech Audit call",
          "Send API rate limits proposal"
        ],
        "contractStage": "Discovery",
        "sfdcOppValue": 123332,
        "nps": -37,
        "primaryContact": "Ricky Mcdonald",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_047",
        "name": "Bates, Pierce and Anderson",
        "health": 8.3,
        "status": "STABLE",
        "arr": 328661,
        "renewal": "2027-01-10",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 328661,
        "nps": 78,
        "primaryContact": "Donald Robinson",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_048",
        "name": "Hawkins, Evans and Turner",
        "health": 8.4,
        "status": "STABLE",
        "arr": 290180,
        "renewal": "2027-03-20",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 304689,
        "nps": 75,
        "primaryContact": "Christina Rivers",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_049",
        "name": "Allen-Graham",
        "health": 8.4,
        "status": "STABLE",
        "arr": 267328,
        "renewal": "2027-03-12",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 286040,
        "nps": 95,
        "primaryContact": "Dominique Logan",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_050",
        "name": "Mccann-Potter",
        "health": 9.5,
        "status": "STABLE",
        "arr": 160085,
        "renewal": "2027-03-19",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 160085,
        "nps": 80,
        "primaryContact": "Stacey Thomas",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_051",
        "name": "Williams LLC",
        "health": 3.7,
        "status": "CRITICAL",
        "arr": 209114,
        "renewal": "2026-06-13",
        "sentiment": "Negative",
        "summary": "Unresolved bugs syncing CPQ. Technical blockers causing friction.",
        "actions": [
          "Review downtime RCA with AE",
          "Provide compliance validation"
        ],
        "contractStage": "Proposal Sent",
        "sfdcOppValue": 259301,
        "nps": 8,
        "primaryContact": "Alyssa White",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_052",
        "name": "Koch, Gonzales and Williams",
        "health": 8.1,
        "status": "STABLE",
        "arr": 157459,
        "renewal": "2027-01-26",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 170055,
        "nps": 90,
        "primaryContact": "Erik Campbell",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_053",
        "name": "Page, Tapia and Mejia",
        "health": 9.8,
        "status": "STABLE",
        "arr": 148666,
        "renewal": "2027-02-08",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 187319,
        "nps": 48,
        "primaryContact": "Nicole Perry",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_054",
        "name": "Proctor-Montgomery",
        "health": 8.1,
        "status": "STABLE",
        "arr": 259101,
        "renewal": "2027-03-04",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Send expansion pricing sheet"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 305739,
        "nps": 51,
        "primaryContact": "Rachael Perez",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_055",
        "name": "Smith Group",
        "health": 9.3,
        "status": "STABLE",
        "arr": 349420,
        "renewal": "2026-11-25",
        "sentiment": "Positive",
        "summary": "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 352914,
        "nps": 73,
        "primaryContact": "Mrs. Jacqueline Bryan MD",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_056",
        "name": "Hill, Jensen and Thomas",
        "health": 5.1,
        "status": "CRITICAL",
        "arr": 159601,
        "renewal": "2026-06-30",
        "sentiment": "Negative",
        "summary": "Stakeholder churn. Champion left company. Platform adoption stalling.",
        "actions": [
          "Schedule Tech Audit call",
          "Send API rate limits proposal"
        ],
        "contractStage": "Discovery",
        "sfdcOppValue": 172369,
        "nps": -46,
        "primaryContact": "Christopher Mccann",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_057",
        "name": "Trujillo, Fields and Johnson",
        "health": 9.4,
        "status": "STABLE",
        "arr": 248932,
        "renewal": "2026-09-30",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 278803,
        "nps": 73,
        "primaryContact": "Angela Ryan",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_058",
        "name": "Munoz-Martinez",
        "health": 9.6,
        "status": "STABLE",
        "arr": 274819,
        "renewal": "2027-01-06",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 280315,
        "nps": 64,
        "primaryContact": "Albert Walker",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_059",
        "name": "Davila Group",
        "health": 9.5,
        "status": "STABLE",
        "arr": 117419,
        "renewal": "2027-01-14",
        "sentiment": "Positive",
        "summary": "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 117419,
        "nps": 44,
        "primaryContact": "Kelsey Mitchell",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_060",
        "name": "Meyer-Jones",
        "health": 9.0,
        "status": "STABLE",
        "arr": 127057,
        "renewal": "2027-02-10",
        "sentiment": "Positive",
        "summary": "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 141033,
        "nps": 50,
        "primaryContact": "Angela Peterson",
        "contactRole": "CTO"
      }
    ]
  },
  "CSM_DAVID_L": {
    "csmName": "David Lang",
    "accounts": [
      {
        "id": "ACC_061",
        "name": "Reeves-Butler",
        "health": 3.6,
        "status": "CRITICAL",
        "arr": 281722,
        "renewal": "2026-06-21",
        "sentiment": "Negative",
        "summary": "Exec sync. Champion left. New leadership reviewing spending. Severe platform churn risk.",
        "actions": [
          "Escalate API latency tickets",
          "Send API status dashboard link"
        ],
        "contractStage": "Discovery",
        "sfdcOppValue": 340883,
        "nps": -7,
        "primaryContact": "Roger Reyes",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_062",
        "name": "Smith-Kelly",
        "health": 8.7,
        "status": "STABLE",
        "arr": 186492,
        "renewal": "2027-03-14",
        "sentiment": "Positive",
        "summary": "Stable telemetry. Customer requested walkthrough of new automated GTM integrations.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 186492,
        "nps": 78,
        "primaryContact": "Gabriela Perry",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_063",
        "name": "Hogan, Davis and Hall",
        "health": 9.4,
        "status": "STABLE",
        "arr": 110756,
        "renewal": "2027-02-15",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 110756,
        "nps": 42,
        "primaryContact": "Deanna Payne",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_064",
        "name": "Curtis and Sons",
        "health": 8.8,
        "status": "STABLE",
        "arr": 296049,
        "renewal": "2027-02-10",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 373021,
        "nps": 64,
        "primaryContact": "Angela Gonzalez",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_065",
        "name": "Hendricks, Casey and Stevenson",
        "health": 9.1,
        "status": "STABLE",
        "arr": 260906,
        "renewal": "2027-03-18",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 260906,
        "nps": 69,
        "primaryContact": "John Rodriguez",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_066",
        "name": "West Inc",
        "health": 4.8,
        "status": "CRITICAL",
        "arr": 125334,
        "renewal": "2026-06-17",
        "sentiment": "Negative",
        "summary": "Unresolved bugs syncing CPQ. Technical blockers causing friction.",
        "actions": [
          "Escalate API latency tickets",
          "Send API status dashboard link"
        ],
        "contractStage": "Negotiation",
        "sfdcOppValue": 132854,
        "nps": -39,
        "primaryContact": "Candace Fox",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_067",
        "name": "Kemp Ltd",
        "health": 9.4,
        "status": "STABLE",
        "arr": 166745,
        "renewal": "2026-12-17",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 166745,
        "nps": 48,
        "primaryContact": "Paul Ochoa",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_068",
        "name": "Dixon, Perez and Watkins",
        "health": 9.2,
        "status": "STABLE",
        "arr": 308385,
        "renewal": "2026-12-01",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 348475,
        "nps": 80,
        "primaryContact": "Julie Preston",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_069",
        "name": "Cook PLC",
        "health": 8.6,
        "status": "STABLE",
        "arr": 311432,
        "renewal": "2026-10-12",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 398632,
        "nps": 51,
        "primaryContact": "Gabriella Baird",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_070",
        "name": "Ray Group",
        "health": 8.2,
        "status": "STABLE",
        "arr": 341904,
        "renewal": "2026-10-17",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 341904,
        "nps": 44,
        "primaryContact": "Brooke Walton",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_071",
        "name": "Rodriguez Inc",
        "health": 4.6,
        "status": "CRITICAL",
        "arr": 253783,
        "renewal": "2026-06-14",
        "sentiment": "Negative",
        "summary": "Support ticket escalation. API performance issues and latency errors reported.",
        "actions": [
          "Escalate API latency tickets",
          "Send API status dashboard link"
        ],
        "contractStage": "Qualification",
        "sfdcOppValue": 261396,
        "nps": -10,
        "primaryContact": "Lisa Dawson",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_072",
        "name": "Carr-Marquez",
        "health": 9.6,
        "status": "STABLE",
        "arr": 298613,
        "renewal": "2026-11-07",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 349377,
        "nps": 61,
        "primaryContact": "Roy Bowen",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_073",
        "name": "Morrison, Chaney and Powell",
        "health": 8.4,
        "status": "STABLE",
        "arr": 257097,
        "renewal": "2027-01-15",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 298232,
        "nps": 68,
        "primaryContact": "Vincent Quinn",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_074",
        "name": "Graves Inc",
        "health": 8.4,
        "status": "STABLE",
        "arr": 105826,
        "renewal": "2026-12-21",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Ask for case study reference"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 120641,
        "nps": 70,
        "primaryContact": "Andrew Jackson",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_075",
        "name": "Cohen-Brown",
        "health": 8.5,
        "status": "STABLE",
        "arr": 331086,
        "renewal": "2026-11-20",
        "sentiment": "Positive",
        "summary": "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 423790,
        "nps": 61,
        "primaryContact": "Miranda Velazquez",
        "contactRole": "Director of IT Ops"
      }
    ]
  },
  "CSM_EMILY_C": {
    "csmName": "Emily Chen",
    "accounts": [
      {
        "id": "ACC_076",
        "name": "Phillips and Sons",
        "health": 5.0,
        "status": "CRITICAL",
        "arr": 123894,
        "renewal": "2026-07-13",
        "sentiment": "Negative",
        "summary": "User adoption dropping. Customer complains about API limits. Renewal at risk.",
        "actions": [
          "Escalate API latency tickets",
          "Send API status dashboard link"
        ],
        "contractStage": "Negotiation",
        "sfdcOppValue": 147433,
        "nps": -17,
        "primaryContact": "Christine Lee",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_077",
        "name": "Cummings Group",
        "health": 8.1,
        "status": "STABLE",
        "arr": 329459,
        "renewal": "2027-03-27",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 372288,
        "nps": 93,
        "primaryContact": "James Henderson",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_078",
        "name": "Hansen, Hernandez and Castaneda",
        "health": 8.9,
        "status": "STABLE",
        "arr": 257749,
        "renewal": "2026-12-09",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 257749,
        "nps": 86,
        "primaryContact": "Roberto Austin",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_079",
        "name": "Fischer, Walls and Cook",
        "health": 9.9,
        "status": "STABLE",
        "arr": 297975,
        "renewal": "2027-02-16",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 297975,
        "nps": 44,
        "primaryContact": "Shannon Hubbard",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_080",
        "name": "Allen Group",
        "health": 8.4,
        "status": "STABLE",
        "arr": 349727,
        "renewal": "2026-10-19",
        "sentiment": "Positive",
        "summary": "Platform usage is high. License count expanded into EMEA region last week.",
        "actions": [
          "Ask for case study reference"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 349727,
        "nps": 71,
        "primaryContact": "Jennifer Herrera",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_081",
        "name": "Harrison and Sons",
        "health": 2.7,
        "status": "CRITICAL",
        "arr": 115823,
        "renewal": "2026-07-10",
        "sentiment": "Negative",
        "summary": "Unresolved bugs syncing CPQ. Technical blockers causing friction.",
        "actions": [
          "Book meeting with executive buyer",
          "Share platform upgrade pricing"
        ],
        "contractStage": "Negotiation",
        "sfdcOppValue": 149411,
        "nps": -19,
        "primaryContact": "Michael Phelps",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_082",
        "name": "Hernandez-Martin",
        "health": 9.3,
        "status": "STABLE",
        "arr": 264135,
        "renewal": "2027-03-06",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 343375,
        "nps": 84,
        "primaryContact": "Dawn Elliott",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_083",
        "name": "Tucker-Lee",
        "health": 9.8,
        "status": "STABLE",
        "arr": 297428,
        "renewal": "2027-01-03",
        "sentiment": "Positive",
        "summary": "Stable telemetry. Customer requested walkthrough of new automated GTM integrations.",
        "actions": [
          "Ask for case study reference"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 306350,
        "nps": 63,
        "primaryContact": "Bryce Garcia",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_084",
        "name": "Todd-Avila",
        "health": 9.4,
        "status": "STABLE",
        "arr": 272475,
        "renewal": "2027-02-24",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Send expansion pricing sheet"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 335144,
        "nps": 78,
        "primaryContact": "Todd Warner",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_085",
        "name": "Murphy Inc",
        "health": 9.6,
        "status": "STABLE",
        "arr": 280382,
        "renewal": "2027-02-19",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 319635,
        "nps": 75,
        "primaryContact": "Thomas Hardy",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_086",
        "name": "Collins LLC",
        "health": 4.3,
        "status": "CRITICAL",
        "arr": 178002,
        "renewal": "2026-06-14",
        "sentiment": "Negative",
        "summary": "Support escalations. Downtime last week. Agitated stakeholders. Health score dropping.",
        "actions": [
          "Escalate API latency tickets",
          "Send API status dashboard link"
        ],
        "contractStage": "Qualification",
        "sfdcOppValue": 211822,
        "nps": -20,
        "primaryContact": "Abigail Collins",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_087",
        "name": "Avila Group",
        "health": 8.6,
        "status": "STABLE",
        "arr": 301360,
        "renewal": "2027-02-15",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Send expansion pricing sheet"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 349577,
        "nps": 63,
        "primaryContact": "John Martinez",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_088",
        "name": "Scott Ltd",
        "health": 8.6,
        "status": "STABLE",
        "arr": 211350,
        "renewal": "2027-02-24",
        "sentiment": "Positive",
        "summary": "Stable telemetry. Customer requested walkthrough of new automated GTM integrations.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 243052,
        "nps": 50,
        "primaryContact": "Lisa Davidson",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_089",
        "name": "Schneider, Fleming and Wood",
        "health": 8.0,
        "status": "STABLE",
        "arr": 135982,
        "renewal": "2026-11-25",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 167257,
        "nps": 46,
        "primaryContact": "Justin Wilson PhD",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_090",
        "name": "Williamson-Petty",
        "health": 8.1,
        "status": "STABLE",
        "arr": 144337,
        "renewal": "2026-12-08",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 170317,
        "nps": 80,
        "primaryContact": "Sarah Saunders",
        "contactRole": "CTO"
      }
    ]
  },
  "CSM_MICHAEL_W": {
    "csmName": "Michael Wong",
    "accounts": [
      {
        "id": "ACC_091",
        "name": "Chavez LLC",
        "health": 4.4,
        "status": "CRITICAL",
        "arr": 115174,
        "renewal": "2026-06-13",
        "sentiment": "Negative",
        "summary": "Contraction risk. Champion has departed. Budget freeze on renewals.",
        "actions": [
          "Book meeting with executive buyer",
          "Share platform upgrade pricing"
        ],
        "contractStage": "Negotiation",
        "sfdcOppValue": 137057,
        "nps": -1,
        "primaryContact": "Edward Williams",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_092",
        "name": "Thompson Inc",
        "health": 9.2,
        "status": "STABLE",
        "arr": 106744,
        "renewal": "2026-11-20",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 106744,
        "nps": 42,
        "primaryContact": "Shannon Zuniga",
        "contactRole": "Director of IT Ops"
      },
      {
        "id": "ACC_093",
        "name": "Olson-Waller",
        "health": 10.0,
        "status": "STABLE",
        "arr": 250188,
        "renewal": "2026-12-13",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 262697,
        "nps": 93,
        "primaryContact": "Rebecca Singleton",
        "contactRole": "CTO"
      },
      {
        "id": "ACC_094",
        "name": "Williams-Brown",
        "health": 9.3,
        "status": "STABLE",
        "arr": 162619,
        "renewal": "2027-01-23",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 200021,
        "nps": 70,
        "primaryContact": "Barry Walter",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_095",
        "name": "James Group",
        "health": 8.7,
        "status": "STABLE",
        "arr": 213108,
        "renewal": "2027-01-31",
        "sentiment": "Positive",
        "summary": "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 225894,
        "nps": 80,
        "primaryContact": "Michelle Harvey",
        "contactRole": "CEO"
      },
      {
        "id": "ACC_096",
        "name": "Conley-Rangel",
        "health": 3.9,
        "status": "CRITICAL",
        "arr": 77592,
        "renewal": "2026-07-09",
        "sentiment": "Negative",
        "summary": "Support escalations. Downtime last week. Agitated stakeholders. Health score dropping.",
        "actions": [
          "Book meeting with executive buyer",
          "Share platform upgrade pricing"
        ],
        "contractStage": "Discovery",
        "sfdcOppValue": 86127,
        "nps": -46,
        "primaryContact": "Scott Mitchell",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_097",
        "name": "Fisher Ltd",
        "health": 10.0,
        "status": "STABLE",
        "arr": 79794,
        "renewal": "2026-12-11",
        "sentiment": "Positive",
        "summary": "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 79794,
        "nps": 41,
        "primaryContact": "Robert Brown",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_098",
        "name": "Acosta, Nelson and Arellano",
        "health": 9.2,
        "status": "STABLE",
        "arr": 216593,
        "renewal": "2027-02-23",
        "sentiment": "Positive",
        "summary": "Touchpoint complete. User onboarding going smoothly. Integration active.",
        "actions": [
          "Ask for case study reference"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 216593,
        "nps": 87,
        "primaryContact": "Marie Rodriguez",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_099",
        "name": "Lewis, Carlson and Nash",
        "health": 9.4,
        "status": "STABLE",
        "arr": 123024,
        "renewal": "2026-11-16",
        "sentiment": "Positive",
        "summary": "Sync complete. Product usage expanding into APAC division. No blockers reported.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 123024,
        "nps": 88,
        "primaryContact": "Dominic Aguirre",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_100",
        "name": "Chang PLC",
        "health": 8.7,
        "status": "STABLE",
        "arr": 114553,
        "renewal": "2026-10-30",
        "sentiment": "Positive",
        "summary": "QBR completed. Customer seeing 2.5x ROI. Expansion scheduled for next Q.",
        "actions": [
          "Follow up on SSO set up"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 114553,
        "nps": 94,
        "primaryContact": "Erin Moore",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_101",
        "name": "Freeman, Gillespie and Fisher",
        "health": 3.9,
        "status": "CRITICAL",
        "arr": 338761,
        "renewal": "2026-06-18",
        "sentiment": "Negative",
        "summary": "Support ticket escalation. API performance issues and latency errors reported.",
        "actions": [
          "Schedule Solution Architect sync",
          "Provide custom SDK patches"
        ],
        "contractStage": "Negotiation",
        "sfdcOppValue": 426838,
        "nps": -50,
        "primaryContact": "Jeffrey Obrien",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_102",
        "name": "Williams, Moreno and Marquez",
        "health": 9.9,
        "status": "STABLE",
        "arr": 130913,
        "renewal": "2027-01-15",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Send roadmap slide deck"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 163641,
        "nps": 79,
        "primaryContact": "Erica Hernandez",
        "contactRole": "VP of Operations"
      },
      {
        "id": "ACC_103",
        "name": "Goodwin Group",
        "health": 8.2,
        "status": "STABLE",
        "arr": 328800,
        "renewal": "2027-01-21",
        "sentiment": "Positive",
        "summary": "Stable telemetry. Customer requested walkthrough of new automated GTM integrations.",
        "actions": [
          "Send integrations docs link"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 348528,
        "nps": 51,
        "primaryContact": "Jessica Figueroa",
        "contactRole": "Head of Procurement"
      },
      {
        "id": "ACC_104",
        "name": "Bryant-Watson",
        "health": 9.6,
        "status": "STABLE",
        "arr": 265193,
        "renewal": "2027-02-27",
        "sentiment": "Positive",
        "summary": "Smooth operations. Trial period started on expansion modules. AE driving upsell.",
        "actions": [
          "Monitor adoption rates"
        ],
        "contractStage": "Closed Won",
        "sfdcOppValue": 265193,
        "nps": 91,
        "primaryContact": "Kimberly Cabrera",
        "contactRole": "VP of Engineering"
      },
      {
        "id": "ACC_105",
        "name": "Taylor-Acevedo",
        "health": 9.7,
        "status": "STABLE",
        "arr": 330989,
        "renewal": "2027-03-17",
        "sentiment": "Positive",
        "summary": "Healthy account. Stakeholder is highly active in Slack. High NPS score.",
        "actions": [
          "Arrange QBR for expansion metrics"
        ],
        "contractStage": "Contract Signed",
        "sfdcOppValue": 337608,
        "nps": 92,
        "primaryContact": "Richard White",
        "contactRole": "VP of Engineering"
      }
    ]
  }
};

export default function Dashboard() {
  const [appViewMode, setAppViewMode] = useState<"assignment" | "console">("assignment");
  const [assignmentTab, setAssignmentTab] = useState<"design" | "onboarding" | "past">("design");
  const [showDesignDocModal, setShowDesignDocModal] = useState(false);
  const [showTrdModal, setShowTrdModal] = useState(false);
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
    const subject = isCrit 
      ? `Action Required: Critical Retention Alert for ${acc.name}`
      : `Account Update: ${acc.name} - Portfolio Review`;
      
    const body = `Hi Team,

I'm reaching out regarding ${acc.name} (Account ID: ${acc.id}).

Our telemetry engine has recently flagged this account for review, and I wanted to ensure we have a coordinated strategy moving forward.

Key Metrics & Health Indicators:
• Current Health Score: ${acc.health}/10
• ARR Impact: $${acc.arr.toLocaleString()}
• Next Renewal Date: ${acc.renewal}
• Customer Sentiment: ${acc.sentiment}

Latest Context:
${acc.summary}

Recommended Action Plan:
${acc.actions.map((act: string) => `• [ ] ${act}`).join("\n")}

Please review the metrics and action items above so we can align on our next steps to support this account. I'll drop a link to the full account dashboard in Slack shortly.

Best regards,

${activePortfolio.csmName}
Enterprise Customer Success Team`;
    
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
  const formatARR = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  const renderDesignDoc = () => {
    return (
      <div className="space-y-8 text-slate-350">
        <div>
          <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <span className="bg-indigo-500/10 text-indigo-400 p-1.5 rounded-lg text-xs font-mono">PART 1</span>
            End-to-End Automation & Design Blueprint
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end telemetry pipeline querying Vitally, Salesforce CPQ, and Weflow to push active briefings directly into Slack.
          </p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setShowDesignDocModal(true)}
              className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-405 hover:bg-indigo-500/20 hover:border-indigo-300 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 flex-shrink-0"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-400" /> View Detailed Developer Design Doc (.md)
            </button>
          </div>

          <div className="mt-4 bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex flex-col items-center gap-3">
            <div className="w-full flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System Architecture Diagram</span>
              <a 
                href="/gtm_architecture_v1.png" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
              >
                Open Fullscreen
              </a>
            </div>
            <img 
              src="/gtm_architecture_v1.png" 
              alt="HG Insights GTM Architecture Diagram"
              className="rounded-xl border border-slate-800 shadow-md max-w-full h-auto max-h-[350px] object-contain hover:scale-[1.01] transition-transform duration-300"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-400">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">🕰️ Timing & Orchestrator Trigger</h4>
              </div>
              <div className="text-xs text-slate-400 leading-relaxed space-y-2">
                <span><strong>Chronological (Production):</strong> Triggered at <strong>7:00 AM every Monday</strong> via AWS EventBridge.</span>
                <span className="block mt-2 font-semibold text-indigo-400">The 2-Hour Failsafe Buffer:</span>
                <span className="block mt-1">Standups begin at 9:00 AM. Setting the trigger at 7:00 AM leaves a 2-hour buffer which acts as a crucial operational window to absorb database rate-limiting controls, API key cold starts, and allow automatic LangGraph retries if transient network failures occur.</span>
                <span className="block mt-2"><strong>On-Demand (Ad-hoc):</strong> Exposed via <code>/api/trigger-digest</code> endpoint in the Next.js control panel to let CSMs force-refresh portfolios before key calls.</span>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-emerald-500/10 p-1.5 rounded-lg text-emerald-400">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">🔌 Multi-Source Schema Ingestion</h4>
              </div>
              <div className="text-xs text-slate-400 leading-relaxed space-y-2">
                <span>Data is ingested from three systems and joined inside an in-memory compiler on `accountId`:</span>
                <div className="space-y-1.5 mt-2">
                  <div>• <strong>Vitally:</strong> Queries client usage trends (<code>healthScore</code>, <code>npsScore</code>).</div>
                  <div>• <strong>Salesforce CPQ:</strong> Executes SOQL to extract contract dates, stages, and contract sizes (<code>arrValue</code>, <code>contractEndDate</code>, <code>renewalOpportunityStage</code>).</div>
                  <div>• <strong>Weflow:</strong> Gathers qualitative conversation summaries (<code>transcriptSummary</code>, <code>escalationFlag</code>).</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-800" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span className="bg-purple-500/10 text-purple-400 p-1.5 rounded-lg text-xs font-mono">PART 2</span>
              🧠 LLM Reasoning Node (LangGraph)
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              LangGraph manages state validation, sending the compiled JSON payload to a ChatOpenAI model (`gpt-4o-mini`).
            </p>
            <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-slate-350 block">Compound Risk Logic:</span>
              <p className="text-slate-400 leading-normal">
                The LLM evaluates cross-system signals. For example, a low Vitally score is flagged, but a low score <em>combined</em> with a renewal date within 45 days and an escalation note in Weflow is automatically promoted to <strong>CRITICAL</strong> risk status.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
              <span>Pydantic Response Schema</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`class AccountDigest(BaseModel):\n    accountId: str\n    companyName: str\n    riskLevel: Literal["CRITICAL", "ELEVATED", "STABLE"]\n    commercialUrgency: str\n    executiveSummary: str\n    actionItems: List[str]`);
                  showToast("Copied code to clipboard!");
                }}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" /> Copy Schema
              </button>
            </div>
            <pre className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl text-[10px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{`class AccountDigest(BaseModel):
    accountId: str
    companyName: str
    riskLevel: Literal["CRITICAL", "ELEVATED", "STABLE"]
    commercialUrgency: str
    executiveSummary: str
    actionItems: List[str]`}
            </pre>
          </div>
        </div>

        <hr className="border-slate-800" />

        <div>
          <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <span className="bg-blue-500/10 text-blue-400 p-1.5 rounded-lg text-xs font-mono">PART 3</span>
            📬 Delivery Format & Rationale
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Digests reach CSMs via private Slack DMs using Slack Block Kit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Why Slack over Email / Google Docs?</h4>
              <ul className="space-y-3 text-xs">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Preserves Context:</strong> CSMs live inside Slack. Forcing them to open another window introduces context switching.
                  </div>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Active Preparation:</strong> Pushing briefings at 8:45 AM keeps client blockers top-of-mind just minutes before standup.
                  </div>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Interactive Loopback:</strong> Buttons write directly back to Salesforce or trigger actions inside the server without leaving Slack.
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-slate-850 p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                Slack Digest Visual Layout
              </h4>
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl font-sans text-xs space-y-2 text-slate-300 shadow-inner">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-white">🚨 Monday Portfolio Intelligence Briefing</span>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">Automated CS Engine</p>
                  </div>
                  <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-bold px-2 py-0.5 rounded uppercase">Critical</span>
                </div>
                <div className="pt-2 border-t border-slate-850 space-y-1">
                  <p className="font-bold text-white text-xs">Acme Corp Churn Risk Escalation</p>
                  <p className="text-slate-400 leading-normal text-[11px]">
                    Champion left. New leadership is reviewing competitive platforms. Health score dropped to 3.8/10. Contract renewal is 2026-06-25.
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => showToast("Notified AE regarding Acme Corp risk.")} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] px-3 py-1.5 rounded transition-all cursor-pointer">
                    💬 Ping Account Executive
                  </button>
                  <button onClick={() => showToast("Escalation ticket created successfully.")} className="bg-slate-855 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-[10px] px-3 py-1.5 rounded transition-all cursor-pointer">
                    📁 Create Escalation Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOnboardingPlan = () => {
    return (
      <div className="space-y-8 text-slate-300">
        <div>
          <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            CSM Launch Notification
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Notification sent to Customer Success channels upon deploying the automation engine.
          </p>

          <div className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl mt-4 font-sans text-xs space-y-4 text-slate-300 leading-relaxed max-w-3xl">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center text-slate-450">
              <div>
                <span className="font-bold text-white">Subject:</span> Launching Your Automated Monday Portfolio Intelligence Briefings 🚀
              </div>
              <span className="text-[10px] font-mono">Date: Today</span>
            </div>
            <p>Team,</p>
            <p>
              Preparing for our Monday 9 AM standup currently requires you to spend roughly <strong>90 minutes</strong> manually logging into Vitally to pull usage statistics, opening Salesforce to check renewal stages, and digging through Weflow notes to recap transcripts. This administrative overhead pulls you away from client focus.
            </p>
            <p>
              Starting this Monday at <strong>8:45 AM</strong>, you will receive an automated <strong>Portfolio Intelligence Briefing</strong> via a direct Slack message.
            </p>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2">
              <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                💡 Operational Benefits:
              </h5>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400 text-xs">
                <li><strong>Zero Manual Ingestion:</strong> All cross-platform databases sync automatically before you log on.</li>
                <li><strong>Weekend Risk Visibility:</strong> Instant flags for accounts experiencing weekend drops.</li>
                <li><strong>Action Item Consolidation:</strong> Required follow-ups are extracted directly from Weflow transcripts.</li>
              </ul>
            </div>
            <p>
              This console is built to defend your calendar. Check out your dashboard to configure alert thresholds.
            </p>
            <p className="font-bold text-indigo-400">
              — HG Insights Revenue Operations & Automation Team
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderPastWork = () => {
    return (
      <div className="space-y-8 text-slate-300">
        <div>
          <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            GTM Automation Portfolio Case Study: Fraud Fighter AI
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review of a production compliance automation engine developed in a prior assignment.
          </p>

          <div className="mt-6 space-y-6">
            <div className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4 mb-4">
                <div>
                  <h3 className="text-base font-black text-white">Technical Requirements Document (TRD)</h3>
                  <p className="text-xs text-slate-400 mt-1">v2.4 Final Output - ZIGRAM Compliance Engine</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowTrdModal(true)}
                    className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-405 hover:bg-indigo-500/20 hover:border-indigo-300 text-[10px] uppercase font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm active:scale-95 flex-shrink-0"
                  >
                    <Terminal className="w-3.5 h-3.5" /> View Full TRD (.md)
                  </button>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20 hidden sm:inline-block">Deployed to Prod</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div>
                  <h4 className="font-bold text-slate-300 mb-2 uppercase tracking-wider text-[10px]">Problem Statement</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Fraud analyst teams were drowning in volume, manually cross-referencing KYC logs and watchlist items, introducing latency and increasing the risk of human error during peak transaction times.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-300 mb-2 uppercase tracking-wider text-[10px]">Solution Architecture</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Rather than building a standalone portal, we integrated LangGraph risk scoring directly back into the existing transaction queue via REST API. Analysts saw risk parameters in their native interface.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-300 mb-2 uppercase tracking-wider text-[10px]">System Constraints</h4>
                  <ul className="list-disc list-inside text-slate-400 space-y-1 mt-1">
                    <li>P99 Latency: &lt; 1200ms</li>
                    <li>Throughput: 500 TPS</li>
                    <li>Availability: 99.99%</li>
                    <li>Data: PII Anonymized</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl">
              <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                <Network className="w-4 h-4 text-indigo-400" />
                Event-Driven Architecture Flow
              </h4>
              <div className="relative p-6 bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                  <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl w-full md:w-1/4 text-center shadow-lg relative group">
                    <Database className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                    <span className="text-xs font-bold text-white block">Kafka Topic</span>
                    <span className="text-[9px] text-slate-400 font-mono mt-1 block">tx_events_raw</span>
                    <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded animate-pulse">500/s</div>
                  </div>
                  
                  <ArrowRight className="w-6 h-6 text-slate-600 hidden md:block flex-shrink-0" />
                  <ArrowDown className="w-6 h-6 text-slate-600 md:hidden flex-shrink-0" />

                  <div className="bg-slate-900 border border-indigo-500/30 p-5 rounded-xl w-full md:w-1/4 text-center shadow-lg shadow-indigo-500/10">
                    <Cpu className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <span className="text-xs font-bold text-white block">LangGraph Engine</span>
                    <span className="text-[9px] text-slate-400 font-mono mt-1 block">gpt-4o-mini ruleset</span>
                  </div>

                  <ArrowRight className="w-6 h-6 text-slate-600 hidden md:block flex-shrink-0" />
                  <ArrowDown className="w-6 h-6 text-slate-600 md:hidden flex-shrink-0" />

                  <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl w-full md:w-1/4 text-center shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <span className="text-xs font-bold text-white block">API Gateway</span>
                    <span className="text-[9px] text-slate-400 font-mono mt-1 block">Push to Workforce UI</span>
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent -translate-y-1/2 z-0 hidden md:block" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-xl text-center">
                <span className="text-2xl font-black text-emerald-400 block mb-1">85%</span>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Review Time Saved</span>
              </div>
              <div className="bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-xl text-center">
                <span className="text-2xl font-black text-indigo-400 block mb-1">0.8s</span>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Inference Latency</span>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 p-5 rounded-xl text-center">
                <span className="text-2xl font-black text-purple-400 block mb-1">Zero</span>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Context Switching</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    appViewMode === "assignment" ? (
      <div 
        className="h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-y-auto overflow-x-hidden pb-12"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none z-0" />

        {toastMessage && (
          <div className="fixed top-6 right-6 bg-slate-800 text-white text-xs font-bold px-5 py-3.5 rounded-2xl shadow-xl z-[100] flex items-center gap-2 border border-slate-700 animate-slide-in">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}

        <header className="border-b border-slate-850 bg-slate-950/80 backdrop-blur-md px-6 lg:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10 flex-shrink-0 w-full">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/30">
              <Activity className="text-white w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-white tracking-tight">
                  HG Insights
                </h1>
                <span className="bg-indigo-500/25 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Portfolio Submission
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-semibold">
                GTM Automation Engineer Work Sample — Hrishikesh Suresh Sarode
              </p>
            </div>
          </div>

          <button
            onClick={() => setAppViewMode("console")}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-95 flex-shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-yellow-300 animate-bounce" />
            Launch Interactive Console ⚡
          </button>
        </header>

        <main className="max-w-5xl w-full mx-auto px-6 lg:px-8 mt-8 flex-1 z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-850 p-5 rounded-2xl flex items-center justify-between hover:border-slate-800 transition-all cursor-help">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Trigger Mechanism</p>
                <h3 className="text-sm font-bold text-white tracking-tight">Mon 7:00 AM EventBridge</h3>
                <p className="text-[11px] text-indigo-400 font-semibold mt-1">2-hour pre-standup buffer</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-indigo-400">
                <Clock className="w-5 h-5" />
              </div>
              <div className="absolute bottom-[102%] left-1/2 -translate-x-1/2 mb-2 w-64 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 border border-slate-800 text-[10px] text-slate-405 p-3 rounded-xl shadow-xl pointer-events-none z-50 leading-relaxed font-sans font-normal text-left">
                <span className="font-bold text-white block mb-1">⏰ Production Trigger Logic</span>
                AWS EventBridge schedules pipeline run at 7 AM. The 2-hour buffer covers Salesforce/Vitally API rate limiting, cold start times, and automates retry fallback paths.
              </div>
            </div>

            <div className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-850 p-5 rounded-2xl flex items-center justify-between hover:border-slate-800 transition-all cursor-help">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Data Ingestion sources</p>
                <h3 className="text-sm font-bold text-white tracking-tight">Vitally, Salesforce, Weflow</h3>
                <p className="text-[11px] text-emerald-400 font-semibold mt-1">Unified relational joins on accountId</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="absolute bottom-[102%] left-1/2 -translate-x-1/2 mb-2 w-64 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 border border-slate-800 text-[10px] text-slate-405 p-3 rounded-xl shadow-xl pointer-events-none z-50 leading-relaxed font-sans font-normal text-left">
                <span className="font-bold text-white block mb-1">🔌 Relational Aggregation</span>
                Performs relational data joins on accountId. Ingests usage records from Vitally, contracts and deal cycles from Salesforce, and weekly conversation transcripts from Weflow.
              </div>
            </div>

            <div className="group relative bg-slate-905 bg-slate-900/40 backdrop-blur-md border border-slate-850 p-5 rounded-2xl flex items-center justify-between hover:border-slate-800 transition-all cursor-help">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Delivery Channel</p>
                <h3 className="text-sm font-bold text-white tracking-tight">Slack Block Kit DM</h3>
                <p className="text-[11px] text-purple-400 font-semibold mt-1">Interactive action buttons writeback</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-purple-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="absolute bottom-[102%] left-1/2 -translate-x-1/2 mb-2 w-64 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 border border-slate-800 text-[10px] text-slate-405 p-3 rounded-xl shadow-xl pointer-events-none z-50 leading-relaxed font-sans font-normal text-left">
                <span className="font-bold text-white block mb-1">📬 Active Slack DM Delivery</span>
                Pushes Block Kit formatted briefs directly to CSM Slack DMs at 8:45 AM. Supported by interactive actions that post back to update CRM state.
              </div>
            </div>
          </div>

          <div className="flex bg-slate-900/60 p-1 rounded-2xl border border-slate-850 gap-1">
            <button
              onClick={() => setAssignmentTab("design")}
              className={`flex-1 py-3 px-3 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                assignmentTab === "design"
                  ? "bg-slate-800 text-white shadow-md border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
              }`}
            >
              <Code className="w-3.5 h-3.5 text-indigo-400" />
              1. Technical Design Doc
            </button>
            <button
              onClick={() => setAssignmentTab("onboarding")}
              className={`flex-1 py-3 px-3 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                assignmentTab === "onboarding"
                  ? "bg-slate-800 text-white shadow-md border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              2. Onboarding & Rollout
            </button>
            <button
              onClick={() => setAssignmentTab("past")}
              className={`flex-1 py-3 px-3 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                assignmentTab === "past"
                  ? "bg-slate-800 text-white shadow-md border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-purple-400" />
              3. Past GTM Work
            </button>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-850 rounded-3xl p-6 lg:p-8 hover:border-slate-800/80 transition-all shadow-xl">
            {assignmentTab === "design" && renderDesignDoc()}
            {assignmentTab === "onboarding" && renderOnboardingPlan()}
            {assignmentTab === "past" && renderPastWork()}
          </div>
        </main>

        {showDesignDocModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 lg:p-8">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-in">
              <div className="bg-gradient-to-r from-indigo-950 to-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-850">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <div>
                    <h4 className="font-extrabold text-sm uppercase tracking-wider">NOTION_DESIGN_DOC.md</h4>
                    <p className="text-[10px] text-slate-500 font-mono">Detailed Developer Technical Document</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(NOTION_DESIGN_DOC_MD);
                      showToast("Raw markdown copied to clipboard!");
                    }}
                    className="text-[10px] font-bold text-indigo-405 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 py-2 px-3.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                  >
                    <Copy className="w-3 h-3" /> Copy Raw Markdown
                  </button>
                  <button 
                    onClick={() => setShowDesignDocModal(false)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-4 max-h-[70vh] bg-slate-950/20 font-sans">
                {parseMarkdown(NOTION_DESIGN_DOC_MD)}
              </div>

              <div className="bg-slate-950/80 px-6 py-4 border-t border-slate-850 flex justify-end gap-3">
                <button 
                  onClick={() => setShowDesignDocModal(false)}
                  className="text-xs font-bold text-slate-350 bg-slate-850 hover:bg-slate-805 border border-slate-700 py-2.5 px-5 rounded-xl transition-all cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </div>
          </div>
        )}

        {showTrdModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 lg:p-8">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-in">
              <div className="bg-gradient-to-r from-purple-950 to-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-850">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <div>
                    <h4 className="font-extrabold text-sm uppercase tracking-wider">ZIGRAM_TRD.md</h4>
                    <p className="text-[10px] text-slate-500 font-mono">Fraud Fighter AI Compliance Engine</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(ZIGRAM_TRD_MD);
                      showToast("Raw TRD markdown copied to clipboard!");
                    }}
                    className="text-[10px] font-bold text-purple-405 hover:text-purple-300 bg-purple-500/10 border border-purple-500/20 py-2 px-3.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                  >
                    <Copy className="w-3 h-3" /> Copy Raw Markdown
                  </button>
                  <button 
                    onClick={() => setShowTrdModal(false)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-4 max-h-[70vh] bg-slate-950/20 font-sans">
                {parseMarkdown(ZIGRAM_TRD_MD)}
              </div>

              <div className="bg-slate-950/80 px-6 py-4 border-t border-slate-850 flex justify-end gap-3">
                <button 
                  onClick={() => setShowTrdModal(false)}
                  className="text-xs font-bold text-slate-350 bg-slate-850 hover:bg-slate-805 border border-slate-700 py-2.5 px-5 rounded-xl transition-all cursor-pointer"
                >
                  Close TRD
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div 
        className="min-h-screen w-full bg-gradient-to-br from-indigo-50/60 via-slate-50 to-purple-50/50 text-slate-800 flex flex-col font-sans relative overflow-y-auto overflow-x-hidden"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-200/40 blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-200/40 blur-3xl pointer-events-none z-0" />

        {toastMessage && (
          <div className="fixed top-6 right-6 bg-slate-900 text-white text-xs font-bold px-5 py-3.5 rounded-2xl shadow-xl z-[100] flex items-center gap-2 border border-slate-700 animate-slide-in">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}

        <header className="sticky top-0 border-b border-indigo-100/60 bg-white/80 backdrop-blur-md px-4 lg:px-8 py-3 flex flex-row justify-between items-center gap-3 shadow-sm z-20 flex-shrink-0 w-full">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20">
              <Activity className="text-white w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg lg:text-2xl font-extrabold text-slate-900 tracking-tight bg-gradient-to-r from-indigo-900 to-slate-900 bg-clip-text text-transparent">
                  HG Insights Workspace
                </h1>
                <span className="hidden sm:inline bg-indigo-100 border border-indigo-200 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  v2.1 Enterprise
                </span>
              </div>
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                <Zap className="w-3.5 h-3.5 fill-indigo-600 animate-bounce" /> Telemetry & CS Orchestrator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setAppViewMode("assignment")}
              className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-705 hover:bg-indigo-100 hover:border-indigo-300 text-xs font-bold px-4 py-2.5 rounded-2xl transition-all duration-200 cursor-pointer shadow-sm active:scale-95 flex-shrink-0"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" /> View Answers
            </button>

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
        </div>
      </header>

      <section className="px-4 lg:px-8 pt-3 pb-2 grid grid-cols-2 lg:grid-cols-4 gap-3 z-10 flex-shrink-0">
        <div className="group relative bg-white/90 backdrop-blur-md border border-indigo-100/50 p-3 rounded-2xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-indigo-500/5 hover:-translate-y-0.5 hover:border-indigo-200/80 transition-all duration-300 min-h-0 cursor-help">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Portfolio Size</p>
            <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">{totalAccounts} Clients</h3>
            <p className="text-[11px] font-semibold text-slate-600 mt-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-indigo-500" /> Active relationships
            </p>
          </div>
          <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 border border-indigo-100 group-hover:scale-105 transition-transform">
            <Layout className="w-5 h-5" />
          </div>
          <div className="absolute top-[102%] left-1/2 -translate-x-1/2 mt-1 w-56 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 p-2.5 rounded-xl shadow-lg pointer-events-none z-50 leading-relaxed font-sans font-normal text-left">
            <span className="font-bold text-white block mb-0.5">📂 Portfolio Size</span>
            Total number of customer accounts assigned to this CSM.
          </div>
        </div>

        <div className="group relative bg-white/90 backdrop-blur-md border border-emerald-100/50 p-3 rounded-2xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-emerald-500/5 hover:-translate-y-0.5 hover:border-emerald-200/80 transition-all duration-300 min-h-0 cursor-help">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Managed ARR</p>
            <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">{formatARR(totalArr)}</h3>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Direct contract value
            </p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 border border-emerald-100 group-hover:scale-105 transition-transform">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="absolute top-[102%] left-1/2 -translate-x-1/2 mt-1 w-56 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 p-2.5 rounded-xl shadow-lg pointer-events-none z-50 leading-relaxed font-sans font-normal text-left">
            <span className="font-bold text-white block mb-0.5">💰 Managed ARR</span>
            Cumulative Annual Recurring Revenue valuation of active portfolio contracts.
          </div>
        </div>

        <div className="group relative bg-white/90 backdrop-blur-md border border-blue-100/50 p-3 rounded-2xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-blue-500/5 hover:-translate-y-0.5 hover:border-blue-200/80 transition-all duration-300 min-h-0 cursor-help">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Health Score</p>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{avgHealth} / 10</h3>
            
            <div className="w-24 bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full ${avgHealth >= 7.5 ? 'bg-emerald-500' : avgHealth >= 6.0 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                style={{ width: `${avgHealth * 10}%` }}
              />
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600 border border-blue-100 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-blue-500" />
          </div>
          <div className="absolute top-[102%] left-1/2 -translate-x-1/2 mt-1 w-56 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 p-2.5 rounded-xl shadow-lg pointer-events-none z-50 leading-relaxed font-sans font-normal text-left">
            <span className="font-bold text-white block mb-0.5">❤️ Avg Health Score</span>
            Arithmetic mean of Vitally usage health scores across this portfolio.
          </div>
        </div>

        <div className="group relative bg-white/95 backdrop-blur-md border border-rose-100 p-3 rounded-2xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-rose-500/5 hover:-translate-y-0.5 hover:border-rose-200 transition-all duration-300 relative overflow-hidden min-h-0 cursor-help">
          {criticalCount > 0 && (
            <div className="bg-gradient-to-b from-rose-500 to-pink-600 w-1 absolute left-0 top-0 h-full animate-pulse" />
          )}
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Risk ARR Pool</p>
            <h3 className={`text-xl font-extrabold ${criticalCount > 0 ? 'text-rose-600' : 'text-emerald-600'} tracking-tight`}>
              {formatARR(arrAtRisk)}
            </h3>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              {criticalCount} critical risk accounts
            </p>
          </div>
          <div className={`p-3 rounded-xl border group-hover:scale-105 transition-transform ${criticalCount > 0 ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
            {criticalCount > 0 ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div className="absolute top-[102%] left-1/2 -translate-x-1/2 mt-1 w-56 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 p-2.5 rounded-xl shadow-lg pointer-events-none z-50 leading-relaxed font-sans font-normal text-left">
            <span className="font-bold text-white block mb-0.5">⚠️ Risk ARR Pool</span>
            Total contract ARR currently tied to accounts flagged as CRITICAL risk.
          </div>
        </div>
      </section>

      <main className="px-4 lg:px-8 pb-8 flex flex-col lg:flex-row gap-4 lg:gap-6 z-10 relative">
        
        <div className="w-full lg:w-1/3 lg:flex-shrink-0 flex flex-col lg:min-h-0">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col min-h-[420px] overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/60 flex-shrink-0">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-wide">Portfolio Directory</h3>
                <p className="text-xs text-slate-600 mt-0.5">Select a client below to hydrate details</p>
              </div>
              
              <button
                onClick={triggerAutomation}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-500/20 transition-all duration-200 cursor-pointer active:scale-95 flex-shrink-0"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                Sync Engine
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 space-y-3 bg-slate-50/20 min-h-0">
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

        <div className="w-full lg:w-1/3 lg:flex-shrink-0 flex flex-col gap-4">
          
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col p-5 gap-3 min-h-[380px] lg:h-[57%] lg:min-h-0 overflow-hidden">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3 flex-shrink-0">
              <div>
                <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Active Account Hub
                </span>
                <h3 className="font-extrabold text-slate-900 text-base tracking-tight mt-0.5">
                  {activeAccountData.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">NPS Rating</span>
                <span className="text-xs font-bold text-indigo-700 flex items-center justify-end gap-0.5">
                  <Award className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {activeAccountData.nps} / 10
                </span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 flex flex-col gap-2 flex-shrink-0">
              <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                <Building className="w-3.5 h-3.5" /> Salesforce Opportunities
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] leading-tight">
                <div>
                  <span className="text-slate-500 block">Renewal Stage</span>
                  <span className="font-bold text-slate-800">{activeAccountData.contractStage}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Renewal Opp</span>
                  <span className="font-mono font-bold text-slate-800">${activeAccountData.sfdcOppValue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Contract End</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {activeAccountData.renewal}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Primary Contact</span>
                  <span className="font-bold text-slate-800 block truncate">{activeAccountData.primaryContact}</span>
                  <span className="text-[9px] text-slate-500 leading-none block truncate">{activeAccountData.contactRole}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-violet-900 uppercase tracking-widest flex items-center gap-1.5 flex-shrink-0">
                <MessageSquare className="w-3.5 h-3.5" /> Conversation Intelligence (Weflow)
              </span>
              <p className="text-xs text-slate-700 leading-relaxed bg-violet-50/20 border border-violet-100/50 p-3 rounded-2xl overflow-y-auto flex-1">
                {activeAccountData.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 flex-shrink-0">
              <button 
                onClick={() => openEmailDraft(activeAccountData)}
                className="flex items-center justify-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold py-2 px-3 rounded-xl transition-all duration-200"
              >
                <Mail className="w-3.5 h-3.5" /> Draft Escalation
              </button>
              <button 
                onClick={() => showToast("CPQ Sync Request forwarded to Ops.")}
                className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl transition-all duration-200"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Sync CRM Data
              </button>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col min-h-[320px] lg:h-[43%] lg:min-h-0 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center flex-shrink-0">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-wide">Action Playbooks</h3>
                <p className="text-xs text-slate-600 mt-0.5">Tasks generated by Weflow transcripts</p>
              </div>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider">
                {completedActionsCount} / {totalActionsCount} Done
              </span>
            </div>

            <div className="px-5 pt-3 pb-1 flex-shrink-0">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
                <span>Playbook Completion</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/50">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-3 min-h-0 bg-slate-50/10">
              {allActions.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs font-semibold">
                  No action items identified for this portfolio.
                </div>
              ) : (
                allActions.map((action) => {
                  const isChecked = checkedActions.includes(action.id);
                  return (
                    <div 
                      key={action.id}
                      onClick={() => toggleAction(action.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none
                        ${isChecked 
                          ? 'bg-slate-50/80 border-slate-100 opacity-60' 
                          : action.isCritical 
                            ? 'bg-rose-50/40 border-rose-100 hover:border-rose-200 hover:bg-rose-50/80' 
                            : 'bg-white border-slate-200/60 hover:border-indigo-300 hover:bg-indigo-50/10'}`}
                    >
                      <button className="flex-shrink-0 mt-0.5 focus:outline-none">
                        {isChecked ? (
                          <div className="w-4 h-4 rounded bg-indigo-600 text-white flex items-center justify-center border border-indigo-600 transition-colors">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className={`w-4 h-4 rounded border ${action.isCritical ? 'border-rose-400 hover:border-rose-600' : 'border-slate-300 hover:border-indigo-500'} bg-white transition-colors`} />
                        )}
                      </button>
                      
                      <div className="flex-1 leading-tight">
                        <p className={`text-xs font-semibold ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {action.text}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
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

        <div className="w-full lg:w-1/3 lg:flex-shrink-0 flex flex-col lg:min-h-0">
          
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col min-h-[480px] lg:flex-1 lg:min-h-0 overflow-hidden">
            
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center flex-shrink-0">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-wide">Slack Gateway Simulator</h3>
                <p className="text-xs text-slate-600 mt-0.5">Visualize channel delivery vectors</p>
              </div>

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

            <div className="flex-1 min-h-0 p-4 bg-slate-50/30 flex flex-col">
              
              {viewMode === "ui" && (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md flex flex-col h-full min-h-0 overflow-hidden">
                  
                  <div className="bg-[#3F0E40] px-4 py-2.5 flex items-center justify-between border-b border-[#522653] flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#EC6A5E]" />
                        <div className="w-2 h-2 rounded-full bg-[#F4BF4F]" />
                        <div className="w-2 h-2 rounded-full bg-[#61C554]" />
                      </div>
                      <span className="text-white font-extrabold text-xs ml-2 tracking-wide flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-purple-200" /> #csm-intelligence-briefings
                      </span>
                    </div>
                    <span className="bg-[#562257] text-[#D8B4D9] text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Slack Simulator
                    </span>
                  </div>

                  <div className="p-4 flex-1 overflow-y-auto bg-white flex flex-col justify-between min-h-0">
                    {!Array.isArray(slackPayload) ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3 py-10">
                        <div className="bg-indigo-50 p-3 rounded-full border border-indigo-100 shadow-md">
                          <AlertTriangle className="w-7 h-7 text-indigo-600 animate-bounce" />
                        </div>
                        <div className="text-center">
                          <p className="text-slate-800 text-sm font-extrabold">Awaiting Automation Trigger</p>
                          <p className="text-slate-500 text-xs mt-0.5">Click &quot;Sync Engine&quot; to push telemetry to Slack.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 h-full min-h-0">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-black text-xs shadow-md border border-indigo-200">
                          HG
                        </div>
                        
                        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                          <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="font-extrabold text-slate-900 text-xs hover:underline cursor-pointer">HG Success Bot</span>
                              <span className="bg-indigo-100 border border-indigo-200 text-indigo-700 text-[8px] px-1.5 py-0.2 rounded font-extrabold tracking-widest uppercase">APP</span>
                              <span className="text-[10px] text-slate-500 font-medium">Just now</span>
                            </div>
                            
                            <div className="space-y-3 mt-2">
                              {slackPayload.map((block, index) => {
                                if (!block) return null;
                                
                                if (block.type === "header") {
                                  return (
                                    <h4 key={index} className="text-xs font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-1.5">
                                      {block.text?.text || ""}
                                    </h4>
                                  );
                                }
                                
                                if (block.type === "divider") {
                                  return <hr key={index} className="border-slate-100 my-1.5" />;
                                }
                                
                                if (block.type === "section") {
                                  const rawText = block.text?.text || "";
                                  const isCritical = rawText.includes("🔴");
                                  const isElevated = rawText.includes("🟡");
                                  const isStable = rawText.includes("🟢");
                                  
                                  const formattedText = rawText
                                    .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
                                    .replace(/\n/g, "<br />");
                                  
                                  let alertBorderColor = "border-slate-200 bg-slate-50/50";
                                  if (isCritical) {
                                    alertBorderColor = "border-l-4 border-l-rose-500 border-rose-100 bg-rose-50/30 p-2.5 rounded-r-xl shadow-sm";
                                  } else if (isElevated) {
                                    alertBorderColor = "border-l-4 border-l-amber-500 border-amber-100 bg-amber-50/30 p-2.5 rounded-r-xl shadow-sm";
                                  } else if (isStable) {
                                    alertBorderColor = "border-l-4 border-l-emerald-500 border-emerald-100 bg-emerald-50/30 p-2.5 rounded-r-xl shadow-sm";
                                  }
                                  
                                  return (
                                    <div key={index} className={`text-[11px] leading-relaxed text-slate-800 ${alertBorderColor}`}>
                                      <div dangerouslySetInnerHTML={{ __html: formattedText }} />
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>

                          <div className="flex gap-2 mt-2 pt-2 border-t border-slate-100 flex-shrink-0">
                            <button 
                              onClick={() => handleSlackActionButtonClick("Alert AE")}
                              className="text-[9px] font-extrabold px-2.5 py-1.5 border border-slate-300 hover:border-slate-400 text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                            >
                              🔔 Notify AE
                            </button>
                            <button 
                              onClick={() => handleSlackActionButtonClick("Approve Ops Draft")}
                              className="text-[9px] font-extrabold px-2.5 py-1.5 border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all cursor-pointer"
                            >
                              ✅ Acknowledge Alert
                            </button>
                            {slackReaction && (
                              <span className="inline-flex items-center justify-center bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
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

              {viewMode === "json" && (
                <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex flex-col h-full min-h-0">
                  <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
                    <span className="text-[10px] font-mono text-slate-400">slack_block_kit.json</span>
                    {slackPayload && (
                      <button 
                        onClick={copyToClipboard}
                        className="text-[10px] font-bold text-indigo-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy JSON"}
                      </button>
                    )}
                  </div>
                  <div className="p-4 overflow-auto flex-1 min-h-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <pre className="text-emerald-400 text-[10.5px] leading-relaxed">
                      {slackPayload ? JSON.stringify(slackPayload, null, 2) : "// Awaiting automated data hydration. Execute sync."}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex flex-col h-[160px] lg:h-[190px] flex-shrink-0 overflow-hidden">
              <div className="flex justify-between items-center mb-1.5 flex-shrink-0">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-600" /> LangGraph Orchestrator Trace
                </label>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-indigo-500 animate-ping' : 'bg-slate-300'}`} />
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">
                    {loading ? 'Pipeline Running' : 'Idle Gateway'}
                  </span>
                </div>
              </div>
              
              <div 
                className="bg-slate-950 rounded-2xl p-3 flex-1 overflow-y-auto border border-slate-800 shadow-inner min-h-0"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {logs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 text-[9px] gap-0.5">
                    <Code className="w-3.5 h-3.5 opacity-50" />
                    <span>Run the Sync Engine to track trace nodes</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {logs.map((log, i) => {
                      let colorClass = "text-slate-300";
                      if (log.includes("❌")) colorClass = "text-rose-400 font-bold";
                      else if (log.includes("✅")) colorClass = "text-emerald-400 font-semibold";
                      else if (log.includes("🧠")) colorClass = "text-indigo-400";
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

      <footer className="border-t border-slate-200 bg-white px-4 lg:px-8 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500 z-10 flex-shrink-0">
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> System compliant with Vitally and Salesforce schemas.
        </p>
        <p className="font-semibold text-slate-600">
          Powered by LangGraph Agentic Framework
        </p>
      </footer>

      {emailDrawerAccount && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-in">
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

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
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
    )
  );
}

const parseMarkdown = (text: string) => {
  const lines = text.split("\n");
  let inCodeBlock = false;
  let codeContent: string[] = [];
  
  const formatInline = (str: string) => {
    let formatted = str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-slate-900 px-1 py-0.5 rounded border border-slate-800 text-indigo-300 font-mono text-[10.5px]">$1</code>');
    return { __html: formatted };
  };
  
  return lines.map((line, idx) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const rawCode = codeContent.join("\n");
        codeContent = [];
        return (
          <pre key={idx} className="bg-slate-950/90 border border-slate-800 p-4 rounded-xl text-[10px] font-mono text-emerald-450 overflow-x-auto leading-relaxed my-3">
            {rawCode}
          </pre>
        );
      } else {
        inCodeBlock = true;
        return null;
      }
    }
    
    if (inCodeBlock) {
      codeContent.push(line);
      return null;
    }
    
    if (line.startsWith("# ")) {
      return <h1 key={idx} className="text-xl lg:text-2xl font-black text-white mt-6 mb-3 border-b border-slate-800 pb-2" dangerouslySetInnerHTML={formatInline(line.replace("# ", ""))} />;
    }
    if (line.startsWith("## ")) {
      return <h2 key={idx} className="text-base lg:text-lg font-black text-indigo-400 mt-5 mb-2.5 flex items-center gap-2" dangerouslySetInnerHTML={formatInline(line.replace("## ", ""))} />;
    }
    if (line.startsWith("### ")) {
      return <h3 key={idx} className="text-sm font-extrabold text-white mt-4 mb-2" dangerouslySetInnerHTML={formatInline(line.replace("### ", ""))} />;
    }
    if (line.startsWith("#### ")) {
      return <h4 key={idx} className="text-xs font-bold text-slate-300 mt-3 mb-1.5" dangerouslySetInnerHTML={formatInline(line.replace("#### ", ""))} />;
    }
    if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
      const content = line.trim().substring(2);
      return <li key={idx} className="ml-5 list-disc text-xs text-slate-400 my-1 leading-relaxed" dangerouslySetInnerHTML={formatInline(content)} />;
    }
    if (line === "---" || line === "***") {
      return <hr key={idx} className="border-slate-800 my-4" />;
    }
    if (line.trim() === "") {
      return <div key={idx} className="h-2" />;
    }
    
    // Check if it's a table row
    if (line.startsWith("|")) {
      // If it is a header divider row e.g. |---|
      if (line.includes("-")) return null;
      
      const cells = line.split("|").map(c => c.trim()).filter(c => c !== "");
      if (cells.length === 0) return null;
      return (
        <div key={idx} className="grid grid-cols-3 gap-2 py-2 px-3 hover:bg-slate-900/20 text-[11px] border-b border-slate-850 text-slate-400">
          {cells.map((cell, cIdx) => (
            <span key={cIdx} className={cIdx === 0 ? "font-bold text-white" : ""} dangerouslySetInnerHTML={formatInline(cell)} />
          ))}
        </div>
      );
    }
    
    return <p key={idx} className="text-xs text-slate-400 leading-relaxed my-1.5" dangerouslySetInnerHTML={formatInline(line)} />;
  });
};

const ZIGRAM_TRD_MD = `# 🛡️ Technical Requirements Document: ZIGRAM Fraud Fighter AI Engine

This document outlines the system architecture, performance boundaries, and risk decision nodes for the ZIGRAM Automated Compliance Scoring Engine deployed to production.

---

## 1. Executive Summary
The Fraud Fighter AI Engine evaluates massive streams of incoming transaction data against historical KYC profiles and designated global watchlists. It utilizes an event-driven architecture with **Kafka**, processed asynchronously via a **LangGraph state machine**, and evaluates rules using a fine-tuned GPT logic module. The output is pushed via REST gateway directly into the existing analyst workforce queue.

## 2. Infrastructure & System Topography

### Event Ingestion Layer
* **Broker:** Apache Kafka (Confluent Cloud)
* **Topic:** \`tx_events_raw_v1\`
* **Throughput:** Configured to handle a sustained 500 TPS (Transactions Per Second).
* **Payload Structure:** A serialized JSON object containing user metadata, IP origin, transaction velocity window, and cross-border bank bin codes.

### Synthesis & Risk Node (LangGraph)
* **Execution Environment:** Python worker nodes deployed via Kubernetes (EKS).
* **Graph Structure:** 
  1. \`node_ingest_parse\`: Sanitizes and extracts PII hash tokens.
  2. \`node_watchlist_check\`: Cross-references tokens against high-risk internal Redis cache.
  3. \`node_llm_evaluator\`: Queries \`gpt-4o-mini\` with context if complex multi-vector fraud is detected (e.g. impossible travel velocity).
* **Latency Guarantee:** Maximum permitted inference latency is strictly bound to < 1200ms per event.

### Output Gateway
* **Interface:** REST POST webhook targeting the \`/api/v3/analyst/queue/append\` endpoint.
* **Auth:** Mutual TLS (mTLS) combined with rotating JWT bearer tokens.

---

## 3. The Pydantic Data Schema
The output schema passed to the Workforce Queue is strictly typed to ensure downstream UI compatibility:

\`\`\`python
class FraudRiskAssessment(BaseModel):
    transaction_id: str
    user_hash: str
    risk_status: Literal["PASS", "MANUAL_REVIEW", "AUTO_REJECT"]
    confidence_score: float = Field(ge=0.0, le=1.0)
    risk_vectors_identified: List[str]
    analyst_context_summary: str
\`\`\`

## 4. User-Centric Design Logic
To reduce *context switching*, the analysts do NOT log into a separate "Fraud Engine Dashboard." Instead, the \`analyst_context_summary\` and \`risk_vectors_identified\` fields map directly into the existing CRM ticket. The result: analysts see all the relevant, processed KYC data directly inside the same review interface they have used for years, increasing workflow speed by 85%.

---

## 5. Security & Fallback Scenarios

### 5.1 LLM Provider Outage
If the OpenAI API endpoint times out or returns HTTP 500/503:
* **Circuit Breaker:** The LangGraph state machine triggers the \`edge_fallback_rule\` router.
* **Deterministic Ruleset:** Events are scored against static rules (e.g., if IP is from a sanctioned country = AUTO_REJECT). This ensures the 500 TPS stream is not blocked.

### 5.2 PII Protection Boundaries
The LLM is completely blind to PII. Names, exact account numbers, and addresses are hashed before leaving the boundary. The model evaluates *behavioral metadata* (e.g., "Account created 12 minutes ago attempted 4 high-value transfers") rather than personal identities.
`;

const NOTION_DESIGN_DOC_MD = `# 📐 Technical Design Document: Enterprise CSM Portfolio Automation Engine

This document details the end-to-end architecture, API integrations, data schemas, LLM synthesis rules, and delivery channels for the automated **Monday 8:45 AM Portfolio Intelligence Briefing**. It is written to be directly actionable for an engineering team to implement.

---

## 🗺️ System Topology & Flow

The automation engine executes a three-phase pipeline: **Ingestion & Relational Joins**, **Reasoning & Synthesis**, and **Interactive Slack Delivery**.

\`\`\`mermaid
graph TD
    A[Scheduler: AWS EventBridge] -->|Trigger: Mon 7:00 AM| B[FastAPI Orchestrator Gateway]
    C[Manual Webhook: Next.js UI Control Panel] -->|Trigger: Ad-hoc POST| B
    
    subgraph Phase 1: Multi-Source Ingestion & Relational Join
        B -->|REST GET /accounts| D[Vitally API Client]
        B -->|SOQL Query Opportunity/Contract| E[Salesforce REST Client]
        B -->|REST GET /transcripts| F[Weflow API Client]
        D -->|healthScore, npsScore| G[InMemory Relational Joiner]
        E -->|renewal dates, stages, ARR| G
        F -->|transcript text, logs| G
    end

    subgraph Phase 2: LangGraph Orchestration & LLM Synthesis
        G -->|Joined JSON Array| H[LangGraph State Workflow]
        H -->|Node 1: DataAggregator| I[Sanitized State Object]
        I -->|Node 2: ChatOpenAI GPT-4o-mini| J[Structured Extraction Engine]
        J -->|JSON Schema Constraints| K[Pydantic Validation Node]
    end

    subgraph Phase 3: Delivery & Interactive Feedback Loops
        K -->|Validated JSON Collection| L[Node 3: SlackFormatter]
        L -->|Slack Block Kit Payload| M[Slack Webhook Client]
        M -->|Private Direct Message| N[CSM Slack Channel @ 8:45 AM]
        N -->|Interactive Button Clicks| O[Slack Actions Endpoint /api/slack/actions]
        O -->|Writebacks| E
    end
\`\`\`

---

## 🕰️ 1. Trigger Mechanics & Orchestration

To guarantee delivery prior to the Monday 9:00 AM team standup, the orchestrator implements a dual-trigger mechanism:

### Chronological Trigger (Production)
* **Technology:** AWS EventBridge Scheduler (or a Serverless Cron Trigger).
* **Execution Time:** **Every Monday at 7:00 AM UTC/Local.**
* **The 2-Hour Failsafe Buffer Rationale:** 
  1. **API Rate Limiting:** Ingesting data for 100+ accounts across Salesforce, Vitally, and Weflow can trigger rate-limiting controls. The 2-hour window allows for automatic exponential backoff retries.
  2. **Cold Starts & Sleep Cycles:** Ensures serverless compute layers wake up and authenticate cleanly.
  3. **Fallback Synthesis:** If the primary LLM provider (OpenAI) experiences downtime or transient API timeouts, the scheduler has enough time to execute up to 3 retries or fallback to a deterministic rules-based scoring engine.

### On-Demand Trigger (Operational)
* **Technology:** HTTP POST webhook endpoint exposed via \`/api/trigger-digest\`.
* **Execution Context:** Exposed directly in the Next.js control panel to allow CSMs to run manual mid-week refreshes immediately prior to client reviews, executive escalations, or custom account syncs.

---

## 🔌 2. Data Source Ingestion & Relational Join Schema

The engine executes asynchronous HTTP calls to query and merge account metrics. The unified primary key for join resolution is the \`accountId\`.

\`\`\`
           [Vitally REST API]             [Salesforce CPQ SOQL]
             (accountId)                       (accountId)
                  \\                                 /
                   \\                               /
                [Unified Join Node] === (accountId) === [Weflow Logs]
\`\`\`

### 1. Vitally (Product Health Database)
* **Ingestion Method:** REST API Client \`GET /v1/accounts?csmId={csm_id}\`.
* **Fields Extracted:**
  * \`accountId\` *(string)*: Primary Key (e.g. \`ACC_001\` - used for relational joins).
  * \`companyName\` *(string)*: Human-readable client identity.
  * \`healthScore\` *(float)*: Range \`0.0\` - \`10.0\`. Represents real-time product usage trends.
  * \`npsScore\` *(integer)*: Range \`-100\` to \`100\`. Represents qualitative user feedback.

### 2. Salesforce CPQ (Commercial Opportunity & Timeline)
* **Ingestion Method:** Salesforce REST API executing SOQL against CPQ objects:
  \`\`\`sql
  SELECT ContractEndDate, RenewalOpportunityStage, arrValue, ContractId 
  FROM Account_Contract_Join 
  WHERE AccountId = :accountId
  \`\`\`
* **Fields Extracted:**
  * \`contractEndDate\` *(date, YYYY-MM-DD)*: Contract expiration date.
  * \`renewalOpportunityStage\` *(string)*: Renewal status (e.g., \`Discovery\`, \`Negotiation\`, \`Closed Won\`, \`Reviewing Competitor\`).
  * \`arrValue\` *(decimal)*: Contract valuation ARR.

### 3. Weflow (Conversational Intelligence & Logs)
* **Ingestion Method:** REST API call to fetch recorded customer interactions logged within the prior 7 days.
* **Fields Extracted:**
  * \`transcriptSummary\` *(string)*: Conversational summary highlighting product issues, customer complaints, or renewals.
  * \`escalationFlag\` *(boolean)*: True if customer explicitly requested support escalation or contract review.
  * \`lastInteractionDate\` *(date, YYYY-MM-DD)*.

---

## 🧠 3. The LLM Synthesis Engine (LangGraph)

### LLM Input Context
The LLM receives a structured JSON payload combining the unified telemetry metrics. Example input payload:
\`\`\`json
{
  "csmId": "CSM_MARK_R",
  "accounts": [
    {
      "accountId": "ACC_001",
      "companyName": "Acme Corp",
      "vitally": { "healthScore": 3.8, "npsScore": 4 },
      "salesforce": { "renewalOpportunityStage": "Reviewing Competitor", "contractEndDate": "2026-06-25", "arrValue": 185000 },
      "weflow": { "transcriptSummary": "Exec sync. Champion left. New leadership reviewing spending. Severe platform churn risk.", "escalationFlag": true }
    }
  ]
}
\`\`\`

### The Reasoning Workflow (Prompt Strategy)
The orchestrator triggers a ChatOpenAI agent running \`gpt-4o-mini\` with a structured reasoning system prompt. It is trained to perform **Compound Risk Analysis**: a low Vitally health score is a hazard, but a low health score *combined* with a renewal date within 30 days and a champion departure log in Weflow represents a **CRITICAL** risk.

#### System Prompt Template
\`\`\`
You are an elite Revenue Operations and Customer Success AI Analyst. 
Your objective is to analyze a unified JSON payload representing a CSM's account book and generate a clear, highly-actionable intelligence briefing.

CRITICAL EVALUATION MATRIX:
1. stable: Health score > 7.0, no renewal within 90 days, transcripts positive.
2. elevated: Health score < 6.0 OR renewal within 60 days OR mild transcript risks.
3. critical: Health score < 5.0 AND renewal within 45 days OR active competitor discussions OR explicit escalation requests.

Generate an executiveSummary capturing the 'why' behind the risk status and extract concrete actionItems.
\`\`\`

### Output Validation (Pydantic Model)
The output from the LLM is programmatically enforced using Pydantic validation:

\`\`\`python
from pydantic import BaseModel, Field
from typing import List, Literal

class AccountDigest(BaseModel):
    accountId: str
    companyName: str
    riskLevel: Literal["CRITICAL", "ELEVATED", "STABLE"] = Field(
        description="The compound risk categorization based on health score, renew date, and transcripts."
    )
    commercialUrgency: str = Field(
        description="Summary of renewal date and contract stage."
    )
    executiveSummary: str = Field(
        description="Brief professional summary (max 3 sentences) explaining the classification."
    )
    actionItems: List[str] = Field(
        description="Up to 3 clear, actionable playbooks to mitigate risk or drive engagement."
    )

class PortfolioDigestCollection(BaseModel):
    csmId: str
    digests: List[AccountDigest]
\`\`\`

---

## 📬 4. Delivery Channel: Interactive Slack DMs

### The Operational Rationale (Why Slack?)
* **Anti-Context Switching:** CSMs inhabit Slack as their primary operational headquarters. Forcing them to open another tool (like email, Google Drive, or a separate SaaS portal) introduces cognitive friction and slows down Standup preparation.
* **Timing & Focus:** Pushing the message at **8:45 AM Monday** (exactly 15 minutes before the standup) ensures it is top-of-mind. It takes less than 2 minutes to review their 3 critical risks.
* **Tactile Interactivity:** Slack Block Kit enables interactive button layouts. A CSM can click "Notify AE" or "Settle Risk" directly within their Slack thread, executing API calls back to Salesforce without navigating away from the chat window.

### Slack Block Kit Payload Example
The generated JSON is transformed into a Block Kit payload sent to the Slack Webhook API:

\`\`\`json
{
  "channel": "U12345678",
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "🚨 Monday Portfolio Intelligence Briefing",
        "emoji": true
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Acme Corp* is flagged as *CRITICAL CHURN RISK*.\\n*Health:* 3.8/10 | *ARR:* $185,000 | *Renewal:* 2026-06-25"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Executive Summary:* Champion departure identified. New leadership is actively reviewing alternative platforms. Churn risk is high."
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "💬 Ping Account Executive"
          },
          "style": "primary",
          "value": "action_ping_ae_ACC_001",
          "action_id": "ping_ae"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "📁 Create Escalation Task"
          },
          "value": "action_create_escalation_ACC_001",
          "action_id": "create_escalation"
        }
      ]
    }
  ]
}
\`\`\`

---

## 🛡️ Edge Cases & System Resiliency

1. **LLM Provider Outages (HTTP 500 / Timeout):**
   * **Mitigation:** The LangGraph state machine catches API exceptions. If the OpenAI API fails, the workflow redirects to a deterministic rule-based analysis node that classifies risk levels purely via threshold comparisons (e.g. \`healthScore < 5.0\` => \`CRITICAL\`) and populates templates for the summary.
2. **Schema Validation Exceptions:**
   * **Mitigation:** If the LLM returns an invalid JSON model that fails the Pydantic validator, the system executes an automated retry with a correction prompt. If the second attempt fails, it outputs the fallback deterministic payload to ensure the CSM receives their briefing.
3. **API Rate Limiting (Salesforce/Vitally):**
   * **Mitigation:** API clients are built using standard HTTP clients wrapped with a \`tenacity\` retry loop utilizing exponential backoff (\`wait_exponential(multiplier=1, min=4, max=10)\`).
`;
