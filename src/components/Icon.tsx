import React from 'react';
import {Text, TextStyle} from 'react-native';

let Lucide: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  Lucide = require('lucide-react-native');
} catch (e) {
  Lucide = null;
}

let VectorIcon: any = null;
try {
  // prefer MaterialIcons as fallback
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  VectorIcon = require('react-native-vector-icons/MaterialIcons').default;
} catch (e) {
  VectorIcon = null;
}

// lightweight svg fallback
let Svg: any = null;
let Circle: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  Svg = require('react-native-svg').Svg;
  Circle = require('react-native-svg').Circle;
} catch (e) {
  Svg = null;
  Circle = null;
}

type Props = {
  name?: string;
  size?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
};

function toPascalCase(s: string) {
  return s
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map(token => token.charAt(0).toUpperCase() + token.slice(1))
    .join('');
}

// common mapping from lucide-style names to MaterialIcons names
const MATERIAL_FALLBACK_MAP: Record<string, string> = {
  // requests / files
  'file-text': 'description',
  filetext: 'description',
  FileText: 'description',
  // tasks/checks
  'check-square': 'assignment',
  checksquare: 'assignment',
  CheckSquare: 'assignment',
  // harvest / agriculture
  wheat: 'agriculture',
  Wheat: 'agriculture',
  // user/profile
  user: 'person',
  User: 'person',
  // home
  home: 'home',
  Home: 'home',
};

export default function Icon({name = 'circle', size = 20, color = '#000', style}: Props) {
  const strokeWidth = Math.max(1, Math.round(size / 14));
  const rawName = String(name || '');

  // try lucide as provided
  if (Lucide) {
    // 1) try exact
    if ((Lucide as any)[rawName]) {
      const Comp = (Lucide as any)[rawName];
      return <Comp color={color} size={size} strokeWidth={strokeWidth} style={style as any} />;
    }

    // 2) try PascalCase conversion (e.g. 'file-text' -> 'FileText')
    const pascal = toPascalCase(rawName);
    if (pascal && (Lucide as any)[pascal]) {
      const Comp = (Lucide as any)[pascal];
      return <Comp color={color} size={size} strokeWidth={strokeWidth} style={style as any} />;
    }

    // 3) try lowercase first char Pascal (some packages export with capitalized names)
    const alt = pascal.charAt(0).toUpperCase() + pascal.slice(1);
    if (alt && (Lucide as any)[alt]) {
      const Comp = (Lucide as any)[alt];
      return <Comp color={color} size={size} strokeWidth={strokeWidth} style={style as any} />;
    }
  }

  // fallback to MaterialIcons with a mapping for common names
  if (VectorIcon) {
    const mapped = MATERIAL_FALLBACK_MAP[rawName] ?? MATERIAL_FALLBACK_MAP[toPascalCase(rawName)] ?? rawName;
    try {
      return <VectorIcon name={mapped} size={size} color={color} style={style as any} />;
    } catch (e) {
      // continue to SVG/emoji fallback
    }
  }

  if (Svg && Circle) {
    return (
      <Svg width={size} height={size} style={style as any} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
      </Svg>
    );
  }

  const fallbackMap: Record<string, string> = {
    home: '🏠',
    task: '📋',
    harvest: '🌾',
    request: '📨',
    profile: '👤',
    scan: '🔍',
    check: '✅',
    menu: '☰',
  };
  const glyph = fallbackMap[rawName] ?? '•';
  return (
    <Text style={[{fontSize: size, color, lineHeight: size}, style as any]} accessibilityLabel={`icon-${rawName}`}>
      {glyph}
    </Text>
  );
}
