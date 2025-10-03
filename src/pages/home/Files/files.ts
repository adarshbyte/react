import {FileSystemItem} from './index';

const items:FileSystemItem[] = [
    { name: "index.tsx", type: "file", level:0 },
    {
      name: "src",
      type: "folder",
      files: [
        { name: "App.tsx", type: "file",level:2 },
        { name: "App.css", type: "file",level:2 }
      ],
      level:1
    }
  ];
export default items;