using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;

namespace dotnetapp
{
    public class BusinessLayer
    {
        private DataAccessLayer data_Access_layer = new DataAccessLayer();
        //Auth Controller

        public bool isUserPresent(LoginModel data)
        {
            return data_Access_layer.isUserPresent(data);
        }
        public bool isAdminPresent(LoginModel data)
        {
            return data_Access_layer.isAdminPresent(data);
        }
        public string saveUser(UserModel user)
        {
            return data_Access_layer.saveUser(user);
        }
        public string saveAdmin(UserModel user)
        {
            return data_Access_layer.saveAdmin(user);
        }
    }
}


