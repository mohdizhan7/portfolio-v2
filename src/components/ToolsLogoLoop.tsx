'use client';

import type { ReactNode } from 'react';
import LogoLoop, { type LogoItem } from './LogoLoop';
import {
  SiPython,
  SiPostman,
  SiJira,
  SiGooglesheets,
  SiMetabase,
  SiClickhouse,
  SiPostgresql,
} from 'react-icons/si';
import { TbFileExcel } from 'react-icons/tb';

// ─── Icon badge helpers ───────────────────────────────────────────────────────

function IconBadge({ icon, color, bg }: { icon: ReactNode; color: string; bg: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 28, height: 28, borderRadius: '50%',
      background: bg, border: `1.5px solid ${color}33`,
      flexShrink: 0, color,
      fontSize: 16,
    }}>
      {icon}
    </span>
  );
}

function TextBadge({ text, color, bg }: { text: string; color: string; bg: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 28, height: 28, borderRadius: '50%',
      background: bg, border: `1.5px solid ${color}33`,
      flexShrink: 0, color,
      fontSize: 9, fontWeight: 800, letterSpacing: '0.02em',
    }}>
      {text}
    </span>
  );
}

// ─── Tool pill node ───────────────────────────────────────────────────────────

function ToolPill({ icon, name }: { icon: ReactNode; name: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 16px 8px 8px',
      border: '1px solid var(--line)',
      borderRadius: 100,
      background: 'var(--bg)',
      flexShrink: 0,
    }}>
      {icon}
      <span style={{
        fontSize: 13, fontWeight: 600,
        color: 'var(--fg)', whiteSpace: 'nowrap',
        letterSpacing: '0.01em',
      }}>
        {name}
      </span>
    </span>
  );
}

// ─── Tool definitions ─────────────────────────────────────────────────────────

const TOOLS: LogoItem[] = [
  {
    node: <ToolPill
      icon={<IconBadge icon={<TbFileExcel />} color="#217346" bg="#E8F5E9" />}
      name="Microsoft Excel"
    />,
  },
  {
    node: <ToolPill
      icon={<TextBadge text="SQL" color="#00758F" bg="#E0F4F8" />}
      name="SQL"
    />,
  },
  {
    node: <ToolPill
      icon={<IconBadge icon={<SiPython />} color="#3776AB" bg="#E3EFF8" />}
      name="Python"
    />,
  },
  {
    node: <ToolPill
      icon={<IconBadge icon={<SiMetabase />} color="#509EE3" bg="#EAF3FC" />}
      name="Metabase"
    />,
  },
  {
    node: <ToolPill
      icon={<IconBadge icon={<SiPostman />} color="#FF6C37" bg="#FFF0EB" />}
      name="Postman"
    />,
  },
  {
    node: <ToolPill
      icon={<TextBadge text="PBI" color="#C8A006" bg="#FDF9E3" />}
      name="Power BI"
    />,
  },
  {
    node: <ToolPill
      icon={<IconBadge icon={<SiGooglesheets />} color="#34A853" bg="#E8F5ED" />}
      name="Google Sheets"
    />,
  },
  {
    node: <ToolPill
      icon={<IconBadge icon={<SiJira />} color="#0052CC" bg="#E6EEFA" />}
      name="Jira"
    />,
  },
  {
    node: <ToolPill
      icon={<IconBadge icon={<SiClickhouse />} color="#FAFF69" bg="#2B2B2B" />}
      name="ClickHouse"
    />,
  },
  {
    node: <ToolPill
      icon={<TextBadge text="SC" color="#8B5CF6" bg="#EDE9FE" />}
      name="Scribe"
    />,
  },
  {
    node: <ToolPill
      icon={<IconBadge icon={<SiPostgresql />} color="#336791" bg="#E8EEF5" />}
      name="PostgreSQL"
    />,
  },
  {
    node: <ToolPill
      icon={<TextBadge text="SE" color="#2563EB" bg="#E6EEFB" />}
      name="Setu"
    />,
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ToolsLogoLoop() {
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
    }}>
      <LogoLoop
        logos={TOOLS}
        speed={40}
        direction="left"
        pauseOnHover
        fade={false}
        logoHeight={44}
        gap={12}
        style={{ padding: '12px 0' }}
      />
    </div>
  );
}
