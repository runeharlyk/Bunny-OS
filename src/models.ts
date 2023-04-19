import type { ComponentType } from "svelte";

export type ProcessType = "" | "Task Manager" | "Browser" | "Camera" | "File Explore" | "Editor" | "Calculator"

export type Icon = "Globe" | "Camera" | "ChartLine" | "Dashboard" | "Folder" | "Code" | "Calculator" | "Chart" | "Hamburger"

export interface Process {
  id: number;
  component: ComponentType;
  type: ProcessType;
  background: boolean;
  minimized: boolean;
  icon?: Icon;
  name?: string;
  cpu?:number;
  memory?: number;
  network?: string;
}

export type app = {
  name: ProcessType;
  icon: Icon;
  component: ComponentType;
};

export type tab = {
  name: string;
  icon: Icon;
  component: ComponentType;
};