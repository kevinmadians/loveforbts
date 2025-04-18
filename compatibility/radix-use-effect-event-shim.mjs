'use strict';

// This is a shim to make @radix-ui/react-use-effect-event work with React 18
// It provides a useCallback-based alternative to the React 19 useEffectEvent

import * as React from 'react';

// Main export that simulates the same API
export function useEffectEvent(callback) {
  // In React 18, we can use useCallback without dependencies to get a similar behavior
  // This won't update across renders, which is what we want
  return React.useCallback(callback, []);
} 