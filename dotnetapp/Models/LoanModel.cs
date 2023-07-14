using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace dotnetapp.Models
{
    public class LoanModel
    {
        public int loanId { get; set; }
        public string loantype { get; set; }
        public string applicantName { get; set; }
        public string applicantAddress { get; set; }
        public string applicantMobile { get; set; }
        public string applicantEmail { get; set; }
        public string applicantAadhaar { get; set; }
        public string applicantPan { get; set; }
        public string applicantSalary { get; set; }
        public string loanAmountRequired { get; set; }
        public string loanRepaymentMonths { get; set; }
        public int status { get; set; }
    }
}
