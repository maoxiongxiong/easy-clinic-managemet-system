using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;

namespace ECMSWeb
{
    public class LinqToSQL
    {
        /// <summary>
        /// select admin by username for login
        /// </summary>
        public static void selectByusername()
        {

        }

        /// <summary>
        /// insert to admin
        /// </summary>
        public static void insert2admin()
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            System_adminDataContext db = new System_adminDataContext(connectString);

            //Create new user
            SYSTEM_ADMINS newADM = new SYSTEM_ADMINS();
            newADM.id = "001";
            newADM.username = "John";
            newADM.native_name = "Jo";
            newADM.password = "test123";

            //add newADM to database 
            db.SYSTEM_ADMINS.InsertOnSubmit(newADM);

            db.SubmitChanges();

        }

        /// <summary>
        /// update admin
        /// </summary>
        public static void updateadmin()
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            System_adminDataContext db = new System_adminDataContext(connectString);

            //Get Employee for update
            SYSTEM_ADMINS newADM = db.SYSTEM_ADMINS.FirstOrDefault(e => e.username.Equals("John"));

            newADM.id = "001";
            newADM.username = "Johnasen";
            newADM.native_name = "Joh";
            newADM.password = "test123";

            //Save changes to Database.
            db.SubmitChanges();

            //Get Updated DOCTORS            
            SYSTEM_ADMINS updatedADM = db.SYSTEM_ADMINS.FirstOrDefault(e => e.username.Equals("john"));


        }

        /// <summary>
        /// delete admin
        /// </summary>
        public static void deleteadmin()
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            System_adminDataContext db = new System_adminDataContext(connectString);

            //Get ADM to Delete
            SYSTEM_ADMINS deleteADM = db.SYSTEM_ADMINS.FirstOrDefault(e => e.username.Equals("John"));

            //Delete ADM
            db.SYSTEM_ADMINS.DeleteOnSubmit(deleteADM);

            //Save changes to Database.
            db.SubmitChanges();
        }

        /// <summary>
        /// insert to doctors
        /// </summary>
        public static void insert2doctors()
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            System_adminDataContext db = new System_adminDataContext(connectString);

            //Create new Doctor
            DOCTORS newDOCTORS = new DOCTORS();
            newDOCTORS.id = "001";
            newDOCTORS.user_name = "John";
            newDOCTORS.native_name = "Doc.John";
            newDOCTORS.password = "123";
            newDOCTORS.gender = "M";
            newDOCTORS.age = 23;
            newDOCTORS.start_year_of_work = 2014;

            //Add new DOCTORS to database
            db.DOCTORS.InsertOnSubmit(newDOCTORS);

            //Save changes to Database.
            db.SubmitChanges();

            //Get new Inserted Employee            
            DOCTORS insertedEmployee = db.DOCTORS.FirstOrDefault(e => e.user_name.Equals("Michael"));

        }
    
        /// <summary>
        /// update Doctors
        /// </summary>
        public static void updateDoc()
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            System_adminDataContext db = new System_adminDataContext(connectString);

            //Get Employee for update
            DOCTORS newDOCTORS = db.DOCTORS.FirstOrDefault(e => e.user_name.Equals("John"));

            newDOCTORS.id = "001";
            newDOCTORS.user_name = "John";
            newDOCTORS.native_name = "Doc.John";
            newDOCTORS.password = "123";
            newDOCTORS.gender = "M";
            newDOCTORS.age = 23;
            newDOCTORS.start_year_of_work = 2014;

            //Save changes to Database.
            db.SubmitChanges();

            //Get Updated DOCTORS            
            DOCTORS updatedDOCTORS = db.DOCTORS.FirstOrDefault(e => e.user_name.Equals("George Michael"));

        }

        /// <summary>
        /// delete Doctors
        /// </summary>
        public static void deleteDoc()
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            System_adminDataContext db = new System_adminDataContext(connectString);

            //Get DOCTORS to Delete
            DOCTORS deleteDoctor = db.DOCTORS.FirstOrDefault(e => e.user_name.Equals("John"));

            //Delete DOCTORS
            db.DOCTORS.DeleteOnSubmit(deleteDoctor);

            //Save changes to Database.
            db.SubmitChanges();

        }
        
    }
}