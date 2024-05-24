console.log('Content script loaded'); // 确认脚本已加载

function checkAndClickTargetButton() {
  const shadowHost = document.querySelector('public-ai-box');
  if (shadowHost) {
    const shadowRoot = shadowHost.shadowRoot;
    if (shadowRoot) {
      const allInteractiveElements = shadowRoot.querySelectorAll('.container *');
      let targetButton = null;

      // 迭代所有交互元素，找到目标按钮
      allInteractiveElements.forEach((element) => {
        if (element.tagName.toLowerCase() === 'svg') {
          targetButton = element; // 假设目标按钮是 svg 元素，或根据具体情况调整
        }
      });

      if (targetButton) {
        console.log('Target button found'); // 调试信息
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        targetButton.dispatchEvent(event);
        console.log('Target button clicked'); // 调试信息
      } else {
        console.error('Target button not found!');
      }
    }
  }
}

// 监听全局右键点击事件
document.addEventListener('contextmenu', (event) => {
  event.preventDefault(); // 阻止默认的右键菜单显示
  checkAndClickTargetButton(); // 触发目标按钮的点击事件
});
