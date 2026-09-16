import React, { useState, useEffect } from 'react';
import {
  History as HistoryIcon,
  Search,
  Trash2,
  Eye,
  Download,
  RotateCcw,
  Calendar,
  AlertCircle,
  CheckCircle2,
  X,
  FileText
} from 'lucide-react';
import { InvestigationResult, RiskLevel } from '../types.js';
import { fetchInvestigations, deleteInvestigationApi, resetDemoApi } from '../services/api.js';
import { RiskBadge } from '../components/RiskBadge.js';
import { RiskMeter } from '../components/RiskMeter.js';
import { RedFlagCard } from '../components/RedFlagCard.js';

export const History: React.FC = () => {
  const [items, setItems] = useState<InvestigationResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<InvestigationResult | null>(null);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchInvestigations();
      setItems(data);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteInvestigationApi(id);
      setItems(prev => prev.filter(i => i.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleResetDemo = async () => {
    try {
      await resetDemoApi();
      await loadHistory();
    } catch (err) {
      console.error('Reset failed:', err);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `trustguard-audit-history-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.inputData.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = selectedRiskFilter === 'ALL' || item.risk_level === selectedRiskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="tg-container py-8 lg:py-12 space-y-8 lg:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs lg:text-sm font-mono font-semibold mb-2">
            <HistoryIcon className="w-3.5 h-3.5 text-cyan-400" />
            LOCAL AUDIT & INVESTIGATION LOGS
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Investigation History
          </h1>
          <p className="text-sm lg:text-base text-slate-400 mt-1">
            Review past scans, inspect archived red flags, and export digital forensics records.
          </p>
        </div>

        <div className="flex items-center gap-2.5 lg:gap-3">
          <button
            onClick={handleResetDemo}
            className="flex items-center gap-1.5 px-3.5 py-2 lg:px-4 lg:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs lg:text-sm font-mono transition-colors"
            title="Reload initial demo dataset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3.5 py-2 lg:px-4 lg:py-2.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 text-xs lg:text-sm font-mono font-bold transition-all"
            title="Export history as JSON file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96 lg:w-[28rem]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search keyword, sender, or domain..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs lg:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 lg:gap-2 w-full sm:w-auto">
          {['ALL', 'CRITICAL', 'HIGH', 'SUSPICIOUS', 'SAFE'].map(risk => (
            <button
              key={risk}
              onClick={() => setSelectedRiskFilter(risk)}
              className={`px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-lg text-xs lg:text-sm font-mono transition-all ${
                selectedRiskFilter === risk
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List */}
      <div className="space-y-3 lg:space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs lg:text-sm font-mono text-slate-400">
            Loading investigation records...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-950/60 border border-slate-800 text-xs lg:text-sm font-mono text-slate-400">
            No matching investigations found. Try modifying your search or click "Reset Demo Data".
          </div>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="p-4 lg:p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all backdrop-blur-sm cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <RiskBadge level={item.risk_level} size="sm" />
                  <span className="text-xs lg:text-sm font-bold text-slate-200 font-mono">{item.category}</span>
                  <span className="text-[11px] lg:text-xs font-mono text-slate-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-slate-300 font-mono truncate">
                  "{item.inputData}"
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right font-mono">
                  <div className="text-sm lg:text-base font-black text-white">{item.risk_score} / 100</div>
                  <div className="text-[10px] lg:text-xs text-slate-500 uppercase">{item.red_flags.length} Flags</div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedItem(item);
                    }}
                    className="p-2 lg:p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 transition-colors"
                    title="Inspect Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={e => handleDelete(item.id, e)}
                    className="p-2 lg:p-2.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Inspection Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <RiskBadge level={selectedItem.risk_level} size="md" />
                <h3 className="font-bold text-lg text-white">{selectedItem.category}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 break-words">
              {selectedItem.inputData}
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Plain-English Summary
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {selectedItem.summary}
              </p>
            </div>

            {selectedItem.red_flags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                  Detected Red Flags ({selectedItem.red_flags.length})
                </h4>
                <div className="space-y-2">
                  {selectedItem.red_flags.map(flag => (
                    <RedFlagCard key={flag.id} flag={flag} />
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Actionable Advice
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedItem.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-cyan-400 font-bold">{i + 1}.</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
