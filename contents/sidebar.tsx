import { Close, Copy as CopyIcon, DownloadOne } from "@icon-park/react"
import { useStorage } from "@plasmohq/storage/hook"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"

import cssText from "data-text:~style.css"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Sidebar = () => {
  const [noteContent, setNoteContent] = useStorage<string>("note-content", "")
  const [isOpen, setIsOpen] = useStorage<boolean>("sidebar-open", false)
  const [copySuccess, setCopySuccess] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Listen for messages from background script
  useEffect(() => {
    const messageListener = (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      if (message.type === "TOGGLE_SIDEBAR") {
        setIsOpen((prev) => !prev)
        sendResponse({ success: true })
      }
    }

    chrome.runtime.onMessage.addListener(messageListener)

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener)
    }
  }, [setIsOpen])

  useEffect(() => {
    // When the sidebar opens, focus the textarea
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus()
      const textLength = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(textLength, textLength)
    }
  }, [isOpen])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(noteContent || "")
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleExport = () => {
    const timestamp = Date.now()
    const filename = `ez-note-${timestamp}.txt`
    const blob = new Blob([noteContent || ""], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleOpenShortcuts = () => {
    chrome.runtime.sendMessage({ type: "OPEN_SHORTCUTS_PAGE" })
  }

  return (
    <>
      {/* Sidebar - Toggle via extension icon with Slide + Fade animation */}
      <div
        className={`
          fixed top-0 right-0 w-80 h-screen bg-white shadow-xl 
          flex flex-col z-[2147483647] font-sans
          transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
          ${!isOpen ? "pointer-events-none" : "pointer-events-auto"}
        `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h2 className="m-0 text-lg font-semibold text-gray-900">
            Ez Note
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenShortcuts}
              className="px-2.5 py-1.5 bg-transparent border-none rounded cursor-pointer 
                       text-sm text-blue-500 font-medium transition-colors
                       hover:bg-blue-50">
              Shortcut
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 bg-transparent border-none rounded cursor-pointer 
                       flex items-center justify-center transition-colors
                       hover:bg-gray-200">
              <Close theme="outline" size="20" fill="#6b7280" />
            </button>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Start taking notes..."
          className="flex-1 p-4 border-none outline-none resize-none 
                     text-sm leading-relaxed text-gray-700 font-sans"
        />

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-200 flex gap-2">
          <button
            onClick={handleCopy}
            className={`
              flex-1 px-4 py-2.5 border-none rounded-md text-sm font-medium 
              cursor-pointer transition-colors flex items-center justify-center gap-1.5
              ${
                copySuccess
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
            `}>
            <CopyIcon theme="outline" size="16" fill="#ffffff" />
            {copySuccess ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleExport}
            className="flex-1 px-4 py-2.5 bg-amber-500 text-white border-none rounded-md 
                       text-sm font-medium cursor-pointer transition-colors 
                       flex items-center justify-center gap-1.5
                       hover:bg-amber-600">
            <DownloadOne theme="outline" size="16" fill="#ffffff" />
            Export
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
