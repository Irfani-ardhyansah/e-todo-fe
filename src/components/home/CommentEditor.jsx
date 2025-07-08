import ReactQuill from 'react-quill';

const CommentEditor = ({ value, onChange, onSubmit, onCancel }) => {
    return (
        <div className="reply-editor" style={{ width: "100%" }}>
            <ReactQuill
                value={value}
                onChange={onChange}
                placeholder="Type your reply here..."
                theme="snow"
                className="form-comment-input"
            />
            <button onClick={onSubmit} className="btn-save-comment">
                Save
            </button>
            <button onClick={onCancel} className="btn-cancel-comment">
                Cancel
            </button>
        </div>
    );
};

export default CommentEditor;