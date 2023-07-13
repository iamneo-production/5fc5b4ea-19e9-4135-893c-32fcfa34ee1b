using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dotnetapp.Models;
using System.Data.SqlClient;
using System.Data;

namespace dotnetapp.Controllers
{
    [Route("api/")]
    [ApiController]
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
        public IActionResult saveUser(UserModel user)
        {
            return Created("/user/signup", bussiness_layer.saveUser(user));
        }

        //Add the Admin data to admin database
        [HttpPost("admin/signup")]
        public string saveAdmin(UserModel user)
        {
            return bussiness_layer.saveAdmin(user);
        }

    }
}
