import React, { useEffect, useRef } from "react";
    

const DropdownBackground = ({ updateDropdownState }) => {
    const backgroundRef = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (backgroundRef.current.contains(event.target)) {
                updateDropdownState({ isOpen: false });
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    });

    return <div className="dropdown-background" ref={backgroundRef}></div>;
};

export default DropdownBackground;
