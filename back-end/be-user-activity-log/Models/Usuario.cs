using System;
using System.Collections.Generic;

namespace be_user_activity_log.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime FechaNacimiento { get; set; }

    public string? Telefono { get; set; }

    public string PaisResidencia { get; set; } = null!;

    public bool PreguntaSobreContacto { get; set; }

    public int Estado { get; set; }

    public virtual ICollection<Actividade>? Actividades { get; } = new List<Actividade>();
}
