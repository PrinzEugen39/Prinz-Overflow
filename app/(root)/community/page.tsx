import CommunityCard from "@/components/cards/CommunityCard";
import CustomPagination from "@/components/shared/CustomPagination";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

export default async function Community({ searchParams }: SearchParamsProps) {
  const { users, isNext, totalPages } = await getAllUsers({
    searchQuery: searchParams.search,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="flex flex-col min-h-full">
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for users"
          otherClasses="flex-1"
        />
        <Filter filters={UserFilters} otherClasses="min-h-[56px] sm:min-w-[170px]" />
      </div>
      <section className="mt-12 flex flex-col flex-1 justify-between">
        {users.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-4 justify-center">
              {users?.map((user) => (
                <CommunityCard key={user._id} user={user} />
              ))}
            </div>
            <div className="mt-12 text-dark100_light900">
              <CustomPagination
                currentPage={searchParams?.page ? +searchParams.page : 1}
                isNext={isNext}
                totalPages={totalPages}
              />
            </div>
          </>
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users found</p>
            <Link href="/signup" className="mt-3 font-bold text-accent-blue">
              Sign up
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
