import {
  exampleQuestion,
  exampleQuestions,
  exampleTask,
  exampleTopQuestions,
} from "./mocking_data";

export const fetchTask = (taskid: string, mocking = false) => {
  if (mocking) {
    console.log("task = ", exampleTask);
    return exampleTask;
  }
};

export const fetchQuestions = (taskid: string, mocking = false) => {
  if (mocking) {
    return {
      questions: exampleQuestions,
      topQuestions: exampleTopQuestions,
    };
  }
};

export const fetchSingleQuestion = (id: string, mocking = false) => {
  if (mocking) {
    return exampleQuestion;
  }
};
