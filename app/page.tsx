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
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Visual Collaboration Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive showcase of multiple implementations for each visualization type.
            Compare different libraries, approaches, and technologies - all styled with Tailwind CSS.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.name}
                href={feature.href}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Built With</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {['Next.js 14+', 'React 18+', 'TypeScript', 'Tailwind CSS', 'Node.js 18+'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>

        {/* Purpose Section */}
        <div className="mt-16 max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
          <p className="text-gray-600 leading-relaxed">
            This project demonstrates <strong>multiple implementations</strong> of each visualization
            type, allowing you to compare different libraries and techniques. Perfect for showing
            your supervisor various technology options and making informed decisions about which
            tools to use for specific project requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
