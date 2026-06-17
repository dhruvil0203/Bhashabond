export const lightColors = {
  bg: '#FDF6F0',
  card: '#FFFFFF',
  cardBorder: '#F5E6D8',
  iconBg: '#FFF2E6',
  iconBgAlt: '#FFE8D6',
  inputBg: '#FFFFFF',
  accent: '#F97316',
  accentBg: '#FFF4EC',
  accentBorder: '#FFE8D6',
  textPrimary: '#4A2E1B',
  textSecondary: '#8B7361',
  textMuted: '#C4B4A8',
  navBg: '#FFFFFF',
  navBorder: '#F5E6D8',
  statusBar: 'dark-content',
  switchTrackOff: '#FFE8D6',
  tabIndicator: '#F97316',
  sectionBg: '#FDF6F0',
};

export const darkColors = {
  bg: '#0A0A0A',
  card: '#161616',
  cardBorder: '#2A2A2A',
  iconBg: '#222222',
  iconBgAlt: '#262626',
  inputBg: '#161616',
  accent: '#F97316',
  accentBg: '#1C1C1C',
  accentBorder: '#3A2410',
  textPrimary: '#F5F5F5',
  textSecondary: '#A3A3A3',
  textMuted: '#6B6B6B',
  navBg: '#0A0A0A',
  navBorder: '#2A2A2A',
  statusBar: 'light-content',
  switchTrackOff: '#2A2A2A',
  tabIndicator: '#F97316',
  sectionBg: '#121212',
};

export function getColors(isDark) {
  return isDark ? darkColors : lightColors;
}
