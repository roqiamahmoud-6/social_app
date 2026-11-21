import * as z from "zod"

export const follow ={
 headers:z.strictObject({
    token:z.any()
 }),
 params:z.strictObject({
    id_user:z.any
 })
}
export const unfollow ={
  headers:z.strictObject({
    token:z.any()
 }),
 params:z.strictObject({
    id_user:z.any
 })
}
