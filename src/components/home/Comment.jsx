import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faReply,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import './Comment.css';
import Avatar from "../Avatar";
import ReactQuill from 'react-quill';

import useCommentService from '../../services/useCommentService';

const Comment = ({ comment = {}, onSubmitComment, level = 0 }) => {
    const { id, name, message, response = [], time = "now" } = comment;
    const [replyingTo, setReplyingTo] = useState(false);
    const [replyMessage, setReplyMessage] = useState({
        message: "",
    });

    const { GetComment, DoPostComment } = useCommentService();

    const handleReplyClick = () => {
        setReplyingTo(!replyingTo); // toggle tampil/enggak
    };

    const handleSubmitReply = async () => {
        if (!replyMessage.message.trim()) return;
    
        const result = await onSubmitComment({
            parent_id: id,
            comment: replyMessage.message,
        });
    
        if (result.success) {
            setReplyingTo(false);
            setReplyMessage({ message: "" });
        } else {
            console.error("Failed to post reply:", result.error || result.message);
        }
    };

    const handleReplyMessage = useCallback((val) => {
        setReplyMessage({ message: val });
    }, []);
    
    return (
        <div className="comment" style={{ marginLeft: `${level * 24}px` }}>
            <Avatar name="Mochamad Irfani" />
            <div className="comment-content">
            <div className="comment-name">{name}</div>
            <div className="comment-time">{time}</div>
            <div className="comment-message" dangerouslySetInnerHTML={{ __html: message }}></div> 
            <div className="comment-actions">
                <FontAwesomeIcon icon={faReply} title="Reply"  onClick={handleReplyClick} />
                <FontAwesomeIcon icon={faPenToSquare} title="Edit" />
            </div>
            {replyingTo && (
                <div className="reply-editor" style={{ marginTop: "1rem" }}>
                <ReactQuill 
                    value={replyMessage.message} 
                    onChange={handleReplyMessage}
                    placeholder="Type your reply here..." 
                    theme="snow"
                    className="form-comment-input"
                    />
                <button 
                    onClick={handleSubmitReply} 
                    className="btn-save-comment">
                        Save
                </button>

                <button 
                    onClick={() => setReplyingTo(false)}
                    className="btn-cancel-comment">
                    Cancel
                </button>
                </div>
            )}
    
            {response.length > 0 && (
                <div className="comment-replies">
                {response.map((reply) => (
                    <Comment key={reply.id} comment={reply} onSubmitComment={onSubmitComment} level={level + 1} />
                ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default Comment;
