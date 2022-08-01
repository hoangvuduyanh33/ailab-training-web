import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";
import { userApi } from "src/services";
import { userSelector } from "src/store/user";

export function useMentees() {
  const [mentees, setMentees] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useAppSelector(userSelector);
  useEffect(() => {
    setLoading(true);
    try {
      console.log("userId = ", userId)
      userApi.getMentee({
        mentorId: userId,
      }).then((data: any) => {
        console.log("data = ", data);
        setMentees(data || []);
      });
    } catch (e) {
      console.log("e = ", e);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  return [mentees, loading];
}