"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  Monitor, 
  Code2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw,
  Copy,
  Terminal,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const HandoffDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "1. PR Review & Merge",
      description: "Gary reviews Victor's PR on GitHub (finchipSite-dev). After passing CI, the code is merged into the 'prod-mirror' branch.",
      details: ["GitHub: finchipSite-dev", "Branch: prod-mirror", "Action: Review & Merge"],
      activeNodes: ["collab-repo"]
    },
    {
      title: "2. Sync to Gary's Local Dev",
      description: "Gary pulls the latest mirrored production code to his local 'Finchip-dev' folder to stay in sync with the team.",
      details: ["Command: git pull origin prod-mirror", "Target: Finchip-dev folder"],
      activeNodes: ["collab-repo", "gary-dev"]
    },
    {
      title: "3. Manual Sync (Internal Bridge)",
      description: "Gary manually merges/copies files from 'Finchip-dev' to 'Finchip-site'. CRITICAL: Bypassing .git folders to maintain dual-repo isolation.",
      details: ["Action: Manual File Copy", "Rule: Exclude .git folder", "Target: Finchip-site"],
      activeNodes: ["gary-dev", "gary-site"]
    },
    {
      title: "4. Production Release",
      description: "After local verification in 'Finchip-site', Gary pushes to his private production repository for Vercel deployment.",
      details: ["Gary's special push method", "Vercel: Prod Live", "Domain: finchip.ai"],
      activeNodes: ["gary-site", "prod-repo"]
    },
    {
      title: "5. Updating the Mirror Base",
      description: "Gary ensures his dev environment is updated by copying back from 'Finchip-site' and pushing to the collab repo.",
      details: ["Action: Site -> Dev Sync", "Command: git push origin prod-mirror"],
      activeNodes: ["gary-site", "gary-dev", "collab-repo"]
    },
    {
      title: "6. Victor Pulls Update",
      description: "Victor pulls the latest production-aligned mirror to his local machine to start a new feature cycle.",
      details: ["Command: git pull origin prod-mirror", "Source: Collab Repo"],
      activeNodes: ["collab-repo", "victor-pc"]
    },
    {
      title: "7. Victor Dev & Push",
      description: "Victor develops features on a new branch, then pushes and submits a new PR to 'prod-mirror'.",
      details: ["Command: git push origin feat-branch", "Action: Submit PR"],
      activeNodes: ["victor-pc", "collab-repo"]
    }
  ];

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 pb-24 p-4">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 tracking-tighter">
          FINCHIP HANDOFF
        </h1>
      </div>

      {/* Main Visualization Area (Spatial 2D) */}
      <div className="relative w-full aspect-[21/9] lg:aspect-[16/7] bg-[#0c0c0c] rounded-[2.5rem] border border-white/5 p-8 overflow-hidden backdrop-blur-xl bg-grid shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        
        {/* Gary's Private Prod Repo (Top Left) */}
        <div className="absolute left-[5%] top-[20%] -translate-y-1/2 z-20">
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-6 rounded-[2rem] border-2 transition-all duration-700 ${[3, 4].includes(currentStep) ? 'border-red-500 bg-red-500/20 glow-red scale-110' : 'border-white/5 bg-white/5 opacity-40'}`}>
              <GitBranch className={[3, 4].includes(currentStep) ? 'text-red-400' : 'text-gray-600'} size={56} />
            </div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Private Prod Repo</span>
            <div className={`px-5 py-2 rounded-full text-xs font-black border-2 transition-all ${currentStep === 4 ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-gray-500/5 border-white/5 text-gray-700'}`}>
              {currentStep === 4 ? 'PROD LIVE' : 'VERCEL PROD'}
            </div>
          </div>
        </div>

        {/* Collab GitHub (Top Middle-Right) */}
        <div className="absolute left-[55%] top-[20%] -translate-y-1/2 z-20">
          <div className="flex flex-col items-center space-y-5">
            <div className={`p-7 rounded-[2.5rem] border-2 transition-all duration-700 ${[0, 1, 4, 5, 6].includes(currentStep) ? 'border-blue-500 bg-blue-500/20 glow-blue scale-110' : 'border-white/5 bg-white/5 opacity-40'}`}>
              <GitBranch className={[0, 1, 4, 5, 6].includes(currentStep) ? 'text-blue-400' : 'text-gray-600'} size={56} />
            </div>
            <div className="text-center">
              <span className="text-sm font-bold text-gray-400 tracking-[0.2em]">finchipSite-dev</span>
              <div className="flex gap-3 mt-3">
                <div className={`px-3 py-1 rounded-lg text-[10px] font-black border-2 transition-all ${[0, 1, 4, 5, 6].includes(currentStep) ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/5 text-gray-700'}`}>STAGING</div>
                <div className={`px-3 py-1 rounded-lg text-[10px] font-black border-2 transition-all ${[0, 1, 4, 5, 6].includes(currentStep) ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/5 text-gray-700'}`}>DEV</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gary's Machine (Bottom Left) */}
        <div className="absolute left-[15%] bottom-[5%] z-30 w-[35%]">
          <div className="flex flex-col items-center p-8 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl relative group">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white/15 border border-white/20 px-6 py-1.5 rounded-full flex items-center gap-2">
              <Monitor size={14} className="text-blue-400" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Gary's PC</span>
            </div>
            
            <div className="flex justify-between w-full gap-8 mt-4">
              {/* Finchip Site Folder */}
              <div className={`flex-1 p-5 rounded-2xl border-2 flex flex-col items-center space-y-3 transition-all duration-700 ${[2, 3, 4].includes(currentStep) ? 'border-red-500/40 bg-red-500/10' : 'border-white/5 bg-white/5'}`}>
                <Code2 className={[2, 3, 4].includes(currentStep) ? 'text-red-400' : 'text-gray-700'} size={32} />
                <div className="text-center">
                  <div className="text-xs font-bold text-white">Finchip-site</div>
                </div>
              </div>

              {/* Sync Bridge Animation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <AnimatePresence>
                   {(currentStep === 2 || currentStep === 4) && (
                     <motion.div 
                      initial={{ scale: 0.5, opacity: 0, x: currentStep === 2 ? 50 : -50 }}
                      animate={{ scale: 1, opacity: 1, x: 0 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      className="flex flex-col items-center z-50"
                     >
                       <div className="bg-yellow-500 p-3 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                          <Copy className="text-black" size={20} />
                       </div>
                       <span className="text-[10px] text-yellow-500 mt-2 font-black uppercase tracking-tighter">
                         {currentStep === 2 ? 'Dev -> Site' : 'Site -> Dev'}
                       </span>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              {/* Finchip Dev Folder */}
              <div className={`flex-1 p-5 rounded-2xl border-2 flex flex-col items-center space-y-3 transition-all duration-700 ${[1, 2, 4, 5].includes(currentStep) ? 'border-blue-500/40 bg-blue-500/10' : 'border-white/5 bg-white/5'}`}>
                <Code2 className={[1, 2, 4, 5].includes(currentStep) ? 'text-blue-400' : 'text-gray-700'} size={32} />
                <div className="text-center">
                  <div className="text-xs font-bold text-white">Finchip-dev</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Victor's Machine (Bottom Right) */}
        <div className="absolute right-[10%] bottom-[10%] z-20">
          <div className="flex flex-col items-center space-y-4 group">
            <div className={`p-6 rounded-[2rem] border-2 transition-all duration-700 ${[5, 6].includes(currentStep) ? 'border-purple-500 bg-purple-500/20 glow-purple' : 'border-white/5 bg-white/5 opacity-40'}`}>
              <Monitor className={[5, 6].includes(currentStep) ? 'text-purple-400' : 'text-gray-700'} size={56} />
            </div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Victor's PC</span>
          </div>
        </div>

        {/* Straight Logic Arrows (SVGs) - Percentage Coordinate System (0-100) */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker id="arrowhead-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#a855f7" />
            </marker>
            <marker id="arrowhead-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6" />
            </marker>
            <marker id="arrowhead-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
            </marker>
          </defs>

          {/* 6. Victor Pulls Update (Collab -> Victor) */}
          <motion.line 
            x1="70" y1="35" x2="80" y2="60"
            stroke="#a855f7"
            strokeWidth="0.8"
            markerEnd="url(#arrowhead-purple)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: currentStep === 5 ? 1 : 0,
              opacity: currentStep === 5 ? 1 : 0
            }}
            transition={{ 
              pathLength: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.3 }
            }}
          />

          {/* 7. Victor Push Feature (Victor -> Collab) */}
          <motion.line 
            x1="80" y1="60" x2="70" y2="35"
            stroke="#a855f7"
            strokeWidth="0.8"
            markerEnd="url(#arrowhead-purple)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: currentStep === 6 ? 1 : 0,
              opacity: currentStep === 6 ? 1 : 0
            }}
            transition={{ 
              pathLength: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.3 }
            }}
          />

          {/* 2. Gary Pulls to Dev (Collab -> Gary Dev) */}
          <motion.line 
            x1="55" y1="15" x2="43" y2="57"
            stroke="#3b82f6"
            strokeWidth="0.8"
            markerEnd="url(#arrowhead-blue)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: currentStep === 1 ? 1 : 0,
              opacity: currentStep === 1 ? 1 : 0
            }}
            transition={{ 
              pathLength: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.3 }
            }}
          />

          {/* 5. Gary Pushes Mirror (Gary Dev -> Collab) */}
          <motion.line 
            x1="43" y1="57" x2="55" y2="15"
            stroke="#3b82f6"
            strokeWidth="0.8"
            markerEnd="url(#arrowhead-blue)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: currentStep === 4 ? 1 : 0,
              opacity: currentStep === 4 ? 1 : 0
            }}
            transition={{ 
              pathLength: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.3 }
            }}
          />

          {/* 4. Gary Pushes to Prod (Gary Site -> Private Prod) */}
          <motion.line 
            x1="24" y1="60" x2="20" y2="35"
            stroke="#ef4444"
            strokeWidth="0.8"
            markerEnd="url(#arrowhead-red)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: currentStep === 3 ? 1 : 0,
              opacity: currentStep === 3 ? 1 : 0
            }}
            transition={{ 
              pathLength: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.3 }
            }}
          />
        </svg>
      </div>

      {/* Control Panel & Step Description */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
          <div className="flex items-center gap-4">
             <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
               {currentStep + 1}
             </div>
             <h2 className="text-3xl font-bold">{steps[currentStep].title}</h2>
          </div>
          
          <p className="text-xl text-gray-400 leading-relaxed min-h-[4rem]">
            {steps[currentStep].description}
          </p>

          <div className="flex flex-wrap gap-3">
            {steps[currentStep].details.map((detail, idx) => (
              <div key={idx} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-blue-300">
                {detail}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
          <div className="space-y-2">
            <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Protocol Engine</div>
            <div className="text-2xl font-bold text-white">Step Control</div>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={prevStep}
              className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-bold flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <button 
              onClick={nextStep}
              className="flex-[2] py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all font-bold text-white flex items-center justify-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Complete Cycle' : 'Next Step'} <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setCurrentStep(0)}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <RotateCcw size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandoffDemo;
