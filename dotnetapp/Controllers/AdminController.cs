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
    public class AdminController : ControllerBase
    {
        private BusinessLayer bussiness_layer = new BusinessLayer();


        [HttpGet]
        [Route("admin/getAllLoans")]
        public IActionResult getAllLoans()
        {
            return Ok(bussiness_layer.getAllLoans());
        }

        [HttpPut("admin/generateSchedule/{loanId}")]
        public IActionResult approveloan(int loanId, string status)
        {
            return Ok(bussiness_layer.approveLoan(loanId, status));
        }

        [HttpPost("user/addDocuments")]
        public string addDocuments(DocumentModel data)
        {
            return bussiness_layer.addDocuments(data);
        }

        [HttpPut("user/editDocuments/{documentId}")]
        public string editDocuments(int documentId, DocumentModel data)
        {
            return bussiness_layer.editDocuments(documentId, data);
        }
        [HttpGet("user/getDocuments/{documentId}")]
        public IActionResult getDocuments(int documentId)
        {
            return Ok(bussiness_layer.getDocuments(documentId));
        }


        [HttpDelete("user/deleteDocuments/{documentId}")]
        public string deleteDocuments(int documentId)
        {
            return bussiness_layer.deleteDocuments(documentId);

        }


    }
}



