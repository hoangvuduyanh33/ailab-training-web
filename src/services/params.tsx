export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  firstName: string;
  lastName: string;
  class: string;
  phoneNumber: string;
}

export interface CreateMentorParams {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface CreateMenteeParams {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  class: string;
}

export interface GetMenteeParams {
  mentorId?: string;
  menteeId?: string;
  mentorEmail?: string;
  menteeEmail?: string
}


export interface GetMentorParams {
  mentorId?: string;
  menteeId?: string;
  mentorEmail?: string;
  menteeEmail?: string
}

export interface FetchUserInfoParams {
  userEmail: string;
}
