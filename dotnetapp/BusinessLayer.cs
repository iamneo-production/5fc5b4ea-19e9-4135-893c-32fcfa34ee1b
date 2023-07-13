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
        public string addUser(ProfileModel pm)
        {
            return data_Access_layer.addUser(pm);
        }
        public ProfileModel getUser(string email)
        {
            return data_Access_layer.getUser(email);
        }
        public string editUser(string email, ProfileModel data)
        {
            return data_Access_layer.editUser(email, data);
        }
        public string deleteUser(string email)
        {
            return data_Access_layer.deleteUser(email);
        }
    
        
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
    



        //LoanController
        public LoanModel getLoan(int loanId)
        {
            return data_Access_layer.getLoan(loanId);
        }
        public string addLoan(LoanModel Data)
        {
            return data_Access_layer.addLoan(Data);
        }
        public string editLoan(int LoanId, LoanModel Data)
        {
            return data_Access_layer.editLoan(LoanId, Data);
        }
        public string deleteLoan(int LoanId)
        {
            return data_Access_layer.deleteLoan(LoanId);
        }
    }
}