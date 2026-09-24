import React from 'react';
import { X, ShieldCheck, BookOpen, Layers, CheckCircle2, FileText } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-xl max-w-3xl w-full h-[85vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0b192e] text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif-heading">Statistical &amp; Econometric Methodology</h3>
              <p className="text-xs text-slate-500 font-mono">VAYU-INDEX Laspeyres Price Index Specification</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-serif-heading flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-mono">1</span>
              <span>Objective &amp; CPI Transport Augmentation</span>
            </h4>
            <p>
              The <strong>VAYU-INDEX</strong> platform establishes a high-frequency, statistically defensible price index
              measuring commercial passenger airline ticket price fluctuations across India&apos;s domestic aviation network.
              Designed in alignment with MoSPI&apos;s <em>Consumer Price Index (CPI)</em> sub-item code <strong>Transport.04</strong>,
              it provides the National Statistical Office with verified empirical data on airfare inflation.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-serif-heading flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-mono">2</span>
              <span>Laspeyres Index Formulation</span>
            </h4>
            <p>
              The aggregate Airfare Price Index ($I_t$) at observation time $t$ relative to base period $t=0$ (Jan 2023 = 100)
              is computed using a Laspeyres-type aggregation over $N=47$ monitored route sectors:
            </p>

            <div className="p-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-center text-xs space-y-1">
              <div className="text-emerald-400 text-sm font-bold">
                I_t = Σ [ W_i0 × ( P_it / P_i0 ) ] × 100
              </div>
              <div className="text-slate-400 text-[11px]">
                where W_i0 = DGCA passenger traffic volume weight of sector i
              </div>
              <div className="text-slate-400 text-[11px]">
                P_it = T-30 weighted geometric mean fare quote for sector i at time t
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-serif-heading flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-mono">3</span>
              <span>Fare Component Separation</span>
            </h4>
            <p>
              In accordance with aviation regulatory mandates, each quote is separated into four distinct price components:
            </p>
            <ul className="grid grid-cols-2 gap-2 font-medium">
              <li className="p-2.5 bg-slate-50 border rounded-md"><strong>1. Base Airline Fare:</strong> Pure dynamic yield pricing</li>
              <li className="p-2.5 bg-slate-50 border rounded-md"><strong>2. Taxes &amp; GST:</strong> Statutory 5% / 12% ad-valorem tax</li>
              <li className="p-2.5 bg-slate-50 border rounded-md"><strong>3. UDF / PSF Fees:</strong> Airport development &amp; security levies</li>
              <li className="p-2.5 bg-slate-50 border rounded-md"><strong>4. Convenience Fee:</strong> Payment gateway and ancillary fees</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 font-serif-heading flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-mono">4</span>
              <span>Ethical Scraping &amp; Data Governance</span>
            </h4>
            <p>
              Scraper nodes strictly adhere to <code>/robots.txt</code> crawl delay stipulations, rate-limiting requests
              to a maximum of 2 requests per second per domain. All raw data payloads are cryptographically hashed (SHA-256)
              upon ingestion to ensure auditability and anti-tamper compliance.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Approved under MoSPI DIID Framework</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-[#0b192e] text-white rounded font-bold text-xs uppercase tracking-wider">
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
