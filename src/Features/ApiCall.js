import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export let ApiCall = createApi({
    reducerPath: 'apicallQuery',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:2000/',
    }),
    endpoints: (builder) => ({
        // All data
        getAllData: builder.query({
            query: () => ({
                url: 'users',
                method: 'GET'
            }),
        }),

        // Add data
        addDataById: builder.mutation({
            query: (Newuser) => ({
                url: "users",
                method: 'POST',
                body: Newuser,
            }),
        }),

        // View data
        viewDataById: builder.query({
            query: (id) => ({
                url: `users/${id}`,
                method: 'GET'
            }),
        }),

        // Edit data

        EditDataById: builder.mutation({
            query: (updateData) => {
                const { id } = updateData
                // console.log("updateData");
                return {
                    url: `users/${id}`,
                    method: 'PUT',
                    body: updateData
                }
            }
        }),

        // Delete data
        DeleteDataById: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE'
            }),
        }),

    })
})

export let { useGetAllDataQuery, useViewDataByIdQuery, useAddDataByIdMutation, useEditDataByIdMutation, useDeleteDataByIdMutation } = ApiCall