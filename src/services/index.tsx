import axios from "axios";
import axiosClient from "./client";
import { CreateMenteeParams, CreateMentorParams, GetMenteeParams, GetMentorParams, SignInParams, SignUpParams } from "./params";


const authApi = {
  signUp: (params: SignUpParams) => axiosClient.post("/auth/signup", params),
  signIn: (params: any) => axiosClient.get("/auth/signin", params),
  syncUser: (params: any) => axiosClient.get("/auth/user", params)
}

const userApi = {
  getMentee: (params: GetMenteeParams) => axiosClient.get(`/mentee?mentorId=${params.mentorId || ""}&mentorEmail=${params.mentorEmail || ""}&menteeId=${params.menteeId || ""}&menteeEmail=${params.menteeEmail || ""}`),
  getMentor: (params: GetMentorParams) => axiosClient.get(`/mentor?mentorId=${params.mentorId || ""}&mentorEmail=${params.mentorEmail || ""}&menteeId=${params.menteeId || ""}&menteeEmail=${params.menteeEmail || ""}`),
  getAdmin: (params: any) => axiosClient.get("/admin", params),
  createMentor: (params: CreateMentorParams) => axiosClient.post("/mentor", params),
  createMentee: (params: CreateMenteeParams) => axiosClient.post("/mentee", params),
  fetchUserInfo: (params: any) => axiosClient.get(`/user?userEmail=${params.userEmail}`)
}

const taskApi = {
  getTasks: (params: any) => axiosClient.get("/task", params)
}

const courseApi = {
  getCourses: (params: any) => axiosClient.get("/course", params),
  createCourse: (params: any) => axiosClient.post("/course", params)
}

interface ScoringParams {

}

const submissionApi = {
  getSubmissions: (params: any) => axiosClient.get("/submission", params),
  submitSubmission: (params: any) => axiosClient.post("/submission", params),
  scoring: (params: any) => axiosClient.post("/submission/scoring", params)
}


export {
  authApi,
  userApi,
  taskApi,
  courseApi,
  submissionApi
};