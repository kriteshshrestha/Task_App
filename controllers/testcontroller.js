const testUsercontroller = (req, res) => {
  res.status(200).send({
    success: true,
    message: "test user data api",
  });
};

module.exports = { testUsercontroller };