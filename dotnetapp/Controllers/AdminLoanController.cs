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
    public class AdminLoanController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();
        [HttpGet]
        [Route("admin/getAllLoans")]
        public IActionResult getAllLoans()
        {
            return Ok(bussiness_layer.getAllLoans());
        }
        [HttpGet]
        [Route("user/getLoanId")]
        public IActionResult getLoans()
        {
            return Ok(bussiness_layer.getLoans());
        }
        [HttpPut("admin/generateSchedule/{loanId}")]
        public IActionResult approveloan(int loanId, int status)
        {
            return Ok(bussiness_layer.approveLoan(loanId, status));
        }
    }
}