using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using Newtonsoft.Json;
using EXPRESS_PDA.Models;
using EXPRESS_PDA.Models.Query;

namespace EXPRESS_PDA.Controllers
{
    public class LoginController : Controller
    {
        string strResult = "";
        public ActionResult index()
        {
            return View();
        }

        public class JsonData
        {
            public string vJsonData { get; set; }
        }


        [HttpPost]
        public ActionResult fnLogin(JsonData value)
        {
            DataTable dt = new DataTable();
            try
            {
                string vJsonData = value.vJsonData.ToString();

                dt = JsonConvert.DeserializeObject<DataTable>(vJsonData);
                dt = Sql_Common.SearchUserInfo(dt.Rows[0]);
                if (dt.Rows.Count > 0)
                {
                    strResult = _common.MakeJson("Y", "Success", dt);
                }
                else
                {
                    strResult = _common.MakeJson("N", "No Data", dt);
                }

                return Json(strResult);
            }
            catch (Exception e)
            {
                strResult = _common.MakeJson("E", "Error", dt);
                return Json(strResult);
            }
        }
        public ActionResult SaveLogin(JsonData value)
        {
            DataSet ds = JsonConvert.DeserializeObject<DataSet>(value.vJsonData);
            DataTable rst = ds.Tables["Result"];
            DataTable dt = ds.Tables["Table1"];

            try
            {
                if (rst.Rows[0]["trxCode"].ToString() == "N") return Content("N");

                if (rst.Rows[0]["trxCode"].ToString() == "Y")
                {
                    Session["USR_ID"] = dt.Rows[0]["USR_ID"].ToString();
                    Session["LOC_NM"] = dt.Rows[0]["LOC_NM"].ToString();
                    Session["OFFICE_CD"] = dt.Rows[0]["OFFICE_CD"].ToString();
                    Session["EMAIL"] = dt.Rows[0]["EMAIL"].ToString();

                    return Content("Y");
                }

                return Content("N");
            }
            catch (Exception e)
            {
                return Content(e.Message);
            }
        }

        [HttpPost]
        public string LogOut()
        {
            Session.Clear();
            Session.RemoveAll();
            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetNoStore();

            return "Y";
        }
    }
}