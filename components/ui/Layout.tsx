'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-navy-dark">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 lg:w-72 bg-blue-deep border-r border-teal-primary/20 flex-col">
          <div className="p-6 border-b border-teal-primary/20">
            <h1 className="text-2xl font-header font-bold text-white-pure">
              AVA
            </h1>
            <p className="text-sm text-white-pure/70 mt-1 font-body">
              AI Sales Command Center
            </p>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto scrollbar-dark">
            {/* Navigation items */}
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div 
              className="fixed inset-0 bg-navy-dark/80"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative w-64 bg-blue-deep border-r border-teal-primary/20 flex flex-col">
              <div className="p-6 border-b border-teal-primary/20 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-header font-bold text-white-pure">
                    AVA
                  </h1>
                  <p className="text-xs text-white-pure/70 mt-1 font-body">
                    AI Sales Command Center
                  </p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white-pure hover:text-teal-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 p-4 overflow-y-auto scrollbar-dark">
                {/* Navigation items */}
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="md:hidden bg-blue-deep border-b border-teal-primary/20 p-4 flex items-center justify-between">
            <h1 className="text-xl font-header font-bold text-white-pure">
              AVA
            </h1>
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white-pure hover:text-teal-primary transition-colors"
            >
              <Menu size={24} />
            </button>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto scrollbar-dark">
            {children}
          </main>

          {/* Mobile Bottom Navigation */}
          <nav className="md:hidden bg-blue-deep border-t border-teal-primary/20 flex justify-around items-center p-4">
            {/* Bottom nav items */}
          </nav>
        </div>
      </div>
    </div>
  )
}

