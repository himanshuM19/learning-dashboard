export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export interface ActivityDay {
  date: string;
  count: number;
}
