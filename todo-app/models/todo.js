'use strict';
const {
  Model
,Op} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User,{
        foreignKey: 'userId'
      })
      // define association here
    } static overdueTodo(userId) {
      return this.findAll({
        where: {
          dueDate: { [Op.lt]: new Date() },
          userId,
        },
        order: [["dueDate", "ASC"]],
      });
    }
    static markAsCompleteditems(userId) {
      return this.findAll({
        where: {
          completed: true,
          userId,
        },
        order: [["id", "ASC"]],
      });
    }

    static duetodayTodo(userId) {
      return this.findAll({
        where: {
          dueDate: { [Op.eq]: new Date() },
          userId,
        },
       
        order: [["dueDate", "ASC"]],
      });
    }

    static duelaterTodo(userId) {
      return this.findAll({
        where: {
          dueDate: { [Op.gt]: new Date() },
          userId,
        },
        order: [["dueDate", "ASC"]],
      });
    }
    static getTodos() {
      return this.findAll({ order: [["id", "ASC"]] });
    }
    static addTodo({title,dueDate,userId}){
      return this.create({title: title,dueDate: dueDate,completed: false,userId})
    }
    static remove(id,userId) {
      return this.destroy({
        where: {
          id,
          userId
        },
      });
    }
    setCompletionStatus(boolean) {
      return this.update({ completed: boolean });
    }
    markAsCompleted() {
      return this.update({ completed: true });
    }
    delete() {
      return this.destroy();
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};