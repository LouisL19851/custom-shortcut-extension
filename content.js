console.log('Content script loaded'); // 确认脚本已加载

// 监听右键点击事件
document.addEventListener('contextmenu', (event) => {
  event.preventDefault(); // 阻止默认的右键菜单
  window.history.back(); // 执行回退操作
});

// 现有的代码保持不变
function checkAndClickTargetButton() {
  const shadowHost = document.querySelector('public-ai-box');
  if (shadowHost) {
    const shadowRoot = shadowHost.shadowRoot;
    if (shadowRoot) {
      const targetButton = shadowRoot.querySelector('svg');
      if (targetButton) {
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        targetButton.dispatchEvent(event);
      }
    }
  }
}

// 使用 MutationObserver 监听目标按钮的加载
const observer = new MutationObserver(() => {
  checkAndClickTargetButton();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 初始调用以防按钮已存在
checkAndClickTargetButton();
