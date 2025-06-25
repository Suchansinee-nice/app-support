export interface RequestSearchTransaction {
  refNo: string;
  transactionID: string;
  createdDate: Date;
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

export interface ResponseSearchTransaction {
  response: Results[];
}
