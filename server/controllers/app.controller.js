module.exports.hello = async (req, res, next) => {
  try {
    return res.send({
      success : true,
      data    : 'Hello world!',
      title   : 'Welcome to MERN-Seed!',
      message : 'This is an MERN-Stack based nodejs app architecture.',
    });
  } catch (error) {
    return next(error);
  }
};