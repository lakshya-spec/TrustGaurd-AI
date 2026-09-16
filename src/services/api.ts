import { InvestigationResult, InvestigationStats } from '../types.js';
export const API_BASE_URL = 'https://trustgaurd-ai.onrender.com';

export async function analyzeMessageApi(content: string): Promise<InvestigationResult> {
  const res = await fetch(`${API_BASE_URL}/api/analyze/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Analysis failed with status ${res.status}`);
  }
  return res.json();
}

export async function analyzeUrlApi(url: string): Promise<InvestigationResult> {
  const res = await fetch(`${API_BASE_URL}/api/analyze/url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `URL analysis failed with status ${res.status}`);
  }
  return res.json();
}

export async function analyzeScreenshotApi(
  imageBase64: string,
  mimeType: string = 'image/jpeg',
  note: string = ''
): Promise<InvestigationResult> {
  const res = await fetch(`${API_BASE_URL}/api/analyze/screenshot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64, mimeType, note }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Screenshot analysis failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchInvestigations(): Promise<InvestigationResult[]> {
  const res = await fetch(`${API_BASE_URL}/api/investigations`);
  if (!res.ok) {
    throw new Error('Failed to fetch investigations');
  }
  return res.json();
}

export async function fetchInvestigationById(id: string): Promise<InvestigationResult> {
  const res = await fetch(`${API_BASE_URL}/api/investigations/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch investigation details');
  }
  return res.json();
}

export async function deleteInvestigationApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/investigations/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete investigation');
  }
}

export async function fetchStatsApi(): Promise<InvestigationStats> {
  const res = await fetch(`${API_BASE_URL}/api/stats`);
  if (!res.ok) {
    throw new Error('Failed to fetch stats');
  }
  return res.json();
}

export async function resetDemoApi(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/investigations/reset-demo`, {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to reset demo records');
  }
}
