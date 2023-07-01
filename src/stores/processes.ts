import { writable, type Writable } from 'svelte/store';
import type { Process } from '../models';

export const focusedProcess = writable("")

export const processes:Writable<Process[]> = writable([]);