const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true    
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aggregateLikes: {
      type: DataTypes.INTEGER,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    analyzedInstructions:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    dishTypes: {
      type: DataTypes.ENUM("main course","side dish","dessert", "appetizer","salad","bread","breakfast","soup","beverage","sauce","marinade","fingerfood","snack","drink"),
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdDb:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }

  });
};

// Puntuación
// Nivel de "comida saludable" ---- healthScore
// Paso a paso ---- instructions