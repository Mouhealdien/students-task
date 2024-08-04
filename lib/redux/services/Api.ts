import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const SERVER_URL = "https://taxiapp.easybooks.me:8283/";
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL,prepareHeaders: (headers, { getState }) => {
    const token = (getState()).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }, }),
  endpoints: (builder) => ({
    getAllStudents: builder.query<unknown, string>({
      query: () => `Student/GetAll`,
    }),

    getStudentById: builder.query<unknown, string>({
      query: (id) => `/Student/GetyId?id=${id}`,
    }),

    AddStudent: builder.mutation({
      query: (data) => ({
        url: "Student/Add",
        method: "POST",
        body: data,
      }),
    }),

    EditStudent: builder.mutation({
      query: (data) => ({
        url: "Student/Edit",
        method: "PUT",
        body: data,
      }),
    }),

    RemoveStudent: builder.mutation({
      query: (id) => ({
        url: "Student/Edit",
        method: "Delete",
        body: id,
      }),
    }),
    

    login: builder.mutation({
      query: (data) => ({
        url: "User/SignIn",
        method: "POST",
        body: data,
      }),
    }),

  }),
})

export const { 
  useGetAllStudentsQuery ,
  useGetStudentByIdQuery,
  useEditStudentMutation,
  useRemoveStudentMutation ,
  useAddStudentMutation ,
  useLoginMutation } = Api