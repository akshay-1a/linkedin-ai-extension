import React from 'react';


interface Overlay {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent) => void;
}

export function Overlay({ children, onClick }: (Overlay)) {
    return (
        <div onClick={onClick}
            id="modal-overlay"
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        >
            {children}
        </div>
    );
};


export function BgCard({ children }: { children: React.ReactNode }) {

    return (
            <div
                className="bg-white rounded-2xl p-6 w-full md:max-w-md lg:max-w-[43rem] 
                  shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] -translate-x-11"
                onClick={(e) => {
                    e.stopPropagation();
                }}
                contentEditable="false"
            >
                {children}
            </div>
    );
};
