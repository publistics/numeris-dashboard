// Stripe integration utilities
// Calls the backend Stripe endpoints at /api/v1/stripe

import { API_BASE } from './api-client';

export async function createCheckoutSession(priceId: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/stripe/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price_id: priceId, success_url: `${window.location.origin}/dashboard/onboarding/success`, cancel_url: `${window.location.origin}/dashboard/onboarding/cancel` }),
    });
    if (!res.ok) throw new Error('Failed to create checkout session');
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return data.url;
    }
    return null;
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return null;
  }
}

export async function createPortalSession(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/stripe/create-portal-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ return_url: `${window.location.origin}/dashboard` }),
    });
    if (!res.ok) throw new Error('Failed to create portal session');
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return data.url;
    }
    return null;
  } catch (err) {
    console.error('Stripe portal error:', err);
    return null;
  }
}

// Price IDs mapping (placeholder — will use actual Stripe price IDs)
export const STRIPE_PRICE_IDS: Record<string, string> = {
  starter_monthly: 'price_1TioG2Dp9xRtLgtm9z4AoMab',
  growth_monthly: 'price_1TioGVDp9xRtLgtmdpugedwG',
  scale_monthly: 'price_1TioGjDp9xRtLgtmnTguM077',
};