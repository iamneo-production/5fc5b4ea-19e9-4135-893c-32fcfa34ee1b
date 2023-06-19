using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using WebApp.Models;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();

        //check the email and password for user login
        [HttpPost("user/login")]
        public bool isUserPresent(LoginModel data)
        {
            return bussiness_layer.isUserPresent(data);
        }

        //check the email and password for admin login
        [HttpPost("admin/login")]
        public bool isAdminPresent(LoginModel data)
        {
            return bussiness_layer.isAdminPresent(data);
        }

        //Add the user or jobseeker data to user database
        [HttpPost("user/signup")]
        public string saveUser(UserModel user)
        {
            return bussiness_layer.saveUser(user);
        }

        //Add the Admin data to admin database
        [HttpPost("admin/signup")]
        public string saveAdmin(UserModel user)
        {
            return bussiness_layer.saveAdmin(user);
        }
    }
}