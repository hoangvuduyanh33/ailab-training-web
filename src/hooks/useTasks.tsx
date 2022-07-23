import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "src/app/hooks";
import { taskApi } from "src/services";
import { baseUrl } from "src/services/client";
import { userSelector } from "src/store/user";
import { useFetch } from "use-http";
export function useTasks({ taskId }: { taskId?: string }) {
  const { role, userId } = useAppSelector(userSelector);
  console.log("role = ", role, " userId = ", userId, " taskId = ", taskId);
  const [tasks, setTasks] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const promise = useMemo(() => {
    if (taskId) {
      return taskApi.getTasks({
        taskId: taskId
      })
    }
    if (role == "mentor") {
      return taskApi.getTasks({
        mentorId: userId,
      })
    }
    return taskApi.getTasks({
      menteeId: userId
    })
  }, [taskId, userId, role])
  useEffect(() => {
    try {
      if (promise) {
        setLoading(true);
        promise?.then((data) => {
          setTasks(data || []);
        }).finally(() => {
          setLoading(false);
        })
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [taskId, userId, role]);
  return [tasks, isLoading];
}