import React from 'react';

type File = {
    name:string,
    type: 'file',
    level:number
}

type Folder = {
    type: 'folder',
    name:string,
    files: File[],
    level:number
}

export type FileSystemItem = File | Folder;

const Files = (props:{files:FileSystemItem[]})=>{
    const { files } = props;
    return <ul>
        {files.map(file=><li key={file.level+file.name+file.type}>
            {file.name}
            <span>open</span>
            <span>close</span>
            <span></span>
        </li>)}
    </ul>
}

export default Files;