import React, { useState, useRef, useEffect } from "react";
import Gen from "~/assets/generate.png";
import Regen from "~/assets/Regenerate.png";
import Insert from "~/assets/Insert.png";

const Modal = ({ isOpen, onClose, onGenerate }) => {
  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const inputRef = useRef(null);
  const [hasResponse, setHasResponse] = useState(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target.id === "modal-overlay") {
      onClose();
    }
  };

  const handleGenerate = () => {
    if (inputValue.trim()) {
      setUserPrompt(inputValue);
      setInputValue("");
      setChat(true);
      setHasResponse(true); // Set when we have a response
    }
  };

  const handleInsert = () => {
    const msg = document.querySelector(".msg-form__contenteditable");
    const dummy =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

    if (msg) {
      onClose();
      msg.focus();
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        range.deleteContents();

        const textNode = document.createTextNode(dummy);
        range.insertNode(textNode);

        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);

        const inputEvent = new Event("input", { bubbles: true });
        msg.dispatchEvent(inputEvent);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (hasResponse) {
        // Check hasResponse instead of chat
        handleInsert();
      } else if (inputValue.trim()) {
        // Only generate if there's input
        handleGenerate();
      }
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div
        className="bg-white rounded-2xl p-6 w-full md:max-w-md lg:max-w-[43rem] 
                  shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] -translate-x-11"
        onClick={(e) => e.stopPropagation()}
        contentEditable="false"
      >
        {chat && (
          <div className="mb-4 max-h-[300px] overflow-y-auto">
            <div className="flex justify-end mb-3">
              <div
                className="bg-blue-100 text-blue-900 rounded-lg py-2 px-4 max-w-[80%] select-none pointer-events-none"
                aria-readonly="true"
              >
                {userPrompt}
              </div>
            </div>

            <div className="flex justify-start">
              <div
                className="bg-gray-100 text-gray-900 rounded-lg py-2 px-4 max-w-[80%] select-none pointer-events-none"
                aria-readonly="true"
              >
                Thank you for the opportunity! If you have any more questions or
                if there's anything else I can help you with, feel free to ask.
              </div>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          placeholder="Your prompt"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          //   className="w-full p-2 border rounded-lg mb-4 hover:ring-slate-300 focus:ring-slate-400 focus:outline-none"
          className="w-full p-2 mb-4 rounded-lg ring-gray-400 ring-1 focus:outline-none 
          "
        />

        <div className="flex justify-end gap-2 select-none">
          {chat ? (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleInsert();
                }}
                className="ring-1 ring-gray-500 text-gray-500 flex gap-2 items-center font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out pointer-events-auto user-select-none"
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              >
                <img
                  src={Insert}
                  alt="insert icon"
                  className="h-5 pointer-events-none"
                />
                <span className="pointer-events-none">Insert</span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleGenerate();
                }}
                className="bg-blue-500 flex gap-3 items-center text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out pointer-events-auto user-select-none"
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              >
                <img
                  src={Regen}
                  alt="regenerate icon"
                  className="h-6 pointer-events-none"
                />
                <span className="pointer-events-none">Regenerate</span>
              </button>
            </>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleGenerate();
              }}
              className="bg-blue-500 flex gap-2 items-center text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out pointer-events-auto user-select-none"
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
            >
              <img
                src={Gen}
                alt="generate icon"
                className="h-5 pointer-events-none"
              />
              <span className="pointer-events-none">Generate</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
