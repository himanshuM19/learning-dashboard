"use client";

import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

type IconComponent = React.ComponentType<LucideProps>;

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const icons = LucideIcons as unknown as Record<string, IconComponent>;

  // Convert snake_case / lowercase to PascalCase
  const pascalName = name
    .split(/[-_\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");

  const Icon: IconComponent = icons[pascalName] ?? icons["BookOpen"];

  return <Icon {...props} />;
}
