// TRIGGER para cambiar el estado del ticket cuando es aceptado por un administrador

DELIMITER //

CREATE TRIGGER changeStatusTicket
AFTER INSERT ON ticketroom
FOR EACH ROW
UPDATE ticket 
SET idStatusTicket = 2
WHERE idTicket = NEW.idTicket;
//

DELIMITER ;
