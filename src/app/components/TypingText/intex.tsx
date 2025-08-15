'use client';
import { useEffect, useState } from "react";

export default function TypingText({ text, speed = 100 }: { text: string, speed?: number }) {
    const [index, setIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (!isTyping) return;
        const timeout = setTimeout(() => {
            setIndex(prev => {
                if (prev < text.length) return prev + 1;
                setIsTyping(false);
                return prev;
            });
        }, speed);
        return () => clearTimeout(timeout);
    }, [index, isTyping, text, speed]);

    return (
        <>
            {text.slice(0, index)}
            {isTyping && <span className="animate-blink">|</span>}
        </>
    );
};