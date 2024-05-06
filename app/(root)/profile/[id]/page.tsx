import UserTopAnswersTab from "@/components/profile/UserTopAnswersTab";
import UserTopPostsTab from "@/components/profile/UserTopPostsTab";
import ProfileLinks from "@/components/shared/ProfileLinks";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import moment from "moment";
// import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";

type TUserInfo = {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    bio?: string;
    portofolio?: string;
    username: string;
    email: string;
    picture: string;
    reputation: number;
    saved: any[]; // Replace 'any' with the actual type of the items in the 'saved' array if known
    joinedAt: Date;
    __v: number;
    location?: string;
  };
  totalQuestion: number;
  totalAnswer: number;
};

const ProfileDetails = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const userInfo: TUserInfo = await getUserInfo({ userId: params.id });

  // console.log("USER:", userInfo);

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:gap-6 lg:flex-row">
          <div className="border-4 border-primary-500 rounded-full p-0.5">
            <Image
              src={userInfo.user.picture}
              alt="pfp"
              width={140}
              height={140}
              className="rounded-full object-cover size-24 sm:size-28 lg:size-32 "
            />
          </div>

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {userInfo.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo.user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.portofolio && (
                <ProfileLinks
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portofolio}
                  text="Portofolio"
                />
              )}
              {userInfo.user.location && (
                <ProfileLinks
                  imgUrl="/assets/icons/location.svg"
                  text={userInfo.user.location}
                />
              )}

              <ProfileLinks
                imgUrl="/assets/icons/calendar.svg"
                text={moment(userInfo.user.joinedAt).format(
                  "[Joined, ]MMMM Do YYYY"
                )}
              />
            </div>

            {userInfo.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3 ">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        totalQuestion={userInfo.totalQuestion}
        totalAnswer={userInfo.totalAnswer}
      />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <UserTopPostsTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers">
            <UserTopAnswersTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileDetails;
