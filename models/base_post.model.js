export default class BasePost {

  constructor({ sys, fields } = {}) {
    this.id = sys.id;
    this.contentType = sys.contentType.sys.id;
    this.createdAtUTC = sys.createdAt;
    this.updatedAtUTC = sys.updatedAt;
    this.title = fields.title;
    this.slug = fields.slug;
  }

}

