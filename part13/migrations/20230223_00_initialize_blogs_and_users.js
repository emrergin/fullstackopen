const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.TEXT
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE
      },
      created_at: {
        type: DataTypes.DATE
      }
    }
    , {
        hooks: {
           beforeCreate: function (blog, options, fn) {
               blog.createdAt = new Date();
               blog.updatedAt = new Date();
               fn(null, blog);
           },
           beforeUpdate: function (blog, options, fn) {
               blog.updatedAt = new Date();
               fn(null, blog);
           }
       }
    }
    )
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{    
          isEmail: true,  
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE
      },
      created_at: {
        type: DataTypes.DATE
      }
    },
    {
      hooks: {
         beforeCreate: function (user, options, fn) {
             user.createdAt = new Date();
             user.updatedAt = new Date();
             fn(null, user);
         },
         beforeUpdate: function (user, options, fn) {
             user.updatedAt = new Date();
             fn(null, user);
         }
     }
    }
    
    )
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}