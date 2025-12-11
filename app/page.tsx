'use client';

import Link from 'next/link';
import { LayoutGrid, Paintbrush, Workflow, Calendar, Brain, ArrowRight } from 'lucide-react';

export default function Home() {
  const features = [
    {
      name: 'Kanban Boards',
      description: 'Explore 3 different drag-and-drop implementations',
      icon: LayoutGrid,
      href: '/kanban/dnd-kit',
      implementations: ['@dnd-kit', 'react-beautiful-dnd', 'react-dnd'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Whiteboards',
      description: 'Compare 4 interactive whiteboard solutions',
      icon: Paintbrush,
      href: '/whiteboard/excalidraw',
      implementations: ['Excalidraw', 'Tldraw', 'Fabric.js', 'React Konva'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Flowcharts',
      description: 'View 2 approaches to flowchart creation',
      icon: Workflow,
      href: '/flowchart/react-flow',
      implementations: ['React Flow', 'Mermaid'],
      color: 'from-green-500 to-teal-500',
    },
    {
      name: 'Gantt Charts',
      description: 'Evaluate 3 Gantt chart libraries',
      icon: Calendar,
      href: '/gantt/frappe',
      implementations: ['Frappe Gantt', 'DHTMLX', 'Google Charts'],
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Mind Maps',
      description: 'Discover 3 mind mapping techniques',
      icon: Brain,
      href: '/mindmap/markmap',
      implementations: ['Markmap', 'Force Graph', 'Custom React'],
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="min-h-full relative overflow-hidden bg-slate-950">
      {/* Animated Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950"></div>

      {/* Animated Waves */}
      <div className="absolute inset-0 opacity-60">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="particle particle1"></div>
        <div className="particle particle2"></div>
        <div className="particle particle3"></div>
        <div className="particle particle4"></div>
        <div className="particle particle5"></div>
        <div className="particle particle6"></div>
        <div className="particle particle7"></div>
        <div className="particle particle8"></div>
      </div>

      {/* Floating Orbs - Animated */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-6000"></div>

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            Visual Collaboration Platform
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            A comprehensive showcase of multiple implementations for each visualization type.
            Compare different libraries, approaches, and technologies - all styled with Tailwind CSS.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.name}
                href={feature.href}
                className="group bg-white/90 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-blue-200/30 hover:border-blue-400/50 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.implementations.map((impl) => (
                      <span
                        key={impl}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {impl}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tech Stack Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-6">Built With</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {['Next.js 14+', 'React 18+', 'TypeScript', 'Tailwind CSS', 'Node.js 18+'].map(
              (tech, index) => (
                <span
                  key={tech}
                  className="px-5 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 hover:scale-110 animate-fade-in shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>

        {/* Purpose Section */}
        <div className="mt-16 mb-32 max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-blue-200/50 hover:border-blue-400/60 transition-all duration-500 animate-fade-in">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">Purpose</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            This project demonstrates <strong className="text-blue-600">multiple implementations</strong> of each visualization
            type, allowing you to compare different libraries and techniques. Perfect for evaluating
            various technology options and making informed decisions about which
            tools to use for specific project requirements.
          </p>
        </div>
      </div>

      {/* Footer on Waves */}
      <footer className="relative z-20 mt-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Section */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-2">
                Visual Collaboration Platform
              </h3>
              <p className="text-blue-200 text-sm">
                Comparing multiple technologies for better decisions
              </p>
            </div>

            {/* Center Section - Tech Stack Icons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-lg text-xs font-medium text-blue-100 hover:bg-white/20 transition-all">
                Next.js
              </span>
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-cyan-400/30 rounded-lg text-xs font-medium text-cyan-100 hover:bg-white/20 transition-all">
                React
              </span>
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-lg text-xs font-medium text-blue-100 hover:bg-white/20 transition-all">
                TypeScript
              </span>
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-cyan-400/30 rounded-lg text-xs font-medium text-cyan-100 hover:bg-white/20 transition-all">
                Tailwind CSS
              </span>
            </div>

            {/* Right Section */}
            <div className="text-center md:text-right">
              <p className="text-blue-200 text-sm mb-1">
                Developed by <span className="font-bold text-blue-100">Ransika Silva</span>
              </p>
              <p className="text-blue-300 text-xs">
                for OCTAVE Design Purposes
              </p>
              <p className="text-blue-400 text-xs mt-2">
                © 2025 All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
