import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faReply,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import './Comment.css';
import Avatar from "../Avatar";
import CommentEditor from "./CommentEditor";

import useCommentService from '../../services/useCommentService';

const Comment = ({ user_id, comment = {}, onSubmitComment, level = 0 }) => {
    const { id, name, message, response = [], time = "now", user = {} } = comment;
    const [replyingTo, setReplyingTo] = useState(false);
    const [replyMessage, setReplyMessage] = useState({
        message: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editMessage, setEditMessage] = useState(comment.message);

    const handleReplyClick = () => {
        setReplyingTo(!replyingTo); 
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

    const handleEditSubmit = async () => {
        if (!editMessage.trim()) return;

        const result = await onSubmitComment({
            parent_id: null,
            comment: editMessage,
            comment_id: id,
        });

        if (result.success) {
            setIsEditing(false);
        } else {
            console.error("Failed to put reply:", result.error || result.message);
        }

    };
    
    return (
        <div className="comment" style={{ marginLeft: `${level * 24}px` }}>
            <Avatar name={user.name} />
            <div className="comment-content">
            <div className="comment-name">{name}</div>
            <div className="comment-time">{time}</div>
            {isEditing ? (
                <CommentEditor
                    value={editMessage}
                    onChange={setEditMessage}
                    onSubmit={handleEditSubmit}
                    onCancel={() => setIsEditing(false)}
                />
                ) : (
                <div
                    className="comment-message"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
                )}

                <div className="comment-actions">
                    {replyingTo && !isEditing ? (
                        <CommentEditor
                        value={replyMessage.message}
                        onChange={handleReplyMessage}
                        onSubmit={handleSubmitReply}
                        onCancel={() => setReplyingTo(false)}
                        />
                    ) : null}

                    {!isEditing && !replyingTo && (
                        <>
                        <FontAwesomeIcon
                            icon={faReply}
                            title="Reply"
                            onClick={handleReplyClick}
                        />
                        {user_id === user.id && (
                            <FontAwesomeIcon
                            icon={faPenToSquare}
                            title="Edit"
                            onClick={() => setIsEditing(true)}
                            />
                        )}
                        </>
                    )}
                </div>

            {response.length > 0 && (
                <div className="comment-replies">
                {response.map((reply) => (
                    <Comment key={reply.id} user_id={user_id} comment={reply} onSubmitComment={onSubmitComment} level={level + 1} />
                ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default Comment;
