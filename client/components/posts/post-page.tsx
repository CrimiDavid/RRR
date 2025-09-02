"use client"
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import {Demo} from "@/components/posts/md-parser";

export default function ResizablePanels() {
    return (
        <div className="h-screen">
            <PanelGroup direction="horizontal">
                {/* Left Panel */}
                <Panel defaultSize={50} minSize={20}>
                    <div
                        className="h-full p-4 overflow-auto">
                        <Demo/>
                    </div>

                </Panel>

                {/* Resize Handle */}
                <PanelResizeHandle
                    className="w-0.5 bg-gray-300 hover:bg-gray-400 transition-colors duration-200 relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1 h-8 bg-gray-600 rounded ">
                        </div>
                    </div>
                </PanelResizeHandle>

                {/* Right Panel */}
                <Panel defaultSize={50} minSize={20}>
                    <div className="h-full p-4 overflow-auto">
                        <h1 className="text-2xl font-bold text-green-800 mb-4">Right Panel</h1>

                    </div>
                </Panel>
            </PanelGroup>
        </div>
    );
}