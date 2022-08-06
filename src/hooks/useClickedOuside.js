import { useRef, useEffect } from "react"; {}

export default function useClickedOutside(callback) {
    let node = useRef();

    useEffect(() => {
        let handler = (event) => {
            if(!node.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return node;
}

