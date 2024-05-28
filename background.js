let isEnabled = true;

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-extension") {
    isEnabled = !isEnabled;
    if (isEnabled) {
      console.log("Extension enabled");
      chrome.scripting.registerContentScripts([{
        id: 'content_script',
        matches: ['<all_urls>'],
        js: ['content.js'],
        runAt: 'document_idle'
      }]);
    } else {
      console.log("Extension disabled");
      chrome.scripting.unregisterContentScripts({ ids: ['content_script'] });
    }
  }
});

// Add a context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "goBack",
    title: "Go Back",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "goBack") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => window.history.back()
    });
  }
});
