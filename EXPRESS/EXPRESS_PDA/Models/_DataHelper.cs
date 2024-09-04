using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Configuration;
using Oracle.ManagedDataAccess;
using Oracle.ManagedDataAccess.Client;

namespace EXPRESS_PDA.Models
{
    public class _DataHelper
    {
        private static string _connectionString;
        private static object _connectionStringLockObject = new object();
        public static string ConnectionString
        {
            get
            {
                if (string.IsNullOrEmpty(_connectionString))
                {
                    lock (_connectionStringLockObject)
                    {
                        _connectionString = ConfigurationManager.ConnectionStrings["ELVIS_ORACLE"].ConnectionString;
                    }
                }

                return _connectionString;
            }
        }

        public static bool CheckDataBaseConnecting()
        {
            try
            {
                OracleConnection conn = new OracleConnection(ConnectionString);
                conn.Open();
                conn.Clone();
            }
            catch
            {
                return false;
            }
            return true;
        }


        /// <summary>
        /// Insert Query 전용
        /// </summary>
        /// <param name="Sql">Oracle Query</param>
        /// <param name="cmdType">Query Type</param>
        /// <returns></returns>
        public static int ExecuteNonQuery(string Sql, CommandType cmdType)
        {
            int result;

            using (OracleConnection conn = new OracleConnection(ConnectionString))
            {

                conn.Open();
                OracleTransaction tran = conn.BeginTransaction();
                OracleCommand cmd = new OracleCommand(Sql, conn);
                cmd.CommandType = cmdType;
                cmd.Connection = conn;
                cmd.Transaction = tran;
                try
                {
                    result = cmd.ExecuteNonQuery();
                    tran.Commit();
                    conn.Close();
                }
                catch (Exception)
                {
                    tran.Rollback();
                    if (conn.State != ConnectionState.Closed)
                    {
                        conn.Close();
                    }
                    throw;
                }
            }
            return result;
        }

        public static int ExecuteNonCommit(string Sql, CommandType cmdType)
        {
            int result;

            using (OracleConnection conn = new OracleConnection(ConnectionString))
            {

                conn.Open();
                OracleTransaction tran = conn.BeginTransaction();
                OracleCommand cmd = new OracleCommand(Sql, conn);
                cmd.CommandType = cmdType;
                cmd.Connection = conn;
                cmd.Transaction = tran;
                try
                {
                    result = cmd.ExecuteNonQuery();
                    conn.Close();
                }
                catch (Exception)
                {
                    if (conn.State != ConnectionState.Closed)
                    {
                        conn.Close();
                    }
                    throw;
                }
            }
            return result;
        }

        public static int ExecuteNonQuery(string _ConnStr, string Sql, CommandType cmdType)
        {
            int result;

            using (OracleConnection conn = new OracleConnection(_ConnStr))
            {

                conn.Open();
                OracleTransaction tran = conn.BeginTransaction();
                OracleCommand cmd = new OracleCommand(Sql, conn);
                cmd.CommandType = cmdType;
                cmd.Connection = conn;
                cmd.Transaction = tran;
                try
                {
                    result = cmd.ExecuteNonQuery();

                    tran.Commit();

                    conn.Close();
                }
                catch (Exception)
                {
                    tran.Rollback();
                    if (conn.State != ConnectionState.Closed)
                    {
                        conn.Close();
                    }
                    throw;
                }
            }

            return result;
        }

        public static object ExecuteScalar(string Sql, CommandType cmdType)
        {
            object result = null;

            using (OracleConnection conn = new OracleConnection(ConnectionString))
            {
                try
                {
                    conn.Open();

                    OracleCommand cmd = new OracleCommand(Sql, conn);
                    cmd.CommandType = cmdType;

                    result = cmd.ExecuteScalar();

                    conn.Close();
                }
                catch (Exception)
                {
                    if (conn.State != ConnectionState.Closed)
                        conn.Close();

                    throw;
                }
            }

            return result;
        }

        public static object ExecuteScalar(string _ConnStr, string Sql, CommandType cmdType)
        {
            object result = null;

            using (OracleConnection conn = new OracleConnection(_ConnStr))
            {
                try
                {
                    conn.Open();

                    OracleCommand cmd = new OracleCommand(Sql, conn);
                    cmd.CommandType = cmdType;

                    result = cmd.ExecuteScalar();

                    conn.Close();
                }
                catch (Exception)
                {
                    if (conn.State != ConnectionState.Closed)
                        conn.Close();

                    throw;
                }
            }

            return result;
        }

        public static DataSet ExecuteDataSet(string Sql, CommandType cmdType)
        {
            DataSet dsResult = null;

            using (OracleConnection conn = new OracleConnection(ConnectionString))
            {
                try
                {
                    conn.Open();
                    OracleCommand cmd = new OracleCommand(Sql, conn);

                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    dsResult = new DataSet();
                    da.Fill(dsResult);
                    da.Dispose();
                    conn.Close();

                }
                catch (Exception)
                {
                    if (conn.State != ConnectionState.Closed)
                    {
                        conn.Close();
                    }
                    throw;
                }
            }

            return dsResult;
        }

