import { writable } from "svelte/store";

export interface Answer {
    id: number;
    isCorrect: boolean;
}

export const answers = writable<Answer[]>([]);