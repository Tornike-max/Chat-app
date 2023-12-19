import { SubmitHandler, useForm } from "react-hook-form";
import { useGetInfo } from "../reactQuery/useGetInfo";
import { useCreateMessage } from "../reactQuery/useCreateMessage";
import Spinner from "../ui/Spinner";
import { useDeleteMessage } from "../reactQuery/useDeleteMessage";
import { HiOutlineTrash } from "react-icons/hi2";
import Header from "../components/Header";
import { useUser } from "../context/UserAuthContext";

type SubmitType = {
  body: string;
};

export default function Room() {
  const { user, loading } = useUser();
  const { register, handleSubmit, reset } = useForm<SubmitType>();
  const { create, isCreating } = useCreateMessage();
  const { deleteMessage, idDeleting } = useDeleteMessage();
  const { data, isPending } = useGetInfo();

  if (isPending || isPending || idDeleting || loading) return <Spinner />;

  const onSubmit: SubmitHandler<SubmitType> = (data) => {
    const dataObj = {
      body: data.body,
      user_id: user?.$id && user?.$id,
      username: user?.name && user?.name,
    };

    create({ dataObj });
    reset();
  };

  function handleDelete(id: string) {
    if (!id) return;
    deleteMessage(id);
  }
  return (
    <main className="container">
      <Header />
      <div className="room--container">
        <form onSubmit={handleSubmit(onSubmit)} className="message--form">
          <div>
            <textarea
              maxLength={1000}
              placeholder="Say something..."
              {...register("body", {
                required: true,
                validate: (value) => value.length < 1000,
              })}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <button disabled={isCreating} type="submit" className="btn">
              {isCreating ? <Spinner /> : "Send"}
            </button>
          </div>
        </form>
        <div>
          {data?.map((message) => (
            <div className="message--wrapper" key={message.$id}>
              <div className="message--header">
                <p>
                  <span>
                    {message?.username ? message.username : "Anonymous User"}
                  </span>
                  <small className="message-timestamp">
                    {new Date(message.$createdAt).toDateString()}
                  </small>
                </p>

                {message.$permissions.includes(
                  `delete("user:${user?.$id}")`
                ) && (
                  <span
                    onClick={() => handleDelete(message.$id)}
                    className="delete--btn"
                  >
                    {idDeleting ? <Spinner /> : <HiOutlineTrash />}
                  </span>
                )}
              </div>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
