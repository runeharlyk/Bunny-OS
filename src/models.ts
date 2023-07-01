import type { ComponentType } from "svelte";

export type ProcessType = "" | "Task Manager" | "Browser" | "Camera" | "File Explore" | "Editor" | "Calculator"

export type Icon = "Globe" | "Camera" | "ChartLine" | "Dashboard" | "Folder" | "Code" | "Calculator" | "Chart" | "Hamburger" | "Shield-Exclamation"

export interface Process {
  id: number;
  parent:number;
  component: ComponentType;
  type: ProcessType;
  background: boolean;
  minimized: boolean;
  icon?: Icon | string;
  name?: string;
  data?: unknown;
}

export type tab = {
  name: string;
  icon: Icon | string;
  component: ComponentType;
  data?: unknown;
};

export type app = tab & {
  type: ProcessType;
};

export type performanceTab = tab & {
  summary?: string;
};