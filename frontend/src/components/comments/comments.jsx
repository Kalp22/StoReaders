import styles from "./comments.module.css";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { FaComments } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

import CommentsDisplay from "./commentsDisplay";
import ReplyDialog from "./replyDialog";
import MoreDialog from "./moreDialog";
import CommentForm from "./commentForm";

import CommentsLoad from "../loading/commentsLoad";

export default function Comments({ chapterId, commentIds }) {
  const [user, setUser] = useState({});

  const [commentsToggle, setCommentsToggle] = useState(false);
  const [timeout, setTimeoutState] = useState(true);
  const [comments, setComments] = useState([
    {
      _id: "",
      commentator: "",
      commentContent: "",
      replies: [],
      showReplies: false,
    },
  ]);

  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [moreCoordinates, setMoreCoordinates] = useState({ top: 0, left: 0 });
  const [commentId, setCommentId] = useState("");
  const [deleteId, setDeleteId] = useState({
    isComment: true,
    id: "",
    commentId: "",
  });
  const [canDelete, setCanDelete] = useState(false);
  const [commentator, setCommentator] = useState("");
  const [content, setContent] = useState("");
  const [commentReplies, setCommentReplies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!commentsToggle) return;
        if (!timeout) return;
        setTimeoutState(false);
        setTimeout(() => {
          setTimeoutState(true);
        }, 15000);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}comments/getAll`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chapterId: chapterId,
              commentIds: commentIds,
            }),
          }
        );
        const data = await res.json();
        if (!data.status) {
          toast.error(data.message);
          return;
        }
        setLoading(false);
        setComments(data.comments);
      } catch (e) {
        console.log(e);
      }
    };
    fetchComments();
  }, [commentsToggle]);

  const getReplies = async (commId, index) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}comments/reply/getAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId: commId,
          }),
        }
      );

      const data = await res.json();

      if (!data.status) {
        toast.error(data.message);
        return;
      }
      const updatedComments = [...comments];
      updatedComments[index].replies = data.replies;
      updatedComments[index].showReplies = !updatedComments[index].showReplies;

      setComments(updatedComments);
      // Populate commentReplies with replies for the specific comment
      setCommentReplies((prevReplies) => ({
        ...prevReplies,
        [commId]: data.replies || [],
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleComment = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        toast.warning("Please login to comment");
        return;
      }

      if (!comment) {
        toast.warning("Please enter the comment");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}comments/add`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            chapterId: chapterId,
            content: comment,
          }),
        }
      );

      const data = await res.json();

      if (data.message) {
        toast.error(data.message);
        return;
      }

      setComments([
        ...comments,
        {
          _id: data.updatedComment._id,
          commentator: data.updatedComment.commentator,
          commentContent: data.updatedComment.commentContent,
          replies: [],
          showReplies: false,
        },
      ]);

      toast.success("Comment added");
      setComment("");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleReply = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        toast.warning("Please login to reply");
        return;
      }

      if (!reply) {
        toast.warning("Please enter the reply");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}comments/reply/add`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            commentId: commentId,
            content: reply,
          }),
        }
      );

      const data = await res.json();

      if (data.message) {
        toast.error(data.message);
        const dialog = document.querySelector("dialog");
        dialog.close();
        return;
      }

      toast.success("Reply added");
      setReply("");

      const dialog = document.querySelector("dialog");
      dialog.close();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        toast.warning("Please login to delete");
        return;
      }

      if (deleteId.isComment) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}comments/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              userId: user.id,
              chapterId: chapterId,
              commentId: deleteId.id,
            }),
          }
        );

        const data = await res.json();

        if (data.message != "Comment deleted") {
          toast.error(data.message);
          const dialog = document.querySelector("#moreDialog");
          dialog.close();
          return;
        }

        const updatedComments = comments.filter(
          (comment) => comment._id != deleteId.id
        );

        toast.success(data.message);
        setComments(updatedComments);

        const dialog = document.querySelector("#moreDialog");
        dialog.close();
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}comments/reply/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              userId: user.id,
              commentId: deleteId.commentId,
              replyId: deleteId.id,
            }),
          }
        );

        const data = await res.json();

        if (data.message != "Reply deleted") {
          toast.error(data.message);
          const dialog = document.querySelector("#moreDialog");
          dialog.close();
          return;
        }

        toast.success(data.message);
        const dialog = document.querySelector("#moreDialog");
        dialog.close();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkCanDelete = () => {
    console.log(commentator, user.username);
    if (!user || user.username != commentator) {
      setCanDelete(false);
    } else {
      setCanDelete(true);
    }
    const dialog = document.querySelector("#moreDialog");
    dialog.showModal();
  };

  const copyText = () => {
    navigator.clipboard.writeText(content);
    toast.success("Text copied");
    const dialog = document.querySelector("#moreDialog");
    dialog.close();
  };

  const toggleComments = () => setCommentsToggle(!commentsToggle);

  return (
    <>
      <div
        id="commentsButton"
        className={
          commentsToggle ? styles.comments_button2 : styles.comments_button
        }
        onClick={toggleComments}
      >
        {commentsToggle ? (
          <IoCloseOutline size={30} />
        ) : (
          <FaComments size={35} />
        )}
      </div>
      <div
        className={
          commentsToggle ? styles.comments_container : styles.no_display
        }
      >
        <div className={styles.comments_header}>
          <div className={styles.comments_title}>Comments</div>
          <div className={styles.line}></div>
        </div>
        {loading ? (
          <CommentsLoad />
        ) : (
          <CommentsDisplay
            comments={comments}
            commentReplies={commentReplies}
            coordinates={setCoordinates}
            moreCoordinates={setMoreCoordinates}
            commentId={setCommentId}
            deleteId={setDeleteId}
            canDelete={setCanDelete}
            commentator={setCommentator}
            content={setContent}
            getReplies={getReplies}
            checkCanDelete={checkCanDelete}
            copyText={copyText}
          />
        )}
        <div className={styles.add_comment}>
          <div className={styles.line}></div>
          <CommentForm
            handleComment={handleComment}
            comment={comment}
            setComment={setComment}
          />
        </div>
      </div>
      <ReplyDialog
        coordinates={coordinates}
        commentId={commentId}
        handleReply={handleReply}
        reply={reply}
        setReply={setReply}
      />
      <MoreDialog
        moreCoordinates={moreCoordinates}
        copyText={copyText}
        canDelete={canDelete}
        handleDelete={handleDelete}
      />
    </>
  );
}
