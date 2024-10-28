import "~/assets/tailwind.css";
import ReactDOM from "react-dom/client";
import App from "./App";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],

  main() {
    const checkForMessageInput = () => {
      const msg = document.querySelector('.msg-form__contenteditable');
      if (msg) {
        setupEventListeners(msg);
      } else {
        setTimeout(checkForMessageInput, 1000);
      }
    };

    const setupEventListeners = (msg: Element) => {
      // Global click handler to check for clicks outside
      const handleGlobalClick = (event: MouseEvent) => {
        const container = msg.querySelector('.ai-icon');
        if (!container) return;

        const clickedElement = event.target as Node;

        // Check if click is inside message box or container
        const isClickInsideMsg = msg.contains(clickedElement);
        const isClickInsideContainer = container.contains(clickedElement);

        // Only remove if click is outside both
        if (!isClickInsideMsg && !isClickInsideContainer) {
          container.remove();
          msg.removeAttribute("focused");
          document.removeEventListener('click', handleGlobalClick);
        }
      };

      msg.addEventListener("focus", () => {
        const existingContainer = msg.querySelector('.ai-icon');
        if (!existingContainer) {
          const container = document.createElement("div");
          container.className = "ai-icon absolute right-0 bottom-0 z-10";
          msg.setAttribute("focused", "true");
          msg.appendChild(container);
          const root = ReactDOM.createRoot(container);
          root.render(<App />);

          // Add global click listener when container is created
          document.addEventListener('click', handleGlobalClick);
        }
      });

      // Cleanup function
      const cleanup = () => {
        document.removeEventListener('click', handleGlobalClick);
      };

      // Observer to clean up when message input is removed
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            const removedNodes = Array.from(mutation.removedNodes);
            if (removedNodes.includes(msg as Node)) {
              cleanup();
              observer.disconnect();
            }
          }
        });
      });

      observer.observe(msg.parentElement || document.body, {
        childList: true,
        subtree: true
      });
    };

    checkForMessageInput();
  },
});