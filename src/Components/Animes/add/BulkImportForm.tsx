'use client'

import { useSession } from 'next-auth/react'
import { useBulkImport } from '@/hooks/useBulkImport'
import ReviewingModal from './ReviewingModal'
import { FileText } from "lucide-react";


interface Props {
    onSuccess: () => void
}

export default function BulkTxtImportForm({ onSuccess }: Props) {
    const { data: session } = useSession()
    const {
        file,
        isProcessing,
        progress,
        total,
        errorMSG,
        isReviewing,
        parsedTitles,
        handleFileChange,
        toggleTitleSelection,
        toggleAllSelections,
        updateParsedTitle,
        parseFile,
        startImport,
        cancelReview
    } = useBulkImport(session?.user?.email, onSuccess)

    return (
        <div className='w-full sm:w-[80%] h-[90%] flex flex-col pb-4'>
            <h3 className='text-center text-2xl font-semibold text-white mb-6'>Bulk Import <span className='hidden sm:inline'>from TXT</span></h3>

            <div className='flex mb-2 px-4 xs:px-6 sm:px-10 bar h-full overflow-hidden flex-col gap-6 justify-center'>

                <div className={`flex flex-col items-center justify-center w-full transition-all duration-300 ${isReviewing ? 'h-18' : 'h-48'} border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 bg-[#000000]`}>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <div className={`flex flex-col items-center justify-center ${isReviewing ? 'pt-2 pb-2' : 'pt-5 pb-6'}`}>
                            <i className={`fa-solid fa-cloud-arrow-up ${isReviewing ? 'text-2xl mb-1' : 'text-4xl mb-3'} text-gray-400 transition-all`}></i>
                            {!isReviewing ? (
                                <>
                                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-blue-500">Click to upload</span></p>
                                    <p className="text-xs text-gray-500">TXT files only</p>
                                </>
                            ) : (
                                <p className="text-xs text-gray-400"><span className="font-semibold text-blue-500">Upload a different file</span></p>
                            )}
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept=".txt" onChange={handleFileChange} disabled={isProcessing} />
                    </label>
                </div>

                {file && (
                    <div className='flex items-center justify-between p-3 border border-gray-700 rounded bg-[#111]'>
                        <span className='text-sm text-gray-300 truncate'>{file.name}</span>
                        <FileText className="text-blue-500 w-12 h-12 shrink-0" />
                    </div>
                )}

                {errorMSG && !isReviewing && (
                    <div className='text-red-500 text-sm text-center p-2 rounded bg-red-500/10 border border-red-500/20'>
                        {errorMSG}
                    </div>
                )}

                {isReviewing && (
                    <ReviewingModal
                        file={file}
                        parsedTitles={parsedTitles}
                        isProcessing={isProcessing}
                        progress={progress}
                        total={total}
                        errorMSG={errorMSG}
                        onToggleSelection={toggleTitleSelection}
                        onToggleAll={toggleAllSelections}
                        onUpdateTitle={updateParsedTitle}
                        onConfirm={startImport}
                        onCancel={cancelReview}
                    />
                )}
            </div>

            <div className='bg-transparent w-full px-10 mt-auto'>
                {!isReviewing && (
                    <button
                        type="button"
                        onClick={parseFile}
                        disabled={!file || isProcessing}
                        className={`duration-200 cursor-pointer w-full py-2 border-2 font-medium rounded ${!file || isProcessing
                            ? 'border-gray-600 text-gray-600 cursor-not-allowed'
                            : 'hover:bg-noir-blue hover:text-white text-noir-blue border-noir-blue hover:shadow-[0_0_15px_rgba(30,58,138,0.6)] shadow-none transition-all'
                            }`}
                    >
                        {isProcessing ? 'PARSING...' : 'PARSE TXT FILE'}
                    </button>
                )}
            </div>
        </div>
    )
}
