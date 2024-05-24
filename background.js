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
