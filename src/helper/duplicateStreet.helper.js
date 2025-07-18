import connection from "../config/database.js";

export async function verifyDuplicateStreet(clientID, data) {
  const searchAllAddress = 'SELECT * FROM addressclient WHERE idClient = ?'; //quitar query
  const [addresses] = await connection.query(searchAllAddress, [clientID]);


  const alreadyExists = addresses.some(address =>
    address.mainStreet === data.mainStreet &&
    address.crossStreet === data.crossStreet &&
    address.addressNumber === data.addressNumber &&
    address.floorDepto === data.floorDepto &&
    address.idPostalCode === data.idPostalCode
  );

  if(alreadyExists) {
    return {
      success: false,
      message: 'This address already exists'
    };
  }

  return {
    success: true
  };
}