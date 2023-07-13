using System;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
namespace dotnetapp
{
    public class BusinessLayer
    {
        private DataAccessLayer data_Access_layer = new DataAccessLayer();
        //Admin Controller
         public int getDocumentId()
        {
            return data_Access_layer.getDocumentId();
        }
        public string addDocuments(IFormCollection data, IFormFile file)
        {
            long length = file.Length;
            using var fileStream = file.OpenReadStream();
            byte[] bytes =  new byte[length];
            fileStream.Read(bytes, 0, (int)file.Length);
            DocumentModel documentModel = new DocumentModel();
            documentModel.documenttype = data["documenttype"];
            documentModel.documentupload = bytes;
            return data_Access_layer.addDocuments(documentModel);
        }
        public string editDocuments(int documentId, DocumentModel data)
        {
            return data_Access_layer.editDocuments(documentId, data);
        }
        public DocumentModel getDocuments(int documentId)
        {
            return data_Access_layer.getDocuments(documentId);
        }
        public string deleteDocuments(int documentId)
        {
            return data_Access_layer.deleteDocuments(documentId);
        }
    }
}