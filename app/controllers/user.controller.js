exports.allAccess = (req, res) => {
  console.log("ddcdcdcd");
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  console.log("ddcdcdcd");
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  console.log("ddcdcdcd");
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  console.log("ddcdcdcd");
  res.status(200).send("Moderator Content.");
};
