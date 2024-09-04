using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EXPRESS_PDA.Controllers
{
    public class TrackingInfoController : Controller
    {
        // GET: TrackingInfo
        public ActionResult Index()
        {
            return View();
        }

        // GET: TrackingInfo/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: TrackingInfo/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TrackingInfo/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: TrackingInfo/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: TrackingInfo/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: TrackingInfo/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: TrackingInfo/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
