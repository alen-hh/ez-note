export {}

// Listen for extension icon clicks
chrome.action.onClicked.addListener(async (tab) => {
  // Send message to the active tab to toggle the sidebar
  if (tab.id) {
    try {
      await chrome.tabs.sendMessage(tab.id, {
        type: "TOGGLE_SIDEBAR"
      })
    } catch (error) {
      console.log("Could not send message to tab:", error)
    }
  }
})

// Listen for keyboard shortcut command
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-sidebar") {
    // Get the active tab and send toggle message
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab.id) {
      try {
        await chrome.tabs.sendMessage(tab.id, {
          type: "TOGGLE_SIDEBAR"
        })
      } catch (error) {
        console.log("Could not send message to tab:", error)
      }
    }
  }
})

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "OPEN_SHORTCUTS_PAGE") {
    chrome.tabs.create({
      url: "chrome://extensions/shortcuts"
    })
    sendResponse({ success: true })
  }
  return true
})

console.log("Ez Note background service worker loaded")
