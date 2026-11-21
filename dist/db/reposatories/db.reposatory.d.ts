import { Model, ProjectionType, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";
export default abstract class dbReposatory<t> {
    readonly model: Model<t>;
    constructor(model: Model<t>);
    create({ data }: {
        data: Partial<t>;
    }): Promise<import("mongoose").IfAny<t, any, import("mongoose").Document<unknown, {}, t, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<t> & {
        __v: number;
    } & import("mongoose").AddDefaultId<t, {}, import("mongoose").DefaultSchemaOptions>>>;
    find({ condition, projection }: {
        condition: QueryFilter<t>;
        projection?: ProjectionType<t>;
    }): Promise<import("mongoose").IfAny<t, any, import("mongoose").Document<unknown, {}, t, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<t> & {
        __v: number;
    } & import("mongoose").AddDefaultId<t, {}, import("mongoose").DefaultSchemaOptions>> | import("mongoose").ProjectedHydratedDocument<t, import("mongoose").ExclusionProjection<t> & import("mongoose").AnyObject, {}, {}, {}> | import("mongoose").ProjectedHydratedDocument<t, import("mongoose").InclusionProjection<t> & import("mongoose").AnyObject, {}, {}, {}> | null>;
    findall({ condition, options }: {
        condition: QueryFilter<t>;
        options?: QueryOptions<t>;
    }): Promise<import("mongoose").IfAny<t, any, import("mongoose").Document<unknown, {}, t, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<t> & {
        __v: number;
    } & import("mongoose").AddDefaultId<t, {}, import("mongoose").DefaultSchemaOptions>>[]>;
    findbyid({ id, options }: {
        id: any;
        options?: QueryOptions<t>;
    }): Promise<import("mongoose").IfAny<t, any, import("mongoose").Document<unknown, {}, t, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<t> & {
        __v: number;
    } & import("mongoose").AddDefaultId<t, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    findByIdAndUpdate({ id, updateData }: {
        id: any;
        updateData: UpdateQuery<t>;
    }): Promise<import("mongoose").IfAny<t, any, import("mongoose").Document<unknown, {}, t, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<t> & {
        __v: number;
    } & import("mongoose").AddDefaultId<t, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    findoneAndUPDATe({ data, updateData }: {
        data: QueryFilter<t>;
        updateData: UpdateQuery<t>;
    }): Promise<import("mongoose").IfAny<t, any, import("mongoose").Document<unknown, {}, t, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<t> & {
        __v: number;
    } & import("mongoose").AddDefaultId<t, {}, import("mongoose").DefaultSchemaOptions>> | null>;
}
//# sourceMappingURL=db.reposatory.d.ts.map