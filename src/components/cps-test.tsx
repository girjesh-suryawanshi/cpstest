// src/app/(game)/cps-test.tsx
'use client';

import React, { useState, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
// remove any import of addScore or server-side libs

export default function CpsTest() {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [cps, setCps] = useState<number>(0);

  // rest of your component logic...
  // I'll focus on the submit handler

  const handleScoreSubmit = async () => {
    if (!playerName || playerName.trim().length === 0) {
      toast({ title: 'Enter a name', description: 'Please add a display name before submitting.' });
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: playerName.trim(),
        score: Number(cps),
        game: 'cps-test',
      };

      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error('Leaderboard API error:', res.status, data);
        // show more detailed message for common server responses
        if (data?.error === 'db-not-initialized') {
          toast({ title: 'Server configuration error', description: 'Leaderboard not available. Contact admin.', variant: 'destructive' });
        } else if (data?.error === 'invalid-payload') {
          toast({ title: 'Invalid data', description: 'Unable to submit — invalid data provided.', variant: 'destructive' });
        } else {
          toast({ title: 'Submission failed', description: 'There was an error submitting your score.', variant: 'destructive' });
        }
      } else {
        // success
        toast({ title: 'Score submitted!', description: 'Your score has been added to the leaderboard.' });
      }
    } catch (err) {
      console.error('Submit failed:', err);
      toast({ title: 'Submission failed', description: 'Unexpected error. Check console.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
      setShowSubmitDialog(false);
    }
  };

  return (
    <div>
      {/* your UI markup */}
      <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Enter name" />
      <button onClick={() => setShowSubmitDialog(true)}>Submit Score</button>

      {showSubmitDialog && (
        <div role="dialog">
          <p>Score: {cps}</p>
          <button onClick={handleScoreSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Confirm submit'}
          </button>
          <button onClick={() => setShowSubmitDialog(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
