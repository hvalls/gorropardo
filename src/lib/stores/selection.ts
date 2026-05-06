import { writable } from 'svelte/store';
import type { AppSelection } from '$lib/types';

export const selection = writable<AppSelection | null>(null);
