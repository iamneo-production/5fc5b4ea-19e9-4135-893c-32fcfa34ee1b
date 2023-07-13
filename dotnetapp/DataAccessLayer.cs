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
        //Admin Controller 
        public int getDocumentId()
        {
            SqlCommand cmd = new SqlCommand("lsp_getDocumentId", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<LoanModel> lstloan = new List<LoanModel>();
            int i = 0;
            if (dt.Rows.Count > 0)
            {
                i = Convert.ToInt32(dt.Rows[0]["documentId"]);
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
        public string addDocuments(DocumentModel data)
        {
            string msg = string.Empty;
            SqlCommand cmd = new SqlCommand("document_Insert", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = con;
            cmd.Parameters.AddWithValue("@documenttype", data.documenttype);
            cmd.Parameters.AddWithValue("@documentupload", data.documentupload);
            con.Open();
            int rowaffect = cmd.ExecuteNonQuery();
            con.Close();
            try
            {
                if (rowaffect > 0)
                    msg = "Document uploaded";
                else
                    msg = "Document not uploaded";
            }
            catch (Exception ex)
            {
                msg = ex.ToString();
            }
            return msg;
        }
        public string editDocuments(int documentId, DocumentModel data)
        {
            string msg = string.Empty;
            SqlCommand cmd = new SqlCommand("document_update", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = con;
            cmd.Parameters.AddWithValue("@documentId", documentId);
            cmd.Parameters.AddWithValue("@documenttype", data.documenttype);
            cmd.Parameters.AddWithValue("@documentupload", data.documentupload);
            con.Open();
            int rowaffect = cmd.ExecuteNonQuery();
            con.Close();
            try
            {
                if (rowaffect > 0)
                    msg = "Document edited";
                else
                    msg = "Document not edited";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }
        public string deleteDocuments(int documentId)
        {
            string s = "";
            try
            {
                SqlCommand cmd = new SqlCommand("Document_DeleteById", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@documentId", documentId);
                con.Open();
                int i = cmd.ExecuteNonQuery();
                con.Close();
                if (i > 0)
                    s = "Documents Deleted";
                else
                    s = "Documents Not Deleted";
            }
            catch (Exception ex)
            {
                s = ex.Message;
            }
            return s;
        }
        public DocumentModel getDocuments(int documentId)
        {
            DocumentModel um = new DocumentModel();
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "Document_GetUser";
                cmd.Connection = con;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@documentId", documentId);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    um.documentupload = (byte[])(dr["documentupload"]);
                }
                con.Close();
                return um;
            }
            catch (Exception ex)
            {
                return um;
            }
        }
        
    }
}