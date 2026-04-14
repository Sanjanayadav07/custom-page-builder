import React, { useState, useEffect } from "react";

const TextBlock = ({ data = {}, previewMode, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);

    const [value, setValue] = useState(data.content || "");
    const [color, setColor] = useState(data.color || "#000000");
    const [fontSize, setFontSize] = useState(data.fontSize || 16);
    const [bold, setBold] = useState(data.bold || false);
    const [align, setAlign] = useState(data.align || "left");

    useEffect(() => {
        setValue(data.content || "");
        setColor(data.color || "#000000");
        setFontSize(data.fontSize || 16);
        setBold(data.bold || false);
        setAlign(data.align || "left");
    }, [data]);

    const handleSave = () => {
        onUpdate({
            content: value,
            color,
            fontSize,
            bold,
            align,
        });
        setIsEditing(false);
    };

    // 🔍 PREVIEW MODE
    if (previewMode) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow border">
                <p
                    style={{
                        color: data.color || "#000000",
                        fontSize: `${data.fontSize || 16}px`,
                        fontWeight: data.bold ? "bold" : "normal",
                        textAlign: data.align || "left",
                    }}
                    className="whitespace-pre-wrap"
                    onClick={() => setIsEditing(true)}
                >
                    {value || "Start writing your content..."}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow border p-6">
            {isEditing ? (
                <div className="space-y-3">

                    {/* ✏️ TEXTAREA */}
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Start writing your content..."
                        className="w-full min-h-[120px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* 🎛️ CONTROLS */}
                    <div className="flex flex-wrap gap-3 items-center">

                        {/* Color */}
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />

                        {/* Font Size */}
                        <input
                            type="number"
                            value={fontSize}
                            min="10"
                            max="50"
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-16 border px-2 py-1 rounded"
                        />

                        {/* Bold */}
                        <button
                            onClick={() => setBold(!bold)}
                            className={`px-2 py-1 border rounded ${bold ? "bg-gray-300" : ""}`}
                        >
                            B
                        </button>

                        {/* Alignment */}
                        <select
                            value={align}
                            onChange={(e) => setAlign(e.target.value)}
                            className="border px-2 py-1 rounded"
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>

                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-200 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <p
                        style={{
                            color,
                            fontSize: `${fontSize}px`,
                            fontWeight: bold ? "bold" : "normal",
                            textAlign: align,
                        }}
                        className="whitespace-pre-wrap cursor-pointer"
                        onClick={() => setIsEditing(true)}
                    >
                        {value || "Click to edit text..."}
                    </p>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-3 px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm"
                    >
                        Edit Text
                    </button>
                </div>
            )}
        </div>
    );
};

export default TextBlock;