import EditProfileForm from "@/components/forms/EditProfileForm";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const EditProfile = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  // console.log(mongoUser);
  // console.log("-------------------------------");
  // console.log(result);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <EditProfileForm userId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default EditProfile;
