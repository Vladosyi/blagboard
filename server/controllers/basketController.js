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
      if (!token) {
        //TODO: при каких сценраиях может не быть авторизации?

        if (!req.session.basket) {
          req.session.basket = [];
        }

        const existringDevice = req.session.basket.find(item => item.deviceId === deviceId);

        if (!existringDevice) {
          req.session.basket.push({ deviceId });
        }

        return res.status(201).json(req.session.basket);
      } else {
        const user = await User.findByPk(userId);

        if (!user) {
          // TODO: непомню где и от кого слышал про использование throw Error catch,
          //  но в там эту конструкцию сравнивали с goto
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

        // TODO: Вывод текстовых сообщений лучше поностью оставить на фронте,
        //  где они будут обрабатываться в зависимоти от действий пользователя и успешности выполнения ручки
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

  // Метод получения товаров, если токена нет то достаёт товары из сессии,
  // если токен есть вытягивает из basket_devices
  //TODO: Логика запутана, тк тут токен тянем из заголовка, а в функции addToBasket ожидаем пользователя в теле
  // лучше уж прийти к чему то одному, и работать по схожему принципу везде,
  // и не думать какой именно контракт у той или иной ручки
  async getAll(req, res) {
    try {
      const token = req.headers['authorization'];
      if (req.session.basket) {
        let basketClear = [];
        if (!token) {
          for (const item of req.session.basket) {
            const device = await Device.findByPk(item.deviceId);
            if (device) {
              basketClear.push(device)
            }
          }
          return res.json(basketClear);
        } else {
          const Id = jwt.decode(token).id;
          let basket = await BasketDevice.findAll({ where: { basketId: Id } });
          for (const item of basket) {
            const device = await Device.findByPk(item.deviceId);
            if (device) {
              basketClear.push(device)
            }
          }
          return res.json(basketClear);
        }
      } else {
        //TODO: лучше не менять контракты в зависимоти от условий, эту проверку оставь на фронте
        return res.json({
          message: "Корзина пуста",
        })
      }
    } catch (e) {
      console.log(e)
      //TODO: не 500, т.к. 5хх это ошибки что сервер не доступен и тп
      // в этом же случае можно было бы вернуть 4хх, тк сервер обработал ошибку (насколько я понимаю)
      // но не смог найти товар
      return res.status(500).json({
        message: 'Ошибка получения товаров',
        error: e.message
      })
    }
  }
}

module.exports = new BasketController();
