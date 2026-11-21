import { Model, ProjectionType, QueryFilter, QueryOptions, UpdateQuery } from "mongoose"

 export default abstract class dbReposatory<t>{


    constructor(public readonly model : Model<t>){}

      async create({data}:{data:Partial<t>}){
          return await this.model.create(data)
        }
       async find({condition,projection= {}}:{condition:QueryFilter<t>,projection?:ProjectionType<t>}){
         return await this.model.findOne(condition,projection)
        }
      async  findall({  condition = {}, options = {} ,projection= {}}:{condition:QueryFilter<t>,options?:QueryOptions<t>,projection?:ProjectionType<t>}) {
         return await this.model.find(condition)
            .skip(options.skip || 0)
            .sort(options.sort || 0)
            .limit(options.limit || 10)
        }
       async findbyid({id,options= {}}:{id:any,options?:QueryOptions<t>}){
          return await this.model.findById(id,options)
        }
       async findByIdAndUpdate({id,updateData,options}:{id:any,updateData: UpdateQuery<t>,options?:QueryOptions<t>}){
           return await this.model.findByIdAndUpdate(id, { $set: updateData },{ returnDocument: "after", runValidators: true })
        }
       async findoneAndUPDATe({data,updateData}:{data:QueryFilter<t>,updateData: UpdateQuery<t>}){
           return await this.model.findOneAndUpdate(data, { $set: updateData },{ returnDocument: "after", runValidators: true })
        }
       async deleteone({data}:{data:QueryFilter<t>}){
           return await this.model.deleteOne(data)
        }




}