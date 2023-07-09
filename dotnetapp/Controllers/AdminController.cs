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
using Microsoft.AspNetCore.Http;
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

        [HttpGet]
        [Route("user/getDocumentId")]
        public IActionResult getDocumentId()
        {
            return Ok(bussiness_layer.getDocumentId());
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

        [HttpPost("user/addDocuments/")]
        public string addDocuments([FromForm]IFormCollection data, [FromForm] IFormFile file)
        {
            return bussiness_layer.addDocuments(data,file);
        }

        [HttpPut("admin/generateEmi/{loanId}")]
        public IActionResult approveEmi(int loanId)
        {
            return Ok(bussiness_layer.approveEmi(loanId));
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