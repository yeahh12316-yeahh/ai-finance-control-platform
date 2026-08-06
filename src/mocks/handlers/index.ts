import { authHandlers } from './auth';
import { userHandlers } from './user';
import { processHandlers } from './process';
import { riskHandlers } from './risk';
import { controlHandlers } from './control';
import { rcmHandlers } from './rcm';
import { documentHandlers } from './document';
import { evaluationHandlers } from './evaluation';
import { defectHandlers } from './defect';
import { knowledgeHandlers } from './knowledge';
import { copilotHandlers } from './copilot';
import { dashboardHandlers } from './dashboard';
import { auditHandlers } from './audit';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...processHandlers,
  ...riskHandlers,
  ...controlHandlers,
  ...rcmHandlers,
  ...documentHandlers,
  ...evaluationHandlers,
  ...defectHandlers,
  ...knowledgeHandlers,
  ...copilotHandlers,
  ...dashboardHandlers,
  ...auditHandlers,
];
