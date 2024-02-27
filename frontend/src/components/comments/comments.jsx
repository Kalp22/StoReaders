import styles from "./comments.module.css";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

import { FaComments } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

import CommentsDisplay from "./commentsDisplay";
import ReplyDialog from "./replyDialog";
import MoreDialog from "./moreDialog";
import CommentForm from "./commentForm";

import CommentsLoad from "../loading/commentsLoad";

export default function Comments({ chapterId, commentIds }) {
  const commentsDisplayRef = useRef(null);
  const [user, setUser] = useState({});

  const [commentsToggle, setCommentsToggle] = useState(false);
  const [comments, setComments] = useState([]);

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
  const [moreSkip, setMoreSkip] = useState(0); // Skip value for fetching more comments
  const [isLastPage, setIsLastPage] = useState(false); // Check if the last page of comments has been reached
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1); // Initial page number for comments

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const fetchComments = async () => {
    try {
      if (isLastPage) return;
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
            pageNumber: page,
            moreSkip: moreSkip,
          }),
        }
      );

      const data = await res.json();

      if (!data.status) {
        toast.error(data.message);
        return;
      }

      setComments((prevComments) => [...prevComments, ...data.comments]);
      setIsLastPage(data.isLastPage);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // Delay the execution of fetchComments until after the component is mounted
  const delayFetchComments = () => {
    setTimeout(() => {
      fetchComments();
    }, 0);
  };

  useEffect(() => {
    if (commentsToggle) {
      delayFetchComments();
    }
  }, [commentsToggle, page]);

  const handleScroll = () => {
    const commentsDisplay = commentsDisplayRef.current;

    commentsDisplay &&
    commentsDisplay.scrollHeight - commentsDisplay.scrollTop <=
      commentsDisplay.clientHeight + 10 &&
    !isLastPage
      ? // User is near the bottom, fetch more comments
        setPage((prevPage) => prevPage + 1)
      : null;
  };

  useEffect(() => {
    const commentsDisplay = commentsDisplayRef.current;
    if (commentsDisplay) {
      commentsDisplay.addEventListener("scroll", handleScroll);

      return () => {
        commentsDisplay.removeEventListener("scroll", handleScroll);
      };
    }
  }, [commentsDisplayRef, handleScroll]);

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

      setComments([data.updatedComment, ...comments]);
      setMoreSkip((prevSkip) => prevSkip + 1);

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

      if (!reply || !commentId) {
        toast.warning("Invalid reply or comment ID");
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

      // Update commentReplies
      setCommentReplies((prevReplies) => ({
        ...prevReplies,
        [commentId]: [...(prevReplies[commentId] || []), data.updatedReply],
      }));

      // Update comments and set showReplies to true for all comments with replies
      const updatedComments = comments.map((c) =>
        c._id === commentId
          ? {
              ...c,
              replies: c.replies.length
                ? [...c.replies, data.updatedReply]
                : [data.updatedReply],
              replyId: c.replyId.length
                ? [...c.replyId, data.updatedReply._id]
                : [data.updatedReply._id],
              showReplies: true,
            }
          : c
      );

      setComments(updatedComments);

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
          (comment) => comment._id != data.commentId
        );

        toast.success(data.message);
        setComments(updatedComments);

        // Remove the deleted comment's replies from commentReplies
        setCommentReplies((prevReplies) => {
          const newReplies = { ...prevReplies };
          delete newReplies[deleteId.id];
          return newReplies;
        });

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

        if (data.message !== "Reply deleted") {
          toast.error(data.message);
          const dialog = document.querySelector("#moreDialog");
          dialog.close();
          return;
        }

        toast.success(data.message);

        // Remove the deleted reply from commentReplies
        setCommentReplies((prevReplies) => ({
          ...prevReplies,
          [deleteId.commentId]: prevReplies[deleteId.commentId].filter(
            (r) => r._id !== deleteId.id
          ),
        }));

        const updatedComments = comments.map((c) =>
          c._id === deleteId.commentId
            ? {
                ...c,
                replies: c.replies.filter((r) => r._id !== deleteId.id),
                replyId: c.replyId.filter((id) => id !== deleteId.id),
              }
            : c
        );

        setComments(updatedComments);

        const dialog = document.querySelector("#moreDialog");
        dialog.close();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkCanDelete = () => {
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
            ref={commentsDisplayRef}
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
            isLastPage={isLastPage}
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
