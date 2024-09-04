using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Web;

namespace EXPRESS_PDA.Models.Query
{
    public class Sql_Common
    {

        private static string sSql = "";
        private static DataTable dt = new DataTable();



        public static DataTable SearchUserInfo(DataRow dr)
        {
            string sSql = "";

            sSql += "SELECT * FROM VT_USER_MST WHERE USR_ID = '" + dr["USR_ID"] + "'";
            sSql += " AND PSWD = '" + YJIT.Utils.StringUtils.Md5Hash((string)dr["PSWD"]) + "' ";

            dt = _DataHelper.ExecuteDataTable_Direct(sSql, dr["CUST_CD"].ToString(), System.Web.Configuration.WebConfigurationManager.AppSettings["DBConnIP"].ToString(), CommandType.Text);

            return dt;

        }

    }
}