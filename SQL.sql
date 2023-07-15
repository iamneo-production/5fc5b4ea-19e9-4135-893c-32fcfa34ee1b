create procedure document_update(@documentId int,@documenttype VARCHAR(255),
@documentupload VARBINARY(MAX)) 
As
Begin
Update Document set  documenttype=@documenttype,documentupload=@documentupload 
where documentId= @documentId
End
go

create procedure document_Insert(@documenttype VARCHAR(255),@documentupload VARBINARY(MAX))
As
Begin
insert into Document(documenttype,documentupload)values(@documenttype,@documentupload)
END
go

create procedure Document_DeleteById(@documentId int)
As
Begin
delete from Document where documentId= @documentId
END
go

create procedure Document_GetUser(@documentId int)
As
Begin
select * from Document where documentId = @documentId
END
go

--Loan SP
--addLoan
create procedure lsp_Insert(@loantype varchar(250), @applicantName varchar(250),
@applicantAddress varchar(250), @applicantMobile varchar(20), @applicantEmail varchar(250),
@applicantAadhaar varchar(250), @applicantPan varchar(250), @applicantSalary varchar(250),
@loanAmountRequired varchar(250), @loanRepaymentMonths varchar(50), @status int
)
As 
Begin 
insert into loan (loantype, applicantName,applicantAddress,applicantMobile,
applicantEmail,applicantAadhaar, applicantPan , applicantSalary,
loanAmountRequired ,loanRepaymentMonths,status) values (@loantype, @applicantName,@applicantAddress,@applicantMobile,
@applicantEmail,@applicantAadhaar, @applicantPan , @applicantSalary,
@loanAmountRequired ,@loanRepaymentMonths, @status)
return SCOPE_IDENTITY()
END
go

--editLoan()
create procedure lsp_Update(@loanId int  ,  @applicantName varchar(250),
@applicantAddress varchar(250), @applicantMobile varchar(20), 
@applicantAadhaar varchar(250),  @applicantSalary varchar(250),@status int)
As 
Begin 
Update loan set  applicantName = @applicantName, applicantAddress= @applicantAddress ,
applicantMobile = @applicantMobile, applicantAadhaar = @applicantAadhaar, 
applicantSalary  = @applicantSalary ,status = @status
where loanId = @loanId
End
go

--deleteLoan()
create procedure lsp_DeleteById(@loanId int)
As 
Begin 
delete from loan where loanId = @loanId
END
go

--stored procedure for viewloan(getById)
create procedure lsp_getById(@loanId int)
As 
Begin 
select applicantName, applicantMobile, applicantPan,applicantAddress,loanId,applicantSalary,
applicantEmail,applicantAadhaar,status   
from loan where loanId = @loanId
END
go

--Profile SP
--stored procedure for addUser method
create procedure Prof_insert(@username  varchar(250),@mobileNumber varchar(250),
@email varchar(250), @loanId varchar(20), @applicantAddress varchar(250))
as begin 
insert into profile (username, mobileNumber,email,loanId,
applicantAddress) values (@username, @mobileNumber,@email,@loanId,
@applicantAddress)
END
go

  --stored procedure edit profile , it updates both profile and loan
CREATE PROCEDURE usp_updateProfile(@email varchar(100),@username VARCHAR(50),
   @mobileNumber VARCHAR(20),@applicantAddress VARCHAR(200))
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE profile
    SET username = @username,
        mobileNumber = @mobileNumber,
        applicantAddress = @applicantAddress
    WHERE email = @email;

    UPDATE loan
    SET applicantName = @username,
        applicantAddress = @applicantAddress,
        applicantMobile = @mobileNumber
    WHERE applicantEmail = @email;
END;
go

--getUser()
create procedure usp_GetUser(@Email varchar(50))
As 
Begin 
select * from profile where email = @Email 
END
go

--deleteProfile()
create procedure usp_Delete(@email varchar(50))
As 
Begin 
delete from profile where email = @email
END
go

--Admin SP
--stored procedure for getAllLoans()
create procedure lsp_GetByNull
As 
Begin 
select applicantName, applicantMobile, applicantPan,applicantAddress,loanId,applicantSalary,
applicantEmail,applicantAadhaar,status 
from loan  where status = 0
END
go

create procedure lsp_GetLoan
As 
Begin 
SELECT TOP 1 loanId FROM loan ORDER BY loanId DESC
END
go

create procedure lsp_getDocumentId
As 
Begin 
SELECT TOP 1 documentId FROM document ORDER BY documentId DESC
END
go

--stored procedure for updateStatus
create procedure lsp_updateStatus( @loanId int , @status int)
as
begin
update loan set status = @status where loanId = @loanId;
end
go


--stored to calculate emi and update in profile table
CREATE PROCEDURE genschl_updateEMI(@loanId INT)
AS
BEGIN
    DECLARE @loanAmountRequired VARCHAR(250);
    DECLARE @loanRepaymentMonths VARCHAR(50);
    DECLARE @emi DECIMAL(10, 2);

    -- Fetch loan details from loan table based on loanId
    SELECT @loanAmountRequired = loanAmountRequired, @loanRepaymentMonths = loanRepaymentMonths
    FROM loan
    WHERE loanId = @loanId;

    -- Calculate EMI
    SET @emi = CAST(@loanAmountRequired AS DECIMAL(10, 2)) / CAST(@loanRepaymentMonths AS INT);

    -- Update emi column in profile table
    UPDATE profile
    SET emi = @emi
    WHERE loanId = @loanId;
END
go


--AUTH SP
CREATE PROCEDURE AddAdmin
 @email varchar(100),
 @password varchar(100),
  @mobileNumber varchar(100),
  @userRole varchar(100),
  @username varchar(100)
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
go

CREATE PROCEDURE AddUser
 @email varchar(100),
 @password varchar(100),
 @username varchar(100),
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
    INSERT INTO UserTable ( email,password, username,mobileNumber, userRole) VALUES (@email, @password, @username, @mobileNumber, @userRole )
  END
END
go

 
 create procedure UserLogin(@email varchar(100),@password varchar(100))
as
begin
if exists(select email from UserTable where  email =@email)
select email, password from UserTable where email = @email and password = @password
else
Print 'Invalid'
end
go


create procedure AdminLogin(@email varchar(100),@password varchar(100))
as
begin
if exists(select email from AdminTable where  email =@email)
select email, password from AdminTable where email = @email and password = @password
else
Print 'Invalid'
end
go


--REVIEW SP

CREATE PROCEDURE AddReview
 @name varchar(20),
 @comment varchar(100)
AS 
BEGIN
    INSERT INTO ReviewTable (name,comment) VALUES (@name, @comment)
END
go

CREATE PROCEDURE GetReviews
AS 
BEGIN
    select * from ReviewTable
END
go

--trigger to autopopulate documentId in loan table
CREATE TRIGGER populate_doc_Id
ON loan
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @LatestDocumentId INT;

    SELECT TOP 1 @LatestDocumentId = documentId
    FROM Document
    ORDER BY documentId DESC;

    UPDATE loan
    SET documentId = @LatestDocumentId
    WHERE loanId IN (SELECT loanId FROM inserted);
END;
go