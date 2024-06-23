const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Email_campaignsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_campaigns = await db.email_campaigns.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        subject: data.subject || null,
        content: data.content || null,
        scheduled_date: data.scheduled_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await email_campaigns.setOwner(data.owner || null, {
      transaction,
    });

    return email_campaigns;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const email_campaignsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      subject: item.subject || null,
      content: item.content || null,
      scheduled_date: item.scheduled_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const email_campaigns = await db.email_campaigns.bulkCreate(
      email_campaignsData,
      { transaction },
    );

    // For each item created, replace relation files

    return email_campaigns;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_campaigns = await db.email_campaigns.findByPk(
      id,
      {},
      { transaction },
    );

    await email_campaigns.update(
      {
        name: data.name || null,
        subject: data.subject || null,
        content: data.content || null,
        scheduled_date: data.scheduled_date || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await email_campaigns.setOwner(data.owner || null, {
      transaction,
    });

    return email_campaigns;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_campaigns = await db.email_campaigns.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of email_campaigns) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of email_campaigns) {
        await record.destroy({ transaction });
      }
    });

    return email_campaigns;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_campaigns = await db.email_campaigns.findByPk(id, options);

    await email_campaigns.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await email_campaigns.destroy({
      transaction,
    });

    return email_campaigns;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const email_campaigns = await db.email_campaigns.findOne(
      { where },
      { transaction },
    );

    if (!email_campaigns) {
      return email_campaigns;
    }

    const output = email_campaigns.get({ plain: true });

    output.owner = await email_campaigns.getOwner({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'owner',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('email_campaigns', 'name', filter.name),
        };
      }

      if (filter.subject) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('email_campaigns', 'subject', filter.subject),
        };
      }

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('email_campaigns', 'content', filter.content),
        };
      }

      if (filter.scheduled_dateRange) {
        const [start, end] = filter.scheduled_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            scheduled_date: {
              ...where.scheduled_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            scheduled_date: {
              ...where.scheduled_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.owner) {
        var listItems = filter.owner.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          ownerId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.email_campaigns.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.email_campaigns.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('email_campaigns', 'name', query),
        ],
      };
    }

    const records = await db.email_campaigns.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
