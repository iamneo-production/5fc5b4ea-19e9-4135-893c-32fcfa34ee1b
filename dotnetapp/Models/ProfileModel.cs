using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace dotnetapp.Models
{
    public class ProfileModel
    {
        public string username { get; set; }
        public string mobileNumber { get; set; }
        public string email { get; set; }
        public int loanId { get; set; }
        public string applicantAddress { get; set; }
        public decimal emi { get; set; }
    }
}
