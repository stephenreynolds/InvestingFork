using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InvestingOak.Data.Entities
{
    public class OptionTrade : Position
    {
        [Required]
        public List<Leg> Legs { get; set; }
    }
}
