import React, { useState, useRef, useEffect } from "react";
import Gen from "~/assets/generate.svg";
import Regen from "~/assets/regenerate.svg";
import Insert from "~/assets/insert.svg";
import Chat from "./Chat";
import { BgCard, Overlay } from "./Ui/Background";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasResponse, setHasResponse] = useState(false);
  const dummy =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (event:  React.MouseEvent) => {
    const target = event.target as HTMLElement; // Cast to HTMLElement
    if (target.id === "modal-overlay") {
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

    if (msg) {
      onClose();
      (msg as HTMLDivElement).focus();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <Overlay onClick={handleOverlayClick}>
      <BgCard>
        {chat && (
          <Chat userPrompt={userPrompt} dummy={dummy}/>          
        )}

        <input
          ref={inputRef}
          type="text"
          placeholder="Your prompt"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
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
                  className="h-5"
                />
                <span>Insert</span>
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
                  className="h-6"
                />
                <span>Regenerate</span>
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
                className="h-5"
              />
              <span>Generate</span>
            </button>
          )}
        </div>
      </BgCard>
    </Overlay>
  );
};

export default Modal;
