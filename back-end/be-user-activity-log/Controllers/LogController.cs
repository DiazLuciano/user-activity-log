using be_user_activity_log.Models;
using Microsoft.AspNetCore.Mvc;

namespace be_user_activity_log.Controllers
{
    public class LogController : Controller
    {
        public static Actividade AddActivity(int action, int idUser)
        {
            try
            {
                var activity = new Actividade();
                activity.IdUsuario = idUser;
                activity.CreateDate = DateTime.Now;

                switch (action)
                {
                    case 1:
                        activity.Actividad = "Creación de usaurio";
                        break;
                    case 2:
                        activity.Actividad = "Actualización de usaurio";
                        break;
                    case 3:
                        activity.Actividad = "Usuario eliminado";
                        break;
                    default:
                        break;
                }
                return activity;
                
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
    }
}
