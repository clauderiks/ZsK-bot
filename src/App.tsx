/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SidebarProjectTree } from './components/SidebarProjectTree';
import { SidebarWatsonAnalysis } from './components/SidebarWatsonAnalysis';
import { TerminalOutput } from './components/TerminalOutput';
import { TerminalInput } from './components/TerminalInput';
import { TerminalPerformanceOverlay } from './components/TerminalPerformanceOverlay';
import { AIChatPanel } from './components/AIChatPanel';
import { AuthModal } from './components/AuthModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { GoogleTasksDrawer } from './components/GoogleTasksDrawer';
import { GoogleDocsDrawer } from './components/GoogleDocsDrawer';
import { GoogleChatDrawer } from './components/GoogleChatDrawer';
import { GoogleFormsDrawer } from './components/GoogleFormsDrawer';
import { FileViewerModal } from './components/FileViewerModal';
import { MainMenuDrawer } from './components/MainMenuDrawer';
import {
  CommandHistoryItem,
  WatsonMetrics,
  DeviceSync,
  SavedSession,
  UserProfile,
  PushNotification,
  ProjectFile
} from './types/shell';
import { INITIAL_FILES, executeCommand } from './utils/watsonEngine';
import { exportToPDF, exportToMarkdown, exportToCSV } from './utils/exportUtils';
import { Terminal as TerminalIcon, Folder, Cpu, X, Sparkles } from 'lucide-react';

