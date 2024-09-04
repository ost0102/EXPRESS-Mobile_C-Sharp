using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace EXPRESS_PDA.Models.Query
{
    public class Sql_Data
    {
        private static string sSql = "";
        private static DataTable dt = new DataTable();
        public static DataTable SearchData(DataRow dr,DataRow SR_NO)
        {
            string sSql = "";
            sSql += "	SELECT (SELECT CD_NM FROM MDM_COM_CODE WHERE GRP_CD = 'H43' AND COMN_CD = WH_IN_TYPE) AS WH_IN_TYPE 	";
            sSql += "     ,  HBL_NO	";
            sSql += "     ,  HSN_NO	";
            sSql += "     ,  (SELECT CD_NM FROM MDM_COM_CODE WHERE GRP_CD = 'H16' AND COMN_CD = INSPECT_GB) AS INSPECT_GB 	";
            sSql += "     , (SELECT MBL_NO FROM EXP_MBL_MST WHERE SR_NO = A.SR_NO) AS MBL_NO	";
            sSql += "     , (SELECT MAX(CSCLPRGSSTTS) FROM UNIPASS_CARGO_INFO_MST WHERE HBL_NO = A.HBL_NO) AS CSCLPRGSSTTS	";
            sSql += "     , TO_CHAR(TO_DATE(ETD),'YYYY-MM-DD') AS ETD	";
            sSql += "     , TO_CHAR(TO_DATE(ETA),'YYYY-MM-DD') AS ETA	";
            sSql += "     , POL_CD	";
            sSql += "     , POD_CD	";
            sSql += "     , SELECT_CLOSE_GB	";
            sSql += "     , DROP_GB	";
            sSql += "     , MAIN_ITEM_NM	";
            sSql += "     , PKG	";
            sSql += "     , GRS_WGT	";
            sSql += "     , WURL_ID	";
            sSql += "     , UFN_EXP_SELECT_BASE64(CNE_NM_LOC) AS CNE_NM_LOC";
            sSql += "     , UFN_EXP_SELECT_BASE64(CNE_TEL_NO) AS CNE_TEL_NO	";
            sSql += "     , (SELECT OPT_ITEM1 FROM MDM_COM_CODE WHERE GRP_CD = 'H72' AND COMN_CD = HOLD_TYPE) AS HOLD_TYPE	";
            sSql += "     , RMK	";
            sSql += "     , (SELECT CD_NM FROM MDM_COM_CODE WHERE GRP_CD = 'H42' AND COMN_CD = TRUCK_CD) AS TRUCK_CD	";
            sSql += "     , CNTR_AGT_CD,";
            sSql += "	(SELECT SEQ FROM( ";
            sSql += "	 SELECT ROWNUM AS SEQ , A.* FROM ( ";
            sSql += "	 SELECT * ";
            sSql += "	 FROM EXP_HBL_MST  ";
            sSql += "	 WHERE SR_NO = '" + SR_NO["SR_NO"].ToString() + "' ";
            sSql += "	 AND (INSPECT_GB IN ('0','1') ";
            sSql += "	 OR SELECT_CLOSE_GB = 'Y') ";
            sSql += "	 ORDER BY HSN_NO  ";
            sSql += "	 ) A) WHERE HBL_NO = '" + dr["HBL_NO"].ToString() + "') AS INSPECT_SEQ ";
            sSql += "     FROM EXP_HBL_MST A	";
            sSql += "    WHERE HBL_NO = '" +    dr["HBL_NO"].ToString() + "'	";

            dt = _DataHelper.ExecuteDataTable_Direct(sSql, dr["OFFICE_CD"].ToString(), System.Web.Configuration.WebConfigurationManager.AppSettings["DBConnIP"].ToString(), CommandType.Text);

            return dt;

        }


        public static DataTable Search_SR_NO(DataRow dr)
        {
            string sSql = "";
            sSql += "	SELECT SR_NO ";
            sSql += "     FROM EXP_HBL_MST A	";
            sSql += "    WHERE HBL_NO = '" + dr["HBL_NO"].ToString() + "'	";

            dt = _DataHelper.ExecuteDataTable_Direct(sSql, dr["OFFICE_CD"].ToString(), System.Web.Configuration.WebConfigurationManager.AppSettings["DBConnIP"].ToString(), CommandType.Text);

            return dt;

        }


        public static DataTable Search_HBL_ID(DataRow dr)
        {
            string sSql = "";
            sSql += "	SELECT HBL_ID ";
            sSql += "     FROM EXP_HBL_MST A	";
            sSql += "    WHERE HBL_NO = '" + dr["HBL_NO"].ToString() + "'	";

            dt = _DataHelper.ExecuteDataTable_Direct(sSql, dr["OFFICE_CD"].ToString(), System.Web.Configuration.WebConfigurationManager.AppSettings["DBConnIP"].ToString(), CommandType.Text);

            return dt;

        }

        public static DataTable Search_MULTI(DataRow dr, DataRow HBL_ID)
        {
            string sSql = "";
            sSql += "	SELECT MULTI_NO ";
            sSql += "     FROM EXP_HBL_MULTI A	";
            sSql += "    WHERE HBL_ID = '" + HBL_ID["HBL_ID"].ToString() + "'	";

            dt = _DataHelper.ExecuteDataTable_Direct(sSql, dr["OFFICE_CD"].ToString(), System.Web.Configuration.WebConfigurationManager.AppSettings["DBConnIP"].ToString(), CommandType.Text);

            return dt;

        }

    }
}