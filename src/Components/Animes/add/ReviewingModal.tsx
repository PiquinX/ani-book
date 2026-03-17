import React, { useState, useEffect } from 'react';
import { Pen } from "lucide-react";


interface ReviewingModalProps {
    file: File | null;
    parsedTitles: { id: number; title: string; selected: boolean; isNative: boolean }[];
    isProcessing: boolean;
    progress: number;
    total: number;
    errorMSG: string | null;
    onToggleSelection: (id: number) => void;
    onToggleAll: () => void;
    onUpdateTitle: (id: number, newTitle: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

const ReviewingModal: React.FC<ReviewingModalProps> = ({
    file,
    parsedTitles,
    isProcessing,
    progress,
    total,
    errorMSG,
    onToggleSelection,
    onToggleAll,
    onUpdateTitle,
    onConfirm,
    onCancel
}) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const selectedCount = parsedTitles.filter(t => t.selected).length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="relative flex flex-col w-full max-w-2xl max-h-[80vh] bg-[#000000] border border-[#1111FF] shadow-[0_0_15px_rgba(17,17,255,0.6)] rounded-lg overflow-hidden animate-appear-fast">

                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-800 shrink-0 sticky top-0 z-10 bg-[#000000]">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-white">Review Import: {file ? file.name : ''}</h2>
                        <span className="text-sm text-gray-400">Selected: {selectedCount} / Total: {parsedTitles.length} animes found</span>
                    </div>
                </div>

                {/* Body (List) */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <div className="flex justify-end mb-3">
                        <button
                            className="text-xs text-blue-500 cursor-pointer hover:text-blue-400 px-2 py-1 rounded hover:bg-white/5 transition-colors"
                            onClick={onToggleAll}
                            type="button"
                            disabled={isProcessing}
                        >
                            Toggle All
                        </button>
                    </div>

                    <div className="flex flex-col w-full relative">
                        {parsedTitles.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    if (!isProcessing && editingId !== item.id) {
                                        onToggleSelection(item.id);
                                    }
                                }}
                                className="flex pl-3 pr-2 items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded transition-colors"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <input
                                        type="checkbox"
                                        checked={item.selected}
                                        disabled={isProcessing}
                                        onChange={() => {
                                            if (!isProcessing && editingId !== item.id) {
                                                onToggleSelection(item.id);
                                            }
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-4 h-4 rounded border-gray-600 cursor-pointer text-[#1111FF] accent-[#1111FF] focus:ring-[#1111FF] bg-[#000000] focus:ring-1 focus:ring-offset-1 focus:ring-offset-[#000000]"
                                    />
                                    {editingId === item.id ? (
                                        <input
                                            type="text"
                                            value={editValue}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={() => {
                                                if (editValue.trim() !== '') onUpdateTitle(item.id, editValue);
                                                setEditingId(null);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    if (editValue.trim() !== '') onUpdateTitle(item.id, editValue);
                                                    setEditingId(null);
                                                }
                                            }}
                                            autoFocus
                                            className="bg-transparent border-b border-[#1111FF] text-sm text-gray-200 focus:outline-none w-full"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2 min-w-0">
                                            {item.isNative && (
                                                <span className="px-1.5 py-0.5 text-[10px] bg-red-900/40 text-red-400 border border-red-800 rounded font-semibold whitespace-nowrap">
                                                    JP
                                                </span>
                                            )}
                                            <span className={`text-sm truncate transition-colors ${item.selected ? 'text-gray-500 group-hover:text-[#1111FF]' : 'text-gray-600 line-through'} cursor-pointer`}>
                                                {item.title}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {!isProcessing && editingId !== item.id && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingId(item.id);
                                            setEditValue(item.title);
                                        }}
                                        className="bottom-[2px] relative opacity-0 cursor-pointer group-hover:opacity-100 text-[#1111FF] hover:text-blue-400 p-1 transition-opacity"
                                    >
                                        <Pen className="w-3 h-3 shrink-0" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Bar (if processing) */}
                {isProcessing && (
                    <div className="px-4 pb-2">
                        <div className="flex flex-col gap-2 w-full mt-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Processing...</span>
                                <span>{total > 0 ? Math.round((progress / total) * 100) : 0}% ({progress}/{total})</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="h-2.5 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${total > 0 ? (progress / total) * 100 : 0}%`, backgroundColor: '#1111FF' }}
                                ></div>
                            </div>
                            <p className="text-[10px] text-gray-500 text-center mt-1">Fetching metadata & images...</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {errorMSG && (
                    <div className="px-4 pb-2">
                        <div className="text-red-500 text-sm text-center p-2 rounded bg-red-500/10 border border-red-500/20">
                            {errorMSG}
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="flex justify-between gap-3 p-4 border-t border-gray-800 shrink-0 sticky bottom-0 z-10 bg-[#000000]">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isProcessing}
                        className={`duration-200 px-4 py-2 text-sm font-medium rounded border ${isProcessing ? 'border-gray-700 text-gray-600' : 'border-gray-500 text-gray-300 hover:bg-gray-800 cursor-pointer'} transition-all`}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isProcessing || selectedCount === 0}
                        className={`duration-200 px-4 py-2 text-sm font-medium rounded border ${isProcessing || selectedCount === 0
                            ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                            : 'border-[#1111FF] text-[#1111FF] hover:bg-[#1111FF] hover:text-white hover:shadow-[0_0_15px_rgba(17,17,255,0.6)] cursor-pointer'
                            } transition-all`}
                    >
                        {isProcessing ? 'Importing...' : 'Confirm Import'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewingModal;
