using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;


namespace WebApp
{
    public class BusinessLayer
    {
        ///Auth Controller
        public bool isUserPresent(LoginModel data)
        {
            return DataAccessLayer.isUserPresent(data);
        }
        public bool isAdminPresent(LoginModel data)
        {
            return DataAccessLayer.isAdminPresent(data);
        }
        public string saveUser(UserModel user)
        {
            return DataAccessLayer.saveUser(user);
        }
        public string saveAdmin(UserModel user)
        {
            return DataAccessLayer.saveAdmin(user);
        }
    }
}