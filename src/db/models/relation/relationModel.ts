import mongoose, { Types } from "mongoose";

export interface Irelation{
   follower:Types.ObjectId,
   following:Types.ObjectId,
}
const relationSchema= new mongoose.Schema<Irelation>({
   follower:{
    type:Types.ObjectId,
    required:true,
    ref:"auth"
   },
   following:{
    type:Types.ObjectId,
    required:true,
    ref:"auth"
   },
   
},{
    timestamps:true,
    strictQuery:true
})


export const relationModel =mongoose.models.relation||mongoose.model<Irelation>("relation",relationSchema)