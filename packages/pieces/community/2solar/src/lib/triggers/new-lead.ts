import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import axios from 'axios';

async function fetchLeads() {
  const response = await axios.get('https://app.2solar.nl/api/person/search/', {
    headers: {
      'Authorization': 'Token c683f1cd03a4a19b6684154742b805c0d00dda4d',
    },
    params: {
      limit: 100,
      offset: 0,
    },
  });

  const leads = Array.isArray(response.data?.results) ? response.data.results : [];

  console.log('leads', leads);
  return leads.map((lead: any) => ({
    id: lead.id.toString(),
    data: lead,
  }));
}


export const newLeadTrigger = createTrigger({
  name: 'new_lead',
  displayName: 'New Lead',
  description: 'Fetch new leads from 2Solar',
  type: TriggerStrategy.POLLING,
  props: {},
  sampleData: {},

  async run() {
    return await fetchLeads();
  },

  async test() {
    return await fetchLeads();
  },

  onEnable: async () => {},
  onDisable: async () => {},
});
