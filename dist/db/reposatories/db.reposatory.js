export default class dbReposatory {
    model;
    constructor(model) {
        this.model = model;
    }
    async create({ data }) {
        return await this.model.create(data);
    }
    async find({ condition, projection = {} }) {
        return await this.model.findOne(condition, projection);
    }
    async findall({ condition = {}, options = {}, projection = {} }) {
        return await this.model.find(condition)
            .skip(options.skip || 0)
            .sort(options.sort || 0)
            .limit(options.limit || 10);
    }
    async findbyid({ id, options = {} }) {
        return await this.model.findById(id, options);
    }
    async findByIdAndUpdate({ id, updateData, options }) {
        return await this.model.findByIdAndUpdate(id, { $set: updateData }, { returnDocument: "after", runValidators: true });
    }
    async findoneAndUPDATe({ data, updateData }) {
        return await this.model.findOneAndUpdate(data, { $set: updateData }, { returnDocument: "after", runValidators: true });
    }
    async deleteone({ data }) {
        return await this.model.deleteOne(data);
    }
}
//# sourceMappingURL=db.reposatory.js.map