ALTER TABLE orderBuy
ADD COLUMN idStatusOrder int  not null FOREIGN KEY idStatusOrder REFERENCES orderBuyStatus(idStatusOrder) ON DELETE CASCADE;

ALTER TABLE ecommerce_db.payment ADD paymentTransactionAmout INT NULL;
ALTER TABLE ecommerce_db.payment ADD netReceivedAmount INT NULL;

ALTER TABLE ecommerce_db.payment CHANGE netReceivedAmount paymentNetReceivedAmount int(11) DEFAULT NULL NULL;

ALTER TABLE payment DROP FOREIGN KEY payment_ibfk_1;
ALTER TABLE payer MODIFY idPayer BIGINT UNSIGNED;
ALTER TABLE payment MODIFY idPayer BIGINT UNSIGNED;
ALTER TABLE payment ADD CONSTRAINT payment_ibfk_1 FOREIGN KEY (idPayer) REFERENCES payer(idPayer);
ALTER TABLE `payment` CHANGE `idPayment` `idPayment` BIGINT(11) NOT NULL;

ALTER TABLE sales DROP CONSTRAINT sales_ibfk_2;
ALTER TABLE `sales` DROP `idStatusProduct`;

ALTER TABLE `sales` CHANGE `idSales` `idOffert` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `sales` CHANGE `priceSale` `priceOffert` DECIMAL(10,2) NULL DEFAULT NULL;
RENAME TABLE sales TO offert;

