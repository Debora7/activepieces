import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import axios from 'axios';

async function fetchLeads(auth: { api_key: string }) {
  const response = await axios.get('https://app.2solar.nl/api/person/search/', {
    headers: {
      'Authorization': `Token ${auth.api_key}`,
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

  async run({ auth }) {
    return await fetchLeads(auth);
  },

  async test({ auth }) {
    return await fetchLeads(auth);
  },

  onEnable: async () => {},
  onDisable: async () => {},
});
