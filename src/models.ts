
export type ProcessType = "" | "Task Manager" | "Browser" | "Camera" | "File Explore" | "Editor" | "Calculator"

export type Icon = "Globe" | "Camera" | "ChartLine" | "Dashboard" | "Folder" | "Code" | "Calculator"

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