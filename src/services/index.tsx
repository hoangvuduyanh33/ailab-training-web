import axios from "axios";
import axiosClient from "./client";
import { CreateMenteeParams, CreateMentorParams, GetMenteeParams, GetMentorParams, SignInParams, SignUpParams } from "./params";


const authApi = {
  signUp: (params: SignUpParams) => axiosClient.post("/auth/signup", params),
  signIn: (params: any) => axiosClient.get("/auth/signin", params),
  syncUser: (params: any) => axiosClient.get("/auth/user", params)
}

const userApi = {
  getMentee: (params: GetMenteeParams) => axiosClient.get(`/mentee?mentorId=${params.mentorId || ""}&mentorEmail=${params.mentorEmail || ""}&menteeId=${params.menteeId || ""}&menteeEmail=${params.menteeEmail || ""}&taskId=${params.taskId || ""}`),
  getMentor: (params: GetMentorParams) => axiosClient.get(`/mentor?mentorId=${params.mentorId || ""}&mentorEmail=${params.mentorEmail || ""}&menteeId=${params.menteeId || ""}&menteeEmail=${params.menteeEmail || ""}`),
  getAdmin: (params: any) => axiosClient.get("/admin", params),
  createMentor: (params: CreateMentorParams) => axiosClient.post("/mentor", params),
  createMentee: (params: CreateMenteeParams) => axiosClient.post("/mentee", params),
  fetchUserInfo: (params: any) => axiosClient.get(`/user?userEmail=${params.userEmail}`)
}

const taskApi = {
  getTasks: (params: any) => axiosClient.get(`/task?taskId=${params?.taskId || ""}&menteeId=${params.menteeId || ""}&mentorId=${params.mentorId || ""}`),
  createTask: (params: any) => axiosClient.post(`/task`, params),
  assignTask: (params: any) => axiosClient.post(`/task/assign`, params)
}


const submissionApi = {
  getSubmissions: (params: any) => axiosClient.get(`/submission?taskId=${params?.taskId || ""}&mentorId=${params.mentorId || ""}&menteeId=${params.menteeId || ""}&submissionId=${params.submissionId || ""}`),
  submitSubmission: (params: any) => axiosClient.post("/submission", params),
  scoring: (params: any) => axiosClient.post("/grading", params)
}

const questionApi = {
  getQuestions: (params: any) => axiosClient.get(`/question?questionId=${params.questionId || ""}&taskId=${params.taskId || ""}`),
  createQuestion: (params: any) => axiosClient.post(`/question`, params),
}
const replyApi = {
  createReply: (params: any) => axiosClient.post(`/reply`, params)
}

const mangageApi = {
  assign: (params: any) => axiosClient.post(`/manage?menteeId=${params.menteeId || ""}&mentorId=${params.mentorId}`)
}


export {
  authApi,
  userApi,
  taskApi,
  mangageApi,
  submissionApi,
  replyApi,
  questionApi
};