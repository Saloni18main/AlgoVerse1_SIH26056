/**
 * VAYU-INDEX: National Airfare Intelligence Platform
 * TypeScript Types & Schema Definitions
 * SIH26056 - MoSPI | Data Informatics & Innovation Division
 */

export type PageId =
  | 'overview'
  | 'route-explorer'
  | 'price-index'
  | 'ai-forecasting'
  | 'anomaly-detection'
  | 'festival-intelligence'
  | 'data-quality'
  | 'scraper-admin';

export type CabinClass = 'Economy' | 'Premium Economy' | 'Business';

export type AdvancePurchaseWindow = 'T+1' | 'T+7' | 'T+15' | 'T+30' | 'T+45';

export interface Airport {
  code: string;
  name: string;
  city: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  isMajorHub: boolean;
  status: 'nominal' | 'elevated' | 'surge';
  activeRoutesCount: number;
}

export interface Route {
  id: string;
  origin: string; // IATA code
  originCity: string;
  destination: string; // IATA code
  destinationCity: string;
  dgcaWeight: number; // e.g. 0.1452
  annualPaxLakhs: number;
  baseFare2023: number; // Jan 2024 base period fare
  currentAvgFare: number;
  medianFare: number;
  floorFare: number;
  ceilingFare: number;
  volatilityIndex: number; // 0.0 - 1.0
  priceRelative: number; // Pt / P0
  indexContribution: number; // Wi * (Pt / P0)
  status: 'nominal' | 'elevated' | 'critical';
  yoyChange: number;
  momChange: number;
}

export interface FareRecord {
  id: string;
  routeId: string;
  origin: string;
  destination: string;
  carrier: string;
  flightNumber: string;
  captureDate: string;
  departureDate: string;
  advanceWindow: AdvancePurchaseWindow;
  advanceDays: number;
  baseFare: number;
  taxes: number;
  udf: number; // User Development Fee
  convenienceFee: number;
  totalFare: number;
  source: string; // e.g. "IndiGo Direct API", "MakeMyTrip OTA", etc.
  cabin: CabinClass;
}

export interface IndexDataPoint {
  date: string;
  label: string;
  indexValue: number;
  momChangePct: number;
  yoyChangePct: number;
  dgcaBenchmarkFare: number;
  computedWeightedFare: number;
  deviationPct: number;
  isBasePeriod?: boolean;
}

export interface BacktestResult {
  date: string;
  computedIndex: number;
  dgcaAvgFare: number;
  computedAvgFare: number;
  deviationPct: number;
  status: 'valid' | 'warning' | 'outlier';
}

export type AnomalyType = 'price_spike' | 'elevated' | 'price_drop' | 'data_null' | 'PRICE_SPIKE' | 'ELEVATED' | 'PRICE_DROP' | 'DATA_NULL';
export type AnomalyFlagType = 'price_spike' | 'elevated' | 'price_drop' | 'data_null' | 'PRICE_SPIKE' | 'ELEVATED' | 'PRICE_DROP' | 'DATA_NULL';
export type AnomalySeverity = 'critical' | 'high' | 'medium' | 'resolved';
export type AnomalyStatus = 'open' | 'under_review' | 'resolved';

export interface AnomalyRecord {
  id: string;
  timestamp?: string;
  detectionTime?: string;
  routeId: string;
  origin: string;
  destination: string;
  carrier: string;
  observedFare?: number;
  baselineFare?: number;
  expectedFare?: number;
  actualFare?: number;
  deviationPct: number;
  flagType: AnomalyFlagType;
  severity: AnomalySeverity;
  status: AnomalyStatus;
  notes?: string;
  advanceDays?: number;
}

export interface FestivalEvent {
  id: string;
  name: string;
  date: string;
  type: 'national_holiday' | 'major_festival' | 'surge_alert';
  surgeMultiplier: number; // e.g. 1.65 for +65%
  historicSurgePct: number;
  affectedRoutes: string[];
  description: string;
  recommendedAdvanceDays: number;
}

export interface ForecastFeatureImportance {
  feature: string;
  importancePct: number;
  impactDescription: string;
  effectAmount: number;
}

export interface ForecastPrediction {
  routeId: string;
  origin: string;
  destination: string;
  travelDate: string;
  advanceDays: number;
  cabin: CabinClass;
  predictedFare: number;
  confidenceInterval: [number, number]; // [lower, upper]
  confidenceScorePct: number;
  historicalAvgFare: number;
  varianceVsHistoricPct: number;
  featureImportances: ForecastFeatureImportance[];
  aiExplanationNotes: string[];
  geminiAnalysis?: string;
}

export interface ScraperNode {
  id: string;
  target: string;
  carrierOrSource: string;
  status: 'ACTIVE' | 'IDLE' | 'FAILED' | 'RETRYING';
  lastRun: string;
  recordsFetched: number;
  nextScheduledRun: string;
  errorCount: number;
  avgLatencyMs: number;
  complianceChecked: boolean;
  robotsTxtStatus: 'ALLOWED' | 'RESTRICTED' | 'CHECKING';
}

export interface ScraperLog {
  id: string;
  timestamp: string;
  nodeId: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
  metadata?: Record<string, any>;
}

export interface DataQualitySummary {
  globalIntegrityScorePct: number;
  scrapingSuccessRatePct: number;
  recordsIngestedLast60m: number;
  duplicatesRemoved: number;
  totalRoutesMonitored: number;
  freshRoutesPct: number;
  coveragePct: number;
  lastPipelineRun: string;
}

export interface QualityErrorLog {
  id: string;
  timestamp: string;
  source: string;
  code?: string;
  errorType?: string;
  message?: string;
  action?: string;
  severity: 'CRITICAL' | 'WARNING' | 'RESOLVED';
  resolvedTime?: string;
  details?: string;
}

export interface GovOfficer {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  ministry: string;
  department: string;
  designation: string;
  role: 'Statistical Officer' | 'Senior Analyst' | 'Director' | 'Administrator';
  badgeNumber: string;
  clearanceLevel: 'Secret' | 'Confidential' | 'Internal Official Use';
  lastLogin: string;
  sessionToken: string;
  avatarInitials: string;
}

export type AppViewMode = PageId | 'landing';
