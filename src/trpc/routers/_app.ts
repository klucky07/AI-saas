import { z } from 'zod';
import { agentsRouter } from '@/modules/agents/servers/procedures';

import { baseProcedure, createTRPCRouter } from '../init';
import { meetingsRouter } from '@/modules/meetings/servers/procedures';
export const appRouter = createTRPCRouter({
  agents:agentsRouter,
  meetings:meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;