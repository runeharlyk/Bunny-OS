
export type ProcessType = "Task Manager" | "Browser" | "Camera"

export type Icon = "Globe" | "Camera" | "ChartLine" | "Dashboard"

export interface Process {
  id: number;
  type: ProcessType;
  background: boolean;
  icon?: Icon;
  name?: string;
  cpu?:number;
  memory?: number;
  network?: string;
}