export default function App() {
  // Command History State
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'cmd_init_1',
      timestamp: '14:02:11',
      cwd: '~/projects/etl',
      command: 'watson run-analysis --db cloudant_prod --depth full',
      status: 'success',
      durationMs: 184,
      output: {
        type: 'json',
        content: 'Connecting to IBM Cloudant instance...\nTriggering Watson ML analysis pipeline...',
        jsonContent: {
          status: 'success',
          cluster: 'cloudant_prod_us_south',
          records_processed: 1402991,
          anomalies_detected: 14,
          ai_confidence: 0.992
        }
      }
    },
    {
      id: 'cmd_init_2',
      timestamp: '14:03:02',
      cwd: '~/projects/etl',
      command: 'watson optimize --dry-run',
      status: 'success',
      durationMs: 95,
      output: {
        type: 'markdown',
        content: `### Watson AI Optimization Preview
- Shard rebalancing ready for 3 Cloudant cluster nodes.
- Suggested command: \`watson prune --duplicates\` to clear 14 anomaly entries.`
      }
    }
  ]);

  // Project Files & Sessions State
  const [files, setFiles] = useState<ProjectFile[]>(INITIAL_FILES);
  const [activeFile, setActiveFile] = useState<ProjectFile | null>(null);
  const [sessions, setSessions] = useState<SavedSession[]>([
    {
      id: 's1',
      name: 'Production_Log',
      timestamp: '2h ago',
      commandCount: 18,
      status: 'synced',
      encryptedHash: '4f88c83e29f34567...b829'
    },
    {
      id: 's2',
      name: 'DB_Migrate_01',
      timestamp: '1d ago',
      commandCount: 42,
      status: 'synced',
      encryptedHash: 'e92fa0129a029318...102a'
    }
  ]);

  // Metrics & Sync State
  const [metrics, setMetrics] = useState<WatsonMetrics>({
    nodeEfficiency: 92,
    queryLatencyMs: 14,
    anomaliesDetected: 14,
    aiConfidence: 0.992,
    recordsProcessed: 1402991,
    activeNodes: 3,
    statusText: 'Optimal'
  });

  const [devices, setDevices] = useState<DeviceSync[]>([
    {
      id: 'd1',
      name: 'Mobile Dashboard Pro',
      type: 'mobile',
      status: 'synced',
      lastSyncTime: '12s ago',
      ipAddress: '192.168.1.42'
    },
    {
      id: 'd2',
      name: 'Tablet_Node_02',
      type: 'tablet',
      status: 'synced',
      lastSyncTime: 'Just now',
      ipAddress: '10.0.0.18'
    }
  ]);

  const [isSyncing, setIsSyncing] = useState(false);

  // User Profile & Security
  const [user, setUser] = useState<UserProfile>({
    username: 'dev-ops-lead',
    role: 'Senior Cloud Engineer',
    authProvider: 'github',
    is2FAEnabled: true,
    repoConnected: 'watson-cloudant-etl'
  });

  // Notifications
  const [notifications, setNotifications] = useState<PushNotification[]>([
    {
      id: 'n1',
      type: 'ai',
      title: 'Watson AI Recommendation',
      message: 'Found 14 duplicate entries in cloudant_v3_log. Run "watson prune --duplicates" to optimize.',
      timestamp: '10:15',
      read: false
    },
    {
      id: 'n2',
      type: 'success',
      title: 'Cloudant Sync Complete',
      message: 'Mobile Dashboard Pro synchronized 1,402,991 records successfully.',
      timestamp: '09:42',
      read: false
    }
  ]);

  // UI Drawer & Modal Visibility
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isGoogleTasksOpen, setIsGoogleTasksOpen] = useState(false);
  const [isGoogleDocsOpen, setIsGoogleDocsOpen] = useState(false);
  const [isGoogleChatOpen, setIsGoogleChatOpen] = useState(false);
  const [isGoogleFormsOpen, setIsGoogleFormsOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [cleanHomeMode, setCleanHomeMode] = useState(true);
  const [mobileTab, setMobileTab] = useState<'terminal' | 'files' | 'watson'>('terminal');

  const outputEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll output
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Periodic Cloudant Sync simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(d => ({ ...d, lastSyncTime: 'Just now' })));
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleExecuteCommand = async (commandStr: string) => {
    const newItem = await executeCommand(commandStr, '~/projects/etl', metrics, setMetrics);

    if (newItem.output.content === 'CLEAR_TERMINAL') {
      setHistory([]);
      return;
    }

    // Check for Export triggers embedded in output
    if (newItem.output.content.startsWith('EXPORT_TRIGGER:')) {
      const format = newItem.output.content.split(':')[1];
      if (format === 'pdf') handleExportPDF();
      else if (format === 'md') handleExportMarkdown();
      else if (format === 'csv') handleExportCSV();

      newItem.output.content = `Exporting report as ${format.toUpperCase()}... File generated.`;
    }

    setHistory(prev => [...prev, newItem]);
  };

  const handleClearTerminal = () => {
    setHistory([]);
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setNotifications(prev => [
        {
          id: `n_${Date.now()}`,
          type: 'success',
          title: 'Manual Cloudant Sync Completed',
          message: 'All device nodes re-indexed with zero latency drop.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        },
        ...prev
      ]);
    }, 1200);
  };

  const handleExportPDF = () => {
    exportToPDF(history, metrics);
  };

  const handleExportMarkdown = () => {
    exportToMarkdown(history, metrics);
  };

  const handleExportCSV = () => {
    exportToCSV(history);
  };

  const handleSaveFile = (fileId: string, newContent: string) => {
    setFiles(prev => prev.map(folder => ({
      ...folder,
      children: folder.children?.map(f => f.id === fileId ? { ...f, content: newContent } : f)
    })));
  };

  const handleNewSession = () => {
    const newSession: SavedSession = {
      id: `s_${Date.now()}`,
      name: `Session_${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      timestamp: 'Just now',
      commandCount: history.length,
      status: 'synced',
      encryptedHash: Math.random().toString(36).substring(2, 18)
    };
    setSessions(prev => [newSession, ...prev]);
  };

  const [activeNavTab, setActiveNavTab] = useState<'chat' | 'diff' | 'logs' | 'rfc'>('chat');
  const [selectedModel, setSelectedModel] = useState<'zsk' | 'ohmaba' | 'openai' | 'gemini' | 'qwen' | 'claude'>('zsk');

  return (
    <div className="flex flex-col h-screen w-screen bg-black text-white font-sans overflow-hidden">
      {/* Top Header */}
      <Header
        user={user}
        notifications={notifications}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenGoogleTasks={() => setIsGoogleTasksOpen(true)}
        onOpenGoogleDocs={() => setIsGoogleDocsOpen(true)}
        onOpenGoogleChat={() => setIsGoogleChatOpen(true)}
        onOpenGoogleForms={() => setIsGoogleFormsOpen(true)}
        onToggleMainMenu={() => setIsMainMenuOpen(true)}
        isSyncing={isSyncing}
        onManualSync={handleManualSync}
        cleanHomeMode={cleanHomeMode}
        activeNavTab={activeNavTab}
        onChangeNavTab={setActiveNavTab}
        onToggleCleanHomeMode={() => setCleanHomeMode(!cleanHomeMode)}
      />

      {/* Main Container */}
      <main className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar - Project Tree (Desktop - only when cleanHomeMode is false) */}
        {!cleanHomeMode && (
          <div className="hidden lg:block h-full shrink-0">
            <SidebarProjectTree
              files={files}
              sessions={sessions}
              selectedFileId={activeFile?.id || null}
              onSelectFile={file => setActiveFile(file)}
              onSelectSession={s => handleExecuteCommand(`watson run-analysis --session ${s.name}`)}
              onExportPDF={handleExportPDF}
              onExportMarkdown={handleExportMarkdown}
              onExportCSV={handleExportCSV}
              onNewSession={handleNewSession}
            />
          </div>
        )}

        {/* Middle Shell Terminal Area */}
        <section className="flex-1 flex flex-col bg-black relative h-full overflow-hidden">
          {/* Desktop view OR Mobile Tabbed views */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Terminal Main View */}
            <div className={`flex-1 flex flex-col h-full overflow-hidden ${mobileTab !== 'terminal' ? 'hidden lg:flex' : 'flex'}`}>
              <div className="hidden lg:block h-full">
                <AIChatPanel selectedModel={selectedModel} onSelectModel={setSelectedModel} />
              </div>
              <div className="lg:hidden flex-1 flex flex-col h-full overflow-hidden">
                <TerminalOutput
                  history={history}
                  outputEndRef={outputEndRef}
                  aiConfidence={metrics.aiConfidence}
                  activeNavTab={activeNavTab}
                />
                <TerminalInput
                  onExecute={handleExecuteCommand}
                  onClear={handleClearTerminal}
                  onToggleGraph={() => handleExecuteCommand('watson run-analysis --db cloudant_prod')}
                  onToggleLogs={() => handleExecuteCommand('cat cloudant_v3_log.json')}
                  historyCommands={history.map(h => h.command)}
                  aiConfidence={metrics.aiConfidence}
                />
              </div>
            </div>


            {/* Mobile Files view */}
            {mobileTab === 'files' && (
              <div className="lg:hidden w-full h-full bg-[#0D1017]">
                <SidebarProjectTree
                  files={files}
                  sessions={sessions}
                  selectedFileId={activeFile?.id || null}
                  onSelectFile={file => {
                    setActiveFile(file);
                    setMobileTab('terminal');
                  }}
                  onSelectSession={s => {
                    handleExecuteCommand(`watson run-analysis --session ${s.name}`);
                    setMobileTab('terminal');
                  }}
                  onExportPDF={handleExportPDF}
                  onExportMarkdown={handleExportMarkdown}
                  onExportCSV={handleExportCSV}
                  onNewSession={handleNewSession}
                />
              </div>
            )}

            {/* Mobile Watson view */}
            {mobileTab === 'watson' && (
              <div className="lg:hidden w-full h-full bg-[#0D1017]">
                <SidebarWatsonAnalysis
                  metrics={metrics}
                  devices={devices}
                  onTriggerQuickCommand={cmd => {
                    handleExecuteCommand(cmd);
                    setMobileTab('terminal');
                  }}
                  encryptedHash="4f88c83e29f34567...b829"
                />
              </div>
            )}
          </div>
        </section>

        {/* Right Sidebar - Watson Analysis (Desktop - only when cleanHomeMode is false) */}
        {!cleanHomeMode && (
          <div className="hidden lg:block h-full shrink-0">
            <SidebarWatsonAnalysis
              metrics={metrics}
              devices={devices}
              onTriggerQuickCommand={handleExecuteCommand}
              encryptedHash="4f88c83e29f34567...b829"
            />
          </div>
        )}
      </main>

      {/* Main Menu 3-Gạch Drawer */}
      <MainMenuDrawer
        isOpen={isMainMenuOpen}
        onClose={() => setIsMainMenuOpen(false)}
        files={files}
        sessions={sessions}
        metrics={metrics}
        user={user}
        cleanHomeMode={cleanHomeMode}
        onToggleCleanHomeMode={() => setCleanHomeMode(!cleanHomeMode)}
        onSelectFile={file => setActiveFile(file)}
        onSelectSession={s => handleExecuteCommand(`watson run-analysis --session ${s.name}`)}
        onExecuteCommand={handleExecuteCommand}
        onExportPDF={handleExportPDF}
        onExportMarkdown={handleExportMarkdown}
        onExportCSV={handleExportCSV}
        onNewSession={handleNewSession}
        onClearTerminal={handleClearTerminal}
        onOpenAuth={() => setIsAuthOpen(true)}
        onManualSync={handleManualSync}
        isSyncing={isSyncing}
        onSetConfidence={(score) => setMetrics(m => ({ ...m, aiConfidence: score }))}
      />

      {/* Auth & Security Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onUpdateUser={updated => setUser(prev => ({ ...prev, ...updated }))}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
      />

      {/* Google Tasks Drawer */}
      <GoogleTasksDrawer
        isOpen={isGoogleTasksOpen}
        onClose={() => setIsGoogleTasksOpen(false)}
      />

      {/* Google Docs Drawer */}
      <GoogleDocsDrawer
        isOpen={isGoogleDocsOpen}
        onClose={() => setIsGoogleDocsOpen(false)}
        terminalHistoryText={history.map(h => `$ ${h.command}\n${h.output.content}`).join('\n\n')}
      />

      {/* Google Chat Drawer */}
      <GoogleChatDrawer
        isOpen={isGoogleChatOpen}
        onClose={() => setIsGoogleChatOpen(false)}
        terminalHistoryText={history.map(h => `$ ${h.command}\n${h.output.content}`).join('\n\n')}
      />

      {/* Google Forms Drawer */}
      <GoogleFormsDrawer
        isOpen={isGoogleFormsOpen}
        onClose={() => setIsGoogleFormsOpen(false)}
      />

      {/* Code / File Viewer Modal */}
      <FileViewerModal
        file={activeFile}
        onClose={() => setActiveFile(null)}
        onSaveFile={handleSaveFile}
      />
    </div>
  );
}
