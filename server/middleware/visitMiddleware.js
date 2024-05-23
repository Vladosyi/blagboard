const { Device } = require('../models/models')

module.exports = async function (req, res, next) {
    const { id } = req.params;
    try {
        const device = await Device.findOne({ where: { id }});
        if (device) {
            await device.increment('visits', { by: 1 });
            req.device = device;
            next();
        }
    } catch (e) {
        console.log(e);
    }
}
