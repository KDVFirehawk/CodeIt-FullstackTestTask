# CodeIt-FullstackTestTask

Registration/Login/logout forms test task from CodeIT

Project starts with command => npm run start:dev

Database tables =>
user = {
userId : int,
email : varchar(45),
login : varchar(45),
name : varchar(45),
password : varchar(200),
birthdate : varchar(45),
registerdate : bigint
};

token = {
tokenId : int,
userId : int,
refreshToken : varchar(300)
};

country = {
countryId : int,
name : varchar(45)
};
