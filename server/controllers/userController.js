const ApiError = require("../error/ApiError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket, BasketDevice, Device } = require("../models/models.js");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Некорректный email или password"));
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с таким email уже существует")
        );
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });//создание корзины
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      console.log(e)
      res.status(400).json({
        message: 'Пользователь не создан',
        error: e.message
      });
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);

    if (req.session.basket) {
      let basket = await Basket.findOne({ where: { userId: user.id } });

      if (!basket) {
        try {
          basket = await Basket.create({ userId: user.id });
        } catch (error) {
          if (error.name === 'SequelizeUniqueConstraintError') {
            basket = await Basket.findOne({ where: { userId: user.id } });
          } else {
            return next(ApiError.internal("Ошибка при создании корзины"));
          }
        }
      }

      for (const item of req.session.basket) {
        const existingDevice = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId: item.deviceId } });
        const device = await Device.findByPk(item.deviceId);
        if (!existingDevice && device) {
          await BasketDevice.create({ basketId: basket.id, deviceId: item.deviceId });
        }
      }

      req.session.basket = [];
    }
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
