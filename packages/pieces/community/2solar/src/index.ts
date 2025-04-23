
    import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
    import { newLeadTrigger } from './lib/triggers/new-lead';
    import { updateLeadAction } from './lib/actions/updated-lead';

    export const twoSolarAuth = PieceAuth.SecretText({
      displayName: 'API Key',
      description: 'Get this from your 2Solar tech lead',                                                                                     
      required: true,
    });

    export const twoSolar = createPiece({
      displayName: "2solar",
      auth: twoSolarAuth,
      minimumSupportedRelease: '0.36.1',
      logoUrl: "https://cdn.activepieces.com/pieces/2solar.png",
      authors: [],
      actions: [updateLeadAction],
      triggers: [newLeadTrigger],
    });


    