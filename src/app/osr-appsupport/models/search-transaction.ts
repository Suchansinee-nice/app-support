import { DateTime } from 'luxon';

export interface RequestSearchTransaction {
  refNo?: string | null;
  transactionId?: string | null;
  createdDate?: Date | null;
  date?: string | null;
  idCard?: string | null;
  endedDate?: Date | null;
  endDate?: string | null;
}

export interface Results {
  transactionId: string;
  createdDate: Date;
  status: string;
  timeUsage: string;
  collectorUsage: string;
  serviceUsage: string;
  serviceStatus: string;
  rules: Rules[];
  documents: Documents[];
  dateTime: Date;
  channelCode: string;
  section: string;
  collectors: Collector[];
}

export interface Rules {
  messageTH: string;
  messageEN: string;
  code: string;
  status: string;
  statusFrontend: string;
  messageFrontendTH: string;
  messageFrontendEN: string;
}

export interface Documents {
  code: string;
  descTH: string;
  descEN: string;
  type: string;
  rule: string;
  rule6CheckOnly: string;
  documentGroup: DocumentGroup;
}

export interface DocumentGroup {
  group: string;
  groupDesc: string;
  subGroupDesc: string;
}

export interface Collector {
  dataCollector: string;
  services: ServiceCollector[];
}

export interface ServiceCollector {
  nameService: string;
  time: string;
}

export interface ResponseSearchTransaction {
  response?: Results[] | null;
}
