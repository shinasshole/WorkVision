import './globals.css';
import type { Metadata } from 'next';
import { SidebarProvider } from '../contexts/SidebarContext';

export const metadata: Metadata = {
  title: 'WorkVision - 업무 비전 공유 플랫폼',
  description: '팀 내 업무현황을 실시간으로 공유하고 소통할 수 있는 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
