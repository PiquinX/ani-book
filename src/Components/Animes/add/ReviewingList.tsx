import React, { useState } from 'react';

interface ReviewingListProps {
    parsedTitles: { id: number; title: string; selected: boolean }[];
    onToggleSelection: (id: number) => void;
    onToggleAll: () => void;
    onUpdateTitle: (id: number, newTitle: string) => void;
}

const ReviewingList: React.FC<ReviewingListProps> = ({ parsedTitles, onToggleSelection, onToggleAll, onUpdateTitle }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    return (
        <div className='flex flex-col w-full mt-2 animate-appear-fast flex-1 min-h-0'>
            <div className='flex justify-between items-center bg-[#111] border border-gray-700 rounded p-2 mb-1 flex-shrink-0'>
                <div className='flex items-center gap-3'>
                    <h4 className='text-sm font-semibold text-gray-300'>Review Titles ({parsedTitles.filter(t => t.selected).length}/{parsedTitles.length})</h4>
                </div>
                <button
                    className='text-xs text-blue-500 cursor-pointer hover:text-blue-400 px-2 py-1 rounded hover:bg-white/5 transition-colors'
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleAll();
                    }}
                    type="button"
                >
                    Toggle All
                </button>
            </div>

            <div className='overflow-y-auto w-full min-h-0 h-full bg-[#000000] border border-gray-700 hover:border-noir-blue rounded p-2 pr-2 flex flex-col gap-1 custom-scrollbar focus-within:shadow-[0_0_15px_rgba(30,58,138,0.5)] transition-all'>
                {parsedTitles.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => {
                            if (editingId !== item.id) {
                                onToggleSelection(item.id);
                            }
                        }}
                        className='flex pl-3 pr-2 items-center justify-between group cursor-pointer hover:bg-white/5 p-1 rounded transition-colors'
                    >
                        <div className='flex items-center gap-3 h-[40px] flex-1 min-w-0'>
                            <input
                                type='checkbox'
                                checked={item.selected}
                                onChange={() => {
                                    if (editingId !== item.id) {
                                        onToggleSelection(item.id);
                                    }
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className='w-4 h-4 rounded border-gray-600 cursor-pointer text-noir-blue accent-noir-blue focus:ring-noir-blue bg-[#000000] focus:ring-1 focus:ring-offset-1 focus:ring-offset-[#000000]'
                            />
                            {editingId === item.id ? (
                                <input
                                    type='text'
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
                                    className='bg-transparent border-b border-noir-blue text-sm text-gray-200 focus:outline-none w-full'
                                />
                            ) : (
                                <span className={`text-sm truncate transition-colors ${item.selected ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 line-through'}`}>
                                    {item.title}
                                </span>
                            )}
                        </div>
                        {editingId !== item.id && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingId(item.id);
                                    setEditValue(item.title);
                                }}
                                className='bottom-[2px] relative opacity-0 cursor-pointer group-hover:opacity-100 text-noir-blue hover:text-blue-400 p-1 transition-opacity'
                            >
                                <i className='fa-solid fa-pen text-xs'></i>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewingList;
