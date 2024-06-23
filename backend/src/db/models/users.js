const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      firstName: {
        type: DataTypes.TEXT,
      },

      lastName: {
        type: DataTypes.TEXT,
      },

      phoneNumber: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
      },

      disabled: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      password: {
        type: DataTypes.TEXT,
      },

      emailVerified: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      emailVerificationToken: {
        type: DataTypes.TEXT,
      },

      emailVerificationTokenExpiresAt: {
        type: DataTypes.DATE,
      },

      passwordResetToken: {
        type: DataTypes.TEXT,
      },

      passwordResetTokenExpiresAt: {
        type: DataTypes.DATE,
      },

      provider: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  users.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.users.hasMany(db.activities, {
      as: 'activities_user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.users.hasMany(db.contacts, {
      as: 'contacts_owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.users.hasMany(db.deals, {
      as: 'deals_owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.users.hasMany(db.email_campaigns, {
      as: 'email_campaigns_owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.users.hasMany(db.leads, {
      as: 'leads_owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.users.hasMany(db.reports, {
      as: 'reports_owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.users.hasMany(db.tasks, {
      as: 'tasks_assignee',
      foreignKey: {
        name: 'assigneeId',
      },
      constraints: false,
    });

    //end loop

    db.users.hasMany(db.file, {
      as: 'avatar',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.users.getTableName(),
        belongsToColumn: 'avatar',
      },
    });

    db.users.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.users.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  users.beforeCreate((users, options) => {
    users = trimStringFields(users);

    if (
      users.provider !== providers.LOCAL &&
      Object.values(providers).indexOf(users.provider) > -1
    ) {
      users.emailVerified = true;

      if (!users.password) {
        const password = crypto.randomBytes(20).toString('hex');

        const hashedPassword = bcrypt.hashSync(
          password,
          config.bcrypt.saltRounds,
        );

        users.password = hashedPassword;
      }
    }
  });

  users.beforeUpdate((users, options) => {
    users = trimStringFields(users);
  });

  return users;
};

function trimStringFields(users) {
  users.email = users.email.trim();

  users.firstName = users.firstName ? users.firstName.trim() : null;

  users.lastName = users.lastName ? users.lastName.trim() : null;

  return users;
}
