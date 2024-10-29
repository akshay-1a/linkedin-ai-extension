import React from 'react';
import Bubble from './Ui/Bubble';


// Define the props type for Chat
type ChatProps = {
    userPrompt: string;
    dummy: string;
};

export default function Chat({ userPrompt, dummy }: ChatProps) {
    return (
        <div className="mb-4 max-h-[300px] overflow-y-auto">
            <Bubble message={userPrompt} isUser={true} />
            <Bubble message={dummy} isUser={false} />
        </div>
    );
}
