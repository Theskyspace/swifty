import React, { useState, useEffect } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import { ReclaimProofRequest } from '@reclaimprotocol/reactnative-sdk';
import { ENV } from '@/config/env';

async function initializeReclaim() {
  const reclaimProofRequest = await ReclaimProofRequest.init(
    ENV.RECLAIM.APP_ID,
    ENV.RECLAIM.APP_SECRET,
    ENV.RECLAIM.PROVIDER_ID
  );
  console.log('ReclaimProofRequest initialized:', reclaimProofRequest); 
  return reclaimProofRequest;
}

async function generateRequestUrl(reclaimProofRequest: ReclaimProofRequest) {
  const requestUrl = await reclaimProofRequest.getRequestUrl();
  console.log('Request URL:', requestUrl);
  return requestUrl;
}

async function startVerificationSession(reclaimProofRequest: ReclaimProofRequest, onSuccess: (proof: string | { claimData: { context: any; }; }) => void, onFailure: (error: { message: any; }) => void) {
  await reclaimProofRequest.startSession({
    onSuccess: onSuccess,
    onError: onFailure,
  });
}

function ReclaimDemo() {
  const [requestUrl, setRequestUrl] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function setup() {
      try {
        const reclaimProofRequest = await initializeReclaim();
        const url = await generateRequestUrl(reclaimProofRequest);
        setRequestUrl(url);
        setStatus('Ready to start verification');

        await startVerificationSession(
          reclaimProofRequest,
          (proofs: string | { claimData: { context: any } }) => {
            if (proofs) {
              if (typeof proofs === 'string') {
                // When using a custom callback url, the proof is returned to the callback url and we get a message instead of a proof
                console.log('SDK Message:', proofs);
              } else if (typeof proofs !== 'string') {
                // When using the default callback url, we get a proof object in the response
                console.log('Proof received:', proofs?.claimData.context);
              }
              setStatus('Proof received!');
            }
          },
          (error: { message: any; }) => {
            console.error('Verification failed', error);
            setStatus(`Error: ${ error.message }`);
          }
        );
} catch (error: any) {
        console.error('Setup failed', error);
        setStatus(`Setup failed: ${ error.message } `);
      }
    }

    setup();
  }, []);

  const openRequestUrl = () => {
    if (requestUrl) {
      Linking.openURL(requestUrl);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Reclaim Demo</Text>
      <Text>Status: {status}</Text>
      {requestUrl && <Button title="Start Verification" onPress={openRequestUrl} />}
    </View>
  );
}

export default ReclaimDemo;

