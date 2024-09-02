import React from 'react'
import Widget from './widget';

const DocumentCreation = ({ setDocumentCreation, setShowPreview }) => {
    return (
        <div>
            <div className=" md:max-w-[794px] w-[350px] md:w-full px-8 flex items-center justify-center bg-white rounded-[12px]">
                <Widget setDocumentCreation={setDocumentCreation} setShowPreview={setShowPreview} />
            </div>
        </div>
    )
}

export default DocumentCreation;