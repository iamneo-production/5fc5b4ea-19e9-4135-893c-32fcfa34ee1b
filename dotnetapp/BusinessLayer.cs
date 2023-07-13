using System;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
namespace dotnetapp
{
    public class BusinessLayer
    {
        private DataAccessLayer data_Access_layer = new DataAccessLayer();
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