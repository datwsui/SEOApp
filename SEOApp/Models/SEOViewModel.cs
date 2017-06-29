using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Web;

namespace SEOApp.Models
{
    public class SEOViewModel
    {
        private const string Endpoint = @"http://www.google.com.au/search?q={0}&num=100";

        [Required]
        public string Keywords { get; set; }

        [Required]
        public string SightUrl { get; set; }

        public string encodedKeywords
        {
            get
            {
                return string.Format(Endpoint, WebUtility.UrlEncode(Keywords).Replace("%20", "+"));
            }
        }
    }

    [Serializable]
    public class SearchResultViewModel
    {
        public int Index { get; set; }

        public string Content { get; set; }
    }
}