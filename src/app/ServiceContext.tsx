import { createContext, useContext, type ReactNode } from "react";
import type { MotionPreference } from "../services/motionPreference";
import type { CreateVideoClock } from "../services/videoClock";

/** The effects sections may reach; `main.tsx` picks the adapters. */
export type Services = { motionPreference: MotionPreference; createVideoClock: CreateVideoClock };

const ServiceCtx = createContext<Services | null>(null);

export function ServiceProvider({ services, children }: { services: Services; children: ReactNode }) {
  return <ServiceCtx.Provider value={services}>{children}</ServiceCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useServices(): Services {
  const services = useContext(ServiceCtx);
  if (!services) throw new Error("useServices must be used within ServiceProvider");
  return services;
}
