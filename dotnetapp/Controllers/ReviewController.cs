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
    public class ReviewController : ControllerBase
    {


        private BusinessLayer bussiness_layer = new BusinessLayer();

        [HttpPost]
        [Route("user/addReview")]
        public string AddReview(ReviewModel review)
        {
            return bussiness_layer.AddReview(review);
        }

        [HttpGet]
        [Route("admin/getReviews")]
        public List<ReviewModel> GetReviews()
        {
            return bussiness_layer.GetReviews();
        }
    }
}
