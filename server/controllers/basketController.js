const {
  Basket,
  BasketDevice,
  Device,
  User,
} = require("../models/models.js");

const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");


class BasketController {
  // Метод добавления товаров в корзину 
  async addToBasket(req, res) {
    const { userId, deviceId } = req.body;
    try {
      const token = req.headers['authorization'];
      // const token = req.headers.authorization.split(" ")[1];
      if (!token) {

        if (!req.session.basket) {
          req.session.basket = [];
        }

        const existringDevice = req.session.basket.find(item => item.deviceId === deviceId);

        if (!existringDevice) {
          req.session.basket.push({ deviceId });
        }

        return res.status(201).json(req.session.basket);
      }
      else {
        const user = await User.findByPk(userId);

        if (!user) {
          throw new Error("Пользователь не найден");
        }

        let basket = await Basket.findOne({ where: { userId: user.id } });

        if (!basket) {
          basket = await Basket.create({ userId: user.id });
        }

        const device = await Device.findByPk(deviceId);

        if (!device) {
          throw new Error('Товар не найден');
        }

        const basketDevice = await BasketDevice.create({
          basketId: basket.id,
          deviceId: device.id
        });

        return res.json({
          message: 'Товар добавлен успешно',
          basketDevice
        });

      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: 'Ошибка добавления в корзину',
        error: e.message
      });
    }
  }
}

module.exports = new BasketController();
