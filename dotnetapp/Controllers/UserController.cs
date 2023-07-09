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
    public class UserController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();

        [HttpPost("user/addProfile")]
        public string addUser(ProfileModel pm)
        {
            return bussiness_layer.addUser(pm);
        }

        [HttpGet("user/getProfile/{email}")]
        public IActionResult getUser(string email)
        {
            return Ok(bussiness_layer.getUser(email));
        }


        [HttpPut("user/editProfile/{email}")]
        public string editUser(string email, ProfileModel user)
        {
            return bussiness_layer.editUser(email, user);
        }

        [HttpDelete("user/deleteProfile/{email}")]
        public string deleteUser(string email)
        {
            return bussiness_layer.deleteUser(email);
        }

    }
}



