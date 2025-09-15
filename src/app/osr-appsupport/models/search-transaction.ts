import { DateTime } from 'luxon';

export interface RequestSearchTransaction {
  refNo?: string | null;
  transactionId?: string | null;
  createdDate?: Date | null;
  date?: string | null;
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

export interface ResponseSearchTransaction {
  response?: Results[] | null;
}
