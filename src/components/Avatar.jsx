import React from "react";

const COLORS = [
    "#FF6B6B", "#4ECDC4", "#FFD93D", "#1A535C", "#FF9F1C",
    "#2EC4B6", "#FF6F61", "#6A0572", "#3D348B", "#FFBF69",
    "#FF1654", "#247BA0", "#70C1B3", "#B2DBBF", "#F3FFBD",
    "#ED6A5A", "#9BC53D", "#5BC0EB", "#E55934", "#FA7921",
    "#17BEBB", "#F6D55C", "#EDC7B7", "#EEE2DC", "#BAB2B5",
    "#6C5B7B", "#355C7D", "#F67280", "#C06C84", "#F8B195",
    "#D7263D", "#3F88C5", "#FFBA49", "#2E294E", "#E71D36",
    "#FF9F1C", "#247BA0", "#70C1B3", "#FFD166", "#06D6A0",
    "#EF476F", "#118AB2", "#073B4C", "#FFB6B9", "#FAE3D9",
    "#BBDED6", "#61C0BF", "#D3BCC0", "#ADA7C9", "#C5D86D"
    ];

const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COLORS[Math.abs(hash) % COLORS.length];
};

const Avatar = ({ name }) => {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    const bg = stringToColor(name);
    
    return (
        <div
        style={{
            backgroundColor: bg,
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 14,
            marginRight: 12,
            flexShrink: 0,
        }}
        >
        {initials}
        </div>
    );
};

export default Avatar;