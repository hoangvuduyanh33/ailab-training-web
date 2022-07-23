import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";
import { questionApi, submissionApi } from "src/services";
import { userSelector } from "src/store/user";


export function useSubmissions() {
  const { taskId } = useParams();
  const { role, userId } = useAppSelector(userSelector);
  const [submissions, setSubmissions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    submissionApi.getSubmissions({
      taskId: taskId || "",
      menteeId: (role == "mentee") ? userId : "",
      mentorId: (role == "mentor") ? userId : "",
    }).then((data: any) => {
      console.log("data = ", data)
      setSubmissions(data.filter((element: any) => element.menteeId == userId || element.mentorId == userId) || []);
      setLoading(false);
    })
  }, [taskId]);
  return [submissions, loading];
}

export function useSubmission({ submissionId }: { submissionId: string }) {
  const [submission, setSubmission] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    submissionApi.getSubmissions({
      submissionId: submissionId || "",
    }).then((data: any) => {
      setSubmission(data);
      setLoading(true);
    })
  }, [submissionId]);
  return [submission, loading];
}
