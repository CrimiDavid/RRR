"use client"
import { useEffect, useState } from "react";

const words = ["Creators", "Builders", "Innovators", "Dreamers", "Heroes", "Time Savers"];

export default function TopCreators() {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setIsVisible(true);
            }, 300); // Half of transition duration
        }, 3000); // Change every 2s as intended
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Top</h1>
                <div
                    className={`text-xl font-bold transition-all duration-500 ease-in-out ${
                        isVisible
                            ? 'opacity-100 transform translate-y-0'
                            : 'opacity-0 transform -translate-y-2'
                    }`}
                >
                    {words[index]}
                </div>
        </div>
    );
}