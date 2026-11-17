import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

const lightColors = {
  background: '#F5F7F4',
  surface: '#FFFFFF',
  surfaceAlt: '#EDF2EE',
  text: '#1C2A23',
  muted: '#728078',
  border: '#E2E9E3',
  primary: '#28654D',
  primarySoft: '#E2F0E7',
  accent: '#F1C879',
  danger: '#B5544A',
};

const darkColors = {
  background: '#111A16',
  surface: '#1A2620',
  surfaceAlt: '#223129',
  text: '#ECF4EF',
  muted: '#A0AEA5',
  border: '#2C3B32',
  primary: '#9AD2AE',
  primarySoft: '#263D30',
  accent: '#EBC477',
  danger: '#E58B80',
};

export type AppColors = typeof lightColors;

type ThemeContextValue = {
  isDark: boolean;
  colors: AppColors;
  toggleTheme: () => void;
  completedLabIds: string[];
  toggleLabCompletion: (labId: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState(false);
  const [completedLabIds, setCompletedLabIds] = useState<string[]>([]);
  const colors = isDark ? darkColors : lightColors;

  const value = useMemo(
    () => ({
      isDark,
      colors,
      toggleTheme: () => setIsDark((current) => !current),
      completedLabIds,
      toggleLabCompletion: (labId: string) => {
        setCompletedLabIds((current) =>
          current.includes(labId) ? current.filter((id) => id !== labId) : [...current, labId],
        );
      },
    }),
    [isDark, colors, completedLabIds],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
}
