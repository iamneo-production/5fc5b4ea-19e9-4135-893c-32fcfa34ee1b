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
        public List<LoanModel> getAllLoans()
        {
            return data_Access_layer.getAllLoans();
        }
        public int getLoans()
        {
            return data_Access_layer.getLoans();
        }
        public string approveLoan(int loanId, int status)
        {
            return data_Access_layer.approveLoan(loanId, status);
        }
        public string AddReview(ReviewModel review)
        {
            return data_Access_layer.AddReview(review);
        }
        public List<ReviewModel> GetReviews()
        {
            return data_Access_layer.GetReviews();
        }
    }
}