import { Close, Copy as CopyIcon, DownloadOne } from "@icon-park/react"
import { useStorage } from "@plasmohq/storage/hook"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const Sidebar = () => {
  const [noteContent, setNoteContent] = useStorage<string>("note-content", "")
  const [isOpen, setIsOpen] = useStorage<boolean>("sidebar-open", false)
  const [copySuccess, setCopySuccess] = useState(false)

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
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "320px",
          height: "100vh",
          backgroundColor: "#ffffff",
          boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          zIndex: 2147483647,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          opacity: isOpen ? 1 : 0,
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: isOpen ? "auto" : "none"
        }}>
          {/* Header */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid #e5e7eb",
              backgroundColor: "#f9fafb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827"
              }}>
              Ez Note
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
              <button
                onClick={handleOpenShortcuts}
                style={{
                  padding: "6px 10px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#3b82f6",
                  fontWeight: 500,
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#eff6ff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}>
                Shortcut
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: "6px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e5e7eb"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}>
                <Close theme="outline" size="20" fill="#6b7280" />
              </button>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Start taking notes..."
            style={{
              flex: 1,
              padding: "16px",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: "14px",
              lineHeight: "1.6",
              color: "#374151",
              fontFamily: "inherit"
            }}
          />

          {/* Action Buttons */}
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: "8px"
            }}>
            <button
              onClick={handleCopy}
              style={{
                flex: 1,
                padding: "10px 16px",
                backgroundColor: copySuccess ? "#10b981" : "#3b82f6",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
              onMouseEnter={(e) => {
                if (!copySuccess) {
                  e.currentTarget.style.backgroundColor = "#2563eb"
                }
              }}
              onMouseLeave={(e) => {
                if (!copySuccess) {
                  e.currentTarget.style.backgroundColor = "#3b82f6"
                }
              }}>
              <CopyIcon theme="outline" size="16" fill="#ffffff" />
              {copySuccess ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={handleExport}
              style={{
                flex: 1,
                padding: "10px 16px",
                backgroundColor: "#f59e0b",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d97706"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f59e0b"
              }}>
              <DownloadOne theme="outline" size="16" fill="#ffffff" />
              Export
            </button>
          </div>
        </div>
    </>
  )
}

export default Sidebar