        public static DataSet ExecuteDataSet(string _ConnStr, string Sql, CommandType cmdType)
        {
            DataSet dsResult = null;

            using (OracleConnection conn = new OracleConnection(_ConnStr))
            {
                try
                {
                    conn.Open();
                    OracleCommand cmd = new OracleCommand(Sql, conn);

                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    dsResult = new DataSet();
                    da.Fill(dsResult);
                    da.Dispose();
                    conn.Close();

                }
                catch (Exception)
                {
                    if (conn.State != ConnectionState.Closed)
                    {
                        conn.Close();
                    }
                    throw;
                }
            }

            return dsResult;
        }

        public static DataTable ExecuteDataTable(string Sql, CommandType cmdType)
        {
            DataTable dtResult = null;

            using (OracleConnection conn = new OracleConnection(ConnectionString))
            {
                try
                {
                    conn.Open();

                    OracleCommand cmd = new OracleCommand(Sql, conn);
                    cmd.CommandType = cmdType;

                    dtResult = new DataTable();

                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    da.Fill(dtResult);
                    da.Dispose();
                    conn.Close();
                }
                catch (Exception e)
                {
                    if (conn.State != ConnectionState.Closed)
                    {
                        conn.Close();
                    }
                    throw;
                }
            }

            return dtResult;
        }

        public static DataTable ExecuteDataTable(string _ConnStr, string Sql, CommandType cmdType)
        {
            DataTable dtResult = null;

            using (OracleConnection conn = new OracleConnection(_ConnStr))
            {
                try
                {
                    conn.Open();

                    OracleCommand cmd = new OracleCommand(Sql, conn);
                    cmd.CommandType = cmdType;

                    dtResult = new DataTable();

                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    da.Fill(dtResult);
                    da.Dispose();
                    conn.Close();
                }
                catch (Exception e)
                {
                    if (conn.State != ConnectionState.Closed)
                    {
                        conn.Close();
                    }
                    throw;
                }
            }

            return dtResult;
        }

        public static OracleDataReader ExecuteDataReader(string Sql, CommandType cmdType)
        {
            OracleDataReader rs = null;
            OracleConnection conn = null;

            try
            {
                conn = new OracleConnection(ConnectionString);
                conn.Open();

                OracleCommand cmd = new OracleCommand(Sql, conn);
                cmd.CommandType = cmdType;
                rs = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            }
            catch (Exception)
            {
                if (rs != null)
                {
                    rs.Close();
                }

                if (conn != null && conn.State != ConnectionState.Closed)
                {
                    conn.Close();
                }

                throw;
            }


            return rs;
        }
        public static int ExecuteNonQuery_Direct(string Sql, string Office_Cd, string Db_Ip, CommandType cmdType)
        {
            int result;
            string con = "User ID=EXP_" + Office_Cd + ";Password=EXP" + Office_Cd + "!#%&;pooling=false;Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=" + Db_Ip + ")(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=ORCL)))";
            using (OracleConnection conn = new OracleConnection(con))
            {

                conn.Open();
                OracleTransaction tran = conn.BeginTransaction();
                OracleCommand cmd = new OracleCommand(Sql, conn);
                cmd.CommandType = cmdType;
                cmd.Connection = conn;
                cmd.Transaction = tran;
                try
                {
                    result = cmd.ExecuteNonQuery();
                    tran.Commit();
                    conn.Close();
                }
                catch (Exception e)
                {
                    string s = e.Message;
                    tran.Rollback();
                    if (conn.State != ConnectionState.Closed)
                    {
                        conn.Close();
                    }
                    throw;
                }
            }
            return result;
        }


        public static DataTable ExecuteDataTable_Direct(string Sql, string Office_Cd, string Db_Ip, CommandType cmdType)
        {
            DataTable dtResult = null;
            //개발
            //string con = "User ID=" + Office_Cd + "_QCTT;Password=" + Office_Cd + "!#%&;pooling=false;Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=" + Db_Ip + ")(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=ORCL)))";
            //운영
            string con = "User ID=EXP_" + Office_Cd + ";Password=EXP" + Office_Cd + "!#%&;pooling=false;Data Source=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=" + Db_Ip + ")(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=ORCL)))";
            using (OracleConnection conn = new OracleConnection(con))
            {
                try
                {
                    conn.Open();

                    OracleCommand cmd = new OracleCommand(Sql, conn);
                    cmd.CommandType = cmdType;

                    dtResult = new DataTable();

                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    da.Fill(dtResult);
                    da.Dispose();
                    conn.Close();
                }
                catch (Exception)
                {
                    if (conn.State != ConnectionState.Closed)
                    {
                        conn.Close();
                    }
                    throw;
                }
            }

            return dtResult;
        }

    }
}