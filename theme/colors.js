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
  bg: '#1A1008',
  card: '#2A1A0E',
  cardBorder: '#3D2510',
  iconBg: '#3D2510',
  iconBgAlt: '#3D2510',
  inputBg: '#2A1A0E',
  accent: '#F97316',
  accentBg: '#2A1A0E',
  accentBorder: '#5C3010',
  textPrimary: '#F5E6D8',
  textSecondary: '#C4A882',
  textMuted: '#6B5240',
  navBg: '#1A1008',
  navBorder: '#3D2510',
  statusBar: 'light-content',
  switchTrackOff: '#3D2510',
  tabIndicator: '#F97316',
  sectionBg: '#221308',
};

export function getColors(isDark) {
  return isDark ? darkColors : lightColors;
}
