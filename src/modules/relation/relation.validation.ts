import * as z from "zod"

export const follow ={
 headers:z.strictObject({
    token:z.any()
 }).passthrough(),
 params:z.strictObject({
    id_user:z.any
 })
}
export const unfollow ={
  headers:z.strictObject({
    token:z.any()
 }).passthrough(),
 params:z.strictObject({
    id_user:z.any
 })
}
export const userSearch ={
     headers:z.strictObject({
          token:z.any()
    }).passthrough(),
    query:z.strictObject({
      fname:z.string()
    })
}
export const suggestion ={
    headers:z.strictObject({
          token:z.any()
    }).passthrough()
}
export const privateACC ={
    headers:z.strictObject({
          token:z.any()
    }).passthrough()
}
