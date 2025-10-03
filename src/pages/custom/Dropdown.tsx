import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Dropdown = () => {
  const [tags, setTags] = React.useState<string[]>([]);
  const [text, setText] = React.useState<string>("");
  const [error, setError] = React.useState("");

  const handleRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tags.includes(text)) {
        setError("this tag already exists");
      } else if (text.trim()) {
        setTags((prev) => [...prev, text.trim()]);
        setText("");
        setError("");
      }
    }
  };

  return (
    <div
      style={{
        width: "320px",
        minHeight: "120px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Tags box */}
      <div
        style={{
          margin: 0,
          width: "100%",
          minHeight: "50px",
          maxHeight: "80px",
          overflowY: "auto",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "6px",
          padding: "4px",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          backgroundColor: "#fafafa",
        }}
      >
        {tags.map((tag) => (
          <div
            key={tag}
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              borderRadius: "16px",
              padding: "4px 8px",
              fontSize: "14px",
              border: "1px solid #90caf9",
            }}
          >
            <span>{tag}</span>
            <button
              onClick={() => handleRemove(tag)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                marginLeft: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
              }}
            >
              <CloseIcon fontSize="small" color="primary" />
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        type="text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        onKeyDown={handleKeyDown}
        style={{
          marginTop: "8px",
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          outline: "none",
          border: error ? "1px solid red" : "1px solid #ccc",
          fontSize: "14px",
        }}
      />

      {error && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
