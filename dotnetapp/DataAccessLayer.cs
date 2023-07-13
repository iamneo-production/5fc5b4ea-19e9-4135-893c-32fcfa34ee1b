﻿using System;
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
namespace dotnetapp
{
    public class DataAccessLayer
    {
        private string connectionString;
        SqlConnection con=null;
        public DataAccessLayer()
        {
            connectionString = "User ID=sa;password=examlyMssql@123; server=localhost;Database=BikeLoan;trusted_connection=false;Persist Security Info=False;Encrypt=False";
            con = new SqlConnection(connectionString);
        }
        //UserController
        public string addUser(ProfileModel lm)
        {
            string msg = string.Empty;
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "Prof_insert";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", lm.username);
                cmd.Parameters.AddWithValue("@applicantAddress", lm.applicantAddress);
                cmd.Parameters.AddWithValue("@mobileNumber", lm.mobileNumber);
                cmd.Parameters.AddWithValue("@email", lm.email);
                cmd.Parameters.AddWithValue("@loanId", lm.loanId+1);
                cmd.Connection = con;
                con.Open();
                int rowaffect = cmd.ExecuteNonQuery();
                con.Close();
                if (rowaffect > 0)
                {
                    msg = "User Profile Added";
                }
                else
                {
                    msg = "User profile not Added";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }
        public ProfileModel getUser(string email)
        {
            ProfileModel um = new ProfileModel();
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "usp_GetUser";
                cmd.Connection = con;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", email);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dr = new DataTable();
                da.Fill(dr);
                con.Open();
                while (dr.Rows.Count > 0)
                {
                    //ProfileModel pm = new ProfileModel();
                    um.username = dr.Rows[0]["username"].ToString();
                    um.mobileNumber = dr.Rows[0]["mobileNumber"].ToString();
                    um.email = dr.Rows[0]["email"].ToString();
                    um.loanId = Convert.ToInt32(dr.Rows[0]["loanId"]);
                    um.applicantAddress = dr.Rows[0]["applicantAddress"].ToString();
                    um.emi = Convert.ToDecimal(dr.Rows[0]["emi"]);
                    break;
                }
                con.Close();
                return um;
            }
            catch (Exception ex)
            {
                return um;
            }
        }
        public string editUser(string email, ProfileModel user)
        {
            string msg = string.Empty;
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "usp_updateProfile";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@email", email);
                cmd.Parameters.AddWithValue("@username", user.username);
                cmd.Parameters.AddWithValue("@mobileNumber", user.mobileNumber);
                cmd.Parameters.AddWithValue("@applicantAddress", user.applicantAddress);
                con.Open();
                int rowaffect = cmd.ExecuteNonQuery();
                con.Close();
                msg = "User updated";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }
        public string deleteUser(string email)
        {
            string msg = string.Empty;
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "usp_Delete";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@email", email);
                con.Open();
                int rowaffect = cmd.ExecuteNonQuery();
                con.Close();
                if (rowaffect > 0)
                {
                    msg = "Profile Deleted";
                }
                else
                {
                    msg = "Profile Not Deleted";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }
    }
}