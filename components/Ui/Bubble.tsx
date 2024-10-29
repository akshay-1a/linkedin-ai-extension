// Define the props type for MessageBubble
type BubbleProps = {
    message: string;
    isUser: boolean;
};

export default function Bubble({ message, isUser }: BubbleProps ) {
    const bubbleStyle = isUser
        ? "bg-gray-100 text-gray-900" :
        "bg-blue-100 text-blue-900";

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
            <div
                className={`${bubbleStyle} rounded-lg py-2 px-4 max-w-[80%] select-none pointer-events-none`}
                aria-readonly="true"
            >
                {message}
            </div>
        </div>
    );
};