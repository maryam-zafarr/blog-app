import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import CommentForm from "../../components/comments/CommentForm";
import CommentList from "../../components/comments/CommentList";
import Card from "../../components/ui/Card";
import { deletePost } from "../../store/postsSlice";
import { selectUser } from "../../store/userSlice";

const SinglePost = () => {
  const params = useParams();
  const { postId } = params;

  const dispatch = useDispatch();
  const history = useHistory();

  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === Number(postId))
  );

  const currentUser = useSelector(selectUser);

  let isAuthorized = false;

  if (currentUser && currentUser.userId === String(post.userId)) {
    isAuthorized = true;
  }

  const deletePostHandler = (e) => {
    e.preventDefault();
    dispatch(deletePost({ id: postId }));
    history.push("/posts");
  };

  return (
    <div>
      <Card>
        <h2>{post && post.title}</h2>
        <p>{post && post.body}</p>
        {isAuthorized && (
          <>
            <Link to={`/posts/${postId}/edit`} className="btn btn-primary m-2">
              Edit
            </Link>
            <button onClick={deletePostHandler} className="btn btn-danger m-2">
              Delete
            </button>
          </>
        )}
        <CommentForm />
      </Card>
      <CommentList postId={postId} />
    </div>
  );
};

export default SinglePost;
