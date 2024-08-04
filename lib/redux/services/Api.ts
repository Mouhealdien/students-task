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
      providesTags: ['Student'],
    }),

    getAllGenders: builder.query<unknown, string>({
      query: () => `Settings/GetAllGenders`,
    }),

    getAllGrades: builder.query<unknown, string>({
      query: () => `Settings/GetAllGrades`,
    }),

    getStudentById: builder.query<unknown, string>({
      query: (id) => `Student/GetyId?id=${id}`,
    }),

    AddStudent: builder.mutation({
      query: (data) => ({
        url: "Student/Add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Student']
    }),

    EditStudent: builder.mutation({
      query: (data) => ({
        url: "Student/Edit",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Student']
    }),

    RemoveStudent: builder.mutation({
      query: (id) => ({
        url: `Student/Remove?id=${id}`,
        method: "Delete",
        body: id,
      }),
      invalidatesTags: ['Student']
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
  useLoginMutation,
  useGetAllGendersQuery,
  useGetAllGradesQuery
} = Api