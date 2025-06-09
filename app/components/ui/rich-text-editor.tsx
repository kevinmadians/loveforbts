"use client"

import React, { useState } from 'react'
import { cn } from '@/app/lib/utils'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  error?: boolean
  height?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your story...',
  className,
  error = false,
  height = '300px'
}: RichTextEditorProps) {
  // Basic formatting functions
  const [selectionStart, setSelectionStart] = useState<number | null>(null)
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null)

  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    setSelectionStart(target.selectionStart)
    setSelectionEnd(target.selectionEnd)
  }

  const insertFormatting = (prefix: string, suffix: string = prefix) => {
    if (selectionStart === null || selectionEnd === null) return

    const newText = 
      value.substring(0, selectionStart) + 
      prefix + 
      value.substring(selectionStart, selectionEnd) + 
      suffix + 
      value.substring(selectionEnd)
    
    onChange(newText)
  }

  const formatBold = () => insertFormatting('**')
  const formatItalic = () => insertFormatting('*')
  const formatHeading = () => insertFormatting('## ')
  const formatBulletList = () => {
    if (selectionStart === null || selectionEnd === null) return

    // Get the selected text
    const selectedText = value.substring(selectionStart, selectionEnd)
    
    // Split by new lines and add bullets
    const lines = selectedText.split('\n')
    const bulletedList = lines.map(line => `- ${line}`).join('\n')
    
    const newText = 
      value.substring(0, selectionStart) + 
      bulletedList + 
      value.substring(selectionEnd)
    
    onChange(newText)
  }

  return (
    <div className={cn("rich-text-editor-container", className)}>
      {/* Simple toolbar */}
      <div className="flex items-center space-x-2 p-2 bg-gray-50 border-2 border-black rounded-t-lg">
        <button 
          type="button"
          onClick={formatBold}
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button 
          type="button"
          onClick={formatItalic}
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button 
          type="button"
          onClick={formatHeading}
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
          title="Heading"
        >
          H
        </button>
        <button 
          type="button"
          onClick={formatBulletList}
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
          title="Bullet List"
        >
          • List
        </button>
        <div className="text-xs text-gray-500 ml-4">
          Use markdown: **bold**, *italic*, ## heading
        </div>
      </div>
      
      {/* Text area */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleTextareaSelect}
        placeholder={placeholder}
        className={cn(
          "w-full p-4 border-2 border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-black",
          error ? "border-red-500" : "border-black",
        )}
        style={{ 
          height,
          resize: "vertical",
          minHeight: "200px"
        }}
      />

      <div className="mt-2 text-xs text-gray-500">
        <p>Formatting guide:</p>
        <ul className="list-disc pl-5">
          <li>**bold text**</li>
          <li>*italic text*</li>
          <li>## heading</li>
          <li>- bullet point</li>
          <li>[link text](https://example.com)</li>
        </ul>
      </div>
    </div>
  )
} 
