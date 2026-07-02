import React from 'react';

interface SettingsState {
  storeName: string;
  emailNotification: boolean;
  currency: string;
  taxRate: number;
  shippingFee: number;
  maintenanceMode: boolean;
}

interface AdminSettingsProps {
  settings: SettingsState;
  setSettings: (settings: SettingsState) => void;
  handleSaveSettings: (e: React.FormEvent) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  setSettings,
  handleSaveSettings
}) => {
  return (
    <div className="bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm max-w-2xl mx-auto">
      <div className="mb-6 border-b border-neutral-100 pb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">AURA Store System Configuration</h3>
        <p className="text-[11px] text-neutral-400">Establish basic tax rules, email triggers, and system modes</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Company / Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full px-3.5 py-2 border border-[#E5E1D8] rounded-xl font-bold focus:outline-none bg-[#F5F2ED] text-[#1A1A1A]"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Functional Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-3.5 py-2 border border-[#E5E1D8] rounded-xl font-bold focus:outline-none bg-[#F5F2ED] text-[#1A1A1A]"
            >
              <option value="USD">USD ($) - United States Dollar</option>
              <option value="EUR">EUR (€) - Euro Currency</option>
              <option value="JPY">JPY (¥) - Japanese Yen</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Estimated Sales Tax (%)</label>
            <input
              type="number"
              value={settings.taxRate}
              onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
              className="w-full px-3.5 py-2 border border-[#E5E1D8] rounded-xl font-bold focus:outline-none bg-[#F5F2ED] text-[#1A1A1A]"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Express Courier Fee ($)</label>
            <input
              type="number"
              value={settings.shippingFee}
              onChange={(e) => setSettings({ ...settings, shippingFee: Number(e.target.value) })}
              className="w-full px-3.5 py-2 border border-[#E5E1D8] rounded-xl font-bold focus:outline-none bg-[#F5F2ED] text-[#1A1A1A]"
            />
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-neutral-800">Email Notification Automation</h4>
              <p className="text-[10px] text-neutral-400">Ping bookkeeping emails instantly on checkout creations</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, emailNotification: !settings.emailNotification })}
              className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${settings.emailNotification ? 'bg-[#F27D26]' : 'bg-neutral-300'}`}
            >
              <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-all ${settings.emailNotification ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-neutral-800">System Maintenance Lockout</h4>
              <p className="text-[10px] text-neutral-400">Lock the client front-page under temporary maintenance modes</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
              className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${settings.maintenanceMode ? 'bg-red-500' : 'bg-neutral-300'}`}
            >
              <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-all ${settings.maintenanceMode ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-2.5 bg-black hover:bg-[#F27D26] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
        >
          Save Configurations
        </button>
      </form>
    </div>
  );
};
