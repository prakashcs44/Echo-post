import ProfilePreview from "@/components/ProfilePreview";
import PageWrapper from "@/components/layout/PageWrapper";
import Loader from "@/components/ui/Loader";
import { getFollowersApi, getFollowingApi } from "@/redux/api/userApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
function Following() {
  const location = useLocation().pathname.split("/")[3];
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFollowing = location === "following";

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (onFollowing) {
          const data = await getFollowingApi(id);
          setUsers(data.following);
        } else {
          const data = await getFollowersApi(id);
          setUsers(data.followers);
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [onFollowing, id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <PageWrapper>
      <header className="flex  justify-around font-bold text-xl border h-14">
        <Link
          to={`/user/${id}/following`}
          className={`${
            onFollowing && "border-b-4 border-blue-400 "
          } flex items-center hover:bg-slate-100 px-3`}
        >
          Following
        </Link>
        <Link
          to={`/user/${id}/follower`}
          className={`${
            !onFollowing && "border-b-4 border-blue-400 "
          } flex items-center hover:bg-slate-100 px-3`}
        >
          Followers
        </Link>
      </header>
      <div className="space-y-4 mt-4">
        {users?.map((user) => (
          <ProfilePreview
            user={user}
            key={user._id}
            onFollowing={onFollowing}
          />
        ))}

        {users.length === 0 && (
          <h1 className="text-bold text-2xl text-center py-6">
            {onFollowing
              ? "You are currently not following anybody"
              : "You have no followers"}
          </h1>
        )}
      </div>
    </PageWrapper>
  );
}

export default Following;
