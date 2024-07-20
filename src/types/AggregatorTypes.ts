export interface ServerInfo {
  version: string;
  versionInt: string;
  langs: string;
  nativeLang: string;
  centerLongitude: string;
  centerLatitude: string;
  centerZoom: string;
  defaultDuration: string;
  regionBias: string;
  charSet: string;
  distanceUnits: string;
  semanticAdmin: string;
  emailEnabled: string;
  emailIncludesServiceBodies: string;
  changesPerMeeting: string;
  meeting_states_and_provinces: string;
  meeting_counties_and_sub_provinces: string;
  available_keys: string;
  google_api_key: string;
  dbVersion: string;
  dbPrefix: string;
  meeting_time_zones_enabled: string;
  phpVersion: string;
  aggregator_mode_enabled: boolean;
  auto_geocoding_enabled: boolean;
  default_closed_status: boolean;
}

export interface MeetingStatistics {
  numHybrid: number;
  numInPerson: number;
  numTotal: number;
  numUnknown: number;
  numVirtual: number;
}

export interface ServiceBodyStatistics {
  numAreas: number;
  numGroups: number;
  numRegions: number;
  numZones: number;
}

export interface Statistics {
  serviceBodies: ServiceBodyStatistics;
  meetings: MeetingStatistics;
}

export interface AggregatorItem {
  id: number;
  sourceId: number;
  name: string;
  lastSuccessfulImport: string;
  serverInfo: string;
  statistics: Statistics;
  url: string;
}
