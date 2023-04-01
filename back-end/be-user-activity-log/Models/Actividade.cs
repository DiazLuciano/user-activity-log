using System;
using System.Collections.Generic;

namespace be_user_activity_log.Models;

public partial class Actividade
{
    public long Id { get; set; }

    public DateTime CreateDate { get; set; }

    public string Actividad { get; set; } = null!;

    public int IdUsuario { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
