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
    public class LoanController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();
        [HttpGet("user/viewLoan/{loanId}")]
        public IActionResult getLoan(int loanId)
        {
            return Ok(bussiness_layer.getLoan(loanId));
        }
        [HttpPost("user/addLoan")]
        public string addLoan(LoanModel lm)
        {
            return bussiness_layer.addLoan(lm);
        }
        [HttpPut("user/editLoan/{loanId}")]
        public string editLoan(int loanId, LoanModel lm)
        {
            return bussiness_layer.editLoan(loanId, lm);   
        }
        [HttpDelete("user/deleteLoan/{loanId}")]
        public string deleteLoan(int loanId)
        {
            return bussiness_layer.deleteLoan(loanId);
        }
    }
}
