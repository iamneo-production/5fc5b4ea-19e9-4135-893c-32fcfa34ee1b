CREATE PROCEDURE AddAdmin
 @email varchar(100),
 @password varchar(100),
  @mobileNumber varchar(100),
  @userRole varchar(100)
  AS 
BEGIN
  IF EXISTS (
    SELECT email FROM AdminTable WHERE email=@email
    UNION
    SELECT email FROM UserTable WHERE email=@email
  )
  BEGIN
    PRINT 'Invalid'
  END
  ELSE
  BEGIN
    INSERT INTO AdminTable ( email,password,mobileNumber, userRole) VALUES (@email, @password, @mobileNumber, @userRole )
  END
END

