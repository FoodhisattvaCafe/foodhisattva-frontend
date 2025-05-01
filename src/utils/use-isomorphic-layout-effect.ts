/**
 * useIsomorphicLayoutEffect
 *
 * A universal layout effect hook that safely uses `useLayoutEffect` in the browser
 * and falls back to `useEffect` in server-side rendering (SSR) environments.
 *
 * This helps avoid React hydration warnings or errors in SSR frameworks like Next.js.
 *
 * @returns A React effect hook (either useLayoutEffect or useEffect) based on the environment.
 *
 * @example
 * useIsomorphicLayoutEffect(() => {
 *   console.log("Running in layout effect (client only)");
 * }, []);
 */

import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
