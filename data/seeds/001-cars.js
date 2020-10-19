exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert([
        {
          id: 1,
          VIN: "1JCCM85E5BT001312",
          make: "Toyota",
          model: "Camry",
          mileage: 97204,
        },
        {
          id: 2,
          VIN: "5FNRL38209B014050",
          make: "Honda",
          model: "Odyssey",
          mileage: 25078,
        },
        {
          id: 3,
          VIN: "JTHBB1BA2A2013500",
          make: "Lexus",
          model: "Various",
          mileage: 21370,
        },
      ]);
    });
};
