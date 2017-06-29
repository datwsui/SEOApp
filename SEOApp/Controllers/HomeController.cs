using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using SEOApp.Models;

namespace SEOApp.Controllers
{
    public class HomeController : Controller
    {
        [AllowAnonymous]
        [Route("Home/Index")]
        public ActionResult Index()
        {
            SEOViewModel model = new SEOViewModel();
            return View(model);
        }
        
        [AllowAnonymous]
        [Route("Home/InvokeResult")]
        public ActionResult InvokeResult(SEOViewModel model)
        {
            string response;
            try
            {
                using (var webClient = new WebClient())
                {
                    response = webClient.DownloadString(model.encodedKeywords);
                }
                
                var matches = new Regex("<div class=\"g\">(.*?)</div>").Matches(response).Cast<Match>().ToList();

                var indexes = matches.Select((x, i) => new SearchResultViewModel { Index = ++i, Content = x.ToString() })
                    .Where(x => x.Content.IndexOf(model.SightUrl) >= 0)
                    .Select(x => x.Index);

                if (indexes != null && indexes.Count() > 0)
                    return Json(new { total = indexes.Count(), results = string.Join(",", indexes) }, JsonRequestBehavior.AllowGet);
                else
                    return Json(new { total = 0, results = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { total = 0, results = "" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}