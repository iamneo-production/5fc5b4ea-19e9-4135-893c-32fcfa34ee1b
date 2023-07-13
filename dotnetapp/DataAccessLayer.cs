using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Data;
using System.Xml.Linq;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
namespace dotnetapp
{
    public class DataAccessLayer
    {
       private string connectionString;
        SqlConnection con = null;
        public DataAccessLayer()
        {
            connectionString = "User ID=sa;password=examlyMssql@123; server=localhost;Database=BikeLoan;trusted_connection=false;Persist Security Info=False;Encrypt=False";
            con = new SqlConnection(connectionString);
        }
        public List<LoanModel> getAllLoans()
        {
            SqlCommand cmd = new SqlCommand("lsp_GetByNull", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<LoanModel> lstloan = new List<LoanModel>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    LoanModel obj = new LoanModel();
                    obj.applicantName = dt.Rows[i]["applicantName"].ToString();
                    obj.applicantMobile = dt.Rows[i]["applicantMobile"].ToString();
                    obj.applicantPan = dt.Rows[i]["applicantPan"].ToString();
                    obj.applicantAddress = dt.Rows[i]["applicantAddress"].ToString();
                    obj.loanId = Convert.ToInt32(dt.Rows[i]["loanId"]);
                    obj.applicantSalary = dt.Rows[i]["applicantSalary"].ToString();
                    obj.applicantEmail = dt.Rows[i]["applicantEmail"].ToString();
                    obj.applicantAadhaar = dt.Rows[i]["applicantAadhaar"].ToString();
                    obj.status = Convert.ToInt32( dt.Rows[i]["status"]);
                    obj.loantype = dt.Rows[i]["loantype"].ToString();
                    obj.loanAmountRequired = dt.Rows[i]["loanAmountRequired"].ToString();
                    obj.loanRepaymentMonths = dt.Rows[i]["loanRepaymentMonths"].ToString();
                    lstloan.Add(obj);
                }
            }
            if (lstloan.Count > 0)
            {
                return lstloan;
            }
            else
            {
                return null;
            }
        }
        public int getLoans()
        {
            SqlCommand cmd = new SqlCommand("lsp_GetLoan", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<LoanModel> lstloan = new List<LoanModel>();
            int i = 0;
            if (dt.Rows.Count > 0)
            {
                i = Convert.ToInt32(dt.Rows[0]["loanId"]);
            }
            if (i > 0)
            {
                return i;
            }
            else
            {
                return i;
            }
        }
        public string approveLoan(int loanId, int status)
        {
            string s = "";
            try
            {
                SqlCommand cmd = new SqlCommand("lsp_updateStatus", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@loanId", loanId);
                cmd.Parameters.AddWithValue("@status", status);
                con.Open();
                int i = cmd.ExecuteNonQuery();
                con.Close();
                if (i > 0)
                {
                    if (status == 1 && loanId == @loanId)
                    {
                        genSchedule(loanId);
                    }
                    s = "Loan Application Status Updated";
                }
                else
                    s = "Loan Application Status Not Updated";
            }
            catch (Exception ex)
            {
                s = ex.Message;
            }
            return s;
        }
        public void genSchedule(int loanId)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("genschl_updateEMI", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@loanId", loanId);
                con.Open();
                int i = cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        public string AddReview(ReviewModel review)
        {
            string msg = string.Empty;
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd = new SqlCommand("AddReview", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@name", review.name);
                cmd.Parameters.AddWithValue("@comment", review.comment);
                con.Open();
                int roweffect = cmd.ExecuteNonQuery();
                con.Close();
                if (roweffect >= 1)
                {
                    msg = "Thanks for giving review";
                }
                else
                {
                    msg = "Failed to give review";
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;
        }
        public List<ReviewModel> GetReviews()
        {
            SqlDataAdapter da = new SqlDataAdapter("GetReviews", con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<ReviewModel> reviewlist = new List<ReviewModel>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    ReviewModel review = new ReviewModel();
                    review.name = dt.Rows[i]["name"].ToString();
                    review.comment = dt.Rows[i]["comment"].ToString();
                    reviewlist.Add(review);
                }
            }
            if (reviewlist.Count > 0)
            {
                return reviewlist;
            }
            else
            {
                return null;
            }
        }
    }
}