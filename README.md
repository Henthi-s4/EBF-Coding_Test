# EBF-Coding_Test
Henthi Huisamen s4 - EBF Coding test repository

Employee Storage Service

This project is a full stack project that was developed in Angular for the front-end and .NET Core for the back-end. 
To develop this project I used Visual Studio 2019 as it allowed me to seamlessly work with Angular and .NET Core at the same time.
The REST APIs are based in C# and a SQL Server database is being used to store the database for this project. The .docx file named
'ESS_Henthi_Huisamen_Test_Cases' was used to test my backend.

Within the database we have two tables, the Employee table and the Company table. The relationship is one-to-many, this means
that an employee can only be associated with one company, but a single company can be associated with many employees.

The basic functionality for the company entity is to display all of the companies and use the company's id to find the average 
salary of the employees for that company. 
Whereas with the employees we can add, delete and update the employees. With the employees we can also display all of the employees 
or we can click on a specific company and only the employees associated with that company will be displayed.

SETUP

To do the setup for the database and how to use the backup file, I attached a .docx file with snippets and the exact 
steps to follow. This has been tested on multiple PCs.

To setup the solution you will need Visual Studio 2019 and follow these easy steps

1. Click on the solution file at the root of the repository named EmployeeStorageService.sln
2. While that loads, you can start with restoring the database. For this you need to open the .docx file named 'Database_Restore.docx' 
   at the root of the repository.
3. In the .docx file it will show you where to get the 'connection string' we need for step 4.
4. In the Solution Explorer go to WEBL and open it, click on 'appsettings.json' to open the file.
5. You will see a "DefaultConnection", in this you need to delete 'Server=PCPLZ-3-173\\MSSQLSERVER01' and replace it with 
   your 'connection string'.
6. Save the file and run the solution by clicking the green arrow head next to 'ISS Express'.
7. The first run will take a few minutes as it needs to download all of the libraries and node modules.
