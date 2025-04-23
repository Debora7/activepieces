import { createAction, Property } from '@activepieces/pieces-framework';
import axios from 'axios';

export const updateLeadAction = createAction({
  name: 'update-lead',
  displayName: 'Update Lead/Person',
  description: 'Updates an existing lead in 2Solar',
  props: {
    request_id: Property.ShortText({
      displayName: 'Request ID',
      required: true,
    }),
    call_date: Property.ShortText({
      displayName: 'Call Date',
      description: 'Format: YYYY-MM-DD',
      required: false,
    }),
    call_time: Property.ShortText({
      displayName: 'Call Time',
      description: 'Format: HH:mm:ss',
      required: false,
    }),
    call_duration: Property.Number({
      displayName: 'Call Duration (minutes)',
      required: false,
    }),
    conversation_summary: Property.LongText({
      displayName: 'Conversation Summary',
      required: false,
    }),
    notes: Property.LongText({
      displayName: 'Notes',
      required: false,
    }),
  },

  async run({ propsValue, auth }) {
    const { request_id, call_date, call_time, call_duration, conversation_summary, notes } = propsValue;

    if (!isNaN(Number(request_id))) {
      throw new Error('Request ID must NOT be a number.');
    }

    const body: Record<string, unknown> = {};

    if (call_date || call_time) {
      body['date_time_action'] = `${call_date ?? ''} ${call_time ?? ''}`.trim();
    }
    if (call_duration) {
      body['call_duration'] = call_duration;
    }
    if (conversation_summary) {
      body['conversation_summary'] = conversation_summary;
    }
    if (notes) {
      body['comments'] = notes;
    }

    const response = await axios.put(
      `https://app.2solar.nl/api/person/${request_id}`,
      body,
      {
        headers: {
          'Authorization': `Token ${auth.api_key}`,
        },
      }
    );

    return response.data;
  },

  async test({ propsValue, auth }) {
    const response = await axios.get(
      `https://app.2solar.nl/api/person/${propsValue.request_id}`,
      {
        headers: {
          'Authorization': `Token ${auth.api_key}`,
        },
      }
    );

    return {
      success: true,
      message: `Fetched lead ${propsValue.request_id}`,
      data: response.data,
    };
  },
});
