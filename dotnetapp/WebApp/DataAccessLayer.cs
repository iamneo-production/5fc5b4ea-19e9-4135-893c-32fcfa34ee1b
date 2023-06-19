using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using WebApp.Models;
using Newtonsoft.Json;
using static WebApp.BusinessLayer;

namespace WebAapp
{
    internal class DataAccessLayer
    {
        internal static SqlConnection con = new SqlConnection("Data Source = DESKTOP-L56UG2B\\SQLEXPRESS; Initial Catalog = bike_loan_data; Integrated Security = true");
        
        ///Auth Controller
        internal static bool isUserPresent(LoginModel data)
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

        internal static bool isAdminPresent(LoginModel data)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "AdminLogin";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("email", data.email);
                cmd.Parameters.AddWithValue("password", data.password);
                cmd.Connection = con;
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                con.Close();
                if (dr.Read())
                {
                    return true;
                }
                else{
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        internal static string saveUser(UserModel user)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "AddUser";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("email", user.email);
                cmd.Parameters.AddWithValue("password", user.password);
                cmd.Parameters.AddWithValue("username", user.username);
                cmd.Parameters.AddWithValue("mobileNumber", user.mobileNumber);
                cmd.Parameters.AddWithValue("userRole", user.userRole);

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

        internal static string saveAdmin(UserModel user)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "AddAdmin";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("email", user.email);
                cmd.Parameters.AddWithValue("password", user.password);
                cmd.Parameters.AddWithValue("username", user.username);
                cmd.Parameters.AddWithValue("mobileNumber", user.mobileNumber);
                cmd.Parameters.AddWithValue("userRole", user.userRole);

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