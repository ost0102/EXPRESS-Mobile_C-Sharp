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
    public class OceanController : Controller
    {
        DataTable ResultDt = new DataTable();
        DataTable dt = new DataTable();
        DataSet ds = new DataSet();
        string strJson = "";
        public ActionResult order()
        {
            return View();
        }
        public ActionResult orderlist()
        {
            return View();
        }

        public ActionResult test()
        {
            return View();
        }

        public class JsonData
        {
            public string vJsonData { get; set; }
        }

        [HttpPost]
        public string fnSearchData(JsonData value)
        {
            string strResult = "";
            try
            {
                string vJsonData = value.vJsonData.ToString();

                DataTable Hdt = new DataTable();
                DataTable Idt = new DataTable();


                dt = JsonConvert.DeserializeObject<DataTable>(vJsonData);

                Hdt = Sql_Data.Search_SR_NO(dt.Rows[0]);
                Idt = Sql_Data.Search_HBL_ID(dt.Rows[0]);

                ResultDt = Sql_Data.SearchData(dt.Rows[0], Hdt.Rows[0]);
                ResultDt.TableName = "PDA_SEARCH";
                ds.Tables.Add(ResultDt);

                ResultDt = Sql_Data.Search_MULTI(dt.Rows[0],Idt.Rows[0]);
                ResultDt.TableName = "PDA_MULTI";
                ds.Tables.Add(ResultDt);

                dt = new DataTable();
                dt.Columns.Add("trxCode");
                dt.Columns.Add("trxMsg");
                DataRow row1 = dt.NewRow();
                row1["trxCode"] = "Y";
                row1["trxMsg"] = "Success";
                dt.Rows.Add(row1);
                dt.TableName = "Result";
                ds.Tables.Add(dt);

                strJson = JsonConvert.SerializeObject(ds, Formatting.Indented);

                return strJson;
            }
            catch (Exception e)
            {
                strResult = e.Message;
                return strJson;
            }
        }
    }
}