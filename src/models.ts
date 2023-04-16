
export type ProcessType = "" | "Task Manager" | "Browser" | "Camera" | "File Explore"

export type Icon = "Globe" | "Camera" | "ChartLine" | "Dashboard" | "Folder"

export interface Process {
  id: number;
  type: ProcessType;
  background: boolean;
  minimized: boolean;
  icon?: Icon;
  name?: string;
  cpu?:number;
  memory?: number;
  network?: string;
}