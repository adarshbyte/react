import React from "react";
import delay from "../../utils/delay";

type Comment = {
    text: string,
    id: string,
}
const Practice = () => {
  const [commentText, setCommentText] = React.useState<string>("");
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [saving, setSaving] = React.useState<boolean>(false);
  const handleSave = async () => {
    const tempId = Date.now().toString()
    try {
      setSaving(true);
      setComments((prev) => {
        return [...prev, {id:tempId,text:commentText}];
      });
      await delay(1000);
      let realId='realid'+Date.now().toString();
      setComments(prev=>{
        return prev.map(comment=>{
            if(comment.id===tempId){
                return {
                    ...comment,
                    id:realId,
                }
            }
            return comment;
        })
      })
      // lets say we get real id now
      setSaving(false);
    } catch (err) {
      setSaving(false);
      setComments(prev=>{
        return prev.filter(comment=>{
            return comment.id!==tempId;
        })
      })
    }
  };
  return (
    <div>
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.text} {comment.id}</li>;
        })}
      </ul>
      <textarea
        style={{ padding: "5px", margin: "auto", display: "block" }}
        cols={60}
        rows={15}
        placeholder="enter your comment..."
        value={commentText}
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={saving?()=>{}:handleSave}
        style={{
          display: "block",
          padding: "10px",
          margin: "10px auto",
          background: "lightBlue",
          borderColor: "lightgray",
          cursor: "pointer",
        }}
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
};
export default Practice;
