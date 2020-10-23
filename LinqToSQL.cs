using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECMSWeb
{
    public class LinqToSQL
    {
        public static void insert2Db()
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            LinqToSQLDataContext db = new LinqToSQLDataContext(connectString);

            //Create new Doctor
            Doctors newDoctors = new Doctors();
            newDoctors.id = "001";
            newDoctors.user_name = "John";
            newDoctors.native_name = "Doc.John";
            newDoctors.password = "123";
            newDoctors.gender = "M";
            newDoctors.age = 23;
            newDoctors.star_year_of_work = "2014";

            //Add new Doctors to database
            db.Doctors.InsertOnSubmit(newDoctors);

            //Save changes to Database.
            db.SubmitChanges();

            //Get new Inserted Employee            
            Doctors insertedEmployee = db.Doctors.FirstOrDefault(e => e.Name.Equals("Michael"));

        }
    
        public static void updateTable()
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            LinqToSQLDataContext db = new LinqToSQLDataContext(connectString);

            //Get Employee for update
            Doctors newDoctors = db.Doctors.FirstOrDefault(e => e.Name.Equals("John"));

            newDoctors.id = "001";
            newDoctors.user_name = "John";
            newDoctors.native_name = "Doc.John";
            newDoctors.password = "123";
            newDoctors.gender = "M";
            newDoctors.age = 23;
            newDoctors.star_year_of_work = "2014";

            //Save changes to Database.
            db.SubmitChanges();

            //Get Updated Doctors            
            Doctors updatedDoctors = db.Doctors.FirstOrDefault(e => e.Name.Equals("George Michael"));

        }

        public static void deleteTable()
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            LinqToSQLDataContext db = newLinqToSQLDataContext(connectString);

            //Get Doctors to Delete
            Doctors deleteDoctor = db.Doctors.FirstOrDefault(e => e.Name.Equals("John"));

            //Delete Doctors
            db.Doctors.DeleteOnSubmit(deleteDoctor);

            //Save changes to Database.
            db.SubmitChanges();

        }
    }
}