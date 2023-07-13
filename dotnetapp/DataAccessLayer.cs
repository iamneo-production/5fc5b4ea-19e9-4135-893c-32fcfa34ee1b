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
        //Auth Controller

        public bool isUserPresent(LoginModel data)
        {
          try
            {
                 SqlDataAdapter da = new SqlDataAdapter("UserLogin", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", data.email);
                da.SelectCommand.Parameters.AddWithValue("@password", data.password);

                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool isAdminPresent(LoginModel data)
        {

            try
            {
                 SqlDataAdapter da = new SqlDataAdapter("AdminLogin", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@email", data.email);
                da.SelectCommand.Parameters.AddWithValue("@password", data.password);

                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public string saveUser(UserModel user)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "AddUser";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", user.email);
                cmd.Parameters.AddWithValue("@password", user.password);
                cmd.Parameters.AddWithValue("@username", user.username);
                cmd.Parameters.AddWithValue("@mobileNumber", user.mobileNumber);
                cmd.Parameters.AddWithValue("@userRole", user.userRole);

                cmd.Connection = con;
                con.Open();
                int roweffect = cmd.ExecuteNonQuery();
                con.Close();

                if (roweffect >= 1)
                    return ("User added successfully");
                else
                    return ("User already exists");
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public string saveAdmin(UserModel user)
        {
             try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "AddAdmin";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", user.email);
                cmd.Parameters.AddWithValue("@password", user.password);
                cmd.Parameters.AddWithValue("@mobileNumber", user.mobileNumber);
                cmd.Parameters.AddWithValue("@userRole", user.userRole);

                cmd.Connection = con;
                con.Open();
                int roweffect = cmd.ExecuteNonQuery();
                con.Close();

                if (roweffect >= 1){
                    return ("Admin added successfully");
                }
                else{
                   return ("Admin already exists");
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}