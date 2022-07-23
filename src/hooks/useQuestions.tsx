import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { questionApi } from "src/services";


export function useQuestions() {
  const { taskId } = useParams();
  const [questions, setQuestions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    questionApi.getQuestions({
      taskId: taskId || "",
    }).then((data: any) => {
      setQuestions(data || []);
      setLoading(false);
    })
  }, [taskId]);
  return [questions, loading];
}

export function useQuestion() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    questionApi.getQuestions({
      questionId: questionId || "",
    }).then((data: any) => {
      setQuestion(data);
      setLoading(false);
    })
  }, [questionId]);
  return [question, loading];
}
