using System.Threading.Tasks;
using DAL.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WEBL;

namespace UnitTest
{
    [TestClass]
    public class UnitTest1
    {
        //[TestMethod]
        //public void getAllEmployeeTest()
        //{
        //    //var _db = WEBL.Program._db;
        //    string[] args = null;

        //    var host = WEBL.Program.CreateHostBuilder(args).Build();

        //    ApplicationDbContext _db = WEBL.Program.CreateDbIfNotExists(host);
        //    WEBL.Controllers.EmployeeController employeeController = new WEBL.Controllers.EmployeeController(_db);

        //    var result = employeeController.getAllEmployees();
        //    var okResult = result as OkObjectResult;

        //    Assert.IsNotNull(okResult);
        //    Assert.AreEqual(200, okResult.StatusCode);

        //}

        [TestMethod]
        public void getAllEmployeeTest()
        {
            
        }
    }
}
