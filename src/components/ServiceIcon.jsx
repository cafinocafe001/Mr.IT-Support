import {
  MonitorCog,
  ShieldCheck,
  Network,
  Headphones,
  PenTool,
  Code2,
  PackageSearch,
} from 'lucide-react';

const icons = {
  computer: MonitorCog,
  security: ShieldCheck,
  network: Network,
  remote: Headphones,
  design: PenTool,
  website: Code2,
  sourcing: PackageSearch,
};

export default function ServiceIcon({ name, size = 24, strokeWidth = 1.8, ...props }) {
  const Icon = icons[name] || MonitorCog;
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" {...props} />;
}
