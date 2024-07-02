"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Loader2 from "./Loader2";

interface IEditDeleteComponent {
  itemId: string;
  type: "question" | "answer";
}

const EditDeleteComponent = ({ itemId, type }: IEditDeleteComponent) => {
  const path = usePathname();
  const router = useRouter();

  function handleEdit() {
    router.push(`/questions/edit/${JSON.parse(itemId)}`);
  }

  const { isPending, mutate } = useMutation({
    mutationFn: ({ itemId, path }: { itemId: string; path: string }) =>
      deleteQuestion({ id: JSON.parse(itemId), path }),
    onError: (error) => {
      console.log(error);
    },
  });

  async function handleDelete() {
    if (type === "question") {
      mutate({ itemId, path });
    } else if (type === "answer") {
      await deleteAnswer({ id: JSON.parse(itemId), path });
    }
  }

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="edit"
          width={20}
          height={20}
          className="cursor-pointer size-4 object-contain"
          onClick={handleEdit}
        />
      )}

      {isPending ? (
        <Loader2 size={20} />
      ) : (
        <Image
          src="/assets/icons/trash.svg"
          alt="delete"
          width={20}
          height={20}
          className="cursor-pointer size-4 object-contain"
          onClick={handleDelete}
        />
      )}
    </div>
  );
};

export default EditDeleteComponent;
