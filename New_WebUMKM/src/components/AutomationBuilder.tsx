import { useState } from 'react';
import { Zap, Plus, Play, Pause, Edit2, Trash2, CheckCircle, ChevronRight } from 'lucide-react';
import { Automation } from '../lib/mockData';
import { useData } from '../lib/dataContext';

export function AutomationBuilder() {
  const { automations, toggleAutomation } = useData();

  const activeCount = automations.filter(a => a.active).length;

  // Function to get user-friendly trigger names
  const getTriggerDisplayName = (triggerType: string) => {
    switch (triggerType) {
      case 'stock_low':
        return 'Stok Rendah';
      case 'sale_created':
        return 'Penjualan Dibuat';
      case 'purchase_received':
        return 'Pembelian Diterima';
      case 'scheduled':
        return 'Terjadwal';
      default:
        return triggerType;
    }
  };

  // Function to get user-friendly action names
  const getActionDisplayName = (actionType: string) => {
    switch (actionType) {
      case 'send_whatsapp':
        return 'Kirim WhatsApp';
      case 'send_email':
        return 'Kirim Email';
      case 'update_stock':
        return 'Update Stok';
      case 'send_to_sheets':
        return 'Kirim ke Google Sheets';
      default:
        return actionType;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-slate-900 mb-2">No-Code Automation Builder</h1>
            <p className="text-gray-600">Buat automation tanpa coding dengan rule IF-THEN sederhana</p>
          </div>

        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Total Automation</div>
            <div className="text-slate-900">{automations.length} workflows</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Aktif</div>
            <div className="flex items-center gap-2">
              <div className="text-slate-900">{activeCount} workflows</div>
              <CheckCircle className="text-green-500" size={18} />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Total Runs (30 hari)</div>
            <div className="text-slate-900">342 executions</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6 mb-8">
        <h3 className="text-slate-900 mb-4">Cara Kerja Automation</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-cyan-200">
            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
              1
            </div>
            <div>
              <div className="text-sm text-cyan-600">TRIGGER</div>
              <div className="text-xs text-gray-600">Kondisi pemicu</div>
            </div>
          </div>
          <ChevronRight className="text-cyan-400" />
          <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-cyan-200">
            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
              2
            </div>
            <div>
              <div className="text-sm text-cyan-600">ACTION</div>
              <div className="text-xs text-gray-600">Aksi otomatis</div>
            </div>
          </div>
          <ChevronRight className="text-cyan-400" />
          <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-cyan-200">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              ✓
            </div>
            <div>
              <div className="text-sm text-green-600">DONE</div>
              <div className="text-xs text-gray-600">Selesai otomatis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Automation List */}
      <div className="space-y-4">
        {automations.map(automation => (
          <div 
            key={automation.id} 
            className={`bg-white rounded-xl border ${
              automation.active ? 'border-cyan-200' : 'border-gray-200'
            } overflow-hidden`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 ${
                    automation.active ? 'bg-cyan-100' : 'bg-gray-100'
                  } rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Zap className={automation.active ? 'text-cyan-600' : 'text-gray-400'} size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-slate-900">{automation.name}</h3>
                      {automation.active ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                          <CheckCircle size={12} />
                          Aktif
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          Nonaktif
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{automation.description}</p>

                    {/* Rule Flow */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="text-xs text-orange-600 mb-1">IF (Trigger)</div>
                        <div className="text-sm text-gray-900">{getTriggerDisplayName(automation.trigger.type)}</div>
                      </div>
                      <ChevronRight className="text-gray-300" size={20} />
                      <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="text-xs text-blue-600 mb-1">THEN (Action)</div>
                        <div className="text-sm text-gray-900">{getActionDisplayName(automation.action.type)}</div>
                      </div>
                    </div>

                    {automation.lastRun && (
                      <div className="mt-3 text-xs text-gray-500">
                        Terakhir dijalankan: {new Date(automation.lastRun).toLocaleString('id-ID')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      automation.active
                        ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                    title={automation.active ? 'Pause' : 'Activate'}
                  >
                    {automation.active ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}


