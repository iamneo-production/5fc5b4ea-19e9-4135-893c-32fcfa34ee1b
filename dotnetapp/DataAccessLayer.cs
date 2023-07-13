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
        //Loan Controller
        public LoanModel getLoan(int loanId)
        {
            SqlCommand cmd = new SqlCommand("lsp_getById", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@loanId", loanId);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            LoanModel lm = new LoanModel();
            if (dt.Rows.Count > 0)
            {
                lm.applicantName = dt.Rows[0]["applicantName"].ToString();
                lm.applicantMobile = dt.Rows[0]["applicantMobile"].ToString();
                lm.applicantPan = dt.Rows[0]["applicantPan"].ToString();
                lm.applicantAddress = dt.Rows[0]["applicantAddress"].ToString();
                lm.loanId = Convert.ToInt32(dt.Rows[0]["loanId"]);
                lm.applicantSalary = dt.Rows[0]["applicantSalary"].ToString();
                lm.applicantEmail = dt.Rows[0]["applicantEmail"].ToString();
                lm.applicantAadhaar = dt.Rows[0]["applicantAadhaar"].ToString();
                lm.status = Convert.ToInt32(dt.Rows[0]["status"]);
            }
            return lm;
        }
        public string addLoan(LoanModel lm)
        {
            string s = "";
            try
            {
                if (lm != null)
                {
                    SqlCommand cmd = new SqlCommand("lsp_Insert", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@loantype", lm.loantype);
                    cmd.Parameters.AddWithValue("@applicantName", lm.applicantName);
                    cmd.Parameters.AddWithValue("@applicantAddress", lm.applicantAddress);
                    cmd.Parameters.AddWithValue("@applicantMobile", lm.applicantMobile);
                    cmd.Parameters.AddWithValue("@applicantEmail", lm.applicantEmail);
                    cmd.Parameters.AddWithValue("@applicantAadhaar", lm.applicantAadhaar);
                    cmd.Parameters.AddWithValue("@applicantPan", lm.applicantPan);
                    cmd.Parameters.AddWithValue("@applicantSalary", lm.applicantSalary);
                    cmd.Parameters.AddWithValue("@loanAmountRequired", lm.loanAmountRequired);
                    cmd.Parameters.AddWithValue("@loanRepaymentMonths", lm.loanRepaymentMonths);
                    cmd.Parameters.AddWithValue("@status", lm.status);
                    con.Open();
                    int i = cmd.ExecuteNonQuery();
                    con.Close();
                    if (i > 0)
                        s = "Loan Application Added";
                    else
                        s = "Loan Application Not Added";
                }
            }
            catch (Exception e)
            {
                s = e.Message;
            }
            return s;
        }
        public string editLoan(int loanId, LoanModel lm)
        {
            string s = "";
            try
            {
                if (lm != null)
                {
                    SqlCommand cmd = new SqlCommand("lsp_Update", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@loanId", loanId);
                    cmd.Parameters.AddWithValue("@applicantName", lm.applicantName);
                    cmd.Parameters.AddWithValue("@applicantAddress", lm.applicantAddress);
                    cmd.Parameters.AddWithValue("@applicantMobile", lm.applicantMobile);
                    cmd.Parameters.AddWithValue("@applicantAadhaar", lm.applicantAadhaar);
                    cmd.Parameters.AddWithValue("@applicantSalary", lm.applicantSalary);
                    cmd.Parameters.AddWithValue("@status", lm.status);
                    con.Open();
                    int i = cmd.ExecuteNonQuery();
                    con.Close();
                    if (i > 0)
                        s = "Loan Application Updated";
                    else
                        s = "Loan Application Not Updated";
                }
            }
            catch (Exception ex)
            {
                s = ex.Message;
            }
            return s;
        }
        public string deleteLoan(int loanId)
        {
            string s = "";
            try
            {
                SqlCommand cmd = new SqlCommand("lsp_DeleteById", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@loanId", loanId);
                con.Open();
                int i = cmd.ExecuteNonQuery();
                con.Close();
                if (i > 0)
                    s = "Loan Application Deleted";
                else
                    s = "Loan Application Not Deleted";
            }
            catch (Exception ex)
            {
                s = ex.Message;
            }
            return s;
        }
    }
}
        