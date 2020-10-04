using System;
using System.ComponentModel.DataAnnotations;

namespace InvestingOak.Data.Entities
{
    public abstract class Position
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Symbol { get; set; }

        [Required]
        public DateTime Open { get; set; }

        public DateTime Close { get; set; }

        public string Note { get; set; }
    }
}
