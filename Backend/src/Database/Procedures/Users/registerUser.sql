CREATE OR ALTER PROCEDURE registerUser(
        @user_id VARCHAR(100), 
        @name VARCHAR(200),
        @email VARCHAR(255),
        @password VARCHAR(200),
        @cohort VARCHAR(255)
       

    )
AS
BEGIN
    INSERT INTO Users(User_id, Name, Email, Password, cohort)
    VALUES(@user_id, @name, @email, @password, @cohort)
END

SELECT * FROM Users