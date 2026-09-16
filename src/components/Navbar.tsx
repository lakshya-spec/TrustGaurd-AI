import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Activity, Search, BarChart3, History, HelpCircle, Info, Menu, X, Presentation } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenPresentation?: () => void;
  hasResult?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenPresentation,
  hasResult = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHealthy, setIsHealthy] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setIsHealthy(data.status === 'healthy'))
      .catch(() => setIsHealthy(true));
  }, []);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Shield },
    { id: 'investigate', label: 'Investigate', icon: Search },
    { id: 'intel', label: 'Threat Intel', icon: BarChart3 },
    { id: 'history', label: 'History', icon: History },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'about', label: 'About & Pitch', icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl">
      <div className="tg-container">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => onSelectTab('landing')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:border-cyan-400 transition-all duration-300">
              <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base lg:text-lg tracking-tight text-white">TrustGuard</span>
                <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  AI
                </span>
              </div>
              <p className="text-[10px] lg:text-xs text-slate-400 hidden sm:block">Digital Fraud Investigator</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5 xl:gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/80 font-semibold'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Section */}
          <div className="hidden sm:flex items-center gap-2.5 lg:gap-3.5">
            {/* Live System Status Dot */}
            <div className="flex items-center gap-2 px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] lg:text-xs font-mono text-slate-400">
              <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="hidden xl:inline">{isHealthy ? 'Engine Active' : 'Offline Mode'}</span>
            </div>

            {/* Presentation Mode Button */}
            {onOpenPresentation && (
              <button
                onClick={onOpenPresentation}
                className="flex items-center gap-1.5 px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-lg text-xs lg:text-sm font-mono font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                title="Open Hackathon Presentation Mode"
              >
                <Presentation className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-cyan-400" />
                <span className="hidden lg:inline">Presentation Mode</span>
              </button>
            )}

            {/* CTA */}
            {currentTab !== 'investigate' && (
              <button
                onClick={() => onSelectTab('investigate')}
                className="flex items-center gap-1.5 px-4 py-1.5 lg:px-5 lg:py-2 rounded-lg text-xs lg:text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 transition-all active:scale-95"
              >
                <Search className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span>Investigate Now</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-slate-950 border-b border-slate-800 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
          {onOpenPresentation && (
            <button
              onClick={() => {
                onOpenPresentation();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-mono font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 mt-2"
            >
              <Presentation className="w-4 h-4" />
              <span>Hackathon Presentation Mode</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
