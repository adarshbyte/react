import React from "react";

// 10 MB limit
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const prettyBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"] as const;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${value} ${sizes[i]}`;
};

const dropzoneStyle: React.CSSProperties = {
  border: "2px dashed #9aa0a6",
  borderRadius: 10,
  padding: 20,
  background: "#fafafa",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 10,
  color: "#202124",
  cursor: "pointer",
  transition: "background 0.15s ease, border-color 0.15s ease",
};

const fileListStyle: React.CSSProperties = {
  marginTop: 12,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const fileRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  padding: "8px 10px",
  background: "#fff",
};

const pillStyle: React.CSSProperties = {
  fontSize: 12,
  background: "#eef2ff",
  color: "#1e40af",
  padding: "2px 8px",
  borderRadius: 999,
};

const errorTextStyle: React.CSSProperties = {
  color: "#b91c1c",
  fontSize: 12,
  marginTop: 6,
};

const buttonStyle: React.CSSProperties = {
  background: "#1a73e8",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "8px 12px",
  cursor: "pointer",
};

const subtleText: React.CSSProperties = {
  fontSize: 12,
  color: "#5f6368",
};

const FileUploader: React.FC = ({setData}) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const validateAndMerge = (incoming: File[]) => {
    const nextErrors: string[] = [];

    const valid = incoming.filter((file) => {
      // Enforce PDF only (consistent with previous behavior)
      const isPdf =
        file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) {
        nextErrors.push(`"${file.name}" is not a PDF file.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        nextErrors.push(
          `"${file.name}" exceeds ${prettyBytes(MAX_FILE_SIZE_BYTES)} (size: ${prettyBytes(
            file.size
          )}).`
        );
        return false;
      }
      return true;
    });

    // Merge with any existing files, dedupe by name + size
    const merged = [...files, ...valid].reduce<File[]>((acc, f) => {
      if (!acc.some((x) => x.name === f.name && x.size === f.size)) acc.push(f);
      return acc;
    }, []);

    setFiles(merged);
    setErrors(nextErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    const incoming = Array.from(list);
    validateAndMerge(incoming);
    // reset to allow re-selecting the same file name
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dt = e.dataTransfer;
    const list = dt.files;
    if (!list) return;
    const incoming = Array.from(list);
    validateAndMerge(incoming);
  };

  const removeFile = (name: string, size: number) => {
    setFiles((prev) => prev.filter((f) => !(f.name === name && f.size === size)));
  };

  return (
    <div>
      <label htmlFor="fileUploader" style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
        Upload your file(s)
      </label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        aria-label="File uploader dropzone"
        style={{
          ...dropzoneStyle,
          background: isDragging ? "#eef7ff" : dropzoneStyle.background,
          borderColor: isDragging ? "#1a73e8" : (dropzoneStyle.border as string),
        }}
      >
        <div style={{ fontSize: 14, textAlign: "center" }}>
          Drag & drop PDF files here, or
        </div>
        <button type="button" style={buttonStyle} onClick={() => inputRef.current?.click()}>
          Browse files
        </button>
        <div style={subtleText}>PDF only • Up to 10 MB each</div>
      </div>

      <input
        ref={inputRef}
        type="file"
        id="fileUploader"
        style={{ display: "none" }}
        onChange={handleChange}
        multiple
        accept=".pdf,application/pdf"
      />

      {errors.length > 0 && (
        <div role="alert" style={errorTextStyle}>
          {errors.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div style={fileListStyle}>
          {files.map((f) => (
            <div key={`${f.name}-${f.size}`} style={fileRowStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{f.name}</span>
                <span style={pillStyle}>{prettyBytes(f.size)}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(f.name, f.size)}
                style={{ ...buttonStyle, background: "#e53935" }}
                aria-label={`Remove ${f.name}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
