    USE ecommerce_db;

    create table IF NOT EXISTS province(
        idProvince int(6) auto_increment primary key,
        provinceName varchar(50) not null
    );

    create table IF NOT EXISTS city(
        idCity int(6) auto_increment primary key,
        cityName varchar(50) not null,
        idProvince int not null,
        FOREIGN KEY (idProvince) REFERENCES province(idProvince) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS postalCode(
        idPostalCode int(6) auto_increment primary key,
        postalCode int(8) not null,
        idCity int not null,
        FOREIGN KEY (idCity) REFERENCES city(idCity) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS client(
        idClient int(6) primary key not null,
        nameClient varchar(25) not null,
        lastNameClient varchar(25) not null,
        addressMailClient varchar(45) not null,
        passwordClient varchar(30),
        numberPhoneClient varchar(25)
    );

    CREATE TABLE IF NOT EXISTS imageClient(
        idImgClient int(6) auto_increment primary key,
        imgUrl varchar(75),
        imgName varchar(50),
        idClient int not null,
        FOREIGN KEY(idClient) REFERENCES client(idClient) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS addressClient(
        idAddressClient int(6) auto_increment primary key,
        mainStreet varchar(45), 
        crossStreet varchar(45),
        addressNumber int(10),
        floorDepto varchar(5),
        idPostalCode int not null,
        idClient int not null,
        FOREIGN KEY (idPostalCode) REFERENCES postalCode(idPostalCode) ON DELETE CASCADE,
        FOREIGN KEY (idClient) REFERENCES client(idClient) ON DELETE CASCADE 
    );

    CREATE TABLE IF NOT EXISTS category(
        idCategory int auto_increment primary key not null,
        category varchar(25)
    );

    CREATE TABLE IF NOT EXISTS brand(
        idBrand int auto_increment primary key not null,
        brand varchar(25)
    );

    CREATE TABLE IF NOT EXISTS statusProduct(
        idStatusProduct int auto_increment primary key not  null,
        statusProduct varchar(15) not null
    ); 

    CREATE TABLE IF NOT EXISTS product(
        idProduct int auto_increment primary key not null, 
        sky varchar(15) not null, 
        productName varchar(15) not null, 
        productDescription text,
        productPrice decimal(10,2),
        createAtProduct date,
        idStatusProduct int not null,
        idBrand int not null,
        idCategory int not null,
        FOREIGN KEY (idStatusProduct) REFERENCES statusProduct(idStatusProduct) ON DELETE CASCADE,
        FOREIGN KEY (idBrand) REFERENCES brand(idBrand) ON DELETE CASCADE,
        FOREIGN KEY (idCategory) REFERENCES category(idCategory) ON DELETE CASCADE
    ); 

    CREATE TABLE IF NOT EXISTS imageProduct(
        idImgProduct int auto_increment primary key not null,
        urlImgProduct varchar(70) not null,
        nameImgProduct varchar(50) not null,
        idProduct int not null,
        FOREIGN KEY (idProduct) REFERENCES product(idProduct) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS sales(
        idSales int auto_increment primary key not null,
        priceSale decimal(10,2),
        discount int(3),
        startDate date not null,
        expirationDate date not null,
        idProduct int not null,
        idStatusProduct int not null,
        FOREIGN KEY (idProduct) REFERENCES product(idProduct) ON DELETE CASCADE,
        FOREIGN KEY (idStatusProduct) REFERENCES statusProduct(idStatusProduct) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS stockProduct(
        idStock int auto_increment primary key not null,
        quantity int(4),
        idProduct int not null,
        FOREIGN KEY (idProduct) REFERENCES product(idProduct) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS cart(
        idCart int auto_increment primary key not null,
        quantityCart int(4),
        idProduct int not null,
        idClient int not null,
        idImgProduct int not null,
        FOREIGN KEY (idProduct) REFERENCES product(idProduct) ON DELETE CASCADE,
        FOREIGN KEY (idClient) REFERENCES client(idClient) ON DELETE CASCADE,
        FOREIGN KEY (idImgProduct) REFERENCES imageProduct(idImgProduct) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS orderBuy(
        idOrderBuy int auto_increment primary key not null,
        orderDate date,
        totalPrice decimal(10,2),
        idClient int not null,
        idAddressClient int not null,
        /*PAYAMENT TABLE*/
        FOREIGN KEY (idClient) REFERENCES client(idClient) ON DELETE CASCADE,
        FOREIGN KEY (idAddressClient) REFERENCES addressClient(idAddressClient) ON DELETE CASCADE  
    );

    CREATE TABLE IF NOT EXISTS orderBuyDetails(
        idOrderBuyDetails int auto_increment primary key not null,
        quantity int(3),
        priceAtPurchase decimal(10,2),
        idOrderBuy int not null,
        idProduct int not null,
        FOREIGN KEY (idOrderBuy) REFERENCES orderBuy(idOrderBuy) ON DELETE CASCADE,
        FOREIGN KEY (idProduct) REFERENCES product(idProduct) ON DELETE CASCADE
    ); 

    CREATE TABLE IF NOT EXISTS rolAdmin(
        idRol int auto_increment primary key not null,
        rolName varchar(15)
    );


    /* ADMIN SECTION */
    CREATE TABLE IF NOT EXISTS userAdmin(
        idAdmin int auto_increment primary key not null, 
        adminName varchar(25),
        adminAddressMail varchar(30),
        passwordAdmin varchar(20),
        idRol int not null,
        FOREIGN KEY (idRol) REFERENCES rolAdmin(idRol)ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS adminPermissions(
        idPermissions int auto_increment primary key not null,
        permissionsName varchar(25) 
    );

    CREATE TABLE IF NOT EXISTS rolPermissions (
        idRol INT,
        idPermissions INT,
        PRIMARY KEY (idRol, idPermissions),
        FOREIGN KEY (idRol) REFERENCES rolAdmin(idRol) ON DELETE CASCADE,
        FOREIGN KEY (idPermissions) REFERENCES adminPermissions(idPermissions) ON DELETE CASCADE
    );

    /* TICKET CREATION*/ 

    CREATE TABLE IF NOT EXISTS statusTicket(
        idStatusTicket int auto_increment primary key not null,
        statusTicket varchar(20)
    );

    CREATE TABLE IF NOT EXISTS ticket(
        idTicket int auto_increment primary key not null,
        descriptionTicket text,
        createTicketDate date,
        idStatusTicket int not null,
        idProduct int not null,
        idClient int not null,
        FOREIGN KEY (idStatusTicket) REFERENCES statusTicket(idStatusTicket) ON DELETE CASCADE,
        FOREIGN KEY (idProduct) REFERENCES product(idProduct) ON DELETE CASCADE,
        FOREIGN KEY (idClient) REFERENCES client(idClient) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS ticketRoom(
        idTicketRoom int auto_increment primary key not null,
        idTicket int not null,
        idStatusTicket int not null,
        idAdmin int not null,
        FOREIGN KEY  (idTicket) REFERENCES ticket(idTicket) ON DELETE CASCADE,
        FOREIGN KEY (idStatusTicket) REFERENCES statusTicket(idStatusTicket) ON DELETE CASCADE,
        FOREIGN KEY (idAdmin) REFERENCES userAdmin(idAdmin) ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS ticketMessage(
        idMessage int auto_increment primary key not null,
        messageDate date,
        messageTicket varchar(100), 
        isAdmin boolean, 
        idSender int(5) not null,
        idTicketRoom int not null,
        FOREIGN KEY (idTicketRoom) REFERENCES ticketRoom(idTicketRoom) ON DELETE CASCADE
    );
        /* PAYMENT SECTION */
    
	CREATE TABLE IF NOT EXISTS payer(
    idPayer int primary key not null,
    payerEmail varchar(45),
    payerFirstName varchar(45),
    payerLastName varchar(45),	
    payerIdentification int (15),
    payerPhone int(25)
    );
    
     
	CREATE TABLE IF NOT EXISTS payment(
		idPayment int primary key not null,
        authorizationCode int(15), 
        paymentStatus varchar(15),
        paymentDetails varchar(15),
        paymentDateApproved date,
        paymentLastFourDigits int(4),
        paymentOrderId int(15),
        idPayer int not null, 
        idOrderBuy int not null,
        FOREIGN KEY (idPayer) REFERENCES payer(idPayer) ON DELETE CASCADE,
        FOREIGN KEY (idOrderBuy) REFERENCES OrderBuy(idOrderBuy) ON DELETE CASCADE
        );

    CREATE TABLE IF NOT EXISTS orderBuyStatus(
	idStatusOrder int primary key auto_increment not null,
	statusOrder varchar(25) not null
);

ALTER TABLE orderBuy
ADD COLUMN idStatusOrder int  not null FOREIGN KEY idStatusOrder REFERENCES orderBuyStatus(idStatusOrder) ON DELETE CASCADE;

ALTER TABLE ecommerce_db.payment ADD paymentTransactionAmout INT NULL;
ALTER TABLE ecommerce_db.payment ADD netReceivedAmount INT NULL;

ALTER TABLE ecommerce_db.payment CHANGE netReceivedAmount paymentNetReceivedAmount int(11) DEFAULT NULL NULL;
