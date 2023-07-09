using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace dotnetapp.Models
{
    public class DocumentModel
    {
        public int documentId { get; set; }
        public string documenttype { get; set; }
        public byte[] documentupload { get; set; }

    }
}
