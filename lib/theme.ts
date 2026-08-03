export interface ThemeConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradientBackground: string;
  cardBackground: string;
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
}

export const defaultTheme: ThemeConfig = {
  name: "Enterprise SaaS Premium",
  primaryColor: "from-blue-600 to-indigo-600",
  secondaryColor: "from-slate-900 via-indigo-950 to-slate-900",
  accentColor: "text-indigo-600",
  gradientBackground: "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900",
  cardBackground: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/80 shadow-2xl shadow-indigo-500/5",
  textColor: "text-slate-900 dark:text-white",
  mutedTextColor: "text-slate-500 dark:text-slate-400",
  borderColor: "border-slate-200 dark:border-slate-800",
};

export const themeBackgrounds = {
  login: "relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900",
  dashboard: "relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100",
  organizations: "relative min-h-screen bg-gradient-to-b from-blue-50/50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
  privileges: "relative min-h-screen bg-gradient-to-b from-indigo-50/50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
  forms: "relative min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
};